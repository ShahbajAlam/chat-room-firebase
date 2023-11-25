import { useAuth } from "../context/AuthContext";

function ChatHeader() {
    const { room, setRoom } = useAuth();

    const leaveChat = () => {
        localStorage.setItem(
            "auth",
            JSON.stringify({
                ...JSON.parse(localStorage.getItem("auth")),
                room: "",
                isInChat: false,
            })
        );
        setRoom("");
    };

    return (
        <div className="w-full rounded-full bg-yellow-400 px-4 py-2 flex justify-between items-center basis-[10%]">
            <img
                src={JSON.parse(localStorage.getItem("auth"))?.avatar}
                alt="avatar"
                role="button"
                className="w-[2.5rem] rounded-full"
            />
            <h1>Room : {room}</h1>
            <img
                role="button"
                src="leave.png"
                alt="leave button"
                onClick={leaveChat}
                className="w-[2.5rem] rounded-full"
            />
        </div>
    );
}

export default ChatHeader;
