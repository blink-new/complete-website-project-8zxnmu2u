import React, { createContext, useContext } from 'react';
import { useAuth as useAuthHook } from '../hooks/use-auth';

const AuthContext = createContext<ReturnType<typeof useAuthHook> | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthHook();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Créer un hook personnalisé dans un fichier séparé pour éviter l'erreur fast refresh
export { useAuth } from '../hooks/use-auth';