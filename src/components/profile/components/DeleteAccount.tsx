interface Props {
    dict: any;
}

export default function DeleteAccount({ dict }: Props) {
    return (
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                    {dict?.profile?.delete?.title}
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                    {dict?.profile?.delete?.description}
                </p>
            </div>

            <form className="flex items-start md:col-span-2">
                <button
                    type="submit"
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                    {dict?.profile?.delete?.button}
                </button>
            </form>
        </div>
    );
}
