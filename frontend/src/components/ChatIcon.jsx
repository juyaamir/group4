import React from "react";

const ChatIcon = ({ whatsappNumber, contactUs }) => {
  return (
    <div className="fixed bottom-20 right-5 flex flex-col items-center">
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* <img
          src="https://img.icons8.com/?size=100&id=d5ntEsf0JRhM&format=png&color=000000"
          alt="WhatsApp"
          className="w-8 h-8"
        /> */}
      </a>
      <a href={contactUs}>
        <img
          src="https://img.icons8.com/?size=100&id=CLuWGSvnuOz9&format=png&color=000000"
          alt="Contact Us"
          className="w-8 h-8"
        />
      </a>
    </div>
  );
};

export default ChatIcon;
