"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa6';

import Loader from '@/components/Loader';
import WatchlistIcon from '@/components/MoviePage/WatchlistIcon';
import RateModal from '@/components/Review/RateModal';

axios.defaults.baseURL = "http://127.0.0.1:8000"
const token = localStorage.getItem("token");
const api = "/movie/all_ratings/personal/"
const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    },
};

const posterpath = "https://image.tmdb.org/t/p/w300";

async function getAllRatings() {
    const res = axios.get(api, { headers: config.headers })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
    return res;
}

const Ratings = () => {
    const [ratings, setRatings] = useState<any>([]);
    const [sortType, setSortType] = useState("date");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const ratingsData = await getAllRatings();
            setRatings(ratingsData);
            console.log(ratings);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <Loader />
    }

    function handleSort() {
        switch (sortType) {
            case "name":
                return ratings.sort((a: any, b: any) => {
                    return a.movie.title.localeCompare(b.movie.title);
                });
            case "rate":
                return ratings.sort((a: any, b: any) => parseFloat(a.movie.ave_rate) - parseFloat(b.movie.ave_rate));
            default:
                return ratings;
        }
    }

    return (
        <div className="w-full">
            <div className="p-3 px-[5%] pt-[2%]">
                <div className="px-4 pb-4">
                    <div className="flex justify-between">
                        <p className="text-2xl font-bold text-zinc-900 flex items-center">
                            My Ratings
                        </p>
                        <div className="flex space-x-2 items-center">
                            <span className="text-zinc-700 text-xl">Sort by:</span>
                            <form className="max-w-sm mx-auto">
                                <select
                                    value={sortType}
                                    onChange={(e) => {
                                        setSortType(e.target.value); 
                                    }}
                                    className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    <option value="name">Movie title</option>
                                    <option value="rate">Average rate</option>
                                </select>
                            </form>
                            <span className="text-zinc-700 text-xl"> Order:</span>
                            <button onClick = {() => {
                                const sorted = handleSort();
                                setRatings([...sorted]);
                            }} className="text-zinc-700">↑</button>
                            
                            <span className="text-zinc-700 text-xl">|</span>

                            <button onClick = {() => {
                                const sorted = handleSort().reverse();
                                setRatings([...sorted]);
                            }} className="text-zinc-700">↓</button>
                        </div>
                    </div>
                </div>
            </div>
            {ratings.length > 0 ? (
                <div className="flex flex-col justify-center items-center">
                    {ratings.map((review: any) => (
                        <div className="pb-3 w-[70%] min-h-[430px]">
                            <div className="bg-white shadow-lg border-gray-400 max-h-80 border sm:rounded-3xl p-8 flex space-x-10 relative">
                                <div className="h-48 min-w-[250px] overflow-visible">
                                    <Link href={`/movie/${review.movie.id}`}>
                                        <Image
                                            src={posterpath + review.movie.images.poster}
                                            alt={review.movie.images.poster}
                                            className="rounded-3xl shadow-lg"
                                            width={250}
                                            height={250}
                                            sizes='(min-width:400px) 400px 300px'
                                            objectFit="cover"
                                            placeholder="blur"
                                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                                            unoptimized
                                        />
                                    </Link>
                                </div>
                                <div className="flex flex-col w-13/20 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-zinc-900 text-3xl font-bold">{review.movie.title}</h2>
                                    </div>
                                    <div>
                                        <div className="text-gray-800 text-xl">Review time: {review.timestamp}</div>
                                    </div>
                                    <p className="text-zinc-900 font-bold text-2xl overflow-y-hidden">Your review: </p>
                                    <p className="text-zinc-900 overflow-y-hidden text-xl">{review.content}</p>
                                    <ul className="flex gap-5 text-slate-300 sm:justify-start justify-center my-2">
                                        <li className="flex items-center justify-center">
                                            <RateModal movieId={review.movie.id} movieTitle={review.movie.title} />
                                        </li>
                                        <li className="flex items-center justify-center rounded-full bg-slate-800 p-4">
                                            <WatchlistIcon favMovie={review.movie.id} />
                                        </li>
                                        <li className="flex items-center justify-center rounded-full bg-slate-800 p-4">
                                            <FaTrash
                                                className="text-white my-auto cursor-pointer"
                                                onClick={() => {
                                                    axios.delete(`movie/${review.movie.id}/rate`, { headers: config.headers })
                                                        .then((res) => {
                                                            console.log(res);
                                                        })
                                                        .catch((err) => {
                                                            console.log(err);
                                                        });
                                                }}
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <div className="absolute top-8 right-8">
                                    <div className="bg-yellow-400 font-bold rounded-xl p-2 text-black">{review.movie.ave_rate.toFixed(1) + "/ 5.0"}</div>
                                </div>
                            </div>
                        </div>))}
                </div>
            ) :
                (
                    <div className="px-[5%] h-screen">
                        <div className="px-4 pb-4">
                            <p className="text-zinc-700 text-xl">You haven't rated movies yet.</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Ratings;
