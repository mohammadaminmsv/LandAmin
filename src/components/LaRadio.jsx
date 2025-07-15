function LaRadio({ label, name, value, checked, onChange }) {
    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-blue checked:border-blue transition-all"
            />
            <span className="text-sm">{label}</span>
        </label>
    );
}

export default LaRadio;
