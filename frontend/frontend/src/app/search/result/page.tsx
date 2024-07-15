'use client';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
const posterpath = "https://image.tmdb.org/t/p/original/";

async function getSearchMovieData(searchParams: any) {
    const formatDate = (date: string | null) => {
        if (date === null || date === '') return new Date();
        return new Date(date).toLocaleDateString("fr-CA");
    }

    const search = searchParams.search;
    const dateFrom = searchParams.dateFrom ? formatDate(searchParams.dateFrom) : "";
    const dateTo = searchParams.dateTo ? formatDate(searchParams.dateTo) : "";

    const searchMovie = axios.get(`/movie/search/?query=${search}` + (dateFrom != "" ? `&release_date=${dateFrom},${dateTo}` : ""))
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
            {searchParams.type === "Movie" ? (
                <div className="flex flex-col justify-center items-center">
                    {movieData.length > 0 && movieData.map((movie: any) => (
                        <div className="pb-3 w-[70%] min-h-[200px]">
                            <div className="bg-slate-200 shadow-lg border-gray-400 border sm:rounded-3xl p-7 flex space-x-10">
                                <div className="min-w-[180px] overflow-visible">
                                    <Link href={`/movie/${movie.id}`}>
                                        <Image
                                            src={posterpath + movie.poster}
                                            alt={movie.poster}
                                            className="rounded-3xl shadow-lg"
                                            width={175}
                                            height={175}
                                            objectFit="cover"
                                            placeholder="blur"
                                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                                            unoptimized
                                        />
                                    </Link>
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-zinc-900 text-3xl font-bold">{movie.title}</h2>
                                        <div className="bg-yellow-400 font-bold rounded-xl p-2 text-black">{movie.ave_rate.toFixed(1) + "/ " + "5.0"}</div>
                                    </div>
                                    <div>
                                        <div className="text-xl text-gray-800">Realease date: {movie.release_date}</div>
                                    </div>
                                    <p className="text-xl text-zinc-900 overflow-y-hidden">{movie.summary}</p>
                                </div>
                            </div>
                        </div>))}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:grid-cols-4 w-[90%]">
                    {personData.length > 0 && personData.map((person: any, index: number) =>
                        <div key={index} className="m-4 mb-8 px-4 mx-auto">
                            <div className="flex flex-col h-full rounded-lg bg-gray-200 shadow-lg">
                                <Link href={`${searchParams.type == "Actor" ? `/cast/actor/${person.id}` : `/cast/director/${person.id}`}`}
                                    className="flex flex-col flex-grow">
                                    <div className="oot-card p-2 flex-grow">
                                        {person.image ? <Image
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
            )
            }
        </div >
    );
}

export default Results;
