import { Text, View } from "react-native";
import { IconBox, IconBoxProps } from "./iconBox";

export type LocationInfoProps = {
  label: string;
  description: string;
};

type Props = LocationInfoProps & {
  icon: IconBoxProps;
};

export function LocationInfo({ icon, label, description }: Props) {
  return (
    <View className="flex-row items-center w-full">
      <IconBox icon={icon} />
      <View className="flex-1">
        <Text numberOfLines={1} className="font-medium ">
          {label}
        </Text>

        <Text numberOfLines={1} className="font-medium ">
          {description}
        </Text>
      </View>
    </View>
  );
}
