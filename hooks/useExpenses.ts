import { useContext } from "react";
import { ExpensesContext } from "../context/ExpensesContext";

export const useExpenses = () => useContext(ExpensesContext);
