// context/UserRolesContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface Role {
  id: string;
  name: string;
  description: string;
}

interface UserRolesContextType {
  roles: Role[] | null;
  setRoles: React.Dispatch<React.SetStateAction<Role[] | null>>;
}

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
    throw new Error('useUserRoles must be used within a UserRolesProvider');
  }
  return context;
};
