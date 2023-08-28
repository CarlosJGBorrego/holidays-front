import Image from "next/image";
import { IUser } from "../interfaces/user";
interface Props {
    user: IUser;
}

export default function Avatar({ user }: Props) {
    if (!user?.photo) {
        return (
            <div className="flex justify-center items-center h-8 w-8 rounded-full bg-primary/50">
                <p className="font-bold text-white text-xl">{user?.username.charAt(0)}</p>
            </div>
        );
    }

    return (
        <Image
            src={user?.photo}
            alt={`Avatar de ${user?.username}`}
            width={26}
            height={26}
            className="rounded-full"
        />
    );
}
