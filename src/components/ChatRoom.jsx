import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import IconoirSendDiagonalSolid from "../components/SendIcon";
import { useFormData } from "../context/FormContext";

const ChatComponent = ({ db, currentUser }) => {
  const { formData } = useFormData();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, [db]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      sender: formData?.input2,
      timestamp: serverTimestamp(),
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-transparent">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              message.sender === formData?.input2
                ? "justify-end items-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                message.sender === formData?.input2
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              {message.text}
            </div>
            <p>{message.timestamp?.toDate().toLocaleTimeString()}</p>
          </div>
        ))}
      </div>
      <form
        onSubmit={sendMessage}
        className="p-4 bg-white border-t rounded-full"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <IconoirSendDiagonalSolid />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
