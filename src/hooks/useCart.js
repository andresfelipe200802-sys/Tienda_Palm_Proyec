import { useState, useCallback, useEffect } from "react";

/**
 * Hook central de lógica de carrito de compras.
 *
 * Responsabilidades:
 *  - Estado del carrito (array de { product, quantity })
 *  - Persistencia en localStorage
 *  - Agregar, actualizar cantidad, eliminar
 *  - Cálculos derivados: totalUnits, totalPrice
 *  - Stock remanente por producto: stock - cantidadEnCarrito
 *  - Validaciones de tope máximo (stock) y mínimo (1)
 *
 * @param {Function} addToast – función del hook useToast para emitir notificaciones
 */

const STORAGE_KEY = "tienda_palmira_cart";

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Silenciar errores de cuota
  }
}

export function useCart(addToast) {
  const [cart, setCart] = useState(loadCart);

  // Persistir en localStorage cada vez que cambie el carrito
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  /**
   * Agrega un producto al carrito o incrementa su cantidad.
   * Valida que la cantidad total no supere el stock disponible.
   */
  const addToCart = useCallback(
    (product, quantity) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        const currentQty = existing ? existing.quantity : 0;
        const maxAvailable = product.stock - currentQty;

        if (maxAvailable <= 0) {
          addToast(
            `"${product.nombre}" ya tiene todo el stock disponible en el carrito.`,
            "warning"
          );
          return prev;
        }

        // Si la cantidad solicitada excede el remanente, autocorregir
        const qtyToAdd = Math.min(quantity, maxAvailable);

        if (qtyToAdd < quantity) {
          addToast(
            `Solo se pudieron agregar ${qtyToAdd} unidad(es) de "${product.nombre}". Es el máximo de producto disponible en stock.`,
            "warning"
          );
        } else {
          addToast(
            `"${product.nombre}" × ${qtyToAdd} agregado al carrito.`,
            "info"
          );
        }

        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + qtyToAdd }
              : item
          );
        }

        return [...prev, { product, quantity: qtyToAdd }];
      });
    },
    [addToast]
  );

  /**
   * Actualiza la cantidad de un producto en el carrito.
   * - Si newQty > stock → autocorrige al stock y muestra toast.
   * - Si newQty < 1 → no aplica, muestra toast de mínimo con opción de eliminar.
   */
  const updateQuantity = useCallback(
    (productId, newQty, productName, stock) => {
      if (newQty > stock) {
        addToast(
          `Este es el máximo de producto disponible en stock (${stock} unidades).`,
          "warning"
        );
        setCart((prev) =>
          prev.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: stock }
              : item
          )
        );
        return;
      }

      if (newQty < 1) {
        addToast(
          `Es la cantidad mínima. ¿Desea eliminar "${productName}" del carrito?`,
          "action",
          "Eliminar",
          () => removeFromCart(productId)
        );
        return;
      }

      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: newQty }
            : item
        )
      );
    },
    [addToast]
  );

  /**
   * Elimina un producto del carrito de forma directa.
   */
  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  /**
   * Calcula el stock remanente de un producto (stock total - en carrito).
   */
  const getRemainingStock = useCallback(
    (productId, totalStock) => {
      const item = cart.find((i) => i.product.id === productId);
      return totalStock - (item ? item.quantity : 0);
    },
    [cart]
  );

  // Totales derivados
  const totalUnits = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.precio * item.quantity,
    0
  );

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    getRemainingStock,
    totalUnits,
    totalPrice,
  };
}
