import { View } from "react-native";
import Button from "../components/Button";
import { Link, useNavigation } from "expo-router";

export default function Home() {
  return (
    <View className="items-center justify-center flex-1">
      <Link href="/login">Fazer Login</Link>
    </View>
  );
}
