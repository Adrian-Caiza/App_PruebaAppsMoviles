export type Person = "Juan" | "María" | "Pedro";

export type Expense = {
  id: string;
  title: string;
  amount: number;
  payer: Person;
  participants: Person[]; 
  date: string; 
  receiptUri: string; 
};

