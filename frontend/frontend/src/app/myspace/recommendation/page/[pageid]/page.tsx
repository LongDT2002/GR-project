'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/navigation";

import requests from '@/utils/requests';
import Loader from '@/components/Loader';
import Pagination from '@/components/Pagination';


axios.defaults.baseURL = 'http://127.0.0.1:8000';
const posterpath = "https://image.tmdb.org/t/p/w300";

async function getRecommendMovies(pageid: string) {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json'
        }
    }
    const api = requests.fetchRecommend + "?page=" + pageid;
    const recommendMovies = axios.get(api, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching movie data:", error);
        });
    return recommendMovies;
}

const Recommend = ({ params }: { params: { pageid: string } }) => {
    const [recommendMovies, setRecommendMovies] = useState<any>(null);
    const [sortType, setSortType] = useState('date');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recommendData = await getRecommendMovies(params.pageid);
                setRecommendMovies(recommendData.results);
                const totalpage = recommendData.total_pages > 500 ? 500 : recommendData.total_pages;
                setTotalPages(totalpage);
                setLoading(false);
            } catch (error) {
                console.error("Fetch profile data failed");
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    function handleSort() {
        switch (sortType) {
            case "name":
                return recommendMovies.sort((a: any, b: any) => {
                    return a.movie.title.localeCompare(b.movie.title);
                });
            case "rate":
                return recommendMovies.sort((a: any, b: any) => parseFloat(a.movie.ave_rate) - parseFloat(b.movie.ave_rate));
            default:
                return recommendMovies;
        }
    }

    const handlePageChange = (newPage: string) => {
        setCurrentPage(Number(newPage));
        router.push(`/myspace/recommendation/page/${newPage}`);
    };

    return (
        <div className="w-full">
            <div className="p-3 px-[5%] pt-[2%]">
                <div className="px-4 pb-4">
                    <div className="flex justify-between">
                        <p className="text-2xl font-bold text-zinc-900 flex items-center">
                            Recommend for you
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
                                    <option value="date">Review time</option>
                                    <option value="name">Movie title</option>
                                    <option value="rate">Average rate</option>
                                </select>
                            </form>
                            <span className="text-zinc-700 text-xl"> Order:</span>
                            <button onClick={() => {
                                const sorted = handleSort();
                                setRecommendMovies([...sorted]);
                            }} className="text-zinc-700">↑</button>

                            <span className="text-zinc-700 text-xl">|</span>

                            <button onClick={() => {
                                const sorted = handleSort().reverse();
                                setRecommendMovies([...sorted]);
                            }} className="text-zinc-700">↓</button>
                        </div>
                    </div>
                </div>
            </div>
            {recommendMovies.length > 0 ? (
                <div>
                    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:w-[90%] w-[95%] mx-auto">
                        {recommendMovies.map((movie: any, index: number) => (
                            <div key={index} className="m-4 mb-8 px-4 mx-auto">
                                <div className="flex flex-col h-full rounded-lg bg-gray-200 shadow-lg">
                                    <Link href={`/movie/${movie.id}`} className="flex flex-col flex-grow">
                                        <div className="oot-card p-2 flex-grow">
                                            <Image
                                                src={posterpath + movie.poster}
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
                                                <h2 className="text-lg text-gray-700 font-semibold">{movie.title}</h2>
                                                <p className="text-lg text-gray-700 font-semibold flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="pb-0.5 w-3.5 h-3.5 mr-1 flex-shrink-0">
                                                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                                    </svg>
                                                    <span>{movie.ave_rate.toFixed(1)}</span>
                                                </p>
                                            </div>
                                            <p className="mb-4 text-md text-gray-700">Release: {movie.release_date}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>))}

                    </div>
                    <div className="w-full justify-center">
                        <Pagination
                            currentPage={Number(params.pageid)}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            ) :
                (
                    <div className="px-[5%] h-[60vh]">
                        <div className="px-4 pb-4">
                            <p className="text-zinc-700 text-xl">There are no recommend for you. Maybe come later.</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Recommend;
