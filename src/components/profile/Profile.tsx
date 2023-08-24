"use client";

import { IUser } from "../interfaces/user";
import DeleteAccount from "./components/DeleteAccount";
import Password from "./components/Password";
import PersonalInfo from "./components/PersonalInfo";

interface Props {
    dict: any;
    token: string;
    user: IUser;
}

export default function Profile({ dict, token, user }: Props) {
    return (
        <div className="divide-y divide-white/5 bg-white h-full">
            <PersonalInfo dict={dict} token={token} user={user} />
            <Password dict={dict} token={token} />
            <DeleteAccount dict={dict} />
        </div>
    );
}
