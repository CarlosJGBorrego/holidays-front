import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IUser } from "@/components/interfaces/user";

type IObject = {
    day: string;
    user: IUser[];
};

interface Props {
    holidays: IObject[];
    dict: any;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ModalInfo({ holidays, dict, open, setOpen }: Props) {
    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto lg:pl-72">
                        <div className="flex w-full min-h-full justify-center p-4 text-center items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl sm:p-6">
                                    <div className="absolute right-0 top-0 pr-4 pt-4 block">
                                        <button
                                            type="button"
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                            onClick={() => setOpen(false)}>
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-left sm:ml-4 sm:mt-0">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-semibold leading-6 text-gray-900">
                                                {dict?.calendar?.modalCalendar?.title}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    {dict?.calendar?.modalCalendar?.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:px-4">
                                        {holidays?.length === 0 && (
                                            <p className="mt-8 text-md font-semibold text-gray-900">
                                                No hay personas de vacaciones
                                            </p>
                                        )}
                                        {holidays?.length !== 0 && (
                                            <ul className="mt-5">
                                                {holidays?.map((item: any) => {
                                                    return item?.user?.map((user: IUser) => {
                                                        return (
                                                            <li
                                                                key={user?.id}
                                                                className="flex justify-between gap-x-4 px-2 py-3">
                                                                <div className="flex gap-x-4">
                                                                    <img
                                                                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                                                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                        alt=""
                                                                    />
                                                                    <div className="min-w-0">
                                                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                                                            {user?.username}
                                                                        </p>
                                                                        <p className="truncate text-xs leading-5 text-gray-500">
                                                                            {user?.email}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="sm:flex text-center text-xs font-semibold text-primary">
                                                                    <p> {item?.start}</p>
                                                                    <p className="sm:px-1.5">-</p>
                                                                    <p>{item?.end}</p>
                                                                </div>
                                                            </li>
                                                        );
                                                    });
                                                })}
                                            </ul>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
