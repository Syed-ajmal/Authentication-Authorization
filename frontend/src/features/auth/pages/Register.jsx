import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const success = await handleRegister({ username, email, password });

    if (success) {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <main>
        <h1>Loading..........</h1>
      </main>
    );
  }

  return (
    <main className="flex h-screen w-full items-center justify-center bg-mist-900 text-amber-50">
      <div className="min-w-110 flex flex-col gap-4 p-4">
        <h1 className="text-5xl font-bold text-center font-sans">Register</h1>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              className="border-none h-9 gap-0.5 px-4 py-0.5 rounded-md bg-amber-50 text-mauve-900"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              className="border-none h-9 gap-0.5 px-4 py-0.5 rounded-[6px] bg-amber-50 text-mauve-900"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="gap-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="border-none h-9 gap-0.5 px-4 py-0.5 rounded-[6px] bg-amber-50 text-mauve-900"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmpassword" className="gap-1">
              Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Enter confirm password"
              className="border-none h-9 gap-0.5 px-4 py-0.5 rounded-[6px] bg-amber-50 text-mauve-900"
              onChange={(e) => {
                setConfirmpassword(e.target.value);
              }}
            />
          </div>
          <button className="px-2 py-1.5 rounded-xl bg-blue-800 transition duration-150 active:scale-95 mt-2">
            Register
          </button>
        </form>
        <p className="text-right">
          Already have an account?{" "}
          <Link className="underline text-blue-600" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
