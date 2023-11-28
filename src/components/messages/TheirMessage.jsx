import { timeFormatter } from "../../helpers/timeFormatter";

function TheirMessage({ message, userName, time, avatar }) {
    return (
        <div className="w-fit max-w-[90%] me-auto text-[1rem] font-semibold mb-1 message_animation origin-bottom-left md:text-2xl md:py-1">
            <div className=" flex justify-end items-end gap-2">
                <img
                    src={avatar}
                    alt="avatar"
                    className="w-[2rem] rounded-full md:w-[3rem] lg:w-[2rem]"
                />
                <div className="bg-gradient-to-r from-[#f4d941] to-[#ec8235] px-4 py-1 rounded-3xl rounded-bl-none text-gray-900 lg:text-base lg:px-6">
                    <p className="text-xs font-medium md:text-lg lg:text-sm">
                        {userName.split(" ")[0]}
                    </p>
                    <p className="break-words">{message}</p>
                </div>
            </div>
            <p className="text-xs text-gray-50 font-light ms-[2.5rem] md:text-lg md:ms-[3.5rem] lg:text-xs">
                {timeFormatter(time)}
            </p>
        </div>
    );
}

export default TheirMessage;
