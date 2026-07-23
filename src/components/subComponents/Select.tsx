import React from "react";

interface SelectProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  error?: string;
}

const inputStyle =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const Select = ({
  label,
  name,
  value,
  placeholder,
  options,
  onChange,
  error,
}: SelectProps) => {
  return (
    <div>
      <label className="mb-2 block font-medium text-gray-700">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={inputStyle}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;