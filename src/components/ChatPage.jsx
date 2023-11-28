import {
    query,
    where,
    addDoc,
    collection,
    onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import { db } from "../config/firebase/firebase";
import { errorToast } from "../toasts/errorToast";
import { useAuth } from "../context/AuthContext";
import { nameFormatter } from "../helpers/nameFormatter";

function ChatPage() {
    const { username, avatar, room } = useAuth();
    const [messages, setMessages] = useState([]);

    const sendMessage = async (type, text) => {
        if (!text) {
            errorToast("Enter a message");
            return;
        }

        const colRef = collection(db, "messages");
        try {
            await addDoc(colRef, {
                room,
                avatar,
                username,
                sentAt: Date.now(),
                message: { type, text },
            });
        } catch (err) {
            errorToast(err.message);
        }
    };

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("auth"))?.isInChat) return;

        const sendWelcomeMessage = async (type) => {
            const colRef = collection(db, "messages");
            try {
                await addDoc(colRef, {
                    room,
                    avatar,
                    username,
                    sentAt: Date.now(),
                    message: {
                        type,
                        text: `${nameFormatter(username)} has joined`,
                    },
                });

                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        ...JSON.parse(localStorage.getItem("auth")),
                        isInChat: true,
                    })
                );
            } catch (err) {
                errorToast(err.message);
            }
        };
        sendWelcomeMessage("welcome");
    }, []);

    useEffect(() => {
        const colRef = collection(db, "messages");
        const messageQuery = query(colRef, where("room", "==", room));
        const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
            const msg = [];
            snapshot.forEach((snap) => {
                const messageObj = {
                    avatar: snap.data()?.avatar,
                    sentAt: snap.data().sentAt,
                    type: snap.data().message.type,
                    username: snap.data().username,
                    message: snap.data().message.text,
                };
                msg.push(messageObj);
            });
            setMessages(msg.sort((a, b) => a.sentAt - b.sentAt));
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="w-full h-screen flex flex-col justify-between items-center md:w-[80%] lg:w-[60%]">
            <ChatHeader />
            <ChatBody messages={messages} />
            <ChatInput sendMessage={sendMessage} />
        </div>
    );
}

export default ChatPage;
