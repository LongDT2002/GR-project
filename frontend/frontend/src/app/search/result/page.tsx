'use client';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
const posterpath = "https://image.tmdb.org/t/p/original/";

async function getSearchMovieData(searchParams: any) {
    const searchMovie = axios.get(`/movie/search/?query=${searchParams.search}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return searchMovie;
}

async function getSearchActorData(searchParams: any) {
    const searchActor = axios.get(`/actor/search/${searchParams.search}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return searchActor;
}

async function getSearchDirectorData(searchParams: any) {
    const searchDirector = axios.get(`/director/search/${searchParams.search}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return searchDirector;
}

const Results = ({ searchParams }: { searchParams: any }) => {
    const [movieData, setMovieData] = useState([]);
    const [personData, setPersonData] = useState([]);

    useEffect(() => {
        if (searchParams.type === "Movie") {
            getSearchMovieData(searchParams).then((data) => {
                setMovieData(data);
            });
        } else if (searchParams.type === "Actor") {
            getSearchActorData(searchParams).then((data) => {
                setPersonData(data);
            });
        } else if (searchParams.type === "Director") {
            getSearchDirectorData(searchParams).then((data) => {
                setPersonData(data);
            });
        }
    }, [searchParams]);

    return (
        <div>
            <div className="w-[90%] m-auto h-screen p-3">
                <h1 className="text-center text-3xl my-5">
                    Search Results For:{" "}
                    <span className="font-bold capitalize">{searchParams.search}</span>
                </h1>

                {searchParams.type === "Movie" ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:grid-cols-5">
                        {movieData.map((movie: any, index: number) =>
                            <div key={index} className="m-4 mb-8 px-4 mx-auto">
                                <div className="flex flex-col h-full rounded-lg bg-gray-200 shadow-lg">
                                    <Link href={`/movie/${movie.id}`} className="flex flex-col flex-grow">
                                        <div className="oot-card p-2 flex-grow">
                                            { movie.poster ?
                                                <Image
                                                    src={posterpath + movie.poster}
                                                    width={400}
                                                    height={400}
                                                    alt={`Movie_${index}`}
                                                    className="mx-auto h-[400px] object-cover"
                                                    placeholder="blur"
                                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                                                    unoptimized
                                                /> : <div className="h-[400px] w-[250px] bg-gray-300"></div>}
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
                            </div>
                        )}
                    </div>) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:grid-cols-5">
                        {personData.map((person: any, index: number) =>
                            <div key={index} className="m-4 mb-8 px-4 mx-auto">
                                <div className="flex flex-col h-full rounded-lg bg-gray-200 shadow-lg">
                                    <Link href={`${searchParams.type == "Actor" ? `/cast/actor/${person.id}` : `/cast/director/${person.id}`}`}
                                        className="flex flex-col flex-grow">
                                        <div className="oot-card p-2 flex-grow">
                                            { person.image ? <Image
                                                src={posterpath + person.image}
                                                width={400}
                                                height={400}
                                                alt={`Movie_${index}`}
                                                className="mx-auto h-[400px] object-cover"
                                                placeholder="blur"
                                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                                                unoptimized
                                            /> : <div className="h-[400px] w-[250px] bg-gray-300"></div>}
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <div className="flex justify-between mb-2">
                                                <h2 className="text-lg text-gray-700 font-semibold">{person.name}</h2>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}

export default Results;
