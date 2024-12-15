import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // Check localStorage for token on app load
    useEffect(() => {
        
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get("http://localhost:3003/api/verifyToken", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setUser(res.data.user);
                })
                .catch(() => {
                    localStorage.removeItem("token");
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
