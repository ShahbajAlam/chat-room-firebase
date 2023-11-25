import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./components/Login";
import ChatPage from "./components/ChatPage";
import JoinRoom from "./components/JoinRoom";
import { useAuth } from "./context/AuthContext";

function App() {
    const navigate = useNavigate();
    const { auth, room } = useAuth();

    useEffect(() => {
        if (!auth) navigate("/");
        if (auth) navigate("/joinroom");
        if (auth && room) navigate("/chat");
    }, [auth, room]);

    return (
        <div className="bg-[#28282B] min-h-screen px-2 flex justify-center items-center">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/joinroom" element={<JoinRoom />} />
                <Route path="/chat" element={<ChatPage />} />
            </Routes>
        </div>
    );
}

export default App;
