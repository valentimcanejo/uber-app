import { useState } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [loginError, setLoginError] = useState(false);

  return (
    <View>
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="flex-1 p-5 mt-6">
            <View className="flex-row items-center justify-between">
              <Text className="text-xl">Rômulo Valentim</Text>
              <Image
                source={require("../../../assets/defaultUser.png")}
                className="w-16 h-16"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
}
