function Loading() {
    return (
        <div className="absolute inset-0 z-[2] flex justify-center items-center">
            <img
                src="loading.svg"
                alt="loading"
                className="w-[100px] md:w-[175px]"
            />
        </div>
    );
}

export default Loading;
