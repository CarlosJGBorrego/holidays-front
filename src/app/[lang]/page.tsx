import SignIn from "@/components/forms/SignIn";
import SelectLanguage from "@/components/utils/SelectLanguage";
import { getDictionary } from "@/dictionaries";

interface Props {
    params: {
        lang: string;
    };
}

export default async function Home({ params: { lang } }: Props) {
    const dict = await getDictionary(lang);
    const availableLanguages = ["es"];

    return (
        <main className="h-full">
            <div className="pt-5 pr-10 flex justify-end">
                <SelectLanguage dict={dict} availableLanguages={availableLanguages} />
            </div>
            <SignIn dict={dict} lang={lang} />
        </main>
    );
}
