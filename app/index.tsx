import React from "react";
import { SafeAreaView } from "react-native";
import AppNavigator from "../app/navigation/AppNavigator";
import { ExpensesProvider } from "../context/ExpensesContext";
import "../global.css";

export default function App() {
  return (
    <ExpensesProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </ExpensesProvider>
  );
}
