import { apiChangePassword } from "@/api";
import { Actions } from "@/components/notifications/getActions";
import { TypeNotification } from "@/components/notifications/getTypeNotification";
import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
    dict: any;
    token: string;
}

interface Inputs {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
export default function Password({ dict, token }: Props) {
    const [error, setError] = useState("");
    const router = useRouter();
    const { notificationOnChange, actionOnChange, typeNotificationOnChange } = useAuthContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setError("");
        if (data?.newPassword === data?.confirmPassword) {
            actionOnChange(Actions.UPDATE_PASS);
            try {
                const res = {
                    currentPassword: data?.currentPassword,
                    password: data?.newPassword,
                    passwordConfirmation: data?.confirmPassword,
                };
                await apiChangePassword(res, token);
                typeNotificationOnChange(TypeNotification.SUCCESS);
                router.refresh();
            } catch (err) {
                typeNotificationOnChange(TypeNotification.ERROR);
            }
            notificationOnChange(true);
        } else {
            setError("Las contraseñas no coinciden, revisalas");
        }
    };

    const handleChange = () => {
        setError("");
    };

    return (
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                    {dict?.profile?.password?.title}
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                    {dict?.profile?.password?.description}
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                action="#"
                method="POST"
                className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full">
                        <label
                            htmlFor="currentPassword"
                            className="block text-sm font-medium leading-6 text-gray-700">
                            {dict?.profile?.password?.current}
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("currentPassword", {
                                    required: true,
                                })}
                                onChange={handleChange}
                                placeholder="*****"
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                className="block w-full rounded-md border-0 bg-white/50 py-1.5 text-gray-900 shadow-sm caret-primary ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium leading-6 text-gray-700">
                            {dict?.profile?.password?.new}
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("newPassword", {
                                    required: true,
                                })}
                                onChange={handleChange}
                                placeholder="*****"
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                className="block w-full rounded-md border-0 bg-white/50 py-1.5 text-gray-900 shadow-sm caret-primary ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium leading-6 text-gray-700">
                            {dict?.profile?.password?.confirm}
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("confirmPassword", {
                                    required: true,
                                })}
                                onChange={handleChange}
                                placeholder="*****"
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                className="block w-full rounded-md border-0 bg-white/50 py-1.5 text-gray-900 shadow-sm caret-primary ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-4 ">
                    {error !== "" && <p className="text-sm font-semibold text-red-500">{error}</p>}
                </div>

                <div className="mt-8 flex">
                    <button
                        type="submit"
                        className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        {dict?.profile?.password?.save}
                    </button>
                </div>
            </form>
        </div>
    );
}
