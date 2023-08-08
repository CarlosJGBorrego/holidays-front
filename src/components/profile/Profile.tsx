"use client";

import DeleteAccount from "./components/DeleteAccount";
import Password from "./components/Password";
import PersonalInfo from "./components/PersonalInfo";

interface Props {
    dict: any;
}

export default function Profile({ dict }: Props) {
    return (
        <div className="divide-y divide-white/5 bg-white h-full">
            <PersonalInfo dict={dict} />
            <Password dict={dict} />
            <DeleteAccount dict={dict} />
        </div>
    );
}
