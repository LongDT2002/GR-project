'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import requests from "@/utils/requests";
import Loader from "@/components/Loader";

axios.defaults.baseURL = "http://127.0.0.1:8000";
const bannerpath = "https://image.tmdb.org/t/p/original";

async function getMovieImages(movieid: string) {
    const api = requests.fetchMovieDetails + movieid + "/videos/";
    try {
        const response = await axios.get(api);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching movie images: " + error);
    }
}

const MovieVideos = ({ params }: { params: { movieid: string } }) => {
    const [Trailers, setTrailers] = useState<any>([]);
    const [Teasers, setTeasers] = useState<any>([]);
    const [Clips, setClips] = useState<any>([]);
    const [BehindTheScenes, setBehindTheScenes] = useState<any>([]);
    const [Bloopers, setBloopers] = useState<any>([]);
    const [Featurettes, setFeaturettes] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoData = await getMovieImages(params.movieid);
                setTrailers(videoData.trailers);
                setTeasers(videoData.teasers);
                setClips(videoData.clips);
                setBehindTheScenes(videoData.behind_the_scenes);
                setBloopers(videoData.bloopers);
                setFeaturettes(videoData.featurettes);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie images:', error);
            }

        };
        fetchData();
    }, [params.movieid]);

    const [selectedCategory, setSelectedCategory] = useState('Backdrops');
    const [isOpen, setisOpen] = useState(false);
    const PopupOpen = () => {
        setisOpen(true);
    };
    const PopupClose = () => {
        setisOpen(false);
    };
    const [link, setLink] = useState<string>('');
    const handleLink = (link: string) => {
        PopupOpen();
        setLink(link);
    }
    
    const renderVideo = () => {
        let videosToRender;
        switch (selectedCategory) {
            case 'Trailers':
                videosToRender = Trailers;
                break;
            case 'Teasers':
                videosToRender = Teasers;
                break;
            case 'Clips':
                videosToRender = Clips;
                break;
            case 'Behind the Scenes':
                videosToRender = BehindTheScenes;
                break;
            case 'Bloopers':
                videosToRender = Bloopers;
                break;
            case 'Featurettes':
                videosToRender = Featurettes;
                break;
            default:
                videosToRender = Trailers;
        }

        return videosToRender.map((video: any, index: number) => (
            <div key={index} className="relative aspect-w-16 pt-1.5 aspect-h-9 bg-slate-300 rounded-md">
                <button key={index} onClick={() => handleLink(`https://www.youtube.com/embed${video.link}`)}>
                    <Image
                        src={`https://img.youtube.com/vi${video.link}/0.jpg`}
                        className="w-full"
                        alt={`${video.title}`}
                        width={300}
                        height={200}
                        objectFit="cover"
                    ></Image>
                </button>
            </div>
        ));
    };

   
    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div className="py-8 h-full min-h-screen md:py-16">
                    <div className="mx-auto max-w-screen-xl 2xl:px-0 flex gap-10">
                        <div className="w-[80%]">
                            <div className="divide-y divide-gray-200">
                                <div className="pt-6 pb-8 space-y-2 md:space-y-5">
                                    <div className="grid gap-4 gap-y-6">
                                        {renderVideo()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            {isOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center">
                                    <div
                                        className="flexi-modal-back absolute inset-0 bg-black"
                                        onClick={PopupClose}
                                    ></div>
                                    <div className="flexi-modal-content md:w-[70%] w-[95%] h-[50vh] md:min-h-[70vh] relative z-10 rounded">
                                        <span
                                            className="flexi-modal-close-icon sm:bg-white py-2 px-3 absolute sm:-right-10 right-5 -top-10 cursor-pointer sm:text-slate-500 text-white sm:rounded-full"
                                            onClick={PopupClose}
                                        >
                                            <span className="sm:block hidden">✘</span>
                                            <span className="sm:hidden block underline text-white">
                                                Close
                                            </span>
                                        </span>
                                        <iframe
                                            src={link}
                                            className="w-full h-full"
                                            allow="fullscreen;"
                                        ></iframe>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-1/4 px-4 fixed right-5 top-16 h-full">
                            <div className="gap-8 w-[70%] pt-6">
                                <div className="max-w-sm mx-auto bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden bg-slate-300 text-black text-lg">
                                    <div className="bg-primary bg-w text-primary-foreground px-4 py-2 flex justify-between items-center border border-current">
                                        <h2 className="font-semibold text-xl">Videos</h2>
                                    </div>
                                    <ul className="divide-y divide-border">
                                        <li className="flex justify-between items-center px-4 py-2 border border-current"
                                        onClick={() => setSelectedCategory("Trailers")} >
                                            <a className="hover:cursor-pointer">Trailers</a>
                                            <span className="bg-muted-foreground text-muted px-2 py-1 rounded-full">{Trailers.length}</span>
                                        </li>
                                        <li className="flex justify-between items-center px-4 py-2 border border-current"
                                        onClick={() => setSelectedCategory("Teasers")}>
                                            <a className="hover:cursor-pointer">Teasers</a>
                                            <span className="bg-muted-foreground text-muted px-2 py-1 rounded-full">{Teasers.length}</span>
                                        </li>
                                        <li className="flex justify-between items-center px-4 py-2 border border-current"
                                        onClick={()=> setSelectedCategory("Clips")}>
                                            <a className="hover:cursor-pointer">Clips</a>
                                            <span className="bg-muted-foreground text-muted px-2 py-1 rounded-full">{Clips.length}</span>
                                        </li>
                                        <li className="flex justify-between items-center px-4 py-2 border border-current"
                                        onClick={()=> setSelectedCategory("Behind the Scenes")}>
                                            <a className="hover:cursor-pointer">Behind the Scenes</a>
                                            <span className="bg-muted-foreground text-muted px-2 py-1 rounded-full">{BehindTheScenes.length}</span>
                                        </li>
                                        <li className="flex justify-between items-center px-4 py-2 border border-current"
                                        onClick={()=> setSelectedCategory("Bloopers")}>
                                            <a className="hover:cursor-pointer">Bloopers</a>
                                            <span className="bg-muted-foreground text-muted px-2 py-1 rounded-full">{Bloopers.length}</span>
                                        </li>
                                        <li className="flex justify-between items-center px-4 py-2 border border-current"
                                        onClick={()=> setSelectedCategory("Featurettes")}>
                                            <a className="hover:cursor-pointer">Featurettes</a>
                                            <span className="bg-muted-foreground text-muted px-2 py-1 rounded-full">{Featurettes.length}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieVideos;

