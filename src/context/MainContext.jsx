import { createContext, useEffect, useState } from "react";

const initialValue = {};


const MainContext = createContext(initialValue);

const MainContextProvider = ({ children }) => {
    return (
        <MainContext.Provider value={{
        }}>
            {children}
        </MainContext.Provider>
    );
}

export { MainContext, MainContextProvider };