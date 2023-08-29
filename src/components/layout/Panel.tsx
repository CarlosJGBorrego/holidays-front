"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    Bars3Icon,
    CalendarDaysIcon,
    ExclamationTriangleIcon,
    HomeModernIcon,
    UserGroupIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import SettingsDesktop from "./components/SettingsDesktop";
import { usePathname } from "next/navigation";
import SelectLanguage from "./components/SelectLanguage";
import SettingsMobile from "./components/SettingsMobile";
import { IUser } from "../interfaces/user";
import AllNotificationsPanel from "../notifications/AllNotificationsPanel";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface Props {
    children: JSX.Element;
    dict: any;
    lang: string;
    user: IUser;
}

export default function Panel({ lang, dict, user, children }: Props) {
    const pathname = usePathname();
    const navigation = [
        {
            name: dict?.nav?.home,
            href: "/panel",
            icon: HomeModernIcon,
            current: pathname === `/${lang}/panel`,
        },
        {
            name: dict?.nav?.group,
            href: "/panel/group",
            icon: UserGroupIcon,
            current: pathname === `/${lang}/panel/group`,
        },
        {
            name: dict?.nav?.calendar,
            href: "/panel/calendar",
            icon: CalendarDaysIcon,
            current: pathname === `/${lang}/panel/calendar`,
        },
        {
            name: "Pendientes",
            href: "/panel/pending",
            icon: ExclamationTriangleIcon,
            current: pathname === `/${lang}/panel/pending`,
        },
    ];

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <AllNotificationsPanel dict={dict} />
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full">
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0">
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button
                                                type="button"
                                                className="-m-2.5 p-2.5"
                                                onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon
                                                    className="h-6 w-6 text-white"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <img
                                                className="h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                alt="Your Company"
                                            />
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul
                                                role="list"
                                                className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <li key={item.name}>
                                                                <Link
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        item.current
                                                                            ? "bg-gray-800 text-white"
                                                                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                                                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                                    )}>
                                                                    <item.icon
                                                                        className="h-6 w-6 shrink-0"
                                                                        aria-hidden="true"
                                                                    />
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
                        <div className="flex h-16 shrink-0 items-center">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? "bg-gray-800 text-white"
                                                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                    )}>
                                                    <item.icon
                                                        className="h-6 w-6 shrink-0"
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="-mx-6 mt-auto">
                                    <SettingsDesktop dict={dict} lang={lang} user={user} />
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
                        onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex-1 text-sm font-semibold leading-6 text-white">
                        {navigation.find((item) => item?.href === "/panel")?.name}
                    </div>
                    <SettingsMobile dict={dict} lang={lang} user={user} />
                </div>

                <main className="py-10 lg:pl-72">
                    <div className="flex justify-end px-4 sm:px-6 lg:px-8">
                        <div className="w-48 pb-6">
                            <SelectLanguage dict={dict} />
                        </div>
                    </div>
                    <div>{children}</div>
                </main>
            </div>
        </>
    );
}
