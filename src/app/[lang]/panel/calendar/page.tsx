import Panel from "@/components/layout/Panel";

interface Props {
    params: {
        lang: string;
    };
}

export default async function Page({ params: { lang } }: Props) {
    return (
        <Panel lang={lang}>
            <div>Calendario y grupos</div>
        </Panel>
    );
}
