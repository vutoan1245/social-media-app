import React from "react";

const TextField = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
        error && "border-red-500"
      }`}
    />
    {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
  </div>
);

export default TextField;
