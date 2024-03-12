import { View, Text, ScrollView } from "react-native";
import InputEndereco from "../../components/input-endereco";
import { useEffect, useState } from "react";
import {
  useForegroundPermissions,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
  LocationObjectCoords,
} from "expo-location";
import { getAddressLocation } from "../../utils/getAddressLocation";
import { Loading } from "../../components/loading";
import { LocationInfo } from "../../components/locationInfo";
import { CarSimple } from "phosphor-react-native";
import { Map } from "../../components/map";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Corrida() {
  const [enderecoDestino, setEnderecoDestino] = useState("");
  const [error, setError] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions();
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [currentCoords, setCurrentCoords] =
    useState<LocationObjectCoords | null>(null);

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

  if (!locationForegroundPermission?.granted) {
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-2xl">Precisamos de sua permissão</Text>
      </View>
    );
  }

  if (isLoadingLocation) {
    return <Loading />;
  }

  return (
    <View className="mt-8 flex-2">
      <View className="p-4 ">
        <Text className="mb-4 text-2xl">Selecione o endereço:</Text>
        <InputEndereco
          onChange={setEnderecoDestino}
          value={enderecoDestino}
          error={error}
          fullWidth
          label="Endereço de destino"
        />
        <KeyboardAwareScrollView extraHeight={100}>
          <ScrollView>
            {currentCoords && <Map coordinates={[currentCoords]} />}
            <View className="flex-1 p-5">
              <View className="bg-gray-200"></View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
        {currentAddress && (
          <LocationInfo
            icon={CarSimple}
            label="Localização atual"
            description={currentAddress}
          />
        )}
      </View>
    </View>
  );
}
