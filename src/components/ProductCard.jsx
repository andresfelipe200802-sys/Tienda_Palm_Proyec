import { useState } from "react";
import QuantityInput from "./QuantityInput";
import { formatCOP } from "../utils/formatters";

/** Emojis de respaldo si la imagen del producto no carga. */
const EMOJI_FALLBACK = {
  1: "☕",
  2: "🍯",
  3: "🫓",
  4: "🍮",
  5: "🍧",
  6: "🍫",
};

/**
 * ProductCard — Tarjeta de producto individual del catálogo.
 *
 * Props:
 *  - product          : { id, nombre, precio, stock, imagen }
 *  - remainingStock   : stock disponible (stock total - en carrito)
 *  - onAddToCart       : callback(product, quantity)
 *  - addToast          : callback para emitir notificaciones
 */
export default function ProductCard({
  product,
  remainingStock,
  onAddToCart,
  addToast,
}) {
  const [quantity, setQuantity] = useState(1);
  const [imageFailed, setImageFailed] = useState(false);

  const isOutOfStock = remainingStock <= 0;
  const effectiveMax = Math.max(remainingStock, 1);
  const showImage = Boolean(product.imagen) && !imageFailed;

  const handleAdd = () => {
    if (isOutOfStock) return;

    const safeQty = Math.min(quantity, remainingStock);
    onAddToCart(product, safeQty);
    setQuantity(1); // Reset al agregar
  };

  const handleQuantityChange = (newVal) => {
    setQuantity(newVal);
  };

  const handleMinReached = () => {
    addToast(
      "La cantidad mínima es 1 unidad.",
      "warning"
    );
  };

  const handleMaxReached = () => {
    addToast(
      `Este es el máximo de producto disponible en stock (${remainingStock} unidades).`,
      "warning"
    );
  };

  return (
    <article className={`product-card ${isOutOfStock ? "out-of-stock" : ""}`} id={`product-${product.id}`}>
      {showImage ? (
        <div className="product-card-media">
          <img
            src={product.imagen}
            alt={product.nombre}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        </div>
      ) : (
        <div className="product-card-emoji" aria-hidden="true">
          {EMOJI_FALLBACK[product.id] ?? "🛒"}
        </div>
      )}

      <div className="product-card-body">
        <h2 className="product-name">{product.nombre}</h2>
        <p className="product-price">{formatCOP(product.precio)}</p>
        <p className={`product-stock ${isOutOfStock ? "stock-zero" : ""}`}>
          {isOutOfStock
            ? "Sin stock disponible"
            : `Stock disponible: ${remainingStock}`}
        </p>
      </div>

      <div className="product-card-footer">
        <QuantityInput
          value={quantity}
          min={1}
          max={effectiveMax}
          onChange={handleQuantityChange}
          onMinReached={handleMinReached}
          onMaxReached={handleMaxReached}
          disabled={isOutOfStock}
        />
        <button
          className="btn-add-to-cart"
          onClick={handleAdd}
          disabled={isOutOfStock}
          id={`btn-add-${product.id}`}
          aria-label={`Agregar ${product.nombre} al carrito`}
        >
          {isOutOfStock ? "Agotado" : "Agregar al carrito"}
        </button>
      </div>
    </article>
  );
}
