interface Props {
    params: {
        lang: string;
    };
}

export default async function Home({ params: { lang } }: Props) {
    return <div>Panel</div>;
}
