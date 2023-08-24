import { apiHolidaysByUserEmail, apiProfile } from "@/api";
import Calendar from "@/components/home/Calendar";
import { IHoliday } from "@/components/interfaces/holiday";
import { IUser } from "@/components/interfaces/user";
import Panel from "@/components/layout/Panel";
import { getDictionary } from "@/dictionaries";
import { cookies } from "next/dist/client/components/headers";

interface Props {
    params: {
        lang: string;
    };
}

export default async function Home({ params: { lang } }: Props) {
    const cookiesStore = cookies();
    const token = cookiesStore.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!)?.value;
    const dict = await getDictionary(lang);

    const user: IUser = await apiProfile(token);
    const myHolidays: IHoliday[] = await apiHolidaysByUserEmail(user?.email, token);

    return (
        <Panel lang={lang} dict={dict} user={user}>
            <Calendar dict={dict} holidays={myHolidays} user={user} token={token!} />
        </Panel>
    );
}
