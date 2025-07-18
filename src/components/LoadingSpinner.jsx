import React from "react";
import PropTypes from "prop-types";

export default function LoadingSpinner({
    size = 32,
    color = "text-teal-500",
    message = "",
    className = "",
    fullScreen = false,
}) {
    const spinner = (
        <div className={`animate-spin rounded-full border-4 border-dashed border-current ${color}`} style={{ width: size, height: size }}></div>
    );

    if (fullScreen) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                {spinner}
                {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
            </div>
        );
    }

    return (
        <div className={`flex items-center space-x-3 ${className}`}>
            {spinner}
            {message && <span className="text-sm text-gray-600">{message}</span>}
        </div>
    );
}

LoadingSpinner.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    message: PropTypes.string,
    className: PropTypes.string,
    fullScreen: PropTypes.bool,
};
