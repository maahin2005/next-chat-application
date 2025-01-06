import React from 'react';

interface CustomInputProps {
  id: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode; // Pass any custom icon
  required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  icon,
  required = false,
}) => {
  return (
    <div className="w-full bg-gray-800 flex items-center gap-3 px-4 py-3 rounded-lg">
      <div className="flex-1">
        <label htmlFor={id} className="sr-only">
          {placeholder}
        </label>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
          required={required}
        />
      </div>
      {icon && <span>{icon}</span>}
    </div>
  );
};

export default CustomInput;
