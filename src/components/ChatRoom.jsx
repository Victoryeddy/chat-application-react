import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import IconoirSendDiagonalSolid from "./Icons/SendIcon";

import { useFormData } from "../context/FormContext";

const ChatComponent = ({ db, messages}) => {
  const { formData } = useFormData();
  const [newMessage, setNewMessage] = useState("");
  // const [messages, setMessages] = useState([]);
  

 
  async function getUsername(uid, channel) {
    const docRef = doc(db, "messages", channel, "local_guests", "guests");

    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const username = data[uid]; 
        if (username) {
         
          return username;
        } else {
          console.log("No username found for the given UID.");
          return null;
        }
      } else {
        console.log("Document does not exist.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching username:", error);
      return null;
    }
  }



  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
   
    try{
      let sender = await getUsername(formData.userCredential?.user?.uid, formData.channel);
      await addDoc(collection(db, "messages", formData.channel, "conversation"), {
        text: newMessage,
        sender: sender,
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    } catch(error){
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-transparent justify-end relative">
      <div className="pt-10 overflow-y-auto p-3 space-y-4 ">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col justify-end ${
              message.sender == formData?.username
                ? "justify-end items-end"
                : "justify-start"
            }`}
          >
            <div className="flex">
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                  message.sender === formData?.username
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {message.text}
              </div>
              <div className="rounded-full bg-blue-300 ms-3 self-end px-3 py-2 capitalize">
                {message.sender?.charAt(0)}
              </div>
            </div>
            <p className="me-[3.2rem] text-white">
              {message.timestamp?.toDate().toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
      <form
        onSubmit={sendMessage}
        className="p-4 bg-white border-t rounded-full mb-[5rem] w-full mt-4"
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
            className="bg-blue-500 text-white rounded-full p-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <IconoirSendDiagonalSolid />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
