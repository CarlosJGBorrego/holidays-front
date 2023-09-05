import { IGroup } from "./group";
import { IHoliday } from "./holiday";
import { IUser } from "./user";

export interface IUserGroup {
    id: number;
    isAdmin: boolean;
    users: IUser;
    groups: IGroup;
}
