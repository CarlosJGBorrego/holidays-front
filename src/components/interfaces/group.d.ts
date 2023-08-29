import { IUser } from "./user";

export interface IGroup {
    id: number;
    name: string;
    users: IUser[];
}
