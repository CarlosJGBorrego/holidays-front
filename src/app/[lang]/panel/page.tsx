import Calendar from "@/components/home/Calendar";
import Panel from "@/components/layout/Panel";

interface Props {
    params: {
        lang: string;
    };
}

export default async function Home({ params: { lang } }: Props) {
    return (
        <Panel lang={lang}>
            <div>
                <Calendar />
            </div>
        </Panel>
    );
}
