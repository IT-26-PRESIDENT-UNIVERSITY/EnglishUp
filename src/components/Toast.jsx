import { useEffect, useRef } from "react";
import { useStore } from "../store/useStore";

export default function Toast() {
  const { toast, clearToast } = useStore();
  const timerRef = useRef(null);

  useEffect(() => {
    if (toast) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        clearToast();
      }, 2800);
    }
    return () => clearTimeout(timerRef.current);
  }, [toast, clearToast]);

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-700 text-white px-6 py-3 rounded-full text-sm font-semibold whitespace-normal max-w-[90vw] text-center sm:whitespace-nowrap sm:max-w-none z-[9999] pointer-events-none shadow-lg transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        toast ? "translate-y-0" : "translate-y-[120px]"
      }`}
    >
      {toast}
    </div>
  );
}
