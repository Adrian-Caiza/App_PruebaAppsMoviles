import React from "react";
import { View, Text, Button, Alert } from "react-native";
import * as Print from "expo-print";
import { useExpenses } from "../../hooks/useExpenses";

export default function ReporteScreen() {
  const { expenses } = useExpenses();

  const generateHtml = () => {
    const rows = expenses
      .map(
        (e) =>
          `<tr><td>${new Date(e.date).toLocaleDateString()}</td><td>${e.title}</td><td>${e.payer}</td><td>$${e.amount.toFixed(2)}</td></tr>`
      )
      .join("");
    const total = expenses.reduce((s, e) => s + e.amount, 0).toFixed(2);

    return `
      <html>
        <body>
          <h1>Reporte de Gastos</h1>
          <table border="1" cellpadding="8" cellspacing="0">
            <thead><tr><th>Fecha</th><th>Descripción</th><th>Pagador</th><th>Monto</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
          <p>Total: $${total}</p>
        </body>
      </html>
    `;
  };

  const onGenerate = async () => {
    try {
      const html = generateHtml();
      const { uri } = await Print.printToFileAsync({ html });
      Alert.alert("PDF generado", `Archivo: ${uri}`);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo generar el PDF.");
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold mb-4">Reporte</Text>
      <Button title="Generar PDF" onPress={onGenerate} />
      <Text className="mt-3">Resumen: {expenses.length} gastos registrados.</Text>
    </View>
  );
}
