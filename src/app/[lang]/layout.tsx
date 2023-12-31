import AuthContextProvider from "@/contexts/authContext";
import "./../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Holidays Capitole",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: string };
}) {
    return (
        <html className="dark" lang={params.lang}>
            <body className={inter?.className}>
                <AuthContextProvider lang={params.lang}>{children}</AuthContextProvider>
            </body>
        </html>
    );
}
