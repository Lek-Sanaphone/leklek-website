import React from "react";
import Chatbot from "../components/Chatbot";
import DockSync from "../components/Chatbot/DockSync";

export default function Root({ children }) {
  return (
    <>
      {children}
      <Chatbot />
      <DockSync />
    </>
  );
}
