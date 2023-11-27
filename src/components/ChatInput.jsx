import { useState } from "react";

function ChatInput({ sendMessage }) {
    const [messageInput, setMessageInput] = useState("");

    return (
        <div className="w-full rounded-[2rem] rounded-b-none bg-[#203A43] px-4 py-1 flex justify-between items-center grow-0 basis-[10%]">
            <input
                type="text"
                value={messageInput}
                placeholder="Type your message..."
                onChange={(e) => setMessageInput(e.target.value)}
                className="basis-[82%] px-2 py-2 outline-none text-[1.1rem] rounded-full bg-transparent border-[1.5px] border-gray-50 text-gray-50"
            />
            <img
                role="button"
                src="sendicon.png"
                alt="send button"
                onClick={() => {
                    sendMessage("message", messageInput);
                    setMessageInput("");
                }}
                className="w-[3rem] rounded-full"
            />
        </div>
    );
}

export default ChatInput;
