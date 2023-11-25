import {
    query,
    where,
    addDoc,
    collection,
    onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import Welcome from "./messages/Welcome";
import { db } from "../config/firebase/firebase";
import { errorToast } from "../toasts/errorToast";
import MyMessage from "./messages/MyMessage";
import { useAuth } from "../context/AuthContext";
import TheirMessage from "./messages/TheirMessage";
import { nameFormatter } from "../helpers/nameFormatter";

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const { username, auth, avatar, setUsername, room, setAuth, setRoom } =
        useAuth();

    const sendMessage = async (type, text) => {
        const colRef = collection(db, "messages");
        try {
            await addDoc(colRef, {
                room,
                avatar,
                username,
                userID: auth,
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

    console.log(messages);

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

    const logout = async () => {
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
        setUsername("");
        setInChat(false);
    };

    return (
        <div className="w-full min-h-screen flex flex-col justify-between items-center">
            <ChatHeader />
            <div className="w-full rounded-3xl py-4 px-2 basis-[80%] grow bg-red-500">
                {messages.map((msg) => {
                    if (msg.username === username && msg.type === "welcome")
                        return (
                            <Welcome
                                key={msg.sentAt}
                                message={`Welcome to the chat, ${nameFormatter(
                                    msg.username
                                )}`}
                            />
                        );
                    if (msg.username !== username && msg.type === "welcome")
                        return (
                            <Welcome key={msg.sentAt} message={msg.message} />
                        );
                    if (msg.username === username && msg.type === "message")
                        return (
                            <MyMessage
                                key={msg.sentAt}
                                time={msg.sentAt}
                                avatar={msg.avatar}
                                message={msg.message}
                                userName={nameFormatter(msg.username)}
                            />
                        );
                    if (msg.username !== username && msg.type === "message")
                        return (
                            <TheirMessage
                                key={msg.sentAt}
                                time={msg.sentAt}
                                avatar={msg.avatar}
                                message={msg.message}
                                userName={nameFormatter(msg.username)}
                            />
                        );
                    if (username !== msg.username && msg.type !== "left")
                        return (
                            <p
                                key={msg.sentAt}
                                className="bg-yellow-500 text-left w-fit max-w-[70%] me-auto"
                            >
                                {msg.message}
                            </p>
                        );
                    if (msg.type === "left")
                        return <p className="bg-red-700">{msg.message}</p>;
                })}
            </div>
            <ChatInput sendMessage={sendMessage} />
        </div>
    );
}

export default ChatPage;
