import { View } from "react-native";
import Constants from "expo-constants";
import { ReactNode } from "react";

export default function ScreenLayout({ children }: { children: ReactNode }) {
  return (
    <View style={{ marginTop: Constants.statusBarHeight }} className="flex-1">
      {children}
    </View>
  );
}
