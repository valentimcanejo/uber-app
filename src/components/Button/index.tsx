import { Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import clsx from "clsx";

const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface ButtonProps {
  onPress: any;
  title: string;
  fullWidth?: boolean;
  customClassname?: string;
}

export default function Button({
  onPress,
  title,
  fullWidth,
  customClassname = "",
}: ButtonProps) {
  return (
    <StyledTouchableOpacity
      className={clsx("bg-blue-400 px-4 py-2 rounded-lg", {
        "w-full": fullWidth,
        [customClassname]: customClassname,
      })}
      onPress={onPress}
    >
      <StyledText className="text-white text-center font-medium text-lg">
        {title}
      </StyledText>
    </StyledTouchableOpacity>
  );
}
