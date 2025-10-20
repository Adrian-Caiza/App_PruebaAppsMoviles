import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useExpenses } from "../../hooks/useExpenses";
import ExpenseCard from "../../components/ExpenseCard";

export default function HomeScreen({ navigation }: any) {
  const { expenses, removeExpense } = useExpenses();

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">Gastos</Text>
        <TouchableOpacity onPress={() => navigation.getParent()?.navigate("AddExpenseModal")}>
          <Text className="text-lg text-teal-600">+ Agregar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseCard expense={item} onPress={() => {}} onDelete={() => removeExpense(item.id)} />
        )}
        ListEmptyComponent={() => <Text className="text-gray-500">No hay gastos aún.</Text>}
      />
    </View>
  );
}
