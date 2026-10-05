import { useRef } from "react";

/**
 * QuantityInput — Input blindado y reutilizable de cantidad numérica.
 *
 * Validaciones implementadas:
 *  1. onKeyDown  → Bloquea teclas: e, E, +, -, ., ,
 *  2. onPaste    → Bloquea texto pegado no numérico o ≤ 0
 *  3. onWheel    → Desenfoca el input para anular cambio por scroll
 *  4. onChange   → Solo acepta dígitos, valida contra min (1) y max (stock)
 *  5. onBlur     → Si quedó vacío o inválido, restaura al valor previo seguro
 *
 * Props:
 *  - value     : número actual
 *  - min       : mínimo permitido (default 1)
 *  - max       : máximo permitido (stock)
 *  - onChange   : callback(newValue: number)
 *  - onMinReached : callback cuando se intenta ir por debajo del mínimo
 *  - onMaxReached : callback cuando se intenta exceder el máximo
 *  - disabled  : deshabilitar controles
 */

// Teclas prohibidas según la rúbrica
const BLOCKED_KEYS = ["e", "E", "+", "-", ".", ","];

export default function QuantityInput({
  value,
  min = 1,
  max,
  onChange,
  onMinReached,
  onMaxReached,
  disabled = false,
}) {
  const lastValidRef = useRef(value);

  // Guardar el último valor válido cada vez que value cambie
  if (value >= min && value <= max) {
    lastValidRef.current = value;
  }

  /** 1. Bloquear teclas prohibidas */
  const handleKeyDown = (e) => {
    if (BLOCKED_KEYS.includes(e.key)) {
      e.preventDefault();
    }
  };

  /** 2. Bloquear pegado de valores no numéricos */
  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData("text");
    // Solo dígitos, sin ceros a la izquierda sueltos, y valor > 0
    if (!/^\d+$/.test(pastedText) || parseInt(pastedText, 10) < 1) {
      e.preventDefault();
    }
  };

  /** 3. Desactivar cambio de valor por rueda del ratón */
  const handleWheel = (e) => {
    e.target.blur();
  };

  /** 4. Manejar el cambio de valor con validación */
  const handleChange = (e) => {
    const raw = e.target.value;

    // Permitir vaciar el campo temporalmente (el onBlur corregirá)
    if (raw === "") {
      onChange("");
      return;
    }

    // Filtrar solo dígitos
    const cleaned = raw.replace(/\D/g, "");
    if (cleaned === "") return;

    const num = parseInt(cleaned, 10);

    // No permitir cero
    if (num === 0) {
      onMinReached?.();
      return;
    }

    if (num > max) {
      onChange(max);
      onMaxReached?.();
      return;
    }

    onChange(num);
  };

  /** 5. Corregir al perder foco si el valor quedó inválido */
  const handleBlur = (e) => {
    const raw = e.target.value;
    if (raw === "" || parseInt(raw, 10) < min) {
      onChange(lastValidRef.current);
    }
  };

  /** Botones + / - */
  const increment = () => {
    if (value >= max) {
      onMaxReached?.();
      return;
    }
    onChange(value + 1);
  };

  const decrement = () => {
    if (value <= min) {
      onMinReached?.();
      return;
    }
    onChange(value - 1);
  };

  return (
    <div className="quantity-input">
      <button
        className="qty-btn qty-btn-minus"
        onClick={decrement}
        disabled={disabled}
        aria-label="Reducir cantidad"
        type="button"
      >
        −
      </button>
      <input
        type="number"
        className="qty-field"
        value={value}
        min={min}
        max={max}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onWheel={handleWheel}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        aria-label="Cantidad"
      />
      <button
        className="qty-btn qty-btn-plus"
        onClick={increment}
        disabled={disabled}
        aria-label="Aumentar cantidad"
        type="button"
      >
        +
      </button>
    </div>
  );
}
