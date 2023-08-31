import { IHoliday } from "@/components/interfaces/holiday";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { CalendarDaysIcon, XCircleIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { useState } from "react";
import ModalDeleteHolidays from "./ModalDeleteHoliday";

interface Props {
    holidays: IHoliday[];
    token: string;
    dict: any;
}

export default function ListHolidays({ holidays, token, dict }: Props) {
    const [open, setOpen] = useState(false);
    const [idHolidayRemove, setIdHolidayRemove] = useState<number>();

    const handleRemoveHoliday = (id: number) => {
        setIdHolidayRemove(id);
        setOpen(true);
    };

    return (
        <div>
            {open && (
                <ModalDeleteHolidays
                    open={open}
                    setOpen={setOpen}
                    id={idHolidayRemove!}
                    token={token}
                    dict={dict}
                />
            )}
            <div className="pb-10 px-8 border-b border-gray-200">
                <Disclosure defaultOpen>
                    {({ open }) => (
                        /* Use the `open` state to conditionally change the direction of an icon. */
                        <>
                            <Disclosure.Button className="w-full flex justify-between items-center text-left border-b border-gray-200 bg-primary rounded-t-lg px-4 py-5 sm:px-6">
                                <div>
                                    <h3 className="text-base font-semibold leading-6 text-white">
                                        {dict?.panel?.list?.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-200">
                                        {dict?.panel?.list?.description}
                                    </p>
                                </div>
                                <div>
                                    <ChevronRightIcon
                                        className={`h-8 w-8 text-white ${
                                            open ? "rotate-90 transform" : ""
                                        }`}
                                    />
                                </div>
                            </Disclosure.Button>
                            <Disclosure.Panel className="border border-t-0 border-gray-200 mb-10 px-6 rounded-b-lg">
                                <ul role="list" className="divide-y divide-gray-100">
                                    {holidays?.map((holiday) => (
                                        <li
                                            key={holiday?.id}
                                            className="flex justify-between items-center gap-x-6 py-5">
                                            <div className="flex items-center min-w-0 gap-x-4">
                                                <CalendarDaysIcon className="w-10 h-10 text-gray-400" />
                                                <div className="min-w-0 flex-auto">
                                                    <p className="mt-1 text-sm leading-5 text-gray-500">
                                                        <span className="font-medium">
                                                            {dayjs(holiday?.start).format(
                                                                "DD-MM-YYYY"
                                                            )}
                                                        </span>
                                                        <span className="mx-1.5 text-xs">
                                                            {dict?.panel?.list?.to}
                                                        </span>
                                                        <span className="font-medium">
                                                            {dayjs(holiday?.end).format(
                                                                "DD-MM-YYYY"
                                                            )}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                title="Remove holiday"
                                                onClick={() => handleRemoveHoliday(holiday?.id)}
                                                className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                <XCircleIcon className="h-6 w-6 text-red-600 hover:text-red-700" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    );
}
