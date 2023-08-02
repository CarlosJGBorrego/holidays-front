import dayjs from "dayjs";
import { DayCalendar } from "../interfaces/dayCalendar";

function FillZeros(name: string) {
    switch (name) {
        case "Monday":
            return 0;
        case "Tuesday":
            return 1;
        case "Wednesday":
            return 2;
        case "Thursday":
            return 3;
        case "Friday":
            return 4;
        case "Saturday":
            return 5;
        default:
            return 6;
    }
}

export default function getDaysOfYear(year: number) {
    const startDate = dayjs(`${year}-01-01`);
    const endDate = dayjs(`${year}-12-31`);

    const list = [];
    let currentDate = startDate.startOf("month");

    while (currentDate.isBefore(endDate.endOf("month")) || currentDate.isSame(endDate, "day")) {
        const year = currentDate.year();
        const monthName = currentDate.format("MMMM");
        const dateObject: DayCalendar = {
            date: currentDate.format("YYYY-MM-DD"),
            isCurrentMonth: true,
            isToday: currentDate.isSame(dayjs(), "day"),
        };

        let month: any = list.find((m) => m.name === monthName && m.year === year);
        let newMonth = false;
        if (!month) {
            newMonth = true;
            month = {
                name: monthName,
                year: year,
                days: [],
            };
            list.push(month);
        }
        if (newMonth) {
            const firstDay = currentDate.startOf("day").format("dddd");
            for (let i = 0; i < FillZeros(firstDay); i++) {
                month.days.push(0);
            }
            newMonth = false;
        }
        month.days.push(dateObject);

        currentDate = currentDate.add(1, "day");
    }

    return list;
}
