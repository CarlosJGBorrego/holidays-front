export interface IUser {
    id: number;
    username: string;
    email: string;
    photo?: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}
