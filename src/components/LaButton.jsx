import React from 'react'

const LaButton = ({ children, variant = "primary", disabled, onClick, type = "button" }) => {
    const baseStyles =
        "px-4 py-2 rounded-full w-full font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-gold text-white hover:bg-goldDark",
        secondary: "bg-gray text-black hover:bg-gray-300",
        danger: "bg-red text-white hover:bg-redDark",
    };

    const appliedVariant = variants[variant] || variants.primary;

    return (
        <button
            type={type}
            disabled={disabled}
            className={`${baseStyles} ${appliedVariant}`}
            onClick={onClick}
            
        >
            {children}
        </button>
    );
}

export default LaButton

