/**
 * Formateador de moneda colombiana (COP).
 * Usa Intl.NumberFormat para garantizar separadores de miles con punto
 * y el símbolo $ al inicio, sin decimales.
 *
 * Ejemplo: formatCOP(28500) → "$28.500"
 */
const formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatCOP(value) {
  return formatter.format(value);
}
