"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import esIcon from "../../../../public/languages/es.png";
import enIcon from "../../../../public/languages/en.png";
import frIcon from "../../../../public/languages/fr.png";
import caIcon from "../../../../public/languages/ca.png";
import { useAuthContext } from "@/contexts/authContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ILanguage } from "../../interfaces/language";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function SelectLanguage({ dict }: any) {
    const languages: ILanguage[] = [
        {
            id: 1,
            name: dict?.languages?.es,
            locale: "es",
            avatar: esIcon,
        },
        {
            id: 2,
            name: dict?.languages?.ca,
            locale: "ca",
            avatar: caIcon,
        },
        {
            id: 3,
            name: dict?.languages?.en,
            locale: "en",
            avatar: enIcon,
        },
        {
            id: 4,
            name: dict?.languages?.fr,
            locale: "fr",
            avatar: frIcon,
        },
    ];

    const pathname = usePathname();
    const { lang, onChange } = useAuthContext();

    const language: ILanguage | undefined = languages?.find((item) => item?.locale === lang);

    return (
        <div className="flex sm:block justify-end items-center ">
            <Listbox value={language} onChange={onChange}>
                {({ open }) => (
                    <>
                        <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900 mr-3">
                            {dict?.languages?.language}
                        </Listbox.Label>
                        <div className="relative mt-0">
                            <Listbox.Button className="relative w-48 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
                                <span className="flex items-center">
                                    <Image
                                        src={language?.avatar!}
                                        alt={language?.name!}
                                        width={10}
                                        height={10}
                                        className="h-5 w-5 flex-shrink-0 rounded-full"
                                    />
                                    <span className="ml-3 block truncate">{language?.name}</span>
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                                <Listbox.Options className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {languages.map((language: ILanguage) => (
                                        <Listbox.Option
                                            key={language.id}
                                            className={({ active }) =>
                                                classNames(
                                                    active
                                                        ? "bg-primary text-white"
                                                        : "text-gray-900",
                                                    "relative cursor-default select-none"
                                                )
                                            }
                                            value={language}>
                                            {({ selected }) => (
                                                <Link
                                                    href={pathname.replace(
                                                        pathname.substring(1, 3),
                                                        language?.locale
                                                    )}>
                                                    <div className="flex items-center py-2 pl-3">
                                                        <Image
                                                            src={language?.avatar}
                                                            alt={language?.name!}
                                                            width={10}
                                                            height={10}
                                                            className="h-5 w-5 flex-shrink-0 rounded-full"
                                                        />
                                                        <span
                                                            className={classNames(
                                                                selected
                                                                    ? "font-semibold"
                                                                    : "font-normal",
                                                                "ml-3 block truncate"
                                                            )}>
                                                            {language.name}
                                                        </span>
                                                    </div>
                                                </Link>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    );
}
