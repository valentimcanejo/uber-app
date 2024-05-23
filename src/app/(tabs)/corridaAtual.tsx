import { View, Text, ScrollView } from "react-native";
import BottomNavigationBar from "../../components/bottomNavigationBar";
import CardComponent from "../../components/card";
import { useContext, useEffect } from "react";
import { CorridaContext } from "../../context/CorridaContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Map } from "../../components/map";
import { useUserLocation } from "../../hooks/useUserLocation";
import useCorrida from "../../hooks/firebaseHooks/useCorrida";
import { Coordenada } from "../../../backend/firebase/core/entities/coordenada";

export default function CorridaAtual() {
  const { dadosCorrida, dadosMatrix, enderecoDestino, desenhoCaminho } =
    useContext(CorridaContext);

  const { currentCoords } = useUserLocation();
  const { atualizarPosicao } = useCorrida();

  console.log(dadosCorrida);

  const handleAtualizarPosicao = async () => {
    if (!currentCoords || !dadosCorrida) return;

    if (dadosCorrida?.id) {
      await atualizarPosicao(
        dadosCorrida.id,
        new Coordenada({
          latitude: currentCoords.latitude,
          longitude: currentCoords.longitude,
        })
      );
    }
  };

  useEffect(() => {
    handleAtualizarPosicao();
  }, [currentCoords]);

  return (
    <View className="mt-8 flex-2">
      <View className="p-4 ">
        <Text className="mb-4 text-2xl">{dadosCorrida?.codCorrida}</Text>
        {dadosCorrida &&
        enderecoDestino?.lat &&
        enderecoDestino?.lng &&
        desenhoCaminho ? (
          <KeyboardAwareScrollView extraHeight={100}>
            <ScrollView>
              <Map
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
      </View>
    </View>
  );
}
