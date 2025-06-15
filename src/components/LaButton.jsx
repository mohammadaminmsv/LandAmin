function LaButton({ children, variant = 'primary', onClick }) {
    const baseStyles = 'px-4 py-2 rounded-full font-medium transition';
    const variants = {
        primary: 'bg-gold text-white hover:bg-goldDark',
        secondary: 'bg-gray-200 text-black hover:bg-gray-300',
        danger: 'bg-red text-white hover:bg-redDark',
    };

    return (
        <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default LaButton;
