import { View, Text, ScrollView, Alert } from "react-native";
import InputEndereco from "../../components/input-endereco";
import { useEffect, useState } from "react";
import {
  useForegroundPermissions,
  requestBackgroundPermissionsAsync,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
  LocationObjectCoords,
} from "expo-location";
import { getAddressLocation } from "../../utils/getAddressLocation";
import { Loading } from "../../components/loading";
import { LocationInfo } from "../../components/locationInfo";
import { CarSimple } from "phosphor-react-native";
import { Map } from "../../components/map";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { openSettings } from "expo-linking";
import { Button } from "../../components/button";
import {
  startLocationTask,
  stopLocationTask,
} from "../../tasks/backgroundLocationTask";
import GooglePlacesInput from "../../components/googleAutocomplete";
import { Point } from "react-native-google-places-autocomplete";
import {
  DadosMatrixProps,
  GoogleAddressProps,
  MatrixAPIError,
  PolylineProps,
  RespostaDadosMatrixProps,
} from "../../types/GoogleTypes";
import useMatrixAPI from "../../hooks/useMatrixAPI";
import useGoogleAPI from "../../hooks/useGoogleAPI";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../backend/firebase/initFirebase";

export default function Corrida() {
  const [error, setError] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions();
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [currentCoords, setCurrentCoords] =
    useState<LocationObjectCoords | null>(null);

  const [enderecoAtual, setEnderecoAtual] = useState<GoogleAddressProps | null>(
    null
  );
  const [enderecoDestino, setEnderecoDestino] =
    useState<GoogleAddressProps | null>(null);

  const { getMatrixDistance } = useMatrixAPI();
  const { getCaminhoCompleto } = useGoogleAPI();

  const [dadosMatrix, setDadosMatrix] =
    useState<RespostaDadosMatrixProps | null>(null);

  const [desenhoCaminho, setDesenhoCaminho] = useState<PolylineProps[] | null>(
    null
  );

  const getTeste = async () => {
    try {
      const collectionRef = collection(db, "teste");
      const doc = (await getDocs(collectionRef)).docs.map((doc) => doc.data());
      console.log(doc);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeste();
  }, []);

  async function pararCorrida() {
    try {
      await stopLocationTask();
    } catch (error) {
      console.log(error);
    }
  }

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

  useEffect(() => {
    if (!currentCoords || !enderecoDestino?.address) return;
    salvarDadosCorrida();
  }, [currentCoords, enderecoDestino]);

  useEffect(() => {
    requestLocationForegroundPermission();
  }, []);

  useEffect(() => {
    if (!locationForegroundPermission?.granted) {
      return;
    }

    let subscription: LocationSubscription;

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 1000,
      },
      (location) => {
        setCurrentCoords(location.coords);
        getAddressLocation(location.coords)
          .then((address) => {
            if (address) {
              setCurrentAddress(address);
            }
          })
          .catch((e) => console.log(e))
          .finally(() => setIsLoadingLocation(false));
      }
    ).then((response) => (subscription = response));

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [locationForegroundPermission?.granted]);

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

  const salvarDadosCorrida = async () => {
    try {
      if (!enderecoDestino?.address || !currentAddress) return;
      const distancia = await getMatrixDistance(
        currentAddress,
        enderecoDestino?.address
      );

      const caminho = await getCaminhoCompleto(
        currentAddress,
        enderecoDestino?.address
      );

      setDadosMatrix(distancia);
      setDesenhoCaminho(caminho);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="mt-8 flex-2">
      <View className="p-4 ">
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
        {enderecoAtual?.lat &&
        enderecoAtual?.lng &&
        enderecoDestino?.lat &&
        enderecoDestino?.lng ? (
          <View>
            <Button onPress={salvarDadosCorrida}>
              <Button.Text>Começar corrida</Button.Text>
            </Button>
          </View>
        ) : null}
      </View>
    </View>
  );
}
