export interface Role {
    id: string;
    name: string;
    description: string;
}
  
export interface UserRolesContextType {
    roles: Role[] | null;
    setRoles: React.Dispatch<React.SetStateAction<Role[] | null>>;
}