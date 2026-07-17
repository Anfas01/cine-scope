import { Check } from "lucide-react";

interface ToastProps {
  title: string;
  isVisible: boolean;
}

const Toast = ({ title, isVisible }: ToastProps) => {
  return (
    <div
      className={`fixed top-20 sm:top-24 left-1/2 z-50 w-full max-w-7xl -translate-x-1/2 px-4 sm:px-6 transition-all duration-300 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex justify-end">
        <div className="flex items-center gap-2 sm:gap-2.5 rounded-lg sm:rounded-xl border border-green-500/20 bg-black px-3 py-1.5 sm:px-4 sm:py-2 shadow-[0_0_10px_rgba(34,197,94,0.08)] sm:shadow-[0_0_12px_rgba(34,197,94,0.1)]">
          <div className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 items-center justify-center rounded-full bg-green-500">
            <Check
              size={7}
              className="stroke-[3] text-black sm:h-[9px] sm:w-[9px]"
            />
          </div>

          <p className="text-xs sm:text-sm font-medium tracking-tight text-green-400">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Toast;