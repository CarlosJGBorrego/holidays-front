interface Props {
    dict: any;
}

export default function Password({ dict }: Props) {
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

            <form className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full">
                        <label
                            htmlFor="current-password"
                            className="block text-sm font-medium leading-6 text-gray-700">
                            {dict?.profile?.password?.current}
                        </label>
                        <div className="mt-2">
                            <input
                                id="current-password"
                                name="current_password"
                                type="password"
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 bg-white/50 py-1.5 text-gray-900 shadow-sm caret-primary ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label
                            htmlFor="new-password"
                            className="block text-sm font-medium leading-6 text-gray-700">
                            {dict?.profile?.password?.new}
                        </label>
                        <div className="mt-2">
                            <input
                                id="new-password"
                                name="new_password"
                                type="password"
                                autoComplete="new-password"
                                className="block w-full rounded-md border-0 bg-white/50 py-1.5 text-gray-900 shadow-sm caret-primary ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label
                            htmlFor="confirm-password"
                            className="block text-sm font-medium leading-6 text-gray-700">
                            {dict?.profile?.password?.confirm}
                        </label>
                        <div className="mt-2">
                            <input
                                id="confirm-password"
                                name="confirm_password"
                                type="password"
                                autoComplete="new-password"
                                className="block w-full rounded-md border-0 bg-white/50 py-1.5 text-gray-900 shadow-sm caret-primary ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
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
