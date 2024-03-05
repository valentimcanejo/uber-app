import * as React from "react";
import { Avatar, Card, Text } from "react-native-paper";
import { Button } from "./button";
import { Image, View } from "react-native";
import { Link } from "expo-router";
import { LinkButton } from "./link-button";

const CardComponent = () => (
  <View className="px-4 py-2 border border-blue-200 rounded-lg">
    <View className="flex-row items-center justify-between">
      <Text className="text-xl">Corrida</Text>
      <Image source={require("../../assets/car.png")} className="w-16 h-16" />
    </View>
    <Text>Inicie uma corrida</Text>
    <View className="mt-4 ml-auto">
      <LinkButton href="/corrida" title="Iniciar" />
    </View>
  </View>
);

export default CardComponent;
