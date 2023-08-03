export default function getTranslationMonth(month: string, dict: any) {
    switch (month) {
        case "january":
            return dict?.panel?.months?.january;
        case "february":
            return dict?.panel?.months?.february;
        case "march":
            return dict?.panel?.months?.march;
        case "april":
            return dict?.panel?.months?.april;
        case "may":
            return dict?.panel?.months?.may;
        case "june":
            return dict?.panel?.months?.june;
        case "july":
            return dict?.panel?.months?.july;
        case "august":
            return dict?.panel?.months?.august;
        case "september":
            return dict?.panel?.months?.september;
        case "october":
            return dict?.panel?.months?.october;
        case "november":
            return dict?.panel?.months?.november;
        case "december":
            return dict?.panel?.months?.december;
        default:
            return "";
    }
}
