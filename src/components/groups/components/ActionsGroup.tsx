import { ArrowLeftOnRectangleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ModalGetOut from "./ModalGetOut";
import { IGroup } from "../../interfaces/group";
import { IUser } from "../../interfaces/user";
import { useRouter, usePathname } from "next/navigation";

interface Props {
    dict: any;
    token: string;
    group: IGroup;
    iAmAdmin: boolean;
    me: IUser;
}

export default function ActionsGroup({ iAmAdmin, group, me, dict, token }: Props) {
    const [openModalGetOut, setOpenModalGetOut] = useState(false);
    const router = useRouter();
    const path = usePathname();

    const handleGroupIdRedirect = (groupId: number) => {
        router.push(`${path}/${groupId}`);
    };

    return (
        <div
            className={`sticky top-0 w-full h-10 z-10 flex items-center space-x-6 px-2 bg-white border-b border-gray-200 ${
                iAmAdmin ? "justify-between" : "justify-end"
            }`}>
            {iAmAdmin && (
                <button
                    type="button"
                    onClick={() => handleGroupIdRedirect(group?.id)}
                    className="flex items-center px-2 py-1 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900">
                    <PencilSquareIcon className="w-5 h-5" />
                    <span className="text-xs font-semibold pl-1"> {dict?.group?.edit}</span>
                </button>
            )}
            <button
                type="button"
                onClick={() => setOpenModalGetOut(true)}
                className="flex items-center px-2 py-1 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900">
                <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                <span className="text-xs font-semibold pl-1"> {dict?.group?.getOut}</span>
            </button>
            {openModalGetOut && (
                <ModalGetOut
                    open={openModalGetOut}
                    setOpen={setOpenModalGetOut}
                    dict={dict}
                    token={token}
                    group={group}
                    iAmAdmin={iAmAdmin}
                    me={me}
                />
            )}
        </div>
    );
}
