import React from "react";
import Image from "next/image";
import Link from "next/link";

import Trailer from "./Trailer";
import WatchlistIcon from "./WatchlistIcon";
import ListIcon from "./ListIcon";
import RateModal from "@/components/Review/RateModal";

const bannerpath = "https://image.tmdb.org/t/p/original/";
const posterpath = "https://image.tmdb.org/t/p/w500";

const MovieDetail = ({ movieDataAll }: { movieDataAll: any }) => {
    return (
        <div className="bg-cover relative bg-fixed bg-center md:min-h-screen h-full w-full flex md:flex-row flex-col" style={movieDataAll.images.backdrop ? {
            backgroundImage: `linear-gradient(to bottom, transparent, black),url(${bannerpath + movieDataAll.images.backdrop})`,
        } : {}}>
            <div className="imgContainer flex items-center p-3 justify-center flex-initial md:w-1/3 w-full">
                <Image
                    src={movieDataAll.images &&
                        movieDataAll.images.poster ? posterpath + movieDataAll.images.poster : ""}
                    alt={movieDataAll.title}
                    width={250}
                    height={250}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                    priority
                    unoptimized />
            </div>
            <div className="movieDetails p-3 flex items-center md:justify-start justify-center flex-initial overflow-x-hidden md:w-2/3 w-full">
                <div className="movieDetailsInner md:text-left text-center">
                    {movieDataAll.images &&
                        movieDataAll.images.logo && (
                            <Image
                                src={`${posterpath}${movieDataAll.images.logo}`}
                                alt={movieDataAll.title}
                                height={150}
                                width={150}
                                className="md:mx-0 mx-auto"
                                unoptimized
                            />
                        )}
                    <h1 className="text-4xl font-bold md:w-3/4 w-[90%] md:mx-0 mx-auto my-4">
                        {movieDataAll.title}
                    </h1>
                    <p className="italic text-slate-300">
                        {movieDataAll.tagline ? movieDataAll.tagline : ""}
                    </p>
                    <ul className="flex gap-5 text-slate-300 md:justify-start justify-center md:w-full w-[95%] md:mx-0 mx-auto px-2 overflow-x-scroll no-scrollbar">
                        {movieDataAll.genres &&
                            movieDataAll.genres.map((genre: any, index: React.Key | null | undefined) => (
                                <Link key={index} href={`/genre/${genre.id}/page/1`}>
                                    <li className="my-2 px-3 py-1 rounded-3xl whitespace-nowrap bg-slate-800 w-fit text-md">
                                        {genre.name}
                                    </li>
                                </Link>
                            ))}
                    </ul>
                    <ul className="flex text-lg gap-5 text-slate-300 sm:justify-start justify-center my-2">
                        <li>{movieDataAll.duration + " " + "Mins"}</li>
                        <li className="list-disc">{movieDataAll.release_date}</li>
                        <li className="list-disc">{movieDataAll.original_country}</li>
                    </ul>
                    <ul className="flex gap-5 text-slate-300 sm:justify-start justify-center my-4">
                        <li className="text-2xl flex items-center text-slate-300 font-bold md:justify-start justify-center">
                            <span className="material-icons pr-3">star</span>
                            {movieDataAll.ave_rate.toFixed(1) + "/ " + "5.0"}
                        </li>
                        <li>
                            <RateModal movieId={movieDataAll.id} movieTitle={movieDataAll.title} />
                        </li>
                    </ul>
                    <ul className="flex gap-5 text-slate-300 sm:justify-start justify-center my-2">
                        <li className="flex items-center justify-center rounded-full bg-slate-800 p-4">
                            <WatchlistIcon favMovie={movieDataAll.id} />
                        </li>
                        <li>
                            <Trailer trailer={movieDataAll.trailer} />
                        </li>
                    </ul>
                    <div>
                        <h1 className="text-2xl">Summary</h1>
                        <p className="text-lg font-light my-2 md:w-2/3 w-[95%] md:mx-0 mx-auto">{movieDataAll.summary}</p>
                    </div>
                    { movieDataAll.director ? <div className="mt-4 inline-block">
                        <Link className="text-2xl hover:underline cursor" href={`/cast/director/${movieDataAll.director.id}`}>{movieDataAll.director.name}</Link>
                        <p className="text-lg font-light my-2 md:w-2/3 w-[95%] md:mx-0 mx-auto">
                            Director
                        </p>
                    </div> : ""}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
