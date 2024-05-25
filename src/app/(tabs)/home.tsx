import { View, Text } from "react-native";
import CardComponent from "../../components/card";
import { useContext, useEffect } from "react";
import useCorrida from "../../hooks/firebaseHooks/useCorrida";
import { CorridaContext } from "../../context/CorridaContext";
import { router } from "expo-router";
import { useUserLocation } from "../../hooks/useUserLocation";
import PopUpCorrida from "../../components/popUpCorrida";

export default function Main() {
  const { existeCorridaAtiva, findById } = useCorrida();
  const {
    setDadosCorrida,
    setEnderecoDestino,
    salvarDadosCorrida,
    enderecoDestino,
    dadosCorrida,
  } = useContext(CorridaContext);
  const { currentAddress } = useUserLocation();

  const handleExisteCorridaAtiva = async () => {
    try {
      const idCorridaAtiva = await existeCorridaAtiva();

      if (!idCorridaAtiva) return;

      const corridaAtiva = await findById(idCorridaAtiva);
      if (!corridaAtiva) return;

      setDadosCorrida(corridaAtiva);
      setEnderecoDestino({
        address: corridaAtiva.localizacaoFinal?.endereco,
        lat: corridaAtiva.localizacaoFinal.latitude,
        lng: corridaAtiva.localizacaoFinal.longitude,
      });
      router.push("/corridaAtual");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    salvarDadosCorrida();
  }, [currentAddress, enderecoDestino]);

  useEffect(() => {
    console.log("exec");

    handleExisteCorridaAtiva();
  }, []);

  return (
    <View className="relative flex-1">
      <View className="p-4 ">
        <Text className="mb-4 text-2xl">Últimas corridas:</Text>
        <CardComponent />
      </View>
      {dadosCorrida && <PopUpCorrida />}
    </View>
  );
}
