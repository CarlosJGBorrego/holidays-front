"use client";

import { IHoliday } from "@/components/interfaces/holiday";
import { Disclosure } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/20/solid";
import ShowCalendar from "../ShowCalendar";
import { IGroup } from "@/components/interfaces/group";
import { IUser } from "@/components/interfaces/user";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

interface Props {
    holidays: IHoliday[];
    groups: IGroup[];
    dict: any;
}

type Input = {
    groups: any;
    users: any;
};

export default function FilterHolidays({ holidays, groups, dict }: Props) {
    const listUsersFilter: IUser[] = [];
    const setIdUsers = new Set();
    groups?.map((item: any) => {
        return item?.users?.map((user: IUser) => {
            if (!setIdUsers.has(user?.id)) {
                setIdUsers.add(user?.id);
                listUsersFilter.push(user);
            }
        });
    });

    const [filteredHolidays, setFilteredHolidays] = useState(holidays);
    const [filteredUser, setFilteredUser] = useState(listUsersFilter);
    const [clearAll, setClearAll] = useState(false);

    const { handleSubmit, control } = useForm<Input>({
        defaultValues: { groups: groups, users: listUsersFilter },
    });

    const onSubmit = () => {
        const idUsersInSeletectedUsers = filteredUser.flatMap((user) => user?.id);

        setFilteredHolidays(
            holidays.filter((holiday) => idUsersInSeletectedUsers.includes(holiday?.user?.id))
        );
    };

    const handleCheckboxUser = (user: any) => {
        setClearAll(false);
        if (filteredUser.find((item) => item?.id === user?.id)) {
            setFilteredUser(filteredUser.filter((item: any) => item.id !== user?.id));
        } else {
            setFilteredUser([...filteredUser, user]);
        }
    };

    const handleClearAll = () => {
        setFilteredUser([]);
        setClearAll(true);
    };

    const handleSelectAllUsers = () => {
        setClearAll(false);
        setFilteredUser(listUsersFilter);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
            <div className="bg-white">
                <Disclosure
                    as="section"
                    aria-labelledby="filter-heading"
                    className="grid items-center border-b  border-gray-200">
                    <h2 id="filter-heading" className="sr-only">
                        {dict?.calendar?.filter?.filters}
                    </h2>
                    <div className="relative py-4 flex justify-between w-full">
                        <div className="flex space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
                            <div>
                                <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                                    <FunnelIcon
                                        className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    {dict?.calendar?.filter?.filters}
                                </Disclosure.Button>
                            </div>
                            <div className="pl-6">
                                <button
                                    type="button"
                                    onClick={handleClearAll}
                                    className="text-gray-400">
                                    {dict?.calendar?.filter?.clearAll}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="rounded-full bg-primary px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                            {dict?.calendar?.filter?.button}
                        </button>
                    </div>
                    <Disclosure.Panel className="border-t border-gray-200 py-10">
                        <div className="mx-auto grid grid-cols-1 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                            <fieldset>
                                <div className="flex space-x-6 divide-x items-center border-gray-200">
                                    <legend className="block font-medium mb-2.5 text-black capitalize">
                                        {dict?.calendar?.filter?.users}
                                    </legend>
                                    <button
                                        type="button"
                                        onClick={handleSelectAllUsers}
                                        className="block mb-2.5 pl-6 text-gray-400">
                                        {dict?.calendar?.filter?.selectAll}
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-2 gap-x-20 ">
                                    {listUsersFilter?.map((option) => (
                                        <Controller
                                            key={option.id}
                                            control={control}
                                            render={() => (
                                                <div
                                                    key={option.id}
                                                    className="flex items-center text-base sm:text-sm">
                                                    <input
                                                        onChange={() => handleCheckboxUser(option)}
                                                        id={`user-${option?.id}`}
                                                        name={`user-${option?.id}`}
                                                        value={option?.username}
                                                        checked={
                                                            filteredUser.includes(option) &&
                                                            !clearAll
                                                        }
                                                        type="checkbox"
                                                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-primary focus:ring-primary"
                                                    />
                                                    <label
                                                        htmlFor={`user-${option?.id}`}
                                                        className="ml-3 min-w-0 flex-1 text-gray-600 capitalize">
                                                        {option?.username}
                                                    </label>
                                                </div>
                                            )}
                                            defaultValue={false}
                                            name="users"
                                            rules={{
                                                validate: (value: boolean) => value,
                                            }}
                                        />
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                    </Disclosure.Panel>
                </Disclosure>
            </div>

            <div className="mt-10">
                <ShowCalendar dict={dict} holidays={filteredHolidays} />
            </div>
        </form>
    );
}
