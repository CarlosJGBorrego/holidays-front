"use client";

import { IGroup } from "../interfaces/group";
import { IUserGroup } from "../interfaces/userGroups";
import Group from "./Group";

interface Props {
    groups: IGroup[];
    dict: any;
    admins: IUserGroup[];
}

export default function ListGroups({ groups, dict, admins }: Props) {
    const getIdAdmin = (idGroup: number) => {
        const idAdminUser = admins?.find(
            (userGroup: IUserGroup) => userGroup?.groups?.id === idGroup
        )?.users?.id;

        return idAdminUser!;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {groups?.map((group: IGroup) => {
                return (
                    <Group
                        key={group?.id}
                        dict={dict}
                        group={group}
                        idAdmin={getIdAdmin(group?.id)}
                    />
                );
            })}
        </div>
    );
}
