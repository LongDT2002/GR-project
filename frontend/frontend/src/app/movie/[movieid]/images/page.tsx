'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import requests from "@/utils/requests";
import Loader from "@/components/Loader";

axios.defaults.baseURL = "http://127.0.0.1:8000";
const bannerpath = "https://image.tmdb.org/t/p/original";

async function getMovieImages(movieid: string) {
    const api = requests.fetchMovieDetails + movieid + "/images/";
    try {
        const response = await axios.get(api);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching movie images: " + error);
    }
}

const MovieImages = ({ params }: { params: { movieid: string } }) => {
    const [Logos, setLogos] = useState<any>([]);
    const [Posters, setPosters] = useState<any>([]);
    const [Backdrops, setBackdrops] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const imageData = await getMovieImages(params.movieid);
                setLogos(imageData.logos);
                setPosters(imageData.posters);
                setBackdrops(imageData.backdrops);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie images:', error);
            }

        };
        fetchData();
    }, [params.movieid]);

    const [selectedCategory, setSelectedCategory] = useState('Backdrops');

    const renderImages = () => {
        let imagesToRender;
        switch (selectedCategory) {
            case 'Logos':
                imagesToRender = Logos;
                break;
            case 'Posters':
                imagesToRender = Posters;
                break;
            case 'Backdrops':
                imagesToRender = Backdrops;
                break;
            default:
                imagesToRender = Backdrops;
        }

        return imagesToRender.map((image: any, index: number) => (
            <div key={index} className="rounded-md p-4 bg-slate-500 relative aspect-w-16 aspect-h-9">
                <a href={bannerpath + image.image} target="_blank">
                    <Image
                        src={bannerpath + image.image}
                        alt={image.image}
                        width={500}
                        height={200}
                        objectFit="cover"
                        className="cursor-pointer slide rounded-md"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                        unoptimized
                    />
                </a>
            </div>
        ));
    };

    if (loading) {
        return <Loader />
    }

    return (
        <div className="py-8 h-full min-h-screen md:py-16">
            <div className="mx-auto max-w-screen-xl 2xl:px-0 flex gap-10">
                <div className="w-[80%]">
                    <div className="divide-y divide-gray-200">
                        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
                            <div className="grid grid-cols-3 gap-4 gap-y-6">
                                {renderImages()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-1/4 px-4 fixed right-5 top-16 h-full">
                    <div className="gap-8 w-[70%] pt-6">
                        <div className="max-w-sm mx-auto bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden bg-white text-black text-lg">
                            <div className="bg-primary bg-w text-primary-foreground px-4 py-2 flex justify-between items-center border border-current">
                                <h2 className="font-semibold text-xl">Images</h2>
                            </div>
                            <ul className="divide-y divide-border">
                                <li
                                    className={`flex justify-between items-center px-4 py-2 border border-current ${selectedCategory === 'Backdrops' ? 'bg-muted font-semibold' : ''}`}
                                    onClick={() => setSelectedCategory('Backdrops')}
                                >
                                    <a className="hover:cursor-pointer">Backdrops</a>
                                    <span className="bg-muted-foreground text-muted px-2 py-1 rounded-full">{Backdrops.length}</span>
                                </li>
                                <li
                                    className={`flex justify-between items-center px-4 py-2 border border-current ${selectedCategory === 'Posters' ? 'bg-muted font-semibold' : ''}`}
                                    onClick={() => setSelectedCategory('Posters')}
                                >
                                    <a className="hover:cursor-pointer">Posters</a>
                                    <span className="bg-muted-foreground text-muted px-2 py-1 rounded-full">{Posters.length}</span>
                                </li>
                                <li
                                    className={`flex justify-between items-center px-4 py-2 border border-current ${selectedCategory === 'Logos' ? 'bg-muted font-semibold' : ''}`}
                                    onClick={() => setSelectedCategory('Logos')}
                                >
                                    <a className="hover:cursor-pointer">Logos</a>
                                    <span className="bg-muted-foreground text-muted px-2 py-1 rounded-full">{Logos.length}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieImages;

