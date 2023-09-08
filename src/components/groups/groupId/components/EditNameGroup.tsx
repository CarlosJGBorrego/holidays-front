import { PencilSquareIcon } from "@heroicons/react/24/outline";

interface Props {
    name: string;
    dateCreateGroup: string;
}

export default function EditNameGroup({ name, dateCreateGroup }: Props) {
    return (
        <>
            <div className="flex items-center space-x-4">
                <h1 className="text-3xl font-bold">{name}</h1>
                <button
                    type="button"
                    className="px-2 py-1 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-200">
                    <PencilSquareIcon className="w-6 h-6 " />
                </button>
            </div>
            <h4 className="mt-2 text-xs text-gray-500">Fecha de creación {dateCreateGroup}</h4>
        </>
    );
}
