"use client";
import React, { useState, useEffect } from "react";
import requests from "@/utils/requests";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import Pagination from "@/components/Pagination";
import { useRouter } from "next/navigation";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
const posterpath = "https://image.tmdb.org/t/p/original";

function Latest({ params }: { params: { pageid: string } }) {
    const [resultMovie, setResultMovie] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const api = requests.fetchLatestMovies;
                const latestMovies = await axios.get(api)
                    .then((response) => {
                        return response.data;
                    })
                    .catch((error) => {
                        console.error("Error fetching movie data:", error);
                    });
                const data = await latestMovies;
                setResultMovie(data);
                console.log(data);
                const totalpage = data.total_pages > 500 ? 500 : data.total_pages;
                setTotalPages(totalpage);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [params.pageid]);

    const handlePageChange = (newPage: string) => {
        setCurrentPage(Number(newPage));
        router.push(`/latest/page/${newPage}`);
    };

    return (
        <div className="w-full h-full p-5">
            <div className="heading mx-auto w-[90%]">
                <h1 className="text-2xl">Latest Movies</h1>
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:w-[90%] w-[95%] mx-auto">
                {resultMovie.map((moviename: any, index) => (
                    moviename.images.poster && (
                        <div key={index} className="m-4 mb-8 px-4 mx-auto">
                            <div className="flex flex-col h-full rounded-lg bg-gray-200 shadow-lg">
                                <Link href={`/movie/${moviename.id}`} className="flex flex-col flex-grow">
                                    <div className="oot-card p-2 flex-grow">
                                        <Image
                                            src={posterpath + moviename.images.poster}
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
                                            <p className="text-lg text-gray-700 font-semibold">Hello</p>
                                        </div>
                                        <p className="mb-4 text-sm text-gray-700">Director: John Doe</p>
                                        <a href="#" className="mt-auto block rounded-lg bg-gray-500 px-4 py-2 text-center font-semibold text-white hover:bg-blue-600">Watch Trailer</a>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    )
                ))}
            </div>
            <Pagination
                currentPage={Number(params.pageid)}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>

    );
}

export default Latest;