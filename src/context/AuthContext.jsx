import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [avatar, setAvatar] = useState(
        () => JSON.parse(localStorage.getItem("auth"))?.avatar || ""
    );
    const [username, setUsername] = useState(
        () => JSON.parse(localStorage.getItem("auth"))?.username || ""
    );
    const [room, setRoom] = useState(
        () => JSON.parse(localStorage.getItem("auth"))?.room || ""
    );
    const [auth, setAuth] = useState(
        () => JSON.parse(localStorage.getItem("auth"))?.userID || ""
    );

    return (
        <AuthContext.Provider
            value={{
                room,
                setRoom,
                auth,
                setAuth,
                username,
                setUsername,
                avatar,
                setAvatar,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error(
            "You are trying to access the context outside of its provider"
        );
    return context;
};

export { AuthProvider, useAuth };
