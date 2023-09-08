"use client";

import { IGroup } from "../interfaces/group";
import { IUser } from "../interfaces/user";
import { IUserGroup } from "../interfaces/userGroups";
import { getIdAdmin } from "../utils/getIdAdmin";
import Group from "./Group";

interface Props {
    groups: IGroup[];
    dict: any;
    admins: IUserGroup[];
    me: IUser;
    token: string;
}

export default function ListGroups({ groups, dict, admins, me, token }: Props) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {groups?.map((group: IGroup) => {
                return (
                    <Group
                        key={group?.id}
                        dict={dict}
                        group={group}
                        idAdmin={getIdAdmin(admins, group?.id)}
                        me={me}
                        token={token}
                    />
                );
            })}
        </div>
    );
}
