import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const logueado = localStorage.getItem("logueado");
        const usuario = localStorage.getItem("usuario");
        
        if (logueado === "true" && usuario) {
            setIsAuthenticated(true);
            setUser(usuario);
        }
    }, []);

    const login = (usuario) => {
        localStorage.setItem("logueado", "true");
        localStorage.setItem("usuario", usuario);
        setIsAuthenticated(true);
        setUser(usuario);
    };

    const logout = () => {
        localStorage.removeItem("logueado");
        localStorage.removeItem("usuario");
        setIsAuthenticated(false);
        setUser(null);
        window.location.href = "/";
    };

    return {
        isAuthenticated,
        user,
        login,
        logout
    };
};

