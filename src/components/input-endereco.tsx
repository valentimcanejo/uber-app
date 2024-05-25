import clsx from "clsx";
import { useState } from "react";
import { HelperText, TextInput } from "react-native-paper";

interface InputProps {
  label: string;
  value: string;
  error: boolean;
  onChange: any;
  secureTextEntry?: boolean;
  messageError?: string;
  fullWidth?: boolean;
  style?: any;
}

export default function InputEndereco({
  label = "",
  value = "",
  error = false,
  secureTextEntry = false,
  onChange = () => {},
  messageError = "",
  fullWidth = false,
  style = {},
}: InputProps) {
  const [secureMode, setSecureMode] = useState(secureTextEntry);

  return (
    <>
      {error && (
        <HelperText type="error" visible={error}>
          {messageError}
        </HelperText>
      )}
      <TextInput
        style={style}
        className={clsx(`bg-gray-300`, {
          "w-full": fullWidth,
        })}
        label={label}
        value={value}
        error={error}
        secureTextEntry={secureMode}
        onChangeText={onChange}
        mode="outlined"
        activeOutlineColor="#1E8187"
        right={
          secureTextEntry ? (
            <TextInput.Icon
              icon={secureMode ? "eye-off" : "eye"}
              onPress={() => setSecureMode(!secureMode)}
            />
          ) : null
        }
      />
    </>
  );
}
