"use client";

import { useState } from "react";
import getDaysOfYear from "../utils/getDaysOfYear";
import { DayCalendar } from "../interfaces/dayCalendar";
import dayjs from "dayjs";

const currentDate = dayjs();
const currentYear = currentDate.format("YYYY");
const nextYear = currentDate.add(1, "year").format("YYYY");

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Calendar() {
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

    return (
        <div>
            <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
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
                            Add holidays
                        </button>
                    </div>
                </div>
            </header>
            <div className="bg-white">
                <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
                    {months.map((month) => (
                        <section key={month.name} className="text-center">
                            <h2 className="text-sm font-semibold text-gray-900">{month.name}</h2>
                            <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                                <div>L</div>
                                <div>M</div>
                                <div>X</div>
                                <div>J</div>
                                <div>V</div>
                                <div>S</div>
                                <div>D</div>
                            </div>
                            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                                {month.days.map((day: DayCalendar, dayIdx: number) => (
                                    <button
                                        key={dayIdx}
                                        type="button"
                                        disabled={typeof day === "number"}
                                        className={classNames(
                                            day.isCurrentMonth
                                                ? "bg-white hover:bg-gray-100 text-gray-900"
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
