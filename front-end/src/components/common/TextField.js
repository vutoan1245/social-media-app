import React from "react";

const TextField = ({ id, label, type = "text", value, onChange, disabled }) => (
  <div className="mb-4">
    <label className="block text-gray-700" htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
    />
  </div>
);

export default TextField;
