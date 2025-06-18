import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("error", (e) => {
            console.error("Error:", e);
            navigate("/");
        });
    }, []);

    return null;
};

export default ErrorHandler;
