import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LaInput({
    label,
    name,
    value,
    onChange,
    placeholder = '',
    type,
    error = '',
    icon: Icon = null,
    readOnly = false,
    disabled = false,

}) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
        <div className="mb-4 w-full">
            {label && (
                <label htmlFor={name} className="block mb-1 text-sm font-medium text-grayDark">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                        <Icon />
                    </div>
                )}

                <input
                    type={inputType}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    disabled={disabled}
                    className={`
            w-full px-4 py-2 pr-${Icon ? '10' : '4'} rounded-lg border
            bg-white text-black
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
            ${readOnly ? 'bg-gray-100' : ''}
            focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold
            ${error ? 'border-red focus:ring-red' : 'border-gray-300'}
          `}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        tabIndex={-1}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}
            </div>

            {error && <p className="text-red text-sm mt-1">{error}</p>}
        </div>
    );
}

export default LaInput;
