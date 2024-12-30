import { useState } from "react";
import { Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home.jsx";
import { Chat } from "./pages/Chat/Chat.jsx";
import FormProvider from "./context/FormContext.jsx";
function App() {
  return (
    <>
      <FormProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </FormProvider>
    </>
  );
}

export default App;
