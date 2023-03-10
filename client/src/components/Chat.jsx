import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io();
// const socket = io("http://localhost:3000"); // if you want to connect to a specific server or its in dev mode uncomment this line

const Chat = ({ username }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages((messages) => [...messages, { message, username }]);
    socket.emit("message", { message, username });
    setMessage("");
  };

  useEffect(() => {
    document
      .getElementById("messagesList")
      .scrollTo(0, document.getElementById("messagesList").scrollHeight);
  }, [messages]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div className="container flex h-screen flex-col mx-auto">
      <h1 className="container absolute bg-slate-800 text-center text-2xl font-bold">
        App React Socket
      </h1>
      <ul
        className="flex flex-1 flex-col gap-5 overflow-y-scroll py-10 font-semibold"
        id="messagesList"
      >
        {messages.map(({ message, username: usernameMessage }, index) => {
          if (usernameMessage === username) {
            return (
              <li
                key={index}
                className="ml-auto max-w-md rounded-t-2xl rounded-l-2xl bg-indigo-600 px-5 py-1 text-right"
              >
                {message}
              </li>
            );
          }

          return (
            <li
              key={index}
              className="max-w-md rounded-t-2xl rounded-r-2xl bg-sky-500 px-5 py-1"
            >
              {usernameMessage}: {message}
            </li>
          );
        })}
      </ul>

      <form onSubmit={handleSubmit} className="container flex text-black">
        <input
          type="text"
          autoComplete="off"
          value={message}
          className="w-full flex-1 rounded-xl bg-gray-200 px-5"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-xl bg-blue-400 px-5 text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
