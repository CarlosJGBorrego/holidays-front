"use client";

import { apiProfile } from "@/api";
import { ILanguage } from "@/components/interfaces/language";
import useApi from "@/hooks/useApi";
import Cookies from "js-cookie";
import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

interface Props {
    lang: string;
    children: ReactNode;
}

export const AuthContext = createContext({
    lang: "es",
    onChange: (locale: ILanguage) => {},
    login: (token: string) => {},
    isLogin: false,
    authToken: null,
    user: {
        data: null,
        isLoading: true,
        error: null,
    },
    notificationOnChange: (value: boolean) => {},
    notification: false,
    action: "",
    actionOnChange: (status: string) => {},
    typeNotification: "",
    typeNotificationOnChange: (status: string) => {},
});

export default function AuthContextProvider({ lang, children }: Props) {
    const [authToken, setAuthToken] = useState<any>(null);
    const [language, setLanguage] = useState<string>(lang);
    const [isSuccessNotification, setIsSuccessNotification] = useState<boolean>(false);
    const [actionStatus, setActionStatus] = useState<string>("");
    const [typeNotificationStatus, setTypeNotificationStatus] = useState<string>("");

    useEffect(() => {
        const initializeAuth = () => {
            const cookieToken = Cookies.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!);
            if (cookieToken) {
                setAuthToken(cookieToken);
            }
        };
        initializeAuth();
    }, []);

    const {
        data: user,
        isLoading,
        error,
    } = useApi(authToken ? "/panel" : null, apiProfile, [authToken!]);

    const login = useCallback((token: string) => {
        const today = new Date();
        const dateExpires = new Date(new Date().setDate(today.getDate() + 30));
        const diff = dateExpires.getTime() - today.getTime();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        Cookies.set(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!, token!, {
            secure: true,
            sameSites: "strict",
            expires: days,
            path: "/",
        });
        setAuthToken(token);
    }, []);

    const onChange = useCallback((language: ILanguage) => {
        setLanguage(language?.locale);
    }, []);

    let notification = isSuccessNotification;

    const notificationOnChange = useCallback((value: boolean) => {
        setIsSuccessNotification(value);
    }, []);

    let action = actionStatus;

    const actionOnChange = useCallback((status: string) => {
        setActionStatus(status);
    }, []);

    let typeNotification = typeNotificationStatus;

    const typeNotificationOnChange = useCallback((status: string) => {
        setTypeNotificationStatus(status);
    }, []);

    const value = useMemo(
        () => ({
            lang,
            onChange,
            login,
            isLogin: authToken !== null,
            authToken: authToken,
            user: {
                ...user,
                isLoading,
                error,
            },
            notification,
            notificationOnChange,
            action,
            actionOnChange,
            typeNotification,
            typeNotificationOnChange,
        }),
        [
            authToken,
            login,
            user,
            isLoading,
            error,
            lang,
            onChange,
            notification,
            notificationOnChange,
            action,
            actionOnChange,
            typeNotification,
            typeNotificationOnChange,
        ]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}
