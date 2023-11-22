import toast from "react-hot-toast";

function successToast(message) {
    toast.success(message, {
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

export { successToast };
