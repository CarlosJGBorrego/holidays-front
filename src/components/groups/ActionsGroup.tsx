import { ArrowLeftOnRectangleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

interface Props {
    isAdmin: boolean;
    dict: any;
}

export default function ActionsGroup({ isAdmin, dict }: Props) {
    return (
        <div
            className={`sticky top-0 w-full h-10 z-10 flex items-center space-x-6 px-2 bg-white border-b border-gray-200 ${
                isAdmin ? "justify-between" : "justify-end"
            }`}>
            {isAdmin && (
                <button
                    type="button"
                    className="flex items-center px-2 py-1 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900">
                    <PencilSquareIcon className="w-5 h-5" />
                    <span className="text-xs font-semibold pl-1"> {dict?.group?.edit}</span>
                </button>
            )}
            <button
                type="button"
                className="flex items-center px-2 py-1 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900">
                <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                <span className="text-xs font-semibold pl-1"> {dict?.group?.getOut}</span>
            </button>
        </div>
    );
}
