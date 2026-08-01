import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProviders({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProviders');
  }
  return context;
}
