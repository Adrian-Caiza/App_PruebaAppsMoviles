import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BalanceScreen from "../screens/BalanceScreen";
import HomeScreen from "../screens/HomeScreen";
import RecibosScreen from "../screens/RecibosScreen";
import ReporteScreen from "../screens/ReporteScreen";
import AddExpenseModal from "../screens/modals/AddExpenseModal";

type RootStackParamList = {
  Main: undefined;
  AddExpenseModal: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Balance" component={BalanceScreen} />
      <Tab.Screen name="Recibos" component={RecibosScreen} />
      <Tab.Screen name="Reporte" component={ReporteScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: "modal", headerShown: false }}>
        <Stack.Screen name="AddExpenseModal" component={AddExpenseModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
