import { useState, useCallback, useRef } from "react";

/**
 * Hook para sistema de notificaciones Toast.
 *
 * Soporta tres tipos de toast:
 *  - "info"    → informativo (azul/verde)
 *  - "warning" → advertencia (amarillo/naranja)
 *  - "action"  → con botón interactivo de confirmación (rojo)
 *
 * Cada toast se auto-descarta tras 3500ms y permite cierre manual con ✕.
 */

let toastIdCounter = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  const removeToast = useCallback((id) => {
    // Limpiar el timer si existe
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = "info", actionLabel = null, onAction = null) => {
      const id = ++toastIdCounter;

      const toast = {
        id,
        message,
        type,          // "info" | "warning" | "action"
        actionLabel,   // Texto del botón, ej: "Eliminar"
        onAction,      // Callback cuando se presiona el botón de acción
      };

      setToasts((prev) => [...prev, toast]);

      // Auto-descarte tras 3.5 segundos
      timersRef.current[id] = setTimeout(() => {
        removeToast(id);
      }, 3500);

      return id;
    },
    [removeToast]
  );

  return { toasts, addToast, removeToast };
}
