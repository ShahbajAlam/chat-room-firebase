import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./components/Login";
import ChatPage from "./components/ChatPage";
import { useAuth } from "./context/AuthContext";

function App() {
    const { auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) navigate("/");
        if (auth) navigate("/chat");
    }, [auth]);

    return (
        <div className="bg-[#28282B] min-h-screen flex justify-center items-center">
            <Toaster />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/chat" element={<ChatPage />} />
            </Routes>
        </div>
    );
}

export default App;
