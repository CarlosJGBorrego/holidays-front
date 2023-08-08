import Panel from "@/components/layout/Panel";
import Profile from "@/components/profile/Profile";
import { getDictionary } from "@/dictionaries";
import { cookies } from "next/dist/client/components/headers";

interface Props {
    params: {
        lang: string;
    };
}

export default async function Page({ params: { lang } }: Props) {
    const cookiesStore = cookies();
    const token = cookiesStore.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!)?.value;
    const dict = await getDictionary(lang);
    return (
        <Panel lang={lang} dict={dict}>
            <Profile dict={dict} token={token!} />
        </Panel>
    );
}
