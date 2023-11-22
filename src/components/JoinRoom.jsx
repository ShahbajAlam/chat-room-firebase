import { useRef } from "react";
import { motion } from "framer-motion";
import { addDoc, collection } from "firebase/firestore";

import { db } from "../config/firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { errorToast } from "../toasts/errorToast";

function JoinRoom() {
    const roomInputRef = useRef();
    const { auth, username, setRoom } = useAuth();

    const joinroom = async () => {
        if (!roomInputRef.current.value) {
            errorToast("Enter a room number");
            return;
        }

        localStorage.setItem(
            "auth",
            JSON.stringify({
                ...JSON.parse(localStorage.getItem("auth")),
                room: roomInputRef.current.value,
            })
        );
        setRoom(roomInputRef.current.value);

        try {
            await addDoc(collection(db, "users"), {
                username,
                userID: auth,
                room: roomInputRef.current.value,
            });
        } catch (err) {
            errorToast(err.message);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="p-4 rounded-xl bg-gradient-to-bl from-[#22314e] to-[#243B55] w-[90%] flex flex-col items-start text-gray-100"
        >
            <label htmlFor="room" className="text-lg mb-2">
                Room
            </label>
            <input
                id="room"
                type="number"
                ref={roomInputRef}
                className="w-full bg-[#bdcff0] border-none outline-none rounded-lg text-lg px-2 py-1 mb-2 caret-[#243B55] text-black"
            />
            <button
                onClick={joinroom}
                className="bg-[#308677] px-4 py-1 text-lg font-semibold rounded-lg self-end mt-2"
            >
                Join Room
            </button>
        </motion.div>
    );
}

export default JoinRoom;
