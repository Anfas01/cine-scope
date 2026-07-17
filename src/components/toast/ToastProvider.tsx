"use client";

import Toast from "./Toast";
import { ToastContext } from "./ToastContext";
import { useRef, useState } from "react";
import type { Toast as ToastType } from "./types";

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);


  const showToast = (message: string) => {
    const id = crypto.randomUUID();

    const newToast = {
      id,
      title: message,
      isVisible: false,
    };

    // Add the toast in a hidden state
    setToasts((prev) => [...prev, newToast]);

    // On the next animation frame, make it visible
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id
            ? { ...toast, isVisible: true }
            : toast
        )
      );
    }, 10);

    // Start the timer to hide it after 3 seconds
    setTimeout(() => {
      // Trigger the exit animation
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id
            ? { ...toast, isVisible: false }
            : toast
        )
      );

      // Remove it after the animation finishes
      setTimeout(() => {
        setToasts((prev) =>
          prev.filter((toast) => toast.id !== id)
        );
      }, 300);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed top-20 sm:top-24 left-1/2 z-50 w-full max-w-7xl -translate-x-1/2 px-4 sm:px-6">
        <div className="flex flex-col items-end gap-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              title={toast.title}
              isVisible={toast.isVisible}
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;