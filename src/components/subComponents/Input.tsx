import React, { memo } from "react";

interface InputProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  error?: string;
  type?: string;
}

const inputStyle =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const Input = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  error,
  type = "text",
}: InputProps) => {
  return (
    <div>
      <label className="mb-2 block font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={inputStyle}
      />

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default memo(Input);