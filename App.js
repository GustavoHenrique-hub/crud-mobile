import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import List from "./src/pages/List";
import Insert from "./src/pages/Insert";
import Update from "./src/pages/Update";
import FindById from "./src/pages/FindById";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "List") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Insert") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search-circle" : "search-circle-outline";
          }

          // Você pode retornar qualquer componente aqui
          return <Icon name={iconName} size={24} color={"#6700B3"} />;
        },
        tabBarLabelStyle: {
          color: "#6700B3", // Altera a cor do título das tabs
        },
        tabBarIconStyle: {
          alignItems: "center", // Centraliza o ícone dentro da aba
        },
      })}
      initialRouteName="List"
    >
      <Tab.Screen name="List" component={List} />
      <Tab.Screen name="Insert" component={Insert} />
      <Tab.Screen name="Search" component={FindById} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={TabNavigator}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Update"
          component={Update}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
