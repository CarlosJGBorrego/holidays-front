import { IGroup } from "./group";
import { IHoliday } from "./holiday";

export interface IUser {
    id: number;
    username: string;
    email: string;
    photo?: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    groups?: IGroup[];
    holidays?: IHoliday[];
    createdAt: Date;
    updatedAt: Date;
}
