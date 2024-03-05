import { Tabs } from "expo-router";

export default function BottomNavigationBar() {
  return (
    <Tabs>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="login" />
    </Tabs>
  );
}
