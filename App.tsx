import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Button from "./src/components/Button";
import { withExpoSnack } from "nativewind";
import { Typography } from "./src/components/Typography";

const App = () => {
  return (
    <View style={styles.container}>
      <Typography size="lg">
        Open up App.tsx to start working on your app!
      </Typography>
      <StatusBar style="auto" />
      <Button onPress={() => {}} title="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default withExpoSnack(App);
