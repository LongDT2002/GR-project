"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";
import Link from "next/link";

import WatchlistIcon from "@/components/MoviePage/WatchlistIcon";
import RateModal from '@/components/Review/RateModal';
import Loader from "@/components/Loader";

axios.defaults.baseURL = "http://127.0.0.1:8000";

const token = localStorage.getItem("token");
const api = "account/watchlist/"
const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    },
};

const posterpath = "https://image.tmdb.org/t/p/w300";

async function getFavoritedMovie() {
    const res = axios.get(api, { headers: config.headers })
        .then((res) => {
            return res.data.movies;
        })
        .catch((err) => {
            console.log(err);
        });
    return res;
}

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [sortType, setSortType] = useState("date");
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getFavoritedMovie();
            setWatchlist(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <Loader />
    }

    function handleSort() {
        switch (sortType) {
            case "date":
                return watchlist.sort((a: any, b: any) => {
                    return (new Date(b.release_date) as any) - (new Date(a.release_date) as any);
                });
            case "name":
                return watchlist.sort((a: any, b: any) => {
                    return a.title.localeCompare(b.title);
                });
            case "rate":
                return watchlist.sort((a: any, b: any) => parseFloat(a.ave_rate) - parseFloat(b.ave_rate));
            default:
                return watchlist;
        }
    }

    return (
        <div className="w-full">
            <div className="p-3 px-[5%] pt-[2%]">
                <div className="px-4 pb-4">
                    <div className="flex justify-between">
                        <p className="text-3xl font-bold text-zinc-900 flex items-center">
                            My Watchlist
                        </p>
                        <div className="flex space-x-2 items-center">
                            <span className="text-zinc-700 text-xl">Sort by:</span>
                            <form className="max-w-sm mx-auto">
                                <select
                                    value={sortType}
                                    onChange={(e) => { setSortType(e.target.value); }}
                                    className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    <option value="date">Release Date</option>
                                    <option value="name">Title</option>
                                    <option value="rate">Rate</option>
                                </select>
                            </form>
                            <span className="text-zinc-700 text-xl"> Order:</span>
                            <button onClick = {() => {
                                const sorted = handleSort();
                                setWatchlist([...sorted]);
                            }} className="text-zinc-700">↑</button>
                            
                            <span className="text-zinc-700 text-xl">|</span>

                            <button onClick = {() => {
                                const sorted = handleSort().reverse();
                                setWatchlist([...sorted]);
                            }} className="text-zinc-700">↓</button>
                        </div>
                    </div>
                </div>
            </div>
            {watchlist.length > 0 ? (
                <div className="flex flex-col justify-center items-center">
                    {watchlist.map((movie: any) => (
                        <div className="pb-3 w-[70%] min-h-[430px]">
                            <div className="bg-white shadow-lg border-gray-400 max-h-80 border sm:rounded-3xl p-8 flex space-x-10">
                                <div className="h-48 min-w-[250px] overflow-visible">
                                    <Link href={`/movie/${movie.id}`}>
                                        <Image
                                            src={posterpath + movie.images.poster}
                                            alt={movie.images.poster}
                                            className="rounded-3xl shadow-lg"
                                            width={400}
                                            height={400}
                                            objectFit="cover"
                                            placeholder="blur"
                                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                                            unoptimized
                                        />
                                    </Link>
                                </div>
                                <div className="flex flex-col w-13/20 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-zinc-900 text-3xl font-bold">{movie.title}</h2>
                                        <div className="bg-yellow-400 font-bold rounded-xl p-2 text-black">{movie.ave_rate.toFixed(1) + "/ " + "5.0"}</div>
                                    </div>
                                    <div>
                                        <div className="text-lg text-gray-800">{movie.release_date}</div>
                                    </div>
                                    <p className=" text-zinc-900 max-h-40 overflow-y-hidden">{movie.summary}</p>
                                    <ul className="flex gap-5 text-slate-300 sm:justify-start justify-center my-2">
                                        <li className="flex items-center justify-center">
                                            <RateModal movieId={movie.id} movieTitle={movie.title} />
                                        </li>
                                        <li className="flex items-center justify-center rounded-full bg-slate-800 p-4">
                                            <WatchlistIcon favMovie={movie.id} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>))}
                </div>
            ) :
                (
                    <div className="px-[5%] h-[70vh]">
                        <div className="px-4 pb-4">
                            <p className="text-zinc-700 text-xl">You haven't added any movies to your watchlist.</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Watchlist;
