import React, { useContext, createContext, useState, useEffect } from "react";

export const FormContext = createContext();

// My Custom hook
export const useFormData = () => useContext(FormContext);

export default function FormProvider({ children }) {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : { channel: "", user: "", currentUser: "" };
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <>
      <FormContext.Provider value={{ formData, setFormData }}>
        {children}
      </FormContext.Provider>
    </>
  );
}
