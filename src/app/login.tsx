import { View } from "react-native";
import Input from "@/components/Input";
import { useState } from "react";
import Button from "@/components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const login = async () => {};

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
        onPress={() => {}}
        fullWidth
      />
    </View>
  );
}
