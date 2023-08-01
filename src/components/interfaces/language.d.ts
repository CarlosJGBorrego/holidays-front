import { StaticImageData } from "next/image";

export interface ILanguage {
    id: number;
    name: string;
    locale: string;
    avatar: StaticImageData;
}
