import React from "react";

const Login = ({ username, setUsername, setUsernameReady }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameReady(true);
  };

  return (
    <div className="grid min-h-screen w-full place-content-center gap-20">
      <h1 className="text-center text-3xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-black">
        <input
          type="text"
          autoComplete="off"
          value={username}
          className="rounded-xl bg-gray-200 px-5"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          className="mx-auto rounded-xl bg-blue-400 px-5 font-bold text-white"
        >
          Set Username
        </button>
      </form>
    </div>
  );
};

export default Login;
