import { apiLogin, apiProfile } from "./security";
import { apiHolidaysByUserEmail, apiCreateHoliday, apiDeleteHoliday } from "./holidays";
import { apiUpdateProfile, apiChangePassword } from "./profile";

export const ROUTE_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export {
    apiLogin,
    apiProfile,
    apiHolidaysByUserEmail,
    apiCreateHoliday,
    apiDeleteHoliday,
    apiUpdateProfile,
    apiChangePassword,
};
