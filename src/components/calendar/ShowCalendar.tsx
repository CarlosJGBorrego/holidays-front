"use client";

import { useState } from "react";
import getDaysOfYear from "../utils/getDaysOfYear";
import { DayCalendar } from "../interfaces/dayCalendar";
import dayjs from "dayjs";
import { IHoliday } from "../interfaces/holiday";
import getTranslationMonth from "../utils/getTranslationMonths";
import ModalInfo from "./components/ModalInfo";
import { IUser } from "../interfaces/user";
import BubbleEvent from "./components/BubbleEvent";

interface Props {
    dict: any;
    holidays: IHoliday[];
}

const currentDate = dayjs();
const currentYear = currentDate.format("YYYY");
const nextYear = currentDate.add(1, "year").format("YYYY");

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function ShowCalendar({ dict, holidays }: Props) {
    const [months, setMonths] = useState(getDaysOfYear(parseFloat(currentYear)));
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [open, setOpen] = useState(false);
    const [holidayByDate, setHolidayByDate] = useState([]);

    const handleYear = (year: string) => {
        if (year === currentYear) {
            setSelectedYear(currentYear);
            setMonths(getDaysOfYear(parseFloat(currentYear)));
        } else {
            setSelectedYear(nextYear);
            setMonths(getDaysOfYear(parseFloat(nextYear)));
        }
    };

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

    const daysOfHolidays = holidays.flatMap((event: IHoliday) => {
        return getDatesInRange(event?.start, event?.end);
    });

    const handleModalInfo = (dayCalendar: DayCalendar) => {
        const foundHoliday = listUserDate?.find((item) => item.day === dayCalendar.date);
        if (foundHoliday) {
            setHolidayByDate([].concat(foundHoliday));
        } else {
            setHolidayByDate([]);
        }

        setOpen(true);
    };

    const handleNumberOfUsers = (dayCalendar: DayCalendar) => {
        const numberUsers = listUserDate?.find((item) => item.day === dayCalendar.date)?.user
            ?.length;
        return numberUsers;
    };

    const listUserDate: any[] = [];
    const setDays = new Set();
    holidays?.forEach((event: IHoliday) => {
        const dates = getDatesInRange(event?.start, event?.end);
        dates.forEach((day: string) => {
            const res = {
                day: day,
                user: [event?.user],
            };
            if (setDays.has(day)) {
                const foundDay = listUserDate.find((itemList) => itemList?.day === day);
                if (foundDay) {
                    foundDay.user.push(res.user[0]);
                }
            } else {
                setDays.add(day);
                listUserDate.push(res);
            }
        });
    });

    listUserDate.sort((a: any, b: any) => a.day.localeCompare(b.day));

    return (
        <div>
            <ModalInfo open={open} setOpen={setOpen} dict={dict} holidays={holidayByDate} />
            <div>
                <header className="flex items-center justify-between px-8 pt-6">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        <button
                            type="button"
                            onClick={() => handleYear(currentYear)}
                            className={`rounded-md px-2.5 py-1.5 text-md font-bold 
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
                                <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-300 text-sm shadow ring-1 ring-gray-200">
                                    {month.days.map((day: DayCalendar, dayIdx: number) => (
                                        <button
                                            key={dayIdx}
                                            type="button"
                                            onClick={() => handleModalInfo(day)}
                                            disabled={typeof day === "number"}
                                            className={classNames(
                                                day.isCurrentMonth
                                                    ? "bg-white hover:bg-gray-100 text-gray-900"
                                                    : "",
                                                dayIdx === 0 ? "rounded-tl-lg" : "",
                                                dayIdx === 6 ? "rounded-tr-lg" : "",
                                                dayIdx ===
                                                    month.days.length - (month.days.length % 7)
                                                    ? "rounded-bl-lg"
                                                    : "",
                                                dayIdx === month.days.length - 1
                                                    ? "rounded-br-lg"
                                                    : "",
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
                                            <BubbleEvent
                                                day={day}
                                                daysOfHolidays={daysOfHolidays}
                                                numberUser={handleNumberOfUsers(day)}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
