import { apiAdminsGroups, apiGroupsByUser, apiProfile } from "@/api";
import { apiHolidaysByGroup } from "@/api/holidays";
import FilterHolidays from "@/components/calendar/components/FilterHolidays";
import ListGroups from "@/components/groups/ListGroups";
import { IGroup } from "@/components/interfaces/group";
import { IHoliday } from "@/components/interfaces/holiday";
import { IUser } from "@/components/interfaces/user";
import { IUserGroup } from "@/components/interfaces/userGroups";
import Panel from "@/components/layout/Panel";
import { getDictionary } from "@/dictionaries";
import { cookies } from "next/dist/client/components/headers";

interface Props {
    params: {
        lang: string;
    };
}

const allHolidaysByGroups = async (idUsers: number[], token: string) => {
    const promises = idUsers.map(async (item) => {
        const holidays = await apiHolidaysByGroup(item, token);
        return holidays;
    });
    const holidaysByGroup = await Promise.all(promises);
    return holidaysByGroup;
};

export default async function Page({ params: { lang } }: Props) {
    const cookiesStore = cookies();
    const token = cookiesStore.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!)?.value;
    const dict = await getDictionary(lang);
    const me: IUser = await apiProfile(token);
    const groups: IGroup[] = await apiGroupsByUser(me?.id, token);
    const idGroups = me?.groups?.flatMap((item) => item?.id);
    const holidaysByGroup = await allHolidaysByGroups(idGroups!, token!);
    const adminsList: IUserGroup[] = await apiAdminsGroups(token);

    const flattenedHolidays = holidaysByGroup.flat();
    let uniqueHolidays: IHoliday[] = [];
    let seenIds = new Set();

    for (const holiday of flattenedHolidays) {
        for (const item of holiday) {
            if (!seenIds.has(item.id)) {
                uniqueHolidays.push(item);
                seenIds.add(item.id);
            }
        }
    }

    return (
        <Panel lang={lang} dict={dict} user={me}>
            <div className="px-8">
                <ListGroups groups={groups} dict={dict} admins={adminsList} />
                <div className="mt-10">
                    <FilterHolidays holidays={uniqueHolidays} groups={groups} dict={dict} />
                </div>
            </div>
        </Panel>
    );
}
