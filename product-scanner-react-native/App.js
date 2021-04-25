import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeActivity from "./components/HomeActivity";
import ProductActivity from "./components/ProductActivity";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeActivity} />
        <Stack.Screen name="Product" component={ProductActivity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
