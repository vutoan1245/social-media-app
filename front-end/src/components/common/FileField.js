import React from "react";

const FileField = ({ label, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}</label>
    <input
      type="file"
      onChange={onChange}
      className="mt-1 block w-full text-gray-700"
    />
  </div>
);

export default FileField;
