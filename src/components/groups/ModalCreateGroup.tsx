"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "@/components/interfaces/user";
import { apiCreateGroup, apiCreateHoliday, apiCreateUserGroup } from "@/api";
import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { Actions } from "@/components/notifications/getActions";
import { TypeNotification } from "@/components/notifications/getTypeNotification";
import { IGroup } from "../interfaces/group";

interface Props {
    dict: any;
    me: IUser;
    token: string;
}

export default function ModalCreateGroup({ dict, me, token }: Props) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IGroup>();

    const { notificationOnChange, actionOnChange, typeNotificationOnChange } = useAuthContext();

    const onSubmit: SubmitHandler<IGroup> = async (data) => {
        actionOnChange(Actions.CREATE_GROUP);
        try {
            const res = {
                data: {
                    name: data?.name,
                    users: [me?.id],
                },
            };
            const newGroup = await apiCreateGroup(res, token);
            console.log("new", newGroup);
            const userGroup = {
                data: {
                    isAdmin: true,
                    users: me?.id,
                    groups: newGroup?.data?.id,
                },
            };
            await apiCreateUserGroup(userGroup, token);
            setOpen(false);
            typeNotificationOnChange(TypeNotification.SUCCESS);
            router.refresh();
        } catch (err) {
            setOpen(false);
            typeNotificationOnChange(TypeNotification.ERROR);
            console.error(err);
        }
        notificationOnChange(true);
    };

    return (
        <>
            <div>
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    {dict?.group?.create}
                </button>
            </div>

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
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg sm:p-6">
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
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-semibold leading-6 text-gray-900">
                                                {dict?.group?.modal?.title}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    {dict?.group?.modal?.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:ml-4">
                                        <label
                                            htmlFor="start"
                                            className="mb-1 block text-sm font-medium leading-6 text-gray-900">
                                            {dict?.group?.modal?.label}
                                        </label>

                                        <input
                                            {...register("name", { required: "Campo obligatorio" })}
                                            type="text"
                                            id="name"
                                            name="name"
                                            className={`appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ring-1 ${
                                                errors?.name?.message
                                                    ? "ring-red-600"
                                                    : "ring-primary"
                                            }`}
                                        />
                                    </div>

                                    <div className="pl-4 pt-2">
                                        <p className="text-red-500 font-semibold text-xs">
                                            {errors?.name?.message}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex flex-row-reverse">
                                        <button
                                            type="submit"
                                            className={`rounded-md bg-primary hover:bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary`}>
                                            {dict?.group?.modal?.button}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </form>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
