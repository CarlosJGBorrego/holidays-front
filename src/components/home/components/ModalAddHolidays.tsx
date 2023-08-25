import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SubmitHandler, useForm } from "react-hook-form";
import { IHoliday } from "@/components/interfaces/holiday";
import { IUser } from "@/components/interfaces/user";
import { apiCreateHoliday } from "@/api";
import dayjs from "dayjs";
import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { Actions } from "@/components/notifications/getActions";
import { TypeNotification } from "@/components/notifications/getTypeNotification";

interface Props {
    dict: any;
    user: IUser;
    token: string;
}

const currentDate = dayjs();
const nextYear = currentDate.add(1, "year").format("YYYY");

export default function ModalAddHolidays({ dict, user, token }: Props) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit } = useForm<IHoliday>();
    const [error, setError] = useState("");
    const [isValidStart, setIsValidStart] = useState();
    const [isValidEnd, setIsValidEnd] = useState();

    const { notificationOnChange, actionOnChange, typeNotificationOnChange } = useAuthContext();

    const handleInputStart = (e: any) => {
        setError("");
        setIsValidStart(e.target.value);
    };

    const handleInputEnd = (e: any) => {
        setError("");
        setIsValidEnd(e.target.value);
    };

    const onSubmit: SubmitHandler<IHoliday> = async (data) => {
        const start = dayjs(data?.start);
        const end = dayjs(data?.end);
        let valid = true;
        actionOnChange(Actions.CREATE);

        if (start.isAfter(end)) {
            setError(dict?.panel?.modal?.add?.errors?.startAfterEnd);
            valid = false;
        }
        if (start.isBefore(currentDate, "days")) {
            setError(dict?.panel?.modal?.add?.errors?.startPast);
            valid = false;
        }
        if (end.isAfter(nextYear, "year")) {
            setError(dict?.panel?.modal?.add?.errors?.endFuture);
            valid = false;
        }

        if (valid) {
            setError("");
            try {
                const res = {
                    data: {
                        start: data?.start,
                        end: data?.end,
                        user: user?.id,
                    },
                };
                await apiCreateHoliday(res, token);
                setOpen(false);
                typeNotificationOnChange(TypeNotification.SUCCESS);
                router.refresh();
            } catch (err) {
                setOpen(false);
                typeNotificationOnChange(TypeNotification.ERROR);
                console.error(err);
            }
            notificationOnChange(true);
        }
    };

    return (
        <>
            <div className="">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="ml-6 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    {dict?.panel?.addHolidays}
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

                    <div className="fixed inset-0 z-10 overflow-y-auto">
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
                                                {dict?.panel?.modal?.add?.title}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    {dict?.panel?.modal?.add?.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:ml-4">
                                        <label
                                            htmlFor="start"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            {dict?.panel?.modal?.add?.startDate}
                                        </label>

                                        <input
                                            {...register("start")}
                                            type="date"
                                            id="start"
                                            onChange={(e) => handleInputStart(e)}
                                            name="start"
                                            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mt-5 sm:ml-4">
                                        <label
                                            htmlFor="end"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            {dict?.panel?.modal?.add?.endDate}
                                        </label>

                                        <input
                                            {...register("end")}
                                            type="date"
                                            id="end"
                                            onChange={(e) => handleInputEnd(e)}
                                            name="end"
                                            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="pl-4 pt-4">
                                        <p className="text-red-500 font-semibold text-sm">
                                            {error && error}
                                        </p>
                                    </div>
                                    <div className="mt-8 flex flex-row-reverse">
                                        <button
                                            type="submit"
                                            disabled={!isValidStart || !isValidEnd}
                                            className={`${
                                                !isValidStart || !isValidEnd
                                                    ? "opacity-30"
                                                    : "opacity-100 hover:bg-secondary"
                                            } rounded-md bg-primary  px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary`}>
                                            {dict?.panel?.modal?.add?.button}
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
