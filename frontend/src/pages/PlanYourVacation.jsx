import { useState } from "react";
import { Chat } from "../components/Chat";
import LocationAPI from "../components/LocationAPI";
import { Link } from "react-router-dom";
import Login from "../components/Login";

const initialFormData = {
  location: "",
  start: "",
  end: "",
};

const PlanYourVacation = () => {
  const [hide2, setHide2] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "system",
      content: "You are a helpful assistant.",
    },
  ]);
  const [formData, setFormData] = useState(initialFormData);
  return (
    <div className="">
      <div className="">
        <LocationAPI
          setHide2={setHide2}
          setMessages={setMessages}
          messages={messages}
          formData={formData}
          setFormData={setFormData}
        />
        <Chat
          hide2={hide2}
          messages={messages}
          formData={formData}
          firstName={localStorage.getItem("userName")}
        />
      </div>
    </div>
  );
};

export default PlanYourVacation;
