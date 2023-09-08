import { IUserGroup } from "../interfaces/userGroups";

export const getIdAdmin = (admins: IUserGroup[], idGroup: number) => {
    const idAdminUser = admins?.find((userGroup: IUserGroup) => userGroup?.groups?.id === idGroup)
        ?.users?.id;

    return idAdminUser!;
};
