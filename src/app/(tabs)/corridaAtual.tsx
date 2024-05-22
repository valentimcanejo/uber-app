import { View, Text } from "react-native";
import BottomNavigationBar from "../../components/bottomNavigationBar";
import CardComponent from "../../components/card";
import { useContext } from "react";
import { CorridaContext } from "../../context/CorridaContext";

export default function CorridaAtual() {
  const { dadosCorrida, setDadosCorrida } = useContext(CorridaContext);
  console.log(dadosCorrida);

  return (
    <View className="mt-8 flex-2">
      <View className="p-4 ">
        <Text className="mb-4 text-2xl">{dadosCorrida?.codCorrida}</Text>
      </View>
    </View>
  );
}
