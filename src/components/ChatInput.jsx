import { useState } from "react";

function ChatInput({ sendMessage }) {
    const [messageInput, setMessageInput] = useState("");

    return (
        <div className="w-full rounded-full bg-yellow-400 px-4 py-2 flex justify-between items-center basis-[10%]">
            <input
                type="text"
                value={messageInput}
                placeholder="start typing..."
                onChange={(e) => setMessageInput(e.target.value)}
                className="basis-[82%] px-2 py-1 outline-none text-[1.1rem] rounded-full bg-transparent border-[1.5px] border-gray-900"
            />
            <img
                src="sendicon.png"
                alt="send button"
                onClick={() => {
                    sendMessage("message", messageInput);
                    setMessageInput("");
                }}
                className="w-[2.5rem] rounded-full basis-[15%]"
            />
        </div>
    );
}

export default ChatInput;
