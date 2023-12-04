import Cookies from "js-cookie";
import React, { createContext, useEffect, useState, useCallback, useLayoutEffect } from "react";
import Loading from "../Components/Loading/Loading";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedThemeMode = Cookies.get("__THEME_MODE");
        return savedThemeMode === "true";
    });
    const [loading, setLoading] = useState(false);

    const toggleTheme = useCallback(() => {
        setIsDarkMode((prevMode) => !prevMode);
    }, []);

    useLayoutEffect(() => {
        setLoading(true);
        const randomLoadingNumber = Math.floor(Math.random() * (2000 - 500 + 1)) + 500;
        setTimeout(() => {
            setLoading(false);
        }, randomLoadingNumber);
    }, []);

    useEffect(() => {
        const setTheme = (darkMode) => {
            Cookies.set("__THEME_MODE", darkMode);
            document.documentElement.style.setProperty(
                "--primary-color-dark",
                darkMode ? "#1E1E1E" : "#FFE662"
            );
            document.documentElement.style.setProperty(
                "--primary-color-grey",
                darkMode ? "#3C3C3C" : "#FFFFFF"
            );
            document.documentElement.style.setProperty(
                "--dark-color-primary",
                darkMode ? "#FFE662" : "#1E1E1E"
            );
            document.documentElement.style.setProperty(
                "--blog-card",
                darkMode ? "#3C3C3C" : "#F1E7B1"
            );
            document.documentElement.style.setProperty(
                "--light-color",
                darkMode ? "#1e1e1e" : "#fff"
            );
            document.documentElement.style.setProperty(
                "--black-color",
                darkMode ? "#fff" : "#1e1e1e"
            );
            document.documentElement.style.setProperty(
                "--secondary-color",
                darkMode ? "#1e1e1e" : "#fff"
            );
            document.documentElement.style.setProperty(
                "--cards-color",
                darkMode ? "#F9EA9B" : "#131313"
            );

            // Additional Style Properties
            document.documentElement.style.setProperty(
                "--example-property",
                darkMode ? "#dark-mode-value" : "#light-mode-value"
            );
            document.documentElement.style.setProperty(
                "--another-property",
                darkMode ? "#dark-mode-value" : "#light-mode-value"
            );
        };

        setTheme(isDarkMode);

        document.documentElement.style.setProperty("transition", "all 8s ease");

        const transitionTimeout = setTimeout(() => {
            document.documentElement.style.setProperty("transition", "");
        }, 8000);

        return () => clearTimeout(transitionTimeout);
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {loading ? <Loading /> : null}
            {children}
        </ThemeContext.Provider>
    );
};
