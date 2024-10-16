import { createContext, useContext, useEffect, useState } from "react";


const useAuthStateContextValue = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, [isAuthenticated]);

    return { isAuthenticated, setIsAuthenticated };
}


type AuthStateContextValue = ReturnType<typeof useAuthStateContextValue>;

export const AuthStateContext = createContext<AuthStateContextValue | undefined>(undefined);

export const AuthStateContextProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useAuthStateContextValue();
    return <AuthStateContext.Provider value={value}>{children}</AuthStateContext.Provider>;
};

export const useAuthStateContextProvider = () => {
    const context = useContext(AuthStateContext);
    if (!context) {
        throw new Error("useAuthState must be used within a AuthStateProvider");
    }
    return context;
};
