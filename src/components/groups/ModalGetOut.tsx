import { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/authContext";
import { Actions } from "@/components/notifications/getActions";
import { TypeNotification } from "@/components/notifications/getTypeNotification";
import { IGroup } from "../interfaces/group";
import { apiDeleteGroup, apiDeleteUserGroup, apiUpdateGroup } from "@/api";
import { IUser } from "../interfaces/user";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    token: string;
    dict: any;
    group: IGroup;
    iAmAdmin: boolean;
    me: IUser;
}

export default function ModalGetOut({ open, setOpen, token, dict, group, iAmAdmin, me }: Props) {
    const router = useRouter();
    const { notificationOnChange, actionOnChange, typeNotificationOnChange } = useAuthContext();
    const groupWithSeveralMember = group?.users?.length > 1;
    const handleGetOut = async () => {
        if (groupWithSeveralMember) {
            actionOnChange(Actions.GETOUT_GROUP);
        } else {
            actionOnChange(Actions.DELETE_GROUP);
        }

        try {
            if (groupWithSeveralMember) {
                if (iAmAdmin) {
                    typeNotificationOnChange(TypeNotification.ERROR);
                } else {
                    const filteredUsers = group?.users?.filter((user) => user?.id !== me?.id);
                    const res = {
                        data: {
                            ...group,
                            users: filteredUsers,
                        },
                    };

                    await apiUpdateGroup(group?.id, res, token);
                    typeNotificationOnChange(TypeNotification.SUCCESS);
                }
            } else {
                const idUserGroup: number = group?.user_groups[0]?.id;
                await apiDeleteUserGroup(idUserGroup, token);
                await apiDeleteGroup(group?.id, token);
                typeNotificationOnChange(TypeNotification.SUCCESS);
            }
            setOpen(false);
            router.refresh();
        } catch (err) {
            typeNotificationOnChange(TypeNotification.ERROR);
            console.error(err);
        }
        notificationOnChange(true);
    };

    return (
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
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        onClick={() => setOpen(false)}>
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationTriangleIcon
                                            className="h-6 w-6 text-red-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900">
                                            {groupWithSeveralMember
                                                ? dict?.group?.modal?.getOut?.title
                                                : dict?.group?.modal?.remove?.title}
                                        </Dialog.Title>
                                        <div className="mt-2 text-sm text-gray-500">
                                            <p>
                                                {groupWithSeveralMember
                                                    ? dict?.group?.modal?.getOut?.description
                                                    : dict?.group?.modal?.remove?.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={() => handleGetOut()}>
                                        {groupWithSeveralMember
                                            ? dict?.group?.modal?.getOut?.delete
                                            : dict?.group?.modal?.remove?.delete}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}>
                                        {groupWithSeveralMember
                                            ? dict?.group?.modal?.getOut?.cancel
                                            : dict?.group?.modal?.remove?.cancel}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
