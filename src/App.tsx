import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ContactPage from "./components/ContactPage";
import Chatbot from "./components/Chatbot";

export default function App() {
  return (
    <main className="relative bg-bg min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Chatbot />
    </main>
  );
}
