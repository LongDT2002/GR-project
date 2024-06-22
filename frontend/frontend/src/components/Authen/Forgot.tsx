"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

const Forgot = () => {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/api/auth/forgot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        if (res.ok) {
            setSent(true);
        }
    }

    return (
        <div>
            {sent ?
                (<section className="border-red-500 min-h-screen flex items-center justify-center">
                    <div className="bg-neutral-700 p-5 flex rounded-2xl shadow-lg w-[95%] mx-auto md:max-w-md items-center justify-center">
                        <div className="w-full px-5">
                            <h2 className="text-3xl font-bold text-white">Reset password</h2>
                            <form
                                className="mt-6 text-black"
                            // onSubmit={handleSubmit}
                            >
                                <div className="text-2xl block text-white text-center">Verification has been sent.</div>
                                <div className="text-2xl block text-white text-center">Please check your email.</div>
                                <Link href='/login'
                                    className="text-center w-full block bg-black hover:bg-black/75 focus:bg-black/50 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
                                >
                                    Back to login
                                </Link>
                            </form>
                        </div>
                    </div>
                </section>) :
                (<section className="border-red-500 min-h-screen flex items-center justify-center">
                    <div className="bg-neutral-700 p-5 flex rounded-2xl shadow-lg w-[95%] mx-auto md:max-w-xl items-center justify-center">
                        <div className="w-full px-5">
                            <h2 className="text-3xl font-bold text-white">Reset password</h2>
                            <form
                                className="mt-6 text-black"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <label className="block text-white">Email address</label>
                                    <input
                                        type="email"
                                        name=""
                                        id=""
                                        placeholder="Enter Email Address"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            // handleInputChange();
                                        }}
                                        autoFocus
                                        autoComplete="true"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full block bg-black hover:bg-black/75 focus:bg-black/50 text-white font-semibold rounded-lg
                        px-4 py-3 mt-6"
                                >
                                    Send verification
                                </button>
                            </form>
                        </div>
                    </div>
                </section>)
            }
        </div>
    );
}

export default Forgot;
