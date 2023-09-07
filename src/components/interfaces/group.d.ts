import { IUser } from "./user";
import { IUserGroup } from "./userGroups";

export interface IGroup {
    id: number;
    name: string;
    users: IUser[];
    user_groups: IUserGroup[];
}
