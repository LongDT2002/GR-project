'use client';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { resetPasswordConfirm } from "@/actions/auth";
import Link from "next/link";

const Reset = ({ uid, token }: { uid: string, token: string }) => {
    const [password, setPassword] = useState("");
    const [re_new_password, setRePassword] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    async function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        if (password !== re_new_password) {
            alert("Passwords do not match");
            return;
        }
        await resetPasswordConfirm(uid, token, password, re_new_password)
            .then((res) => {
                setSuccess(true);
            })
            .catch((err) => {
                setSuccess(false);
                console.log(err);
            });
    };

    return (
        <div>
            { success ?
                <section className="border-red-500 min-h-screen flex items-center justify-center">
                    <div className="bg-neutral-700 p-5 flex rounded-2xl shadow-lg w-[95%] mx-auto md:max-w-md items-center justify-center">
                        <div className="w-full px-5">
                            <h2 className="text-3xl font-bold text-white">Reset password</h2>
                            <div
                                className="mt-6 text-black"
                            >
                                <div className="text-2xl block text-white text-center">Reset password successfully</div>
                                <Link href='/auth/login'
                                    className="text-center w-full block bg-black hover:bg-black/75 focus:bg-black/50 text-white font-semibold rounded-lg
        px-4 py-3 mt-6"
                                >
                                    Back to login
                                </Link>
                            </div>
                        </div>
                    </div>
                </section> :
                <section className="border-red-500 min-h-screen flex items-center justify-center">
                    <div className="bg-neutral-700 p-5 flex rounded-2xl shadow-lg w-[95%] mx-auto md:max-w-xl items-center justify-center">
                        <div className="w-full px-5">
                            <h2 className="text-3xl font-bold text-white">Reset password</h2>
                            <form
                                className="mt-6 text-black"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter new Password"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        autoFocus
                                        autoComplete="true"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Re-enter new Password"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                        value={re_new_password}
                                        onChange={(e) => {
                                            setRePassword(e.target.value);
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
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            }
        </div>

    );
};

export default Reset;
