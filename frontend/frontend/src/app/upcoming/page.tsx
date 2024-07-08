"use client";
import React, { useState, useEffect } from "react";
import requests from "@/utils/requests";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

import Loader from "@/components/Loader";

axios.defaults.baseURL = "http://127.0.0.1:8000";
const posterpath = "https://image.tmdb.org/t/p/original";

function Upcoming({ params }: { params: { pageid: string }}) {
    const [resultMovie, setResultMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const api = requests.fetchUpcoming;
                const upcomingMovies = await axios.get(api)
                    .then((response) => {
                        return response.data;
                    })
                    .catch((error) => {
                        console.error("Error fetching movie data:", error);
                    });
                const data = await upcomingMovies;
                setResultMovie(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [params.pageid]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="w-full h-full p-5">
            <div className="heading mx-auto w-[90%]">
                <h1 className="text-2xl">Upcoming Movies</h1>
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:w-[90%] w-[95%] mx-auto">
                {resultMovie.map((moviename: any, index) => (
                    moviename.poster && (
                        <div key={index} className="m-4 mb-8 px-4 mx-auto">
                            <div className="flex flex-col h-full rounded-lg bg-gray-200 shadow-lg">
                                <Link href={`/movie/${moviename.id}`} className="flex flex-col flex-grow">
                                    <div className="oot-card p-2 flex-grow">
                                        <Image
                                            src={posterpath + moviename.poster}
                                            width={400}
                                            height={400}
                                            alt={`Movie_${index}`}
                                            className="mx-auto h-[400px] object-cover"
                                            placeholder="blur"
                                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                                            unoptimized
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <div className="flex justify-between mb-2">
                                            <h2 className="text-lg text-gray-700 font-semibold">{moviename.title}</h2>
                                            <p className="text-lg text-gray-700 font-semibold flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="pb-0.5 w-3.5 h-3.5 mr-1 flex-shrink-0">
                                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                                </svg>
                                                <span>{moviename.ave_rate.toFixed(1)}</span>
                                            </p>
                                        </div>
                                        <p className="mb-4 text-md text-gray-700">Release: {moviename.release_date}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>

    );
}

export default Upcoming;
