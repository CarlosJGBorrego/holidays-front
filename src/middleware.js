import { NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negociator from "negotiator";
import { i18n } from "@/i18n-config";
import { apiProfile, apiLanguages } from "@/api";

function getLocale(request) {
    const negotiatorHeaders = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    let languages = new Negociator({ headers: negotiatorHeaders }).languages();
    return matchLocale(languages, i18n.locales, i18n.defaultLocale);
}

export async function middleware(request) {
    // Check if there is any supported locale in the pathname
    const pathname = request.nextUrl.pathname;
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    let locale = getLocale(request);
    const availableLanguages = await apiLanguages();

    if (!availableLanguages.includes(locale)) {
        locale = availableLanguages[0];
    }

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        // e.g. incoming request is /products
        // The new URL is now /en-US/products

        return NextResponse.redirect(new URL(`/${locale}/`?.replace(/\/{2,}/g, "/"), request.url));
    }

    const cookieName = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME;
    const authToken = request.cookies.get(cookieName)?.value;
    const path = request.nextUrl.pathname;

    if (path === `/${locale}`) {
        if (!authToken) {
            return NextResponse.next();
        } else {
            try {
                await apiProfile(authToken);
                return NextResponse.redirect(new URL(`/${locale}/panel`, request.url));
            } catch (err) {
                const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
                response.cookies.delete(cookieName);
                return response;
            }
        }
    }

    if ((path.includes("/panel") && !authToken) || path.includes("/logout")) {
        const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
        response.cookies.delete(cookieName);
        return response;
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!_next).*)",
        // Optional: only run on root (/) URL
        // '/'
    ],
};
