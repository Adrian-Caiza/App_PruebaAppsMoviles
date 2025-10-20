import React, { useState } from "react";
import { View, Text, FlatList, Image, Modal, TouchableOpacity } from "react-native";
import { useExpenses } from "../../hooks/useExpenses";

export default function RecibosScreen() {
  const { expenses } = useExpenses();
  const [selected, setSelected] = useState<any>(null);

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-3">Galería de Recibos</Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelected(item)} style={{ flex: 1 / 3, padding: 4 }}>
            <Image source={{ uri: item.receiptUri }} style={{ width: "100%", height: 100, borderRadius: 6 }} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => <Text className="text-gray-500">No hay recibos.</Text>}
      />

      <Modal visible={!!selected} animationType="slide" onRequestClose={() => setSelected(null)}>
        <View className="flex-1 p-4 bg-black">
          {selected && (
            <>
              <Image source={{ uri: selected.receiptUri }} style={{ width: "100%", height: 400, resizeMode: "contain" }} />
              <Text className="text-white text-lg font-semibold mt-3">{selected.title}</Text>
              <Text className="text-white">Monto: ${selected.amount.toFixed(2)}</Text>
              <Text className="text-white">Pagó: {selected.payer}</Text>
              <Text className="text-white">Participantes: {selected.participants.join(", ")}</Text>
              <TouchableOpacity onPress={() => setSelected(null)} className="mt-4">
                <Text className="text-teal-200">Cerrar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}
