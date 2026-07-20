import { useEffect } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

export default function Toast({ toast, onClose, onAction }) {
  useEffect(() => {
    if (!toast) return;
    const duration = toast.duration ?? 3500;
    if (duration <= 0) return;

    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const isConfirm = toast.type === "confirm";
  const isSuccess = toast.type === "success";

  return (
    <div
      className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-md animate-in slide-in-from-top-4 fade-in duration-300 min-w-[280px] max-w-sm
        ${isConfirm
          ? "bg-white/98 border-amber-200 text-slate-800"
          : isSuccess
          ? "bg-white/95 border-emerald-200 text-slate-800"
          : "bg-white/95 border-red-200 text-slate-800"
        }`}
    >
      {isConfirm
        ? <XCircle className="text-amber-500 shrink-0" size={22} />
        : isSuccess
        ? <CheckCircle2 className="text-emerald-500 shrink-0" size={22} />
        : <XCircle className="text-red-500 shrink-0" size={22} />
      }
      <div className="flex-1">
        <p className="text-sm font-semibold">{toast.message}</p>
        {Array.isArray(toast.actions) && toast.actions.length > 0 && (
          <div className="mt-3 flex items-center justify-end gap-2">
            {toast.actions.map((action) => (
              <button
                key={action.value}
                onClick={() => onAction?.(action.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  action.variant === "danger"
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {!toast.actions?.length && (
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
