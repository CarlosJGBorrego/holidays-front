import { apiProfile, apiUpdateProfile } from "@/api";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
    dict: any;
    token: string;
}

interface Inputs {
    firstName: string;
    lastName: string;
    email: string;
}

export default function PersonalInfo({ dict, token }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const me = await apiProfile(token);
            const res = {
                ...me,
                username: data?.firstName + " " + data?.lastName,
                email: data?.email,
            };
            await apiUpdateProfile(me?.id, res, token);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                    {dict?.profile?.personal?.title}
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                    {dict?.profile?.personal?.description}
                </p>
            </div>

            <form
                className="md:col-span-2"
                onSubmit={handleSubmit(onSubmit)}
                action="#"
                method="POST">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full flex items-center gap-x-8">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                        />
                        <div>
                            <button
                                type="button"
                                className="rounded-md bg-primary hover:bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                                {dict?.profile?.personal?.buttonAvatar}
                            </button>
                            <p className="mt-2 text-xs leading-5 text-gray-500">
                                {dict?.profile?.personal?.max}
                            </p>
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium leading-6 text-gray-700">
                            {dict?.profile?.personal?.firstName}
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("firstName", {
                                    required: "El campo nombre es obligatorio",
                                })}
                                type="text"
                                name="firstName"
                                id="firstName"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 bg-white/50 py-1.5 text-gray-900 shadow-sm caret-primary ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium leading-6 text-gray-700">
                            {dict?.profile?.personal?.lastName}
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("lastName", {
                                    required: "El campo apellido es obligatorio",
                                })}
                                type="text"
                                name="lastName"
                                id="lastName"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 bg-white/50 py-1.5 text-gray-900 shadow-sm caret-primary ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-700">
                            {dict?.profile?.personal?.email}
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("email", {
                                    required: "El campo email es obligatorio",
                                })}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 bg-white/30 py-1.5 text-gray-900 shadow-sm caret-primary ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-4 ">
                    {(errors?.email || errors?.firstName || errors?.lastName) && (
                        <p className="text-sm font-semibold text-red-500">
                            {dict?.profile?.personal?.error}
                        </p>
                    )}
                </div>

                <div className="mt-8 flex">
                    <button
                        type="submit"
                        className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        {dict?.profile?.personal?.save}
                    </button>
                </div>
            </form>
        </div>
    );
}
