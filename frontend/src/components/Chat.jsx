import { Message } from "./Message";
import html2canvas from "html2canvas-pro";
import { useRef } from "react";
import { marked } from "marked";
import Footer from "./utils/listFooter";
import Header from "./utils/listHeader";
import WelcomeMessage from "./WelcomeMessage";

export const Chat = ({ messages, hide2, formData, firstName }) => {
  const imgRef = useRef();
  const downloadIMG = async () => {
    const list = imgRef.current;
    const canvas = await html2canvas(list);
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    if (typeof link.download === "string") {
      link.href = imgData;
      link.download = "packing-list.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(imgData);
    }
  };

  return (
    <div>
      {hide2 && (
        <div className="flex flex-wrap">
          <div className="list-width">
            <div className="relative">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 absolute right-16 top-0"
                onClick={downloadIMG}
              >
                <i className="fa-solid fa-download"></i>
              </button>
              <div
                className="border border-gray-200 mx-10 mb-10 px-4 pb-4 pt-2"
                ref={imgRef}
              >
                <Header />
                <p className="flex justify-around flex-wrap ">
                  <span>
                    <span className="font-bold">Duration of Trip: </span>
                    <span className="bg-yellow-200 text-sm">
                      {formData.start} - {formData.end}
                    </span>
                  </span>
                  <span>
                    <span className="font-bold">Place: </span>
                    <span className="bg-yellow-200 text-sm underline">
                      {formData.location}
                    </span>
                  </span>
                </p>
                <p className="p-2 Sofia text-center">
                  We wish you a pleasant Trip{" "}
                  <span className="text-red-600 ">{firstName}!</span>{" "}
                </p>
                {messages
                  ?.filter((message) => message.role !== "system")
                  .map((message) => {
                    const content = marked(message.content);
                    return <Message key={message.id} message={{ content }} />;
                  })}
                <Footer />
              </div>
            </div>
          </div>


          <div className="border border-red-400 flex-grow mb-10 mr-10 p-2">
          <p>Our Suggestions for you..</p>
          </div>
        </div>
      )}
    </div>
  );
};