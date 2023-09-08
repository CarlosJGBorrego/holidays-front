import { usePathname } from "next/navigation";
import { IGroup } from "../../interfaces/group";
import { IUser } from "../../interfaces/user";
import ActionsGroup from "./ActionsGroup";

interface Props {
    group: IGroup;
    idAdmin: number;
    me: IUser;
    dict: any;
    token: string;
}

type IObject = {
    letter: string;
    array: IUser[];
};

const lettersArray = [
    { letter: "A", array: [] },
    { letter: "B", array: [] },
    { letter: "C", array: [] },
    { letter: "D", array: [] },
    { letter: "E", array: [] },
    { letter: "F", array: [] },
    { letter: "G", array: [] },
    { letter: "H", array: [] },
    { letter: "I", array: [] },
    { letter: "J", array: [] },
    { letter: "K", array: [] },
    { letter: "L", array: [] },
    { letter: "M", array: [] },
    { letter: "N", array: [] },
    { letter: "Ñ", array: [] },
    { letter: "O", array: [] },
    { letter: "P", array: [] },
    { letter: "Q", array: [] },
    { letter: "R", array: [] },
    { letter: "S", array: [] },
    { letter: "T", array: [] },
    { letter: "U", array: [] },
    { letter: "V", array: [] },
    { letter: "W", array: [] },
    { letter: "X", array: [] },
    { letter: "Y", array: [] },
    { letter: "Z", array: [] },
];

export default function ContactBook({ group, idAdmin, me, dict, token }: Props) {
    const copyLettersArray = JSON.parse(JSON.stringify([...lettersArray]));
    const list: IObject[] = [];

    group?.users?.map((user: IUser) => {
        const foundObjectLetter: IObject = copyLettersArray.find((item: any) => {
            return item?.letter.toUpperCase() === user?.username?.charAt(0).toUpperCase();
        });

        if (foundObjectLetter) {
            if (list.find((item: IObject) => item?.letter === foundObjectLetter?.letter)) {
                const findList: IObject | undefined = list?.find(
                    (item) => item?.letter === foundObjectLetter?.letter
                );

                findList?.array?.push(user);
                findList?.array?.sort((a: IUser, b: IUser) =>
                    a?.username?.localeCompare(b.username)
                );
            } else {
                foundObjectLetter?.array?.push(user);
                list?.push(foundObjectLetter);
            }
        }
    });

    list?.sort((a: IObject, b: IObject) => a?.letter?.localeCompare(b?.letter));

    const path = usePathname();
    const isPathGroup = path.includes("/panel/group") ? true : false;

    const userAdmin = group?.users.find((user) => user.id === idAdmin);
    const iAmAdmin = me?.id === userAdmin?.id ? true : false;

    return (
        <div>
            {isPathGroup && (
                <ActionsGroup iAmAdmin={iAmAdmin} group={group} me={me} dict={dict} token={token} />
            )}
            <nav className="h-full overflow-y-auto" aria-label="Directory">
                {list.map((group) => (
                    <div key={group?.letter} className="relative">
                        <div className=" border-y border-b-gray-200 border-t-gray-100 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900">
                            <h3>{group?.letter}</h3>
                        </div>

                        <ul role="list" className="divide-y divide-gray-100">
                            {group?.array.map((person: IUser) => (
                                <li key={person?.email} className="flex gap-x-4 px-4 py-5">
                                    <img
                                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold leading-6 text-gray-900 capitalize">
                                            {person?.username}

                                            {idAdmin === person?.id && (
                                                <span className="pl-2 text-emerald-500 font-medium text-xs">
                                                    (Admin)
                                                </span>
                                            )}
                                        </p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                            {person?.email}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </div>
    );
}
