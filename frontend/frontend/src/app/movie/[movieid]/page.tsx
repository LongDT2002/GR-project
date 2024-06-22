"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import requests from "@/utils/requests";
import CastCarousel from "@/components/EmblaCarousel/CastCarousel";
import ReviewSlider from "@/components/MoviePage/ReviewSlider";
import MovieDetail from "@/components/MoviePage/MovieDetail";
import Media from "@/components/MoviePage/Media";
import Loader from "@/components/Loader";
import MovieCarousel from "@/components/EmblaCarousel/MovieCarousel";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

async function getMovieResponse(movieid: string) {
    const api = requests.fetchMovieDetails + movieid + "/";
    try {
        const response = await axios.get(api);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching movie data: " + error);
    }
}

async function getMovieCast(movieid: string) {
    const api = requests.fetchMovieDetails + movieid + "/actors/";
    try {
        const response = await axios.get(api);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching movie cast: " + error);
    }
}

async function getMovieImages(movieid: string) {
    const api = requests.fetchMovieDetails + movieid + "/images/";
    try {
        const response = await axios.get(api);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching movie images: " + error);
    }
}

async function getMovieVideos(movieid: string) {
    const api = requests.fetchMovieDetails + movieid + "/videos/";
    try {
        const response = await axios.get(api);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching movie videos: " + error);
    }
}

async function getMovieReview(movieid: string) {
    const api = requests.fetchMovieDetails + movieid + "/reviews/";
    try {
        const response = await axios.get(api);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching movie reviews: " + error);
    }
}

async function getRelatedMovie(movieid: string) {
    const api = requests.fetchMovieDetails + movieid + "/related/";
    try {
        const response = await axios.get(api);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching movie reviews: " + error);
    }
}

const Movie = ({ params }: { params: any }) => {
    const [movieDataAll, setMovieDataAll] = useState<any>(null);
    const [movieCast, setMovieCast] = useState<any>(null);
    const [movieImages, setMovieImages] = useState<any>(null);
    const [movieVideos, setMovieVideos] = useState<any>(null);
    const [movieReview, setMovieReview] = useState<any>(null);
    const [relatedMovies, setRelatedMovies] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dataAll, cast, images, videos, review, related] = await Promise.all([
                    getMovieResponse(params.movieid),
                    getMovieCast(params.movieid),
                    getMovieImages(params.movieid),
                    getMovieVideos(params.movieid),
                    getMovieReview(params.movieid),
                    getRelatedMovie(params.movieid)
                ]);

                setMovieDataAll(dataAll);
                setMovieCast(cast);
                setMovieImages(images);
                setMovieVideos(videos);
                setMovieReview(review);
                setRelatedMovies(related);
                console.log(relatedMovies);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };
        fetchData();
    }, [params.movieid]);

    function numberWithCommas(x: number) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    if (loading) {
        return <Loader />
    }

    return (
        <div className="overflow-visible">
            <MovieDetail movieDataAll={movieDataAll} />

            <div className="flex">
                <div className="w-3/4 flex flex-col items-center">
                    <div className="w-[80%]">
                        <CastCarousel Cast={movieCast.actors} movieId={params.movieid} />
                    </div>
                    <hr className="w-[80%] mx-auto my-4 border-t-2 border-gray-500" />

                    <div className="w-[80%]">
                        <ReviewSlider Reviews={movieReview.reviews} movieId={params.movieid} />
                    </div>
                    <hr className="w-[80%] mx-auto my-4 border-t-2 border-gray-500" />

                    <div className="w-[80%]">
                        <Media Images={movieImages.backdrops} Videos={movieVideos.trailers} movieId={params.movieid} />
                    </div>
                    <div className="w-[80%]">
                        <section className="mx-auto mt-8 mb-4">
                            <div className="flex heading justify-between">
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-1 rounded-sm h-full bg-white"></div>
                                    <h1 className="text-3xl my-1">Related Movies</h1>
                                </div>
                            </div>
                            <MovieCarousel Categories={relatedMovies} />
                        </section>

                    </div>
                </div>

                <div className="w-1/4 flex flex-col">
                    <div className="w-[80%] mx-auto my-4">
                        <ul className="pt-8 flex flex-col gap-2">
                            <li className="flex-col items-center gap-2">
                                <p className="text-2xl">Status</p>
                                <p className="text-lg font-light my-2 md:w-2/3 w-[95%] md:mx-0 mx-auto">
                                    Released
                                </p>
                            </li>
                            <li className="flex-col items-center gap-2">
                                <p className="text-2xl">Budget</p>
                                <p className="text-lg font-light my-2 md:w-2/3 w-[95%] md:mx-0 mx-auto">
                                    ${numberWithCommas(movieDataAll.budget)}
                                </p>
                            </li>
                            <li className="flex-col items-center gap-2">
                                <p className="text-2xl">Revenue</p>
                                <p className="text-lg font-light my-2 md:w-2/3 w-[95%] md:mx-0 mx-auto">
                                    ${numberWithCommas(movieDataAll.revenue)}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movie;
