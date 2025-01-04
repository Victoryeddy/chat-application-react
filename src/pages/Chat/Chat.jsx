import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChatComponent from "../../components/ChatRoom";
import { db, signOut, auth, getDocs, collection, where,query,orderBy, onSnapshot } from "../../firebaseConfig";
import ToggleMenu from "../../components/Icons/ToggleMenu";
import Close from "../../assets/svg/closeBtn.svg";
import Logout from "../../assets/svg/logout.svg";
import { Dropdown } from "../../components/Dropdown";
import { useFormData } from "../../context/FormContext";
export const Chat = () => {
  const navigate = useNavigate();
    const { formData } = useFormData();
  
  const [isAsideOpen, setIsAsideOpen] = useState(true);

  const [chatList, setChatList] = useState([]);
   const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const toggleAside = () => {
    setIsAsideOpen((prev) => !prev);
  };

  const options = [
    { value: "User 1", label: "User 1" },
    { value: "User 2", label: "User 2" },
    { value: "User 3", label: "User 3" },
  ];

  const logout = async () => {
    try {
      navigate("/");
      await signOut(auth);
      console.log("User signed out.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  

  useEffect(() => {
    const getMessages = async () => {
      const theDoc = await getDocs(collection(db, "messages"));
      const uniqueChatList = theDoc?.docs.reduce((acc, doc) => {
        if (!acc.includes(doc)) {
          console.log(doc.id, doc.data())
          acc.push(doc.id);
        }
        return acc;
      }, []);
      setChatList((prev) => (prev = uniqueChatList));
    };
     
    getMessages();
    console.log(chatList);
  }, []);

   useEffect(() => {
      setSelectedChat((prev) => (prev = formData.channel));
      const q = query(
        collection(db, "messages",  formData.channel, "conversation"),
        orderBy("timestamp")
      );
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

  const loadMessages = async (channel) => {
    setSelectedChat(channel);

    const chatMessagesQuery = query(
      collection(db, "messages", channel, "conversation"),orderBy("timestamp")
    );

    const chatMessagesSnapshot = await getDocs(chatMessagesQuery);
    const messagesList = chatMessagesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setMessages(messagesList);
  };
  return (
    <div className="flex min-h-screen">
      <aside
        className={`fixed top-0 left-0 min-h-screen bg-slate-800 text-white p-4 border-r transition-transform transform ${
          isAsideOpen ? "translate-x-0 w-1/2 " : "-translate-x-full"
        } lg:static lg:translate-x-0 lg:w-1/4 z-[90]`}
      >
        <button
          className="lg:hidden absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={toggleAside}
        >
          <img src={Close} alt="" />
        </button>
        {/* <div className="bg-black sticky top-0">
          <p className="text-3xl font-bold text-white p-3 bg-black">
            Group Chat
          </p>
        </div> */}
        <h2 className="text-lg font-bold mb-4">Chats History</h2>
        {!chatList.length && <p className="text-white">No chats available</p>}
        <ul className="space-y-2">
          {chatList.map((chat, index) => (
            <li key={index}>
              <button
                className={`p-2 rounded cursor-pointer w-full flex justify-start ${
                  selectedChat === chat
                    ? "bg-blue-500 text-white"
                    : "bg-slate-700"
                } hover:bg-blue-500`}
                onClick={() => loadMessages(chat)}
              >
                {chat}
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-[35rem] flex items-center">
          <button className="flex items-center" onClick={() => logout()}>
            <img src={Logout} alt="" className="me-3" />
            Logout
          </button>
        </p>
      </aside>

      {isAsideOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleAside}
        ></div>
      )}

      <main
        className="flex-1 bg-gray-100"
        style={{
          backgroundImage: "url(../src/assets/chatBackground2.jpg)",
          backgroundSize: "cover",
          backgroundColor: "#9999",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "multiply",
        }}
      >
        {/* <div className="z-20 lg:sticky fixed w-full top-0 flex justify-between lg:justify-end items-center bg-white pb-3 pt-2 shadow-md">
          <button
            className="lg:hidden text-gray-600 hover:text-gray-800 ms-3 mt-2"
            onClick={toggleAside}
          >
            <ToggleMenu />
          </button>
          <Dropdown options={options} className="me-6 mt-3" />
        </div> */}
        <div className="border rounded shadow p-4 min-h-full">
          {selectedChat ? (
            <ChatComponent db={db} messages={messages} className="pb-4" />
          ) : (
            <p className="text-white">Select a chat to view messages.</p>
          )}
        </div>
      </main>
    </div>
  );
};
