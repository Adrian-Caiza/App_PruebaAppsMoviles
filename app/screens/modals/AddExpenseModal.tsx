import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, Alert } from "react-native";
import { useExpenses } from "../../../hooks/useExpenses";
import ImagePickerField from "../../../components/ImagePickerField";
import { PEOPLE } from "../../../constants/people";
import { Person } from "../../../types";

export default function AddExpenseModal({ navigation }: any) {
  const { addExpense } = useExpenses();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState<Person>("Juan");
  const [participants, setParticipants] = useState<Person[]>([...PEOPLE]);
  const [receiptUri, setReceiptUri] = useState<string>("");

  const toggleParticipant = (p: Person) => {
    setParticipants((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  const onSave = async () => {
    // Validaciones
    if (!title.trim()) return Alert.alert("Validación", "La descripción es obligatoria.");
    const amt = Number(amount);
    if (!amt || amt <= 0) return Alert.alert("Validación", "Ingrese un monto válido.");
    if (!receiptUri) return Alert.alert("Validación", "La foto del recibo es obligatoria.");
    if (!participants.length) return Alert.alert("Validación", "Seleccione al menos un participante.");

    await addExpense({
      title,
      amount: amt,
      payer,
      participants,
      receiptUri
    });

    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text className="text-xl font-bold mb-4">Agregar Gasto</Text>

      <Text className="mb-1">Descripción</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Ej: Almuerzo" className="border px-3 py-2 rounded mb-3" />

      <Text className="mb-1">Monto</Text>
      <TextInput keyboardType="numeric" value={amount} onChangeText={setAmount} placeholder="Ej: 45.50" className="border px-3 py-2 rounded mb-3" />

      <Text className="mb-1">Pagador</Text>
      <View className="flex-row mb-3">
        {PEOPLE.map((p) => (
          <Button key={p} title={p} onPress={() => setPayer(p)} />
        ))}
      </View>

      <Text className="mb-1">Participantes</Text>
      <View className="flex-row flex-wrap mb-3">
        {PEOPLE.map((p) => (
          <Button
            key={p}
            title={`${participants.includes(p) ? "✓ " : ""}${p}`}
            onPress={() => toggleParticipant(p)}
          />
        ))}
      </View>

      <ImagePickerField value={receiptUri} onChange={setReceiptUri} />

      <View className="mt-4">
        <Button title="Guardar gasto" onPress={onSave} />
      </View>

      <View className="mt-2">
        <Button title="Cancelar" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
}
