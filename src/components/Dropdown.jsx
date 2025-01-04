import React, { useState } from "react";
import CaretDown from "./Icons/CaretDown";
import People from "./Icons/People"


export const Dropdown = ({ options, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  

  const handleSelect = (option) => {
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
        <People />
        <CaretDown
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute  w-[20vw] lg:w-[8vw] mt-1 bg-white rounded-md shadow-lg right-1`}
        >
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-end"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

