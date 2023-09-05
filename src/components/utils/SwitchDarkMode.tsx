"use client";

import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

export default function SwitchDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (
            localStorage.theme === "light" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: light)").matches)
        ) {
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
        }
    }, [isDarkMode]); // El segundo argumento es un arreglo vacío para que esto se ejecute solo una vez al montar el componente

    const handleToggle = () => {
        if (!isDarkMode) {
            localStorage.theme = "dark";
        } else {
            localStorage.theme = "light";
        }
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="flex items-center space-x-3">
            <Switch
                defaultChecked={false}
                onChange={handleToggle}
                className={`${
                    isDarkMode ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}>
                <span className="sr-only">Enable dark mode</span>
                <span
                    className={`${
                        isDarkMode ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
            </Switch>
            <span className="font-medium">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
        </div>
    );
}
