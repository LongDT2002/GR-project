"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("danger");

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/myspace");
        }
    }, []);

    const login = async () => {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.error) {
            setMessage(data.error);
            setMessageType("danger");
        } else {
            localStorage.setItem("token", data.token);
            router.push("/myspace");
        }
    };

    const handleInputChange = () => {
        setMessage("");
    };

    return (
        <div>
          {message && <p>{message}</p>}
    
          <section className="border-red-500 min-h-screen flex items-center justify-center">
            <div className="bg-neutral-700 p-5 flex rounded-2xl shadow-lg w-[95%] mx-auto md:max-w-4xl">
              <div className="w-3/5 md:block hidden overflow-hidden">
                <img
                  src="assets/img/log_in.jpg"
                  className="rounded-2xl h-full"
                  alt="page img"
                />
              </div>
              <div className="md:w-2/5 px-5">
                <h2 className="text-2xl font-bold text-white">Login</h2>
                <p className="text-sm mt-4 text-white">
                  If you have an account, please login
                </p>
                <form
                  className="mt-6 text-black"
                  
                  method="POST"
                >
                  <div>
                    <label className="block text-white">Email Address</label>
                    <input
                      type="email"
                      name=""
                      id=""
                      placeholder="Enter Email Address"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        handleInputChange();
                      }}
                      autoFocus
                      autoComplete="true"
                      required
                    />
                  </div>
    
                  <div className="mt-4">
                    <label className="block text-slate-300">Password</label>
                    <input
                        type="password"
                        name=""
                        id=""
                        placeholder="Enter Password"
                        minLength={6}
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                        focus:bg-white focus:outline-none"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            handleInputChange();
                        }}
                        required
                    />
                  </div>
    
                  <button
                    type="submit"
                    className="w-full block bg-black hover:bg-black/75 focus:bg-black/50 text-white font-semibold rounded-lg
                    px-4 py-3 mt-6"
                  >
                    Log In
                  </button>
                </form>
    
                <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
                  <hr className="border-gray-500" />
                  <p className="text-center text-sm">OR</p>
                  <hr className="border-gray-500" />
                </div>
    
                <button
                  onClick={login}
                  className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="w-6 h-6"
                    viewBox="0 0 48 48"
                  >
                    <defs>
                      <path
                        id="a"
                        d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                      />
                    </defs>
                    <clipPath id="b">
                      <use xlinkHref="#a" overflow="visible" />
                    </clipPath>
                    <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                    <path
                      clipPath="url(#b)"
                      fill="#EA4335"
                      d="M0 11l17 13 7-6.1L48 14V0H0z"
                    />
                    <path
                      clipPath="url(#b)"
                      fill="#34A853"
                      d="M0 37l30-23 7.9 1L48 0v48H0z"
                    />
                    <path
                      clipPath="url(#b)"
                      fill="#4285F4"
                      d="M48 48L17 24l-4-3 35-10z"
                    />
                  </svg>
                  <span className="ml-4 text-gray-900">Login with Google</span>
                </button>
    
                <div className="text-sm flex justify-between items-center mt-3">
                  <p className="text-white">If you don&#39;t have an account...</p>
                   <Link href={`/register`}>
                  <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 text-gray-900 border-blue-400  ">
                    Register
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
}

export default Login;
