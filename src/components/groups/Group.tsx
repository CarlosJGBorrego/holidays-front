"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { IGroup } from "../interfaces/group";
import ContactBook from "./ContactBook";
import { IUser } from "../interfaces/user";

interface Props {
    dict: any;
    group: IGroup;
    idAdmin: number;
    me: IUser;
}

export default function Group({ dict, group, idAdmin, me }: Props) {
    return (
        <div className="w-full">
            <Disclosure defaultOpen>
                {({ open }) => (
                    <>
                        <Disclosure.Button className="w-full col-span-1 text-left shadow-sm rounded-t-md">
                            <div className="w-full flex rounded-t-md bg-blue-500">
                                <div
                                    className={
                                        "flex w-16 flex-shrink-0 items-center justify-center bg-pink-500 rounded-tl-md text-sm font-medium text-white"
                                    }>
                                    {group?.name?.length < 3
                                        ? group?.name
                                        : group?.name?.substring(0, 3).toUpperCase()}
                                </div>
                                <div className="flex flex-1 items-center justify-between truncate rounded-tr-md border-b border-r border-t border-gray-200 bg-white">
                                    <div className="flex-1 truncate px-4 py-2 text-sm">
                                        <p className="font-medium text-gray-900 hover:text-gray-600 text-ellipsis">
                                            {group?.name}
                                        </p>
                                        <p className="text-gray-500">
                                            {group?.users?.length} {dict?.calendar?.group?.members}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 pr-2">
                                        <ChevronRightIcon
                                            className={`h-5 w-5 text-gray-400 ${
                                                open ? "rotate-90 transform" : ""
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="border border-t-0 border-gray-200 mb-10 rounded-b-md max-h-60 overflow-y-auto">
                            <ContactBook group={group} idAdmin={idAdmin!} me={me} dict={dict} />
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
}
