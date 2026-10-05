import QuantityInput from "./QuantityInput";
import { formatCOP } from "../utils/formatters";

/**
 * CartItem — Fila de producto dentro del carrito.
 *
 * Props:
 *  - item           : { product: {...}, quantity: number }
 *  - onUpdateQty    : callback(productId, newQty, productName, stock)
 *  - onRemove       : callback(productId)
 *  - addToast       : callback para notificaciones
 */
export default function CartItem({ item, onUpdateQty, onRemove, addToast }) {
  const { product, quantity } = item;
  const subtotal = product.precio * quantity;

  const handleQuantityChange = (newVal) => {
    onUpdateQty(product.id, newVal, product.nombre, product.stock);
  };

  const handleMinReached = () => {
    // Caso de prueba #4 y #8: al intentar bajar de 1
    addToast(
      `Es la cantidad mínima. ¿Desea eliminar "${product.nombre}" del carrito?`,
      "action",
      "Eliminar",
      () => onRemove(product.id)
    );
  };

  const handleMaxReached = () => {
    addToast(
      `Este es el máximo de producto disponible en stock (${product.stock} unidades).`,
      "warning"
    );
  };

  return (
    <div className="cart-item" id={`cart-item-${product.id}`}>
      <div className="cart-item-info">
        <h3 className="cart-item-name">{product.nombre}</h3>
        <p className="cart-item-price">{formatCOP(product.precio)} c/u</p>
      </div>

      <QuantityInput
        value={quantity}
        min={1}
        max={product.stock}
        onChange={(newVal) => {
          if (typeof newVal === "number" && newVal >= 1 && newVal <= product.stock) {
            handleQuantityChange(newVal);
          } else if (newVal === "" || newVal === 0) {
            // Se maneja en onBlur o en onMinReached
          } else if (typeof newVal === "number" && newVal > product.stock) {
            onUpdateQty(product.id, product.stock, product.nombre, product.stock);
            handleMaxReached();
          }
        }}
        onMinReached={handleMinReached}
        onMaxReached={handleMaxReached}
      />

      <div className="cart-item-subtotal">
        <span className="subtotal-label">Subtotal:</span>
        <span className="subtotal-value">{formatCOP(subtotal)}</span>
      </div>

      <button
        className="btn-remove"
        onClick={() => onRemove(product.id)}
        aria-label={`Eliminar ${product.nombre} del carrito`}
        title="Eliminar del carrito"
      >
        🗑️
      </button>
    </div>
  );
}
