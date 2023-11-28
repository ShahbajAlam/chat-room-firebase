import { timeFormatter } from "../../helpers/timeFormatter";

function MyMessage({ message, userName, time, avatar }) {
    return (
        <div className="w-fit max-w-[90%] ms-auto text-[1rem] font-semibold mb-1 message_animation origin-bottom-right md:text-2xl md:py-1">
            <div className=" flex justify-end items-end gap-2">
                <div className="bg-gradient-to-r from-[#8de9d5] to-[#32c4c0] px-4 py-1 rounded-3xl rounded-br-none text-gray-900 lg:text-base lg:px-6">
                    <p className="text-xs font-medium md:text-lg lg:text-sm">
                        {userName.split(" ")[0]}
                    </p>
                    <p className="break-words">{message}</p>
                </div>
                <img
                    src={avatar}
                    alt="avatar"
                    className="w-[2rem] rounded-full md:w-[3rem] lg:w-[2rem]"
                />
            </div>
            <p className="text-right text-xs text-gray-50 font-light me-[2.5rem] md:text-lg md:me-[3.5rem] lg:text-xs">
                {timeFormatter(time)}
            </p>
        </div>
    );
}

export default MyMessage;
