import { View, Text, ScrollView } from "react-native";
import { useContext, useEffect } from "react";
import { CorridaContext } from "../../context/CorridaContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Map } from "../../components/map";
import { useUserLocation } from "../../hooks/useUserLocation";
import useCorrida from "../../hooks/firebaseHooks/useCorrida";
import { Coordenada } from "../../../backend/firebase/core/entities/coordenada";
import ScreenLayout from "../../components/screenLayout";
import { Button } from "../../components/button";
import { router } from "expo-router";

export default function CorridaAtual() {
  const {
    dadosCorrida,
    dadosMatrix,
    enderecoDestino,
    desenhoCaminho,
    limparDadosCorrida,
  } = useContext(CorridaContext);

  const { currentCoords } = useUserLocation();
  const { atualizarPosicao, finalizarCorrida } = useCorrida();

  const handleAtualizarPosicao = async () => {
    if (!currentCoords || !dadosCorrida) return;

    if (!dadosCorrida?.id) return;
    await atualizarPosicao(
      dadosCorrida.id,
      new Coordenada({
        latitude: currentCoords.latitude,
        longitude: currentCoords.longitude,
      })
    );
  };

  const handleFinalizarCorrida = async () => {
    if (!dadosCorrida?.id) return;
    await finalizarCorrida(dadosCorrida.id);
    limparDadosCorrida();
    router.push("/home");
  };

  useEffect(() => {
    handleAtualizarPosicao();
  }, [currentCoords]);

  return (
    <ScreenLayout>
      <View className="p-4 ">
        {dadosCorrida &&
        enderecoDestino?.lat &&
        enderecoDestino?.lng &&
        desenhoCaminho ? (
          <KeyboardAwareScrollView extraHeight={500}>
            <ScrollView>
              <Map
                height={500}
                coordinates={[
                  {
                    latitude:
                      dadosCorrida?.coordenadas[
                        dadosCorrida?.coordenadas.length - 1
                      ]?.latitude,
                    longitude:
                      dadosCorrida?.coordenadas[
                        dadosCorrida?.coordenadas.length - 1
                      ]?.longitude,
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
        <Button onPress={handleFinalizarCorrida}>
          <Button.Text>Finalizar corrida</Button.Text>
        </Button>
      </View>
    </ScreenLayout>
  );
}
