
import Alert from "@mui/material/Alert";

function LAAlert({ type, message }) {
    const base = 'px-4 py-3 rounded-lg sm:top-40 text-sm border-l-4 fixed top-60 z-40 left-10';
    const types = {
        success: 'bg-green-100 text-green-800 border-green-500',
        error: 'bg-red-100 text-red-800 border-red-500',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-500',
        info: 'bg-blue-100 text-blue-800 border-blue-500',
    };
    console.log(types[type]);
    return (
        <Alert severity={type} className={`${base} ${types[type]}`}>
            {message}
        </Alert>
    );
}

export default LAAlert;
