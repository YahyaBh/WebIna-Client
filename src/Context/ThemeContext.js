import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
import Loading from "../Components/Loading/Loading";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    

    useEffect(() => {
        const savedThemeMode = Cookies.get("__THEME_MODE");

        if (savedThemeMode) {
            setIsDarkMode(savedThemeMode === "true");
        } else {
            // Set a default theme mode if no saved value is found
            setIsDarkMode(false);
        }
    }, []);

    useEffect(() => {

        setLoading(true)
        const randomLoadingNumber = Math.floor(Math.random() * (2000 - 500 + 1)) + 500;
        setTimeout(() => {
            setLoading(false)
        }, randomLoadingNumber);

        if (isDarkMode) {
            Cookies.set("__THEME_MODE", true);
            document.documentElement.style.setProperty('--primary-color-dark', '#1E1E1E');
            document.documentElement.style.setProperty('--primary-color-grey', '#3C3C3C');
            document.documentElement.style.setProperty('--dark-color-primary', '#FFE662');
            document.documentElement.style.setProperty('--blog-card', '#3C3C3C');
            document.documentElement.style.setProperty('--light-color', '#1e1e1e');
            document.documentElement.style.setProperty('--black-color', '#fff');
            document.documentElement.style.setProperty('--secondary-color', '#1e1e1e');
            document.documentElement.style.setProperty('--cards-color', '#F9EA9B');


            document.getElementsByClassName('background-grad');

            document.documentElement.style.setProperty('transition', 'all 8s ease');

            setTimeout(() => {
                document.documentElement.style.setProperty('transition', '');
            }, 8000);


        } else {
            Cookies.set("__THEME_MODE", false);
            document.documentElement.style.setProperty('--primary-color-dark', '#FFE662');
            document.documentElement.style.setProperty('--primary-color-grey', '#FFFFFF');
            document.documentElement.style.setProperty('--dark-color-primary', '#1E1E1E');
            document.documentElement.style.setProperty('--blog-card', '#F1E7B1');
            document.documentElement.style.setProperty('--light-color', '#fff');
            document.documentElement.style.setProperty('--black-color', '#1e1e1e');
            document.documentElement.style.setProperty('--secondary-color', '#fff');
            document.documentElement.style.setProperty('--cards-color', '#131313');




            document.documentElement.style.setProperty('transition', 'all 8s ease');

            setTimeout(() => {
                document.documentElement.style.setProperty('transition', '');
            }, 8000);
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {loading ? <Loading /> : ''}
            {children}
        </ThemeContext.Provider>
    );
};