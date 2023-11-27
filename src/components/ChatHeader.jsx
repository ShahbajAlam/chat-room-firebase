import { Fragment, useState } from "react";

import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";

function ChatHeader() {
    const { room } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const leaveChat = () => setIsModalOpen(true);

    return (
        <Fragment>
            {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
            <div className="w-full rounded-[2rem] rounded-t-none bg-[#203A43] px-4 py-1 flex justify-between items-center grow-0 basis-[10%] text-gray-50">
                <img
                    src={JSON.parse(localStorage.getItem("auth"))?.avatar}
                    alt="avatar"
                    className="w-[3rem] rounded-full"
                />
                <h1 className="text-[1.25rem] font-semibold">Room : {room}</h1>
                <img
                    role="button"
                    src="leave.png"
                    alt="leave button"
                    onClick={leaveChat}
                    className="w-[3rem] rounded-full"
                />
            </div>
        </Fragment>
    );
}

export default ChatHeader;
