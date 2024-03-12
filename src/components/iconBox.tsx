import { IconProps } from "phosphor-react-native";

import { View } from "react-native";

export type SizeProps = "SMALL" | "NORMAL";

export type IconBoxProps = (props: IconProps) => JSX.Element;

type Props = {
  size?: SizeProps;
  icon: IconBoxProps;
};

export function IconBox({ icon: Icon, size = "NORMAL" }: Props) {
  const iconSize = size === "NORMAL" ? 24 : 16;

  return (
    <View
      className={`items-center justify-center ${
        size === "NORMAL" ? "w-12 h-12" : "w-8 h-8"
      } mr-4 bg-gray-500 rounded-lg`}
    >
      <Icon size={iconSize} />
    </View>
  );
}
