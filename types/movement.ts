import { User } from "./user";

export interface Movement {
    id: string;
    amount: number;
    concept: string;
    date: string;
    user: User;
}