import "server-only";

const dictionaries = {
    en: () => import("./dictionaries/en.json").then((module) => module.default),
    es: () => import("./dictionaries/es.json").then((module) => module.default),
    fr: () => import("./dictionaries/fr.json").then((module) => module.default),
    ca: () => import("./dictionaries/ca.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
