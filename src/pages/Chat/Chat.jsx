import React, { useState } from "react";
import ChatComponent from "../../components/ChatRoom";
import { db } from "../../firebaseConfig";
import ToggleMenu from "../../components/ToggleMenu";
import Close from "../../assets/svg/closeBtn.svg"
import Logout from "../../assets/svg/logout.svg"

export const Chat = () => {

 
  const [isAsideOpen, setIsAsideOpen] = useState(true);

  const toggleAside = () => {
    setIsAsideOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen">
      <aside
        className={`fixed top-0 left-0 min-h-screen bg-slate-800 text-white p-4 border-r transition-transform transform ${
          isAsideOpen ? "translate-x-0 w-1/2" : "-translate-x-full"
        } lg:static lg:translate-x-0 lg:w-1/4 z-10`}
      >
        <button
          className="lg:hidden absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={toggleAside}
        >
          <img src={Close} alt="" />
        </button>
        <h2 className="text-lg font-bold mb-4">Chats History</h2>
        <ul className="space-y-2">
          <li className="p-2 bg-indigo-500 rounded hover:bg-blue-500 cursor-pointer">
            Chat 1
          </li>
          <li className="p-2 bg-slate-700 rounded hover:bg-blue-500 cursor-pointer">
            Chat 2
          </li>
          <li className="p-2 bg-slate-700 rounded hover:bg-blue-500 cursor-pointer">
            Chat 3
          </li>
        </ul>

        <p className="mt-[35rem] flex items-center">
          <img src={Logout} alt="" className="me-3"/> Logout
        </p>
      </aside>

      {isAsideOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleAside}
        ></div>
      )}

      <main
        className="flex-1 bg-gray-100 "
        style={{
          backgroundImage: "url(../src/assets/chatBackground3.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "multiply",
        }}
      >
        <button
          className="lg:hidden mb-4 text-gray-600 hover:text-gray-800 ms-3 mt-2"
          onClick={toggleAside}
        >
          <ToggleMenu />
        </button>
        <div className="border rounded bg-white shadow p-4 sticky top-4 bg-white/35">
          <ChatComponent db={db} className="pb-4" />
        </div>
      </main>
    </div>
  );
};
