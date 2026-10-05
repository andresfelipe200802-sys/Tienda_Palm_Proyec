import ProductCard from "./ProductCard";

/**
 * ProductList — Grid responsive de tarjetas de producto.
 *
 * Props:
 *  - products         : array de productos
 *  - getRemainingStock : function(productId, totalStock) → remaining
 *  - onAddToCart       : callback(product, quantity)
 *  - addToast          : callback para emitir toasts
 */
export default function ProductList({
  products,
  getRemainingStock,
  onAddToCart,
  addToast,
}) {
  return (
    <section className="product-list" id="product-list" aria-label="Catálogo de productos">
      <h2 className="section-title">Nuestros Productos</h2>
      <p className="section-subtitle">Productos regionales del Valle del Cauca 🌿</p>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            remainingStock={getRemainingStock(product.id, product.stock)}
            onAddToCart={onAddToCart}
            addToast={addToast}
          />
        ))}
      </div>
    </section>
  );
}
