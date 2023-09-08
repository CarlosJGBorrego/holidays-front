import { ArrowLeftOnRectangleIcon, UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import ModalTransferRole from "./ModalTransferAdmin";
import { IGroupExtend } from "@/components/interfaces/group";
import { IUser } from "@/components/interfaces/user";

interface Props {
    group: IGroupExtend;
    me: IUser;
    dict: any;
    token: string;
}

export default function ActionsEditGroup({ group, me, dict, token }: Props) {
    return (
        <>
            <div className="mt-8 flex items-center text-xs space-x-6">
                <button
                    type="button"
                    className="flex items-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded-md">
                    <UserPlusIcon className="w-6 h-6" />
                    <span className="pl-2 font-medium">Agregar usuario</span>
                </button>
                <button
                    type="button"
                    className="flex items-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded-md">
                    <UserMinusIcon className="w-6 h-6" />
                    <span className="pl-2 font-medium">Eliminar usuario</span>
                </button>
                <ModalTransferRole group={group} me={me} dict={dict} token={token} />
                <button
                    type="button"
                    className="flex items-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded-md">
                    <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                    <span className="pl-2 font-medium">Eliminar grupo</span>
                </button>
            </div>
        </>
    );
}
