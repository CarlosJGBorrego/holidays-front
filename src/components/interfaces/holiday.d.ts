import { IUser } from "./user";

export interface IHoliday {
    id: number;
    start: Date;
    end: Date;
    user: IUser;
}
