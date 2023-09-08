import { IUser } from "./user";
import { IUserGroup } from "./userGroups";

export interface IGroup {
    id: number;
    name: string;
    users: IUser[];
    user_groups: IUserGroup[];
    createdAt: Date;
}

export interface IObjectUserData {
    id: number;
    attributes: IUser;
}

export interface IGroupExtend {
    id: number;
    name: string;
    users: {
        data: IObjectData[];
    };
    user_groups: IUserGroup[];
    createdAt: Date;
}
