import CartItem from "./CartItem";
import { formatCOP } from "../utils/formatters";

/**
 * CartDrawer — Panel lateral derecho (slide-over drawer) del carrito.
 *
 * Props:
 *  - isOpen         : boolean
 *  - onClose        : callback para cerrar
 *  - cart           : array de { product, quantity }
 *  - totalUnits     : número total de unidades
 *  - totalPrice     : precio total
 *  - onUpdateQty    : callback(productId, newQty, name, stock)
 *  - onRemove       : callback(productId)
 *  - addToast       : callback para notificaciones
 */
export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  totalUnits,
  totalPrice,
  onUpdateQty,
  onRemove,
  addToast,
}) {
  return (
    <>
      {/* Overlay / Backdrop */}
      <div
        className={`cart-overlay ${isOpen ? "cart-overlay-visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer ${isOpen ? "cart-drawer-open" : ""}`}
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        {/* Header del carrito */}
        <div className="cart-header">
          <h2 className="cart-title">
            🛒 Mi Carrito
            {totalUnits > 0 && (
              <span className="cart-header-count">({totalUnits})</span>
            )}
          </h2>
          <button
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Cerrar carrito"
            id="btn-close-cart"
          >
            ✕
          </button>
        </div>

        {/* Cuerpo del carrito */}
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-icon" aria-hidden="true">🛒</span>
              <p>Tu carrito está vacío</p>
              <p className="cart-empty-hint">
                Agrega productos desde el catálogo
              </p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onUpdateQty={onUpdateQty}
                  onRemove={onRemove}
                  addToast={addToast}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer del carrito con totales */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">
                Total ({totalUnits} {totalUnits === 1 ? "unidad" : "unidades"}):
              </span>
              <span className="cart-total-price">{formatCOP(totalPrice)}</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
