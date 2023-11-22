import toast from "react-hot-toast";

function errorToast(errorMessage) {
    toast.error(errorMessage, {
        duration: 3000,
        id: Date.now().toString(),
        position: "top-center",
        style: {
            padding: 8,
            paddingInline: 16,
            borderRadius: 36,
            textAlign: "center",
            wordWrap: "break-word",
        },
    });
}

export { errorToast };
