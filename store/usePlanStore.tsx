"use client";

import { create } from "zustand";

interface Plan {
  name: string;
  deposit: string;
  investment_range: string;
  dailyReturn: number;
  totalReturn: number;
  minInvestment: number;
  maxInvestment: number;
  duration: number;
}

interface PlanState {
  selectedPlan: Plan | null;
  selectedCoin: string | null;
  totalAmount: string | null;
  setPlan: (payload: { plan: Plan; coin: string } | null) => void;
  setTotalAmount: (amount: string) => void;
}

export const usePlanStore = create<PlanState>((set) => {
  const storedSelectedPlan =
    typeof window !== "undefined" ? localStorage.getItem("selectedPlan") : null;
  const storedSelectedCoin =
    typeof window !== "undefined" ? localStorage.getItem("selectedCoin") : null;
  const storedTotalAmount =
    typeof window !== "undefined" ? localStorage.getItem("totalAmount") : null;

  return {
    selectedPlan: storedSelectedPlan ? JSON.parse(storedSelectedPlan) : null,
    selectedCoin: storedSelectedCoin || null,
    totalAmount: storedTotalAmount || null,
    setPlan: (payload) => {
      if (payload) {
        const { plan, coin } = payload;
        set({ selectedPlan: plan, selectedCoin: coin });
        localStorage.setItem("selectedPlan", JSON.stringify(plan));
        localStorage.setItem("selectedCoin", coin);
      } else {
        set({ selectedPlan: null, selectedCoin: null });
        localStorage.removeItem("selectedPlan");
        localStorage.removeItem("selectedCoin");
      }
    },
    setTotalAmount: (amount) => {
      set({ totalAmount: amount });
      localStorage.setItem("totalAmount", amount);
    },
  };
});
