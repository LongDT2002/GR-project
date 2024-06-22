"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "@/components/Loader";
import MovieCast from "@/components/MoviePage/MovieCast";
import requests from "@/utils/requests";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

async function getMovieCast(movieid: string) {
    const api = requests.fetchMovieDetails + movieid + "/actors/";
    try {
        const response = await axios.get(api);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching movie cast: " + error);
    }
}

const allCastCrews = ({ params }: { params: any }) => {
    const [movieCast, setMovieCast] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cast] = await Promise.all([
                    getMovieCast(params.movieid),
                ]);
                setMovieCast(cast.actors);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };
        fetchData();
    }, [params.movieid]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="w-full h-full p-5">
            <div className="heading mx-auto w-[90%]">
                <h1 className="text-2xl">Cast</h1>
            </div>
            <MovieCast MovieCast={movieCast} />
        </div>

    );
}

export default allCastCrews;













































