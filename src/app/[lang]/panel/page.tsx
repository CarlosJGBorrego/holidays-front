import Calendar from "@/components/home/Calendar";
import Panel from "@/components/layout/Panel";
import { getDictionary } from "@/dictionaries";

interface Props {
    params: {
        lang: string;
    };
}

export default async function Home({ params: { lang } }: Props) {
    const dict = await getDictionary(lang);
    return (
        <Panel lang={lang} dict={dict}>
            <div>
                <Calendar dict={dict} />
            </div>
        </Panel>
    );
}
