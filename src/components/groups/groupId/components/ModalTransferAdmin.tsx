import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { KeyIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/authContext";
import { Actions } from "@/components/notifications/getActions";
import { TypeNotification } from "@/components/notifications/getTypeNotification";
import { IGroupExtend } from "@/components/interfaces/group";
import { useForm } from "react-hook-form";
import { IUser, IUserExtended } from "@/components/interfaces/user";
import CardUser from "../../components/CardUser";

interface Props {
    me: IUser;
    group: IGroupExtend;
    token: string;
    dict: any;
}

export default function ModalTransferRole({ group, me, token, dict }: Props) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit } = useForm();
    const router = useRouter();
    const { notificationOnChange, actionOnChange, typeNotificationOnChange } = useAuthContext();
    const handleTransferRole = async () => {
        actionOnChange(Actions.DELETE_GROUP);

        try {
            //await api
            setOpen(false);
            router.refresh();
            typeNotificationOnChange(TypeNotification.SUCCESS);
        } catch (err) {
            typeNotificationOnChange(TypeNotification.ERROR);
            console.error(err);
        }
        notificationOnChange(true);
    };

    const onSubmit = (data: any) => {
        console.log("---", data);
    };

    const restUserGroup = group?.users?.data?.filter((user: IUserExtended) => user?.id !== me?.id);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex items-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded-md">
                <KeyIcon className="w-6 h-6" />
                <span className="pl-2 font-medium">Traspasar rol Admin</span>
            </button>
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
                                                Traspasar admin
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Selecciona a la persona que quieres transferirle
                                                    el rol admin.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:ml-4">
                                        <h4 className="block text-sm font-medium leading-6 text-gray-900">
                                            Usuarios
                                        </h4>
                                        <div>
                                            {restUserGroup.map((item: IUserExtended) => {
                                                return (
                                                    <CardUser
                                                        key={item?.id}
                                                        person={item?.attributes}
                                                        idAdmin={0}
                                                        idUser={item?.id}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="mt-8 flex flex-row-reverse">
                                        <button
                                            type="submit"
                                            className={
                                                "rounded-md bg-primary hover:bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                                            }>
                                            Traspasar
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
