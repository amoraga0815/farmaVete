import React, { createContext, useContext, useState } from "react";

// Crea el contexto
const DataContext = createContext();

// Hook para usar el contexto
export const useDataContext = () => useContext(DataContext);

// Proveedor del contexto
export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user: { username, password }

  return (
    <DataContext.Provider value={{ user, setUser }}>
      {children}
    </DataContext.Provider>
  );
};
