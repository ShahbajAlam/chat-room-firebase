import { useRef } from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "@react-hookz/web";
import { addDoc, collection } from "firebase/firestore";

import { db } from "../config/firebase/firebase";
import { errorToast } from "../toasts/errorToast";
import { useAuth } from "../context/AuthContext";
import { nameFormatter } from "../helpers/nameFormatter";

function Modal({ setIsModalOpen }) {
    const modalRef = useRef(null);
    const { room, username, setRoom, setUsername, setAuth, setAvatar } =
        useAuth();
    useClickOutside(modalRef, () => setIsModalOpen(false));

    const stayInChat = () => setIsModalOpen(false);

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
            <motion.div
                ref={modalRef}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-[80%] min-h-[10rem] bg-gradient-to-bl from-[#D3CCE3] to-[#E9E4F0] rounded-2xl flex flex-col justify-between p-4 text-gray-950"
            >
                <h1 className="text-center text-xl font-semibold">
                    Do you want to leave the chat?
                </h1>
                <div className="flex justify-center gap-12">
                    <button
                        onClick={stayInChat}
                        className="border-none outline-none px-6 py-2 rounded-xl bg-green-600 text-xl text-gray-200 font-semibold"
                    >
                        NO
                    </button>
                    <button
                        onClick={leaveChat}
                        className="border-none outline-none px-6 py-2 rounded-xl bg-red-600 text-xl text-gray-200 font-semibold"
                    >
                        YES
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default Modal;
