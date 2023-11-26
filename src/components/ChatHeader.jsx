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
            <div className="w-full rounded-full bg-yellow-400 px-4 py-2 flex justify-between items-center grow-0 basis-[10%]">
                <img
                    src={JSON.parse(localStorage.getItem("auth"))?.avatar}
                    alt="avatar"
                    role="button"
                    className="w-[2.75rem] rounded-full"
                />
                <h1>Room : {room}</h1>
                <img
                    role="button"
                    src="leave.png"
                    alt="leave button"
                    onClick={leaveChat}
                    className="w-[2.75rem] rounded-full"
                />
            </div>
        </Fragment>
    );
}

export default ChatHeader;
