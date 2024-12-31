import React, { useState } from "react";
import SendIcon from "../components/Icons/SendIcon.jsx";
import { useFormData } from "../context/FormContext.jsx";
import { useNavigate } from "react-router-dom";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const FormCard = ({ title = "Enter Details", buttonText = "Submit" }) => {
  const navigate = useNavigate();
  const { setFormData } = useFormData();
  const [channel, setInput1] = useState("");
  const [username, setInput2] = useState("");

  const handleSubmit = async () => {
    setFormData({ channel, username });
    const docRef = doc(db, "messages", channel);
    await setDoc(docRef, {});
    setInput1("");
    setInput2("");
    navigate("/chat");
  };

  return (
    <>
      <div className="grid grid-cols-1 max-w-lg mx-auto">
        <div className="min-w-fit overflow-hidden p-6 space-y-4 rounded-xl backdrop-blur-xl bg-white/30 shadow-lg border border-white/20">
          {/* Card Header */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-0">{title}</h2>
          <span className="mb-5 text-gray-900 text-sm mt-0">
            Start by creating a channel and adding your full name
          </span>

          {/* Input Fields */}
          <div className=" mt-9 mb-6">
            <div>
              <label
                htmlFor="input1"
                className="block text-base font-medium text-gray-800 mb-1"
              >
                Message Channel
              </label>
              <input
                id="input1"
                type="text"
                value={channel}
                onChange={(e) => setInput1(e.target.value)}
                className="w-full px-3 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g boys and girls chat"
                required
              />
            </div>

            <div className="my-6">
              <label
                htmlFor="input2"
                className="block text-base font-medium text-gray-800 mb-1"
              >
                User Name
              </label>
              <input
                id="input2"
                type="text"
                value={username}
                onChange={(e) => setInput2(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username or fullname"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <p className="mt-12">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mt-12 mb-2 flex items-center justify-center font-semibold"
              disabled={channel == "" || username == ""}
            >
              {buttonText} <SendIcon className="ms-2" />
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default FormCard;
