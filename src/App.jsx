import { useState } from "react";
import productos from "./data/productos";
import { useToast } from "./hooks/useToast";
import { useCart } from "./hooks/useCart";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import CartDrawer from "./components/CartDrawer";
import ToastContainer from "./components/toast/ToastContainer";

/**
 * App — Componente raíz orquestador.
 *
 * Solo gestiona:
 *  - El estado de visibilidad del carrito (isCartOpen)
 *  - La conexión entre hooks (useToast, useCart) y componentes
 *
 * Toda la lógica de negocio vive en useCart.js.
 * Toda la lógica de notificaciones vive en useToast.js.
 */
export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { toasts, addToast, removeToast } = useToast();
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    getRemainingStock,
    totalUnits,
    totalPrice,
  } = useCart(addToast);

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const closeCart = () => setIsCartOpen(false);

  return (
    <div className="app">
      <Navbar totalUnits={totalUnits} onCartClick={toggleCart} />

      <main className="main-content">
        <ProductList
          products={productos}
          getRemainingStock={getRemainingStock}
          onAddToCart={addToCart}
          addToast={addToast}
        />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        cart={cart}
        totalUnits={totalUnits}
        totalPrice={totalPrice}
        onUpdateQty={updateQuantity}
        onRemove={removeFromCart}
        addToast={addToast}
      />

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
