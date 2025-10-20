import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Expense } from "../types";

type Props = {
  expense: Expense;
  onPress?: () => void;
  onDelete?: () => void;
};

export default function ExpenseCard({ expense, onPress, onDelete }: Props) {
  return (
    <TouchableOpacity onPress={onPress} className="bg-white rounded-lg p-3 mb-3 shadow">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="font-semibold text-lg">{expense.title}</Text>
          <Text className="text-sm text-gray-600">Monto: ${expense.amount.toFixed(2)}</Text>
          <Text className="text-sm text-gray-600">Pagó: {expense.payer}</Text>
          <Text className="text-xs text-gray-500">Fecha: {new Date(expense.date).toLocaleString()}</Text>
        </View>
        {expense.receiptUri ? (
          <Image source={{ uri: expense.receiptUri }} style={{ width: 60, height: 60, borderRadius: 6, marginLeft: 8 }} />
        ) : null}
      </View>

      {onDelete ? (
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Eliminar gasto", "¿Deseas eliminar este gasto?", [
              { text: "Cancelar", style: "cancel" },
              { text: "Eliminar", style: "destructive", onPress: onDelete }
            ])
          }
          className="mt-2"
        >
          <Text className="text-red-600">Eliminar</Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
}
