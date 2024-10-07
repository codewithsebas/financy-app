import { Role, UserRolesContextType } from '@/types/userRolesContext';
import React, { createContext, useContext, useState } from 'react';

const UserRolesContext = createContext<UserRolesContextType | undefined>(undefined);

export const UserRolesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<Role[] | null>(null);
  
  return (
    <UserRolesContext.Provider value={{ roles, setRoles }}>
      {children}
    </UserRolesContext.Provider>
  );
};

export const useUserRoles = () => {
  const context = useContext(UserRolesContext);
  if (context === undefined) {
    throw new Error('useUserRoles debe utilizarse dentro de un UserRolesProvider');
  }
  return context;
};
