import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // [{product, qty}]
  const [cartId, setCartId] = useState(null); // id de ListCar en backend

  // Calcula el total del carrito
  const cartTotal = cart.reduce((acc, item) => {
    const price = item.product.price ?? item.product.fromPrice ?? 0;
    return acc + price * item.qty;
  }, 0);

  // Agrega producto al carrito y sincroniza con API
  const addToCart = async (product, qty = 1) => {
    let newCart;
    setCart(prev => {
      const idx = prev.findIndex(i => i.product.id === product.id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].qty += qty;
        newCart = updated;
        return updated;
      }
      newCart = [...prev, { product, qty }];
      return newCart;
    });

    // Espera a que el estado se actualice antes de sincronizar con la API
    setTimeout(async () => {
      try {
        if (!user) return;
        // Si newCart no está definido (por la naturaleza async de setState), usa el cart + producto actual
        const currentCart = newCart || [...cart];
        if (!newCart) {
          const idx = cart.findIndex(i => i.product.id === product.id);
          if (idx !== -1) {
            currentCart[idx].qty += qty;
          } else {
            currentCart.push({ product, qty });
          }
        }
        const total = currentCart.reduce((acc, item) => {
          const price = item.product.price ?? item.product.fromPrice ?? 0;
          return acc + price * item.qty;
        }, 0);
        let listCar = {
          userId: user.id,
          products: currentCart.map(i => ({ id: i.product.id, qty: i.qty })),
          total,
          paid: false
        };
        if (!cartId) {
          // Crear nueva ListCar
          const res = await fetch('http://localhost:4000/ListCar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(listCar)
          });
          const data = await res.json();
          setCartId(data.id);
        } else {
          // Actualizar ListCar existente
          await fetch(`http://localhost:4000/ListCar/${cartId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(listCar)
          });
        }
      } catch (err) {
        console.error('Error sincronizando carrito:', err);
      }
    }, 0);
  };

  // Limpiar carrito (por ejemplo, tras pagar)
  const clearCart = () => {
    setCart([]);
    setCartId(null);
  };

  return (
    <DataContext.Provider value={{ user, setUser, cart, addToCart, cartTotal, clearCart }}>
      {children}
    </DataContext.Provider>
  );
};
