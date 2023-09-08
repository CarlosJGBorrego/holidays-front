import { IUser } from "@/components/interfaces/user";

interface Props {
    person: IUser;
    idAdmin: number;
    idUser: number;
    isEdit?: boolean;
}

export default function CardUser({ person, idAdmin, idUser, isEdit = false }: Props) {
    return (
        <li
            className={`flex gap-x-4 px-4 py-5 ${
                isEdit ? "border border-gray-400 rounded-md" : ""
            }`}>
            <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
            />
            <div className="min-w-0">
                <p className="text-sm font-semibold leading-6 text-gray-900 capitalize">
                    {person?.username}

                    {idAdmin === idUser && (
                        <span className="pl-2 text-emerald-500 font-medium text-xs">(Admin)</span>
                    )}
                </p>
                <p className="truncate text-xs leading-5 text-gray-500">{person?.email}</p>
            </div>
        </li>
    );
}
