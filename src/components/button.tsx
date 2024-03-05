import { Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface ButtonProps {
  onPress: any;
  text: string;
  fullWidth?: boolean;
  style?: any;
}

export default function Button({
  onPress = () => {},
  text = "",
  fullWidth = false,
  style = {},
}: ButtonProps) {
  return (
    <StyledTouchableOpacity
      style={style}
      className={clsx("bg-blue-700 px-4 py-2 rounded-lg", {
        "w-full": fullWidth,
      })}
      onPress={onPress}
    >
      <StyledText className="text-lg font-medium text-center text-white">
        {text || "Texto"}
      </StyledText>
    </StyledTouchableOpacity>
  );
}
