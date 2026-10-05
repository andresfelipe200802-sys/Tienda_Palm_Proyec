import ToastItem from "./ToastItem";

/**
 * Contenedor de Toasts — se posiciona fijo en la esquina inferior derecha.
 * Renderiza la lista de toasts apilados, con animación de entrada/salida.
 */
export default function ToastContainer({ toasts, onClose }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="alert" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}
