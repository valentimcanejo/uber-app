import { Slot, Stack, Tabs } from "expo-router";
import { SafeAreaView } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Loading } from "../components/loading";
import CorridaProvider from "../context/CorridaContext";
import PopUpCorrida from "../components/popUpCorrida";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 ">
      <CorridaProvider>
        <Slot />
      </CorridaProvider>
    </SafeAreaView>
  );
}
