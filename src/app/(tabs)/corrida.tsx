import { View, Text, ScrollView, Alert } from "react-native";
import { useContext, useEffect } from "react";
import { requestBackgroundPermissionsAsync } from "expo-location";
import { Loading } from "../../components/loading";
import { Map } from "../../components/map";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { openSettings } from "expo-linking";
import { Button } from "../../components/button";
import {
  startLocationTask,
  stopLocationTask,
} from "../../tasks/backgroundLocationTask";
import GooglePlacesInput from "../../components/googleAutocomplete";
import useCorrida from "../../hooks/firebaseHooks/useCorrida";
import { Corrida as ClasseCorrida } from "../../../backend/firebase/core/entities/corrida";
import { Coordenada } from "../../../backend/firebase/core/entities/coordenada";
import { CorridaContext } from "../../context/CorridaContext";
import { router } from "expo-router";
import { useUserLocation } from "../../hooks/useUserLocation";
import ScreenLayout from "../../components/screenLayout";

export default function Corrida() {
  const {
    currentAddress,
    currentCoords,
    isLoadingLocation,
    locationForegroundPermission,
  } = useUserLocation();

  const {
    setDadosCorrida,
    dadosMatrix,
    enderecoDestino,
    setEnderecoDestino,
    desenhoCaminho,
    salvarDadosCorrida,
  } = useContext(CorridaContext);

  const { comecarCorrida, registrarCorrida } = useCorrida();

  async function pararCorrida() {
    try {
      await stopLocationTask();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!currentCoords || !enderecoDestino?.address) return;
    salvarDadosCorrida();
  }, [currentCoords, enderecoDestino]);

  async function handleDepartureRegister() {
    try {
      if (!currentCoords?.latitude && !currentCoords?.longitude) {
        return Alert.alert(
          "Localização",
          "Não foi possível obter a localização atual. Tente novamente."
        );
      }

      const backgroundPermissions = await requestBackgroundPermissionsAsync();

      if (!backgroundPermissions.granted) {
        return Alert.alert(
          "Localização",
          'É necessário permitir que o App tenha acesso localização em segundo plano. Acesse as configurações do dispositivo e habilite "Permitir o tempo todo."',
          [{ text: "Abrir configurações", onPress: openSettings }]
        );
      }
      await startLocationTask();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não possível registrar a saída do veículo.");
    }
  }

  const iniciarCorrida = async () => {
    try {
      if (!currentAddress || !enderecoDestino?.address)
        return Alert.alert("Erro", "Não foi possível iniciar a corrida.");

      const novaCorrida = ClasseCorrida.criar({
        localizacaoInicial: {
          endereco: currentAddress,
          latitude: currentCoords?.latitude!,
          longitude: currentCoords?.longitude!,
        },
        localizacaoFinal: {
          endereco: enderecoDestino?.address!,
          latitude: enderecoDestino?.lat!,
          longitude: enderecoDestino?.lng!,
        },
        status: "Iniciada",
        coordenadas: [
          new Coordenada({
            latitude: currentCoords?.latitude!,
            longitude: currentCoords?.longitude!,
          }),
        ],
      });

      const corridaCriada = await registrarCorrida(novaCorrida);

      if (!corridaCriada?.id) {
        return Alert.alert("Erro", "Não foi possível criar a corrida.");
      }

      comecarCorrida(corridaCriada?.id, setDadosCorrida);
      router.replace("/corridaAtual");
    } catch (error) {
      console.log(error);
    }
  };

  if (!locationForegroundPermission?.granted) {
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-2xl">Precisamos de sua permissão</Text>
      </View>
    );
  }

  if (isLoadingLocation) {
    return <Loading />;
  }
  console.log(currentCoords);
  console.log(enderecoDestino);

  return (
    <ScreenLayout>
      <View className="flex-1 p-4">
        <Text className="mb-4 text-2xl">Selecione o endereço:</Text>

        {/* <GooglePlacesInput
          placeholder="Endereço atual"
          onChangeAddress={setEnderecoAtual}
          value={enderecoAtual?.address}
          // value={enderecoAtual?.}
        /> */}
        {currentCoords ? (
          <GooglePlacesInput
            placeholder="Endereço de destino"
            onChangeAddress={setEnderecoDestino}
            value={enderecoDestino?.address}
          />
        ) : null}

        {currentCoords &&
        enderecoDestino?.lat &&
        enderecoDestino?.lng &&
        desenhoCaminho ? (
          <KeyboardAwareScrollView extraHeight={100}>
            <ScrollView>
              <Map
                height={400}
                coordinates={[
                  {
                    latitude: currentCoords?.latitude,
                    longitude: currentCoords?.longitude,
                  },
                  ...desenhoCaminho,
                  {
                    latitude: enderecoDestino?.lat,
                    longitude: enderecoDestino?.lng,
                  },
                ]}
              />

              <View className="flex-1 p-5">
                <View className="bg-gray-200"></View>
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
        ) : null}

        {!dadosMatrix ? null : (
          <View className="relative my-4">
            <View className="flex-row items-center p-2 mb-2 bg-gray-200 place-items-center">
              <View className="w-2 h-2 mr-2 bg-black rounded-full"></View>
              <Text>{currentAddress}</Text>
            </View>
            <View
              className="absolute z-20 bg-black h-14 top-7"
              style={{
                left: 11,
                width: 2,
              }}
            ></View>
            <View className="flex-row items-center p-2 bg-gray-200 place-items-center">
              <View className="w-2 h-2 mr-2 bg-black rounded-full"></View>
              <Text>{enderecoDestino?.address}</Text>
            </View>

            <Text className="mt-2">
              Distância: {dadosMatrix.distancia.km} km
            </Text>
            <Text className="">
              Tempo: {dadosMatrix.tempo.minutos.toFixed(2)} minutos
            </Text>
          </View>
        )}

        {currentCoords?.latitude &&
        currentCoords?.longitude &&
        enderecoDestino?.lat &&
        enderecoDestino?.lng ? (
          <View>
            <Button onPress={iniciarCorrida}>
              <Button.Text>Começar corrida</Button.Text>
            </Button>
          </View>
        ) : null}
      </View>
    </ScreenLayout>
  );
}
