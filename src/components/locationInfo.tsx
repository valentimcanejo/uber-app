import { Text, View } from "react-native";

export type LocationInfoProps = {
  label: string;
  description: string;
};

type Props = LocationInfoProps;

export function LocationInfo({ label, description }: Props) {
  return (
    <View className="flex-row items-center w-full">
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
