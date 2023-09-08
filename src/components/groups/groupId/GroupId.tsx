"use client";

import { useEffect } from "react";
import { IGroupExtend, IObjectUserData } from "../../interfaces/group";
import CardUser from "../components/CardUser";
import ActionsEditGroup from "./components/ActionsEditGroup";
import EditNameGroup from "./components/EditNameGroup";
import { IUser } from "@/components/interfaces/user";
import { usePathname, useRouter } from "next/navigation";
interface Props {
    data: {
        attributes: IGroupExtend;
        id: number;
    };
    me: IUser;
    idAdmin: number;
    dict: any;
    token: string;
}

export default function GroupId({ data, me, idAdmin, dict, token }: Props) {
    const dateCreateGroup = new Date(data?.attributes?.createdAt).toLocaleDateString();
    const path = usePathname();
    const router = useRouter();

    if (me?.id !== idAdmin) {
        router?.push(path.substring(0, 15));
    } else {
        return (
            <>
                <EditNameGroup name={data?.attributes?.name} dateCreateGroup={dateCreateGroup} />
                <ActionsEditGroup group={data?.attributes} me={me} dict={dict} token={token} />
                <div className="mt-8">
                    <h3 className="text-sm font-semibold">Miembros</h3>
                    <ul className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
                        {data?.attributes?.users?.data?.map((item: IObjectUserData) => {
                            return (
                                <CardUser
                                    key={item?.id}
                                    person={item?.attributes}
                                    idAdmin={idAdmin}
                                    isEdit={true}
                                    idUser={item?.id}
                                />
                            );
                        })}
                    </ul>
                </div>
            </>
        );
    }
}
