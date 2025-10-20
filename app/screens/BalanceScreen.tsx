import React, { useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { useExpenses } from "../../hooks/useExpenses";
import { PEOPLE } from "../../constants/people";


type Debt = { from: string; to: string; amount: number };

export default function BalanceScreen() {
  const { expenses } = useExpenses();

  const { sums, avg, debts } = useMemo(() => {
    const sumsMap: Record<string, number> = { Juan: 0, "María": 0, Pedro: 0 };

    
    expenses.forEach((ex) => {
      
      sumsMap[ex.payer] = (sumsMap[ex.payer] || 0) + ex.amount;
    });

    
    const contributionAcc: Record<string, number> = { Juan: 0, "María": 0, Pedro: 0 };
    let totalShares = 0;
    expenses.forEach((ex) => {
      const share = ex.amount / ex.participants.length;
      ex.participants.forEach((p) => {
        contributionAcc[p] = (contributionAcc[p] || 0) + share;
      });
      totalShares += ex.amount;
    });

    
    const avgVal = totalShares / PEOPLE.length;

    
    const balances: { person: string; bal: number }[] = PEOPLE.map((p) => ({
      person: p,
      bal: Number(((sumsMap[p] || 0) - avgVal).toFixed(2))
    }));

    const debtList: Debt[] = [];
    
    let creditors = balances.filter((b) => b.bal > 0).map((b) => ({ ...b }));
    let debtors = balances.filter((b) => b.bal < 0).map((b) => ({ ...b }));

    
    creditors = creditors.map((c) => ({ person: c.person, bal: c.bal }));
    debtors = debtors.map((d) => ({ person: d.person, bal: -d.bal })); 
    let i = 0,
      j = 0;
    while (i < debtors.length && j < creditors.length) {
      const owe = debtors[i].bal;
      const owed = creditors[j].bal;
      const pay = Math.min(owe, owed);

      debtList.push({
        from: debtors[i].person,
        to: creditors[j].person,
        amount: Number(pay.toFixed(2))
      });

      debtors[i].bal -= pay;
      creditors[j].bal -= pay;

      if (Math.abs(debtors[i].bal) < 0.01) i++;
      if (Math.abs(creditors[j].bal) < 0.01) j++;
    }

    return { sums: sumsMap, avg: Number(avgVal.toFixed(2)), debts: debtList };
  }, [expenses]);

  return (
    <View className="flex-1 p-4 bg-gray-50">
      <Text className="text-2xl font-bold mb-4">Balances</Text>

      <Text className="font-semibold">Resumen gastado por persona:</Text>
      {Object.entries(sums).map(([k, v]) => (
        <Text key={k} className="text-gray-700">{`${k}: $${v.toFixed(2)}`}</Text>
      ))}

      <Text className="mt-3">Promedio que debería pagar cada uno: <Text className="font-semibold">${avg.toFixed(2)}</Text></Text>

      <Text className="mt-4 font-semibold">Deudas:</Text>
      {debts.length ? (
        debts.map((d, idx) => (
          <Text key={idx}>{`${d.from} debe a ${d.to} $${d.amount.toFixed(2)}`}</Text>
        ))
      ) : (
        <Text className="text-gray-500">No hay deudas. Todo está balanceado.</Text>
      )}
    </View>
  );
}
