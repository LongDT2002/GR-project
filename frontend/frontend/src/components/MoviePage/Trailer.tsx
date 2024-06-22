"use client";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";

import Loader from "@/components/Loader";
import Popups from "../Popups";

const Trailer = ({ trailer }: { trailer: string }) => {
    const [loading, setLoading] = useState(true);
    const [trailervideo, setTrailervideo] = useState(trailer);

    useEffect(() => {
        if (trailervideo) {
            setLoading(false);
        }
    }, [trailervideo]);

    return (
        <div>
            <button
                popup-btn-1="true"
                className={`flex items-center justify-center rounded-full bg-slate-800 px-4 py-3 ${trailervideo == null ? "hidden" : ""
                    } hover:bg-white/20 cursor-pointer text-white`}><FaPlay className="mr-2"></FaPlay>
                    Watch Trailer
            </button>

            <Popups targetItem="1">
                {loading && <Loader />}
                {!loading && trailervideo && (
                    <iframe
                        src={`https://www.youtube.com/embed${trailervideo}`}
                        className="w-full h-full"
                        allow="fullscreen;"
                    ></iframe>
                )}
            </Popups>
        </div>
    );
};

export default Trailer;
