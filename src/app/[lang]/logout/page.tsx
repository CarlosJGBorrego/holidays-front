import { getDictionary } from "@/dictionaries";
import Logout from "@/components/forms/Logout";

interface Props {
    params: {
        lang: string;
    };
}

export default async function Page({ params: { lang } }: Props) {
    const dict: any = await getDictionary(lang);

    return <Logout dict={dict} />;
}
