import { useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useClickOutside } from "@react-hookz/web";

import { db } from "../config/firebase/firebase";
import { errorToast } from "../toasts/errorToast";
import { useAuth } from "../context/AuthContext";
import { nameFormatter } from "../helpers/nameFormatter";

function Modal({ setIsModalOpen }) {
    const modalRef = useRef(null);
    const { room, username, setRoom, setUsername, setAuth, setAvatar } =
        useAuth();
    useClickOutside(modalRef, () => setIsModalOpen(false));

    const leaveChat = async () => {
        const colRef = collection(db, "messages");
        try {
            await addDoc(colRef, {
                room,
                username,
                sentAt: Date.now(),
                message: {
                    type: "left",
                    text: `${nameFormatter(username)} has left`,
                },
            });
        } catch (err) {
            errorToast(err.message);
        }
        localStorage.removeItem("auth");
        setAuth("");
        setRoom("");
        setAvatar("");
        setUsername("");
    };

    return (
        <div className="bg-[rgba(0,0,0,0.7)] backdrop-blur-sm fixed inset-0 z-[2] flex justify-center items-center">
            <div
                ref={modalRef}
                className="w-[80%] min-h-[15rem] bg-gray-100 rounded-xl flex flex-col justify-between p-4"
            >
                <h1 className="text-center">Do you want to leave the chat?</h1>
                <button onClick={leaveChat}>Leave</button>
            </div>
        </div>
    );
}

export default Modal;
