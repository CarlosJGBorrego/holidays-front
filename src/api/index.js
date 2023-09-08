import { apiLogin, apiProfile } from "./security";
import { apiHolidaysByUserEmail, apiCreateHoliday, apiDeleteHoliday } from "./holidays";
import { apiUpdateProfile, apiChangePassword, apiDeleteUser } from "./profile";
import {
    apiGroupsByUser,
    apiAdminsGroups,
    apiCreateGroup,
    apiCreateUserGroup,
    apiUpdateGroup,
    apiDeleteGroup,
    apiDeleteUserGroup,
    apiFindOneGroup,
} from "./groups";

export const ROUTE_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export {
    apiLogin,
    apiProfile,
    apiHolidaysByUserEmail,
    apiCreateHoliday,
    apiDeleteHoliday,
    apiUpdateProfile,
    apiChangePassword,
    apiDeleteUser,
    apiGroupsByUser,
    apiAdminsGroups,
    apiCreateGroup,
    apiCreateUserGroup,
    apiUpdateGroup,
    apiDeleteGroup,
    apiDeleteUserGroup,
    apiFindOneGroup,
};
