import { LocationObjectCoords } from "expo-location";
import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import {
  GooglePlacesAutocomplete,
  Point,
} from "react-native-google-places-autocomplete";
import Input from "./input";

const VirtualizedScrollView = (props: any) => {
  return (
    <FlatList
      {...props}
      data={[]}
      keyExtractor={(e, i) => "dom" + i.toString()}
      ListEmptyComponent={null}
      renderItem={null}
      ListHeaderComponent={() => <>{props.children}</>}
    />
  );
};

interface GooglePlacesInputProps {
  onChangeAddress: (address: (Point & { address: string }) | null) => void;
  placeholder?: string;
  value?: string;
}

const GooglePlacesInput = ({
  onChangeAddress = () => {},
  placeholder = "Procurar",
  value = "",
}: GooglePlacesInputProps) => {
  return (
    <VirtualizedScrollView keyboardShouldPersistTaps="handled">
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        textInputProps={{
          value,
        }}
        onPress={(data, details = null) => {
          console.log(details);

          if (!details?.geometry.location) return;
          console.log(details?.formatted_address);

          onChangeAddress({
            ...details?.geometry.location,
            address: details?.formatted_address,
          } as Point & { address: string });
        }}
        fetchDetails={true}
        query={{
          key: "AIzaSyB4A1Mk4PLS_lvASCirHYQVEpvWRCd9sPo",
          language: "pt-BR",
        }}
        onFail={(error) => console.error(error)}
        enablePoweredByContainer={false}
        styles={{
          listView: { height: 300 },
          container: {
            flex: 1,
          },
          textInputContainer: {
            flexDirection: "row",
          },
          textInput: {
            backgroundColor: "#D1D5DB",
            height: 44,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
            borderColor: "black",
            borderWidth: 1,
          },
          poweredContainer: {
            justifyContent: "flex-end",
            alignItems: "center",
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: "#c8c7cc",
            borderTopWidth: 0.5,
          },
          powered: {},
          row: {
            backgroundColor: "#FFFFFF",
            padding: 13,
            height: 44,
            flexDirection: "row",
          },
          separator: {
            height: 0.5,
            backgroundColor: "#c8c7cc",
          },
          description: {},
          loader: {
            flexDirection: "row",
            justifyContent: "flex-end",
            height: 20,
          },
        }}
        debounce={1000}

        //listViewDisplayed={false}
      />
    </VirtualizedScrollView>
  );
};

export default GooglePlacesInput;