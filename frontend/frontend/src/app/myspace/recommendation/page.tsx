'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { getProfile, updateProfile } from '@/actions/auth';
import requests from '@/utils/requests';
import Widget from '@/components/Profile/Widget';
import Loader from '@/components/Loader';
import MovieCarousel from '@/components/EmblaCarousel/MovieCarousel';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

async function getRecommendMovies() {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json'
        }
    }
    const api = requests.fetchRecommend;
    const recommendMovies = axios.get(api, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching movie data:", error);
        });
    return recommendMovies;
}

const Overview = () => {
    const [recommendMovies, setRecommendMovies] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const recommendData = await getRecommendMovies();
                setRecommendMovies(recommendData);
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

    return (
        <div className="container mx-auto my-10 text-lg h-full bg-white">
            <div className="w-ful">
                { recommendMovies ? (
                    <div className="w-full mx-auto">
                        <div className="sm:ml-16 ml-0 h-full overflow-hidden">
                            <div className="heading md:mx-0 mx-auto md:w-auto w-[90%]">
                                <div className="w-full flex justify-between items-center">
                                    <h1 className="text-2xl my-3 text-gray-700">Recommend for you</h1>
                                </div>
                            </div>
                            <MovieCarousel Categories={recommendMovies} />
                        </div>
                    </div>) : "" }
            </div>
        </div>
    );
}

export default Overview;
