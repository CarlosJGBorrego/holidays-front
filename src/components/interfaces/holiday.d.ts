import { IUser } from "./user";

export interface IHoliday {
    start: Date;
    end: Date;
    user: IUser;
}
