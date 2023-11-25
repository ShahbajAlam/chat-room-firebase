function UserJoined({ message }) {
    return (
        <p className="bg-gradient-to-r from-[#82f4b1] to-[#30c67c] w-fit px-6 py-2 text-center mx-auto rounded-3xl text-lg font-semibold mb-4 text-gray-900 md:text-2xl md:py-3 lg:text-base">
            {message}
        </p>
    );
}

export default UserJoined;
