import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [isAsideOpen, setIsAsideOpen] = useState(false);
    const [isAsideResOpen, setIsAsideResOpen] = useState(false);

    const toggleAside = () => {
        setIsAsideOpen(!isAsideOpen);
    };

    const toggleAsideRes = () => {
        setIsAsideResOpen(!isAsideResOpen);
    }

    return (
        <StoreContext.Provider value={{ isAsideOpen, toggleAside , isAsideResOpen, toggleAsideRes }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStoreContext = () => {
    return useContext(StoreContext);
};