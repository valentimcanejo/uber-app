import { styled } from "nativewind";
import { View } from "react-native";
import Input from "../../components/Input";
import { useState } from "react";

const StyledView = styled(View);

export default function Login() {
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(false);

  return (
    <StyledView className="items-center justify-center flex-1 w-full px-4">
      <Input
        fullWidth
        onChange={setEmail}
        value={email}
        label="Email"
        error={loginError}
      />
    </StyledView>
  );
}
