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

const PlanYourVacation = (islogged) => {
  const userlogged = islogged["islogged"];

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
    <>
      {userlogged ? (
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
      ) : (
        <div>
          <div
            class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 text-center p-4"
            role="alert"
          >
            <p class="font-bold">You are not signed in</p>
            <p>PLease Sign in to plan Your vacations</p>
          </div>
          <Login />
        </div>
      )}
    </>
  );
};

export default PlanYourVacation;
