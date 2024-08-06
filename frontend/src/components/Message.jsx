import { marked } from 'marked';

export const Message = ({ message }) => {
  const renderContent = (content) => {
    const htmlContent = marked(content);
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
  };

  
  const fullMessage = message.content;
  const mid = Math.floor(fullMessage.length / 2);
  const firstPart = fullMessage.slice(0, mid);
  const secondPart = fullMessage.slice(mid);


  return (
    <div className="flex flex-wrap">
      <div className="w-1/2 p-2">
        <div className={message.role === "user" ? "text-right" : "text-left"}>
          {renderContent(firstPart)}
        </div>
      </div>
      <div className="w-1/2 p-2">
        <div className={message.role === "user" ? "text-right" : "text-left"}>
          {renderContent(secondPart)}
        </div>
      </div>
    </div>
  );
};






















/* export const Message = ({ message }) => {
  const fullMessage = message.content;
  const mid = Math.floor(fullMessage.length / 2);
  const firstSpan = fullMessage.slice(0, mid);
  const secondSpan = fullMessage.slice(mid);
  const renderContent = (content) => {
    // Assuming content is a string with Markdown or HTML list formatting
    return (
      <div dangerouslySetInnerHTML={{ __html: content }} />
    );
  };
  return (
    <div className="px-2 message">
       {renderContent(message.content)}
      <div className={message.role === "user" ? "right" : "left" }>
      <p className="flex flex-wrap justify-around ">
        <span className="w-56">
          {firstSpan}
        </span>
        <span className="w-56">
          {secondSpan}
        </span>
        </p>
    </div>
    </div>

  );
};
 */



































/* export const Message = ({ message }) => {
 // const {message, role} = message;
  //const fullMessage = message.content;
  return (
    <div className="px-2">
      <div className={message.role === "user" ? "right" : "left" }>
      <p>{message.content}</p>
    </div>
    </div>

  );
};
 */