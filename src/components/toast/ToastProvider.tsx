"use client";

import Toast from "./Toast";
import { ToastContext } from "./ToastContext";
import { useEffect, useRef, useState } from "react";
import type { Toast as ToastType } from "./types";

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const timeoutIds = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const scheduledTimeouts = timeoutIds.current;

    return () => {
      scheduledTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, []);

  const scheduleTimeout = (callback: () => void, delay: number) => {
    const timeoutId = setTimeout(() => {
      timeoutIds.current.delete(timeoutId);
      callback();
    }, delay);

    timeoutIds.current.add(timeoutId);
  };

  const showToast = (message: string) => {
    const id = crypto.randomUUID();

    const newToast = {
      id,
      title: message,
      isVisible: false,
    };

    setToasts((prev) => [...prev, newToast]);

    scheduleTimeout(() => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id
            ? { ...toast, isVisible: true }
            : toast
        )
      );
    }, 10);

    scheduleTimeout(() => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id
            ? { ...toast, isVisible: false }
            : toast
        )
      );

      scheduleTimeout(() => {
        setToasts((prev) =>
          prev.filter((toast) => toast.id !== id)
        );
      }, 300);
    }, 1500);
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
