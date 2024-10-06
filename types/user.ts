export interface UsersData {
    users: User[];
}
export interface User {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    role: string;
}