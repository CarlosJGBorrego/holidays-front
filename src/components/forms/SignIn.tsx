"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingCircle from "../utils/LoadingCircle";
import { InputsEmail } from "../interfaces/login";
import { useAuthContext } from "@/contexts/authContext";
import { apiLogin } from "@/api";
import Link from "next/link";

export default function SignIn({ dict, lang }: any) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { login } = useAuthContext();

    const { register, handleSubmit } = useForm<InputsEmail>();
    const onSubmit: SubmitHandler<InputsEmail> = async (data) => {
        setError(null);
        setLoading(true);
        try {
            const response = await apiLogin(data?.email, data?.password);
            login(response?.jwt);
            router.push(`/${lang}/panel`);
        } catch (err) {
            setError(dict?.login?.messageError);
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex h-screen flex-1 flex-col -mt-20 bg-white justify-center px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                        {dict?.login?.title}
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                        action="#"
                        method="POST">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                {dict?.login?.email}
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("email")}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 caret-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    {dict?.login?.password}
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    {...register("password")}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 caret-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="text-red-500 text-sm font-semibold">{error && error}</div>

                        <Link
                            href={`${lang}/signup`}
                            className="text-sm text-primary hover:text-secondary font-semibold">
                            {dict?.login?.signup}
                        </Link>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`${
                                    loading ? "opacity-50 cursor-not-allowed" : ""
                                } flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}>
                                {loading && (
                                    <div className="flex justify-center items-center">
                                        <LoadingCircle />
                                        <span className="ml-2">{dict?.login?.loading}</span>
                                    </div>
                                )}
                                {!loading && dict?.login?.button}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
