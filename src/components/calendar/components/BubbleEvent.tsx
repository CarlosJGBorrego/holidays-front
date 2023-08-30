import { DayCalendar } from "@/components/interfaces/dayCalendar";

interface Props {
    day: DayCalendar;
    numberUser: number;
    daysOfHolidays: any[];
}

export default function BubbleEvent({ day, numberUser, daysOfHolidays }: Props) {
    if (daysOfHolidays.includes(day?.date)) {
        switch (numberUser) {
            case 1:
                return (
                    <div className="flex justify-center space-x-1">
                        <p className="w-2 h-2 rounded-full bg-pink-500" />
                    </div>
                );
            case 2:
                return (
                    <div className="flex justify-center space-x-1">
                        <p className="w-2 h-2 rounded-full bg-pink-500" />
                        <p className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                );
            case 3:
                return (
                    <div className="flex justify-center space-x-1">
                        <p className="w-2 h-2 rounded-full bg-pink-500" />
                        <p className="w-2 h-2 rounded-full bg-green-500" />
                        <p className="w-2 h-2 rounded-full bg-purple-500" />
                    </div>
                );
            default:
                return (
                    <div className="flex justify-center space-x-1">
                        <p className="w-5 h-5 pr-0.5 pt-0.5 text-primary text-xs font-semibold italic">
                            +4
                        </p>
                    </div>
                );
        }
    }
    return <></>;
}
