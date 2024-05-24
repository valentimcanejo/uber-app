import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function PopUpCorrida() {
  const handlePress = () => {
    router.push("/corridaAtual");
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="absolute items-center justify-center w-32 h-16 bg-blue-200 rounded-lg bottom-2 right-2"
    >
      <Text>Corrida atual</Text>
    </TouchableOpacity>
  );
}
