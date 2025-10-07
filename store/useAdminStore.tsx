"use client";

import { create } from "zustand";

interface Admin {
  userId: string;
  email: string;
}

interface AdminState {
  admin: Admin | null;
  login: (admin: Admin) => void;
  logout: () => void;
}

// Create store with automatic initialization
export const useAdminStore = create<AdminState>((set) => {
  // Initialize admin from localStorage immediately
  const storedAdmin =
    typeof window !== "undefined" ? localStorage.getItem("admin") : null;
  const initialAdmin = storedAdmin ? JSON.parse(storedAdmin) : null;

  return {
    admin: initialAdmin,
    login: (admin) => {
      localStorage.setItem("admin", JSON.stringify(admin));
      set({ admin });
    },
    logout: () => {
      localStorage.removeItem("admin");
      set({ admin: null });
    },
  };
});
