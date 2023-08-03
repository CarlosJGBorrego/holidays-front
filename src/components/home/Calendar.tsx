"use client";

import { useState } from "react";
import getDaysOfYear from "../utils/getDaysOfYear";
import { DayCalendar } from "../interfaces/dayCalendar";
import dayjs from "dayjs";
import { IHoliday } from "../interfaces/holiday";
import getTranslationMonth from "../utils/getTranslationMonths";

interface Props {
    dict: any;
}

const currentDate = dayjs();
const currentYear = currentDate.format("YYYY");
const nextYear = currentDate.add(1, "year").format("YYYY");

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Calendar({ dict }: Props) {
    const [months, setMonths] = useState(getDaysOfYear(parseFloat(currentYear)));
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const handleYear = (year: string) => {
        if (year === currentYear) {
            setSelectedYear(currentYear);
            setMonths(getDaysOfYear(parseFloat(currentYear)));
        } else {
            setSelectedYear(nextYear);
            setMonths(getDaysOfYear(parseFloat(nextYear)));
        }
    };
    const events: IHoliday[] = [
        {
            start: dayjs("2023-06-02", "YYYY-MM-DD").toDate(),
            end: dayjs("2023-06-22", "YYYY-MM-DD").toDate(),
        },
        {
            start: dayjs("2023-10-10", "YYYY-MM-DD").toDate(),
            end: dayjs("2023-10-17", "YYYY-MM-DD").toDate(),
        },
        {
            start: dayjs("2023-08-02", "YYYY-MM-DD").toDate(),
            end: dayjs("2023-08-05", "YYYY-MM-DD").toDate(),
        },
    ];

    function getDatesInRange(startDateStr: Date, endDateStr: Date) {
        let startDate = dayjs(startDateStr);
        const endDate = dayjs(endDateStr);
        const datesInRange = [];

        while (startDate.isBefore(endDate.endOf("day")) || startDate.isSame(endDate, "day")) {
            datesInRange.push(startDate.format("YYYY-MM-DD"));
            startDate = startDate.add(1, "day");
        }

        return datesInRange;
    }

    const daysOfHolidays = events.flatMap((event) => {
        return getDatesInRange(event?.start, event?.end);
    });

    return (
        <div>
            <header className="flex items-center justify-between border-b border-gray-200 px-8 py-4">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                    <button
                        type="button"
                        onClick={() => handleYear(currentYear)}
                        className={`rounded-md  px-2.5 py-1.5 text-md font-bold 
                          focus-visible:outline
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                              selectedYear === currentYear
                                  ? "bg-primary hover:bg-secondary text-white hover:text-gray-50 shadow-sm"
                                  : "bg-white hover:bg-gray-50 text-primary hover:text-secondary hover:shadow-sm"
                          }`}>
                        {currentYear}
                    </button>

                    <button
                        type="button"
                        onClick={() => handleYear(nextYear)}
                        className={`ml-2.5 rounded-md  px-2.5 py-1.5 text-md font-bold 
                          focus-visible:outline
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                              selectedYear === nextYear
                                  ? "bg-primary hover:bg-secondary text-white hover:text-gray-50 shadow-sm"
                                  : "bg-white hover:bg-gray-50 text-primary hover:text-secondary hover:shadow-sm"
                          }`}>
                        {nextYear}
                    </button>
                </h1>
                <div className="flex items-center">
                    <div className="hidden md:ml-4 md:flex md:items-center">
                        <button
                            type="button"
                            className="ml-6 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                            {dict?.panel?.addHolidays}
                        </button>
                    </div>
                </div>
            </header>
            <div className="bg-white">
                <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
                    {months.map((month) => (
                        <section key={month.name} className="text-center">
                            <h2 className="text-sm font-semibold text-gray-900">
                                {getTranslationMonth(month.name.toLowerCase(), dict)}
                            </h2>
                            <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                                <div>{dict?.panel?.days?.monday}</div>
                                <div>{dict?.panel?.days?.tuesday}</div>
                                <div>{dict?.panel?.days?.wednesday}</div>
                                <div>{dict?.panel?.days?.thursday}</div>
                                <div>{dict?.panel?.days?.friday}</div>
                                <div>{dict?.panel?.days?.saturday}</div>
                                <div>{dict?.panel?.days?.sunday}</div>
                            </div>
                            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                                {month.days.map((day: DayCalendar, dayIdx: number) => (
                                    <button
                                        key={dayIdx}
                                        type="button"
                                        disabled={typeof day === "number"}
                                        className={classNames(
                                            day.isCurrentMonth
                                                ? daysOfHolidays.includes(day?.date)
                                                    ? "bg-green-500 hover:bg-green-600 text-white font-semibold"
                                                    : "bg-white hover:bg-gray-100 text-gray-900"
                                                : "",
                                            dayIdx === 0 ? "rounded-tl-lg" : "",
                                            dayIdx === 6 ? "rounded-tr-lg" : "",
                                            dayIdx === month.days.length - (month.days.length % 7)
                                                ? "rounded-bl-lg"
                                                : "",
                                            dayIdx === month.days.length - 1 ? "rounded-br-lg" : "",
                                            "py-1.5  focus:z-10"
                                        )}>
                                        <time
                                            dateTime={day.date}
                                            className={classNames(
                                                day.isToday
                                                    ? "bg-primary font-semibold text-white"
                                                    : "",
                                                "mx-auto flex h-7 w-7 items-center justify-center rounded-full"
                                            )}>
                                            {day?.date?.substring(8)}
                                        </time>
                                    </button>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
