"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ArrowLeftOnRectangleIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { IUser } from "@/components/interfaces/user";

interface Props {
    dict: any;
    lang: string;
    user: IUser;
}

export default function SettingsMobile({ dict, lang, user }: Props) {
    return (
        <div className="">
            <Menu as="div" className="relative inline-block text-left rounded-full">
                <div>
                    <Menu.Button className="flex w-full items-center gap-x-4 text-sm font-semibold leading-6 rounded-full text-white hover:bg-gray-800">
                        <img
                            className="h-8 w-8 rounded-full bg-gray-800"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="blbllb"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute top-10 right-0 w-52 ml-1 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        href="/panel/profile"
                                        className={`${
                                            active ? "bg-primary text-white" : "text-gray-900"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                        <UserCircleIcon
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        {dict?.settings?.profile}
                                    </Link>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href={`${lang}/logout`}
                                        className={`${
                                            active ? "bg-primary text-white" : "text-gray-900"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                        <ArrowLeftOnRectangleIcon
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        {dict?.settings?.logout}
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
