import { View } from "react-native";
import Input from "../../components/input";
import { useState } from "react";
import Button from "../../components/button";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const login = async () => {
    router.replace("/home");
  };

  return (
    <View className="flex items-center justify-center flex-1 w-full px-4">
      <Input
        fullWidth
        onChange={setEmail}
        value={email}
        label="Email"
        error={loginError}
      />
      <Input
        style={{ marginTop: 5 }}
        fullWidth
        onChange={setPassword}
        value={password}
        label="Password"
        error={loginError}
      />
      <Button
        style={{ marginTop: 10 }}
        text="Login"
        onPress={login}
        fullWidth
      />
    </View>
  );
}
