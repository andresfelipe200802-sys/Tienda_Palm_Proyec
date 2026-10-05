/**
 * ToastItem — notificación individual.
 *
 * Props:
 *  - toast.id, toast.message, toast.type ("info" | "warning" | "action")
 *  - toast.actionLabel (string | null) — texto del botón de acción
 *  - toast.onAction (function | null) — callback del botón de acción
 *  - onClose(id) — cerrar este toast
 */
export default function ToastItem({ toast, onClose }) {
  const handleAction = () => {
    if (toast.onAction) toast.onAction();
    onClose(toast.id);
  };

  return (
    <div className={`toast-item toast-${toast.type}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {toast.type === "info" && "✓"}
          {toast.type === "warning" && "⚠"}
          {toast.type === "action" && "⚠"}
        </span>
        <p className="toast-message">{toast.message}</p>
      </div>

      <div className="toast-actions">
        {toast.actionLabel && toast.onAction && (
          <button
            className="toast-action-btn"
            onClick={handleAction}
            aria-label={toast.actionLabel}
          >
            {toast.actionLabel}
          </button>
        )}
        <button
          className="toast-close-btn"
          onClick={() => onClose(toast.id)}
          aria-label="Cerrar notificación"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
