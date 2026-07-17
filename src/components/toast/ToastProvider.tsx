"use client";

import Toast from "./Toast";
import { ToastContext } from "./ToastContext";
import { useRef, useState } from "react";

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (message: string) => {
    setTitle(message);
    setIsVisible(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Toast
        title={title}
        isVisible={isVisible}
      />
    </ToastContext.Provider>
  );
};

export default ToastProvider;