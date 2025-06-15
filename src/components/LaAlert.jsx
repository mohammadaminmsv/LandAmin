function LAAlert({ type = 'success', message }) {
    const base = 'px-4 py-3 rounded-lg text-sm border-l-4';
    const types = {
        success: 'bg-green-100 text-green-800 border-green-500',
        error: 'bg-red-100 text-red-800 border-red-500',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-500',
        info: 'bg-blue-100 text-blue-800 border-blue-500',
    };

    return (
        <div className={`${base} ${types[type]}`}>
            {message}
        </div>
    );
}

export default LAAlert;
