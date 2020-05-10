export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    programs: any[];
    password_confirmation: string;
    role: number;
    create_at: Date;
    modified_at: Date;
}