import { useState, useEffect } from "react";
import {
  useForegroundPermissions,
  requestBackgroundPermissionsAsync,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
  LocationObjectCoords,
} from "expo-location";
import { getAddressLocation } from "../utils/getAddressLocation"; // Ajuste o caminho conforme necessário
import { openSettings } from "expo-linking";
import { Alert } from "react-native";

export function useUserLocation() {
  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions();
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);

  const [currentCoords, setCurrentCoords] =
    useState<LocationObjectCoords | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  useEffect(() => {
    requestLocationForegroundPermission();
  }, []);

  useEffect(() => {
    if (!locationForegroundPermission?.granted) {
      return;
    }

    let subscription: LocationSubscription;

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 1000,
      },
      (location) => {
        setCurrentCoords(location.coords);
        getAddressLocation(location.coords)
          .then((address) => {
            if (address) {
              setCurrentAddress(address);
            }
          })
          .catch((e) => console.log(e))
          .finally(() => setIsLoadingLocation(false));
      }
    ).then((response) => (subscription = response));

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [locationForegroundPermission?.granted]);

  const requestBackgroundPermissions = async () => {
    const backgroundPermissions = await requestBackgroundPermissionsAsync();

    if (!backgroundPermissions.granted) {
      Alert.alert(
        "Localização",
        'É necessário permitir que o App tenha acesso localização em segundo plano. Acesse as configurações do dispositivo e habilite "Permitir o tempo todo."',
        [{ text: "Abrir configurações", onPress: openSettings }]
      );
    }

    return backgroundPermissions.granted;
  };

  return {
    currentAddress,
    currentCoords,
    isLoadingLocation,
    locationForegroundPermission,
    requestBackgroundPermissions,
  };
}
