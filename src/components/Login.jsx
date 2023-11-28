import { motion } from "framer-motion";
import { signInAnonymously } from "firebase/auth";

import { errorToast } from "../toasts/errorToast";
import { auth } from "../config/firebase/firebase";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { username, room, setUsername, setRoom, setAuth, avatar, setAvatar } =
        useAuth();

    const signin = (e) => {
        e.preventDefault();

        if (!username || !room || !avatar) {
            errorToast("Please enter all the fields");
            return;
        }

        signInAnonymously(auth)
            .then((data) => {
                setAuth(data.user.uid);

                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        room,
                        avatar,
                        username,
                        userID: data.user.uid,
                    })
                );
            })
            .catch((err) => errorToast(err.message));
    };

    return (
        <motion.form
            onSubmit={signin}
            className="p-4 rounded-xl bg-gradient-to-bl from-[#22314e] to-[#243B55] w-[90%] flex flex-col items-start text-gray-100 md:w-[70%] md:p-8 lg:w-[45%]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <label
                htmlFor="username"
                className="text-lg mb-2 md:text-2xl md:mb-3"
            >
                Username
            </label>
            <input
                type="text"
                id="username"
                maxLength={15}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#bdcff0] border-none outline-none rounded-lg text-lg px-2 py-1 mb-2 caret-[#243B55] text-black md:text-2xl md:px-3 md:py-2"
            />

            <label htmlFor="room" className="text-lg mb-2 md:text-2xl md:mb-3">
                Room
            </label>
            <input
                id="room"
                type="number"
                maxLength={5}
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full bg-[#bdcff0] border-none outline-none rounded-lg text-lg px-2 py-1 mb-2 caret-[#243B55] text-black md:text-2xl md:px-3 md:py-2"
            />

            <p className="text-lg mb-2 md:text-2xl md:mb-3">Choose an avatar</p>
            <div className="self-center flex justify-center items-center gap-8 mb-2">
                <label htmlFor="man">
                    <img
                        role="button"
                        src="man.png"
                        alt="man avatar"
                        className={`w-[48px] md:w-[64px] ${
                            avatar === "man.png"
                                ? "border-4 rounded-full border-green-400"
                                : ""
                        }`}
                    />
                </label>
                <input
                    hidden
                    id="man"
                    type="radio"
                    name="avatar"
                    value="man.png"
                    onChange={(e) => setAvatar(e.target.value)}
                />

                <label htmlFor="woman">
                    <img
                        role="button"
                        src="woman.png"
                        alt="woman avatar"
                        className={`w-[48px] md:w-[64px] ${
                            avatar === "woman.png"
                                ? "border-4 rounded-full border-green-400"
                                : ""
                        }`}
                    />
                </label>
                <input
                    hidden
                    id="woman"
                    type="radio"
                    name="avatar"
                    value="woman.png"
                    onChange={(e) => setAvatar(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="bg-[#308677] px-4 py-1 text-lg font-semibold rounded-lg self-end mt-2 md:text-2xl md:py-2"
            >
                Log In
            </button>
        </motion.form>
    );
}

export default Login;
