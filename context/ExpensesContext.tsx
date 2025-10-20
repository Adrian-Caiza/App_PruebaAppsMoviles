import React, { createContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Expense } from "../types";

type ContextType = {
  expenses: Expense[];
  addExpense: (e: Omit<Expense, "id" | "date">) => Promise<void>;
  removeExpense: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
};

export const ExpensesContext = createContext<ContextType>({
  expenses: [],
  addExpense: async () => {},
  removeExpense: async () => {},
  refresh: async () => {}
});

const STORAGE_KEY = "@cvapp_expenses_v1";

export const ExpensesProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const load = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) setExpenses(JSON.parse(raw));
    } catch (err) {
      console.error("Error load expenses", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const persist = async (list: Expense[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.error("Error saving expenses", err);
    }
  };

  const addExpense = async (e: Omit<Expense, "id" | "date">) => {
    const newExp: Expense = {
      ...e,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    const updated = [newExp, ...expenses];
    setExpenses(updated);
    await persist(updated);
  };

  const removeExpense = async (id: string) => {
    const updated = expenses.filter((x) => x.id !== id);
    setExpenses(updated);
    await persist(updated);
  };

  const refresh = async () => await load();

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, removeExpense, refresh }}>
      {children}
    </ExpensesContext.Provider>
  );
};
