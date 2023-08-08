import Panel from "@/components/layout/Panel";
import Profile from "@/components/profile/Profile";
import { getDictionary } from "@/dictionaries";

interface Props {
    params: {
        lang: string;
    };
}

export default async function Page({ params: { lang } }: Props) {
    const dict = await getDictionary(lang);
    return (
        <Panel lang={lang} dict={dict}>
            <Profile dict={dict} />
        </Panel>
    );
}
