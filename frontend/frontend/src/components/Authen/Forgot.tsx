"use client"
import { useState } from "react";
import { resetPassword } from "@/actions/auth";

const Forgot = () => {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await resetPassword(email)
            .then(() => {
                setSent(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            {sent ?
                (<section className="border-red-500 min-h-screen flex items-center justify-center">
                    <div className="bg-neutral-700 p-5 flex rounded-2xl shadow-lg w-[95%] mx-auto md:max-w-md items-center justify-center">
                        <div className="w-full px-5">
                            <h2 className="text-3xl font-bold text-white">Reset password</h2>
                            <div
                                className="mt-6 text-black"
                            >
                                <div className="text-2xl block text-white text-center">Verification has been sent.</div>
                                <div className="text-2xl block text-white text-center">Please check your email.</div>
                            </div>
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
