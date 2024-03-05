import { View, Text } from "react-native";
import BottomNavigationBar from "../../components/bottomNavigationBar";
import CardComponent from "../../components/card";

export default function Main() {
  return (
    <View className="mt-8 flex-2">
      <View className="p-4 ">
        <Text className="mb-4 text-2xl">Últimas corridas:</Text>
        <CardComponent />
      </View>
    </View>
  );
}
