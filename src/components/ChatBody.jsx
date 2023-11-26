import Left from "./messages/Left";
import Joined from "./messages/Joined";
import Welcome from "./messages/Welcome";
import MyMessage from "./messages/MyMessage";
import { useAuth } from "../context/AuthContext";
import ScrollToBottom from "react-scroll-to-bottom";
import TheirMessage from "./messages/TheirMessage";
import { nameFormatter } from "../helpers/nameFormatter";

function ChatBody({ messages }) {
    const { username } = useAuth();

    return (
        <ScrollToBottom
            initialScrollBehavior="smooth"
            className="w-full rounded-3xl p-2 basis-[80%] grow overflow-scroll bg-red-500"
        >
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
                    return <Joined key={msg.sentAt} message={msg.message} />;
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
                if (msg.type === "left")
                    return (
                        <Left
                            key={msg.sentAt}
                            message={
                                msg.username === username
                                    ? "You left"
                                    : msg.message
                            }
                        />
                    );
            })}
        </ScrollToBottom>
    );
}

export default ChatBody;
