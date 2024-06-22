'use client';
import Banner from "@/components/Banner";
import MovieCarousel from "@/components/EmblaCarousel/MovieCarousel";
import UpcomingRelease from "@/components/UpcomingRelease";
import Loader from "@/components/Loader";
import requests from "@/utils/requests";

import { BiSolidChevronRight } from "react-icons/bi";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "http://127.0.0.1:8000";

async function getTrendingMovie() {
    const api = requests.fetchTrending;
    const trendingMovie = axios.get(api)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching movie data:", error);
        });
    return trendingMovie;
}

async function getLatestMovies() {
    const api = requests.fetchLatestMovies;
    const latestMovies = axios.get(api)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching movie data:", error);
        });
    return latestMovies;
}

async function getTopRated() {
    const api = requests.fetchTopRated;
    const topRated = axios.get(api)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching movie data:", error);
        });
    return topRated;
}

async function getRecommendMovies() {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }
    const api = requests.fetchRecommend;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json'
        }
    }

    const recommendMovies = axios.get(api, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching movie data:", error);
        });
    return recommendMovies;
}


// async function getUpcomingMovies() {
//     const currentDate = new Date();

//     const nextWeekDate = new Date(currentDate);
//     nextWeekDate.setDate(currentDate.getDate() + 7);

//     const CurrentDate = formatDate(currentDate);
//     const NextWeekDate = formatDate(nextWeekDate);

//     const UpcomingApiresponse = await fetch(`${requests.fetchMovieDetails}upcoming?api_key=e4d2477534d5a54cb6f0847a0ee853eb&languages=en-US&primary_release_date.gte=${CurrentDate}&primary_release_date.lte=${NextWeekDate}`, {
//         cache: "no-store",
//     });

//     if (!UpcomingApiresponse.ok) {
//         return new Error("data not fetching!");
//     }

//     return UpcomingApiresponse.json();
// }


// function formatDate(date: Date) {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
// }

const Home = () => {
    const [trendingMovieData, setTrendingMovieData] = useState([]);
    const [latestMoviesData, setLatestMoviesData] = useState([]);
    const [topRatedData, setTopRatedData] = useState([]);
    const [recommendMoviesData, setRecommendMoviesData] = useState(null);
    const [UpcomingMoviesData, setUpcomingMoviesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const [trendingMovie, latestMovies, topRated, recommendMovies] = await Promise.all([
                getTrendingMovie(),
                getLatestMovies(), 
                getTopRated(),
                getRecommendMovies()
            ]);
            
            setTrendingMovieData(trendingMovie);
            setLatestMoviesData(latestMovies.results);
            setTopRatedData(topRated);
            setRecommendMoviesData(recommendMovies);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <Loader />;
    }
    
    return (
        <div>
            <Banner bannerContent={trendingMovieData} />
            <div className="my-5 w-full ml-auto">
                <div className="sm:ml-16 ml-0 latestinner h-full overflow-hidden">
                    <div className="heading md:mx-0 mx-auto md:w-auto w-[90%]">
                        <div className="w-full flex justify-between items-center">
                            <h1 className="text-2xl my-3 font-bold">Latest Releases</h1>
                            <Link className="cursor-pointer" href={"/latest/page/1"}>
                                <BiSolidChevronRight className="text-white text-2xl w-6 h-6 mx-3" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <MovieCarousel Categories={latestMoviesData} />
                    </div>
                </div>
            </div>
            <div className="my-5 w-full ml-auto">
                <div className="sm:ml-16 ml-0 latestinner h-full overflow-hidden">
                    <div className="heading md:mx-0 mx-auto md:w-auto w-[90%]">
                        <div className="w-full flex justify-between items-center">
                            <h1 className="text-2xl my-3">Top Rated</h1>
                            <Link className="cursor-pointer" href={"/toprated/page/1"}>
                                <BiSolidChevronRight className="text-white text-2xl w-6 h-6 mx-3" />
                            </Link>
                        </div>
                    </div>
                    <MovieCarousel Categories={topRatedData} />
                </div>
            </div>

            <div className="my-5 w-full ml-auto">
                <div className="sm:ml-16 ml-0 latestinner h-full overflow-hidden">
                    <UpcomingRelease upcomingdata={trendingMovieData} />
                </div>
            </div>

            { recommendMoviesData ? (
                <div className="my-5 w-full ml-auto">
                    <div className="sm:ml-16 ml-0 latestinner h-full overflow-hidden">
                        <div className="heading md:mx-0 mx-auto md:w-auto w-[90%]">
                            <div className="w-full flex justify-between items-center">
                                <h1 className="text-2xl my-3">Recommend for you</h1>
                                <Link className="cursor-pointer" href={"/toprated/page/1"}>
                                    <BiSolidChevronRight className="text-white text-2xl w-6 h-6 mx-3" />
                                </Link>
                            </div>
                        </div>
                        <MovieCarousel Categories={recommendMoviesData} />
                    </div>
                </div> ) : "" }
        </div>
    );
};

export default Home;
