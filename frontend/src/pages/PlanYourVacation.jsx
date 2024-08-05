import { useState } from "react";
import { Chat } from "../components/Chat";
import LocationAPI from "../components/LocationAPI";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import { Alert } from "antd";

import { useNavigate } from "react-router-dom";
const initialFormData = {
  location: "",
  start: "",
  end: "",
};

const PlanYourVacation = ({ userlogged }) => {
  const navigate = useNavigate();
  const [hide2, setHide2] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "system",
      content: "You are a helpful assistant.",
    },
  ]);
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  return (
    <>
      {userlogged ? (
        <div >
          <div >
            <LocationAPI
              setHide2={setHide2}
              setMessages={setMessages}
              messages={messages}
              formData={formData}
              setFormData={setFormData}
              activities={activities}
              setActivities={setActivities}
            />
            <Chat
              hide2={hide2}
              messages={messages}
              formData={formData}
              activities= {activities}
              firstName={localStorage.getItem("userName")}
            />
          </div>
        </div>
      ) : (
        <div>
          <Alert
            message="Error"
            description="You need to Sign in to access this page"
            type="error"
            showIcon
          />
          {navigate("/")}
        </div>
      )}
    </>
  );
};

export default PlanYourVacation;
