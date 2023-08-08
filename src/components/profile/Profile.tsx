"use client";

import DeleteAccount from "./components/DeleteAccount";
import Password from "./components/Password";
import PersonalInfo from "./components/PersonalInfo";

interface Props {
    dict: any;
    token: string;
}

export default function Profile({ dict, token }: Props) {
    return (
        <div className="divide-y divide-white/5 bg-white h-full">
            <PersonalInfo dict={dict} token={token} />
            <Password dict={dict} />
            <DeleteAccount dict={dict} />
        </div>
    );
}
