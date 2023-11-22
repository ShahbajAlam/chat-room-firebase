import { useEffect, useRef, useState } from "react";
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";

import { db } from "../config/firebase/firebase";
import { errorToast } from "../toasts/errorToast";
import { useAuth } from "../context/AuthContext";

function ChatPage() {
    const messageRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

    const { username, setUsername, room, setInChat, setAuth, setRoom } =
        useAuth();

    const sendMessage = async (type) => {
        const colRef = collection(db, "messages");
        try {
            await addDoc(colRef, {
                room,
                username,
                sentAt: Date.now(),
                message: {
                    type,
                    text: messageRef.current.value,
                },
            });
        } catch (err) {
            errorToast(err.message);
        }
    };
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("auth"))?.isInChat) return;

        console.log("welcome");
        const welcome = async (type) => {
            const colRef = collection(db, "messages");
            try {
                await addDoc(colRef, {
                    room,
                    username,
                    sentAt: Date.now(),
                    message: {
                        type,
                        text: `${username} has joined`,
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
                console.log(err);
                errorToast(err.message);
            }
        };
        welcome("welcome");
    }, []);

    console.log(messages);

    useEffect(() => {
        const colRef = collection(db, "users");
        const usersQuery = query(colRef, where("room", "==", room));
        const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
            const user = [];
            snapshot.forEach((snap) => {
                user.push(snap.data().username);
            });
            setUsers([...new Set([...user])]);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const colRef = collection(db, "messages");
        const messageQuery = query(colRef, where("room", "==", room));
        const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
            const msg = [];
            snapshot.forEach((snap) => {
                const messageObj = {
                    username: snap.data().username,
                    message: snap.data().message.text,
                    sentAt: snap.data().sentAt,
                    type: snap.data().message.type,
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
                    text: `${username} has left`,
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
        <div className="w-[50%] h-[60vh] mx-auto border-2 border-black">
            <h1>Hello {username}</h1>
            <div>
                {messages.map((msg, i) => {
                    if (username === msg.username)
                        return (
                            <p
                                key={i}
                                className="bg-blue-500 text-right w-fit max-w-[70%] ms-auto"
                            >
                                {msg.message}
                            </p>
                        );
                    if (username !== msg.username && msg.type !== "left")
                        return (
                            <p
                                key={i}
                                className="bg-yellow-500 text-left w-fit max-w-[70%] me-auto"
                            >
                                {msg.message}
                            </p>
                        );
                    if (msg.type === "left")
                        return <p className="bg-red-700">{msg.message}</p>;
                })}
                <input type="text" ref={messageRef} />
                <button onClick={sendMessage.bind(null, "message")}>
                    Send
                </button>
            </div>
            <button onClick={logout}>Log Out</button>
        </div>
    );
}

export default ChatPage;
