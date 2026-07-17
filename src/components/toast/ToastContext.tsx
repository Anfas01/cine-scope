"use client";

import { createContext } from "react";

interface ToastContextType {
  showToast: (title: string) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);