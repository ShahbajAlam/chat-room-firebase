import { useEffect, useState } from "react";

function ChatInput({ sendMessage }) {
    const [messageInput, setMessageInput] = useState("");

    return (
        <div className="w-full rounded-[2rem] rounded-b-none bg-[#203A43] px-4 py-1 flex justify-between items-center grow-0 basis-[10%] md:px-6 md:rounded-[3rem] lg:basis-[8%] lg:py-3 lg:justify-center lg:gap-8">
            <input
                type="text"
                value={messageInput}
                placeholder="Type your message..."
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        sendMessage("message", messageInput);
                        setMessageInput("");
                    }
                }}
                className="basis-[82%] p-2 outline-none text-[1.1rem] rounded-full bg-transparent border-[1.5px] border-gray-50 text-gray-50 md:text-2xl md:p-3 lg:text-[1rem] lg:py-1 lg:px-4"
            />
            <img
                role="button"
                src="sendicon.png"
                alt="send button"
                onClick={() => {
                    sendMessage("message", messageInput);
                    setMessageInput("");
                }}
                className="w-[3rem] rounded-full md:w-[4rem] lg:w-[2.5rem]"
            />
        </div>
    );
}

export default ChatInput;
