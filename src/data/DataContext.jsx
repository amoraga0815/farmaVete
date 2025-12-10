import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { API_URLS } from '../apiConfig';

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

  // Agrega producto al carrito (solo actualiza el estado local)
  const addToCartCalled = useRef(false);
  const addToCart = async (product, qty = 1) => {
    if (addToCartCalled.current) {
      addToCartCalled.current = false;
      return;
    }
    addToCartCalled.current = true;
    setCart(prev => {
      const idx = prev.findIndex(i => i.product.id === product.id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].qty += qty;
        return updated;
      }
      return [...prev, { product, qty }];
    });
    setTimeout(() => { addToCartCalled.current = false; }, 1000);
  };

  // Sincroniza el carrito local con la API cuando cambie
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!user) return;
    const syncCart = async () => {
      try {
        const total = cart.reduce((acc, item) => {
          const price = item.product.price ?? item.product.fromPrice ?? 0;
          return acc + price * item.qty;
        }, 0);
        let listCar = {
          userId: user.id,
          products: cart.map(i => ({ id: i.product.id, qty: i.qty })),
          total,
          paid: false
        };
        if (!cartId) {
          // Crear nueva ListCar
          const res = await fetch(API_URLS.listCar, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(listCar)
          });
          const data = await res.json();
          setCartId(data.id);
        } else {
          // Actualizar ListCar existente
          await fetch(`${API_URLS.listCar}/${cartId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(listCar)
          });
        }
      } catch (err) {
        console.error('Error sincronizando carrito:', err);
      }
    };
    syncCart();
    // eslint-disable-next-line
  }, [cart, user]);

  // Elimina producto del carrito (la sincronización la hace el useEffect)
  const removeFromCart = async (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Limpiar carrito (por ejemplo, tras pagar)
  const clearCart = () => {
    setCart([]);
    setCartId(null);
  };

  return (
    <DataContext.Provider value={{ user, setUser, cart, addToCart, removeFromCart, cartTotal, clearCart }}>
      {children}
    </DataContext.Provider>
  );
};
