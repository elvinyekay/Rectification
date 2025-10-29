export type Role = 'admin' | 'operator' | 'supervisor';

export interface User {
    id: string;
    name: string;
    role: Role;
    email: string;
    password: string;
}
