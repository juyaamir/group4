import { useState } from "react";
import { Chat } from "../components/Chat";
import LocationAPI from "../components/LocationAPI";

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
    <div>
      <LocationAPI
        setHide2={setHide2}
        setMessages={setMessages}
        messages={messages}
        formData={formData}
        setFormData={setFormData}
      />
      <Chat hide2={hide2} messages={messages} formData={formData} />
    </div>
  );
};

export default PlanYourVacation;
