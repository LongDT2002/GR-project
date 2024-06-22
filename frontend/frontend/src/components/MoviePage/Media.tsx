'use client';
import React, { useState } from "react";
import Link from "next/link";

import ImageCarousel from "@/components/EmblaCarousel/ImageCarousel";
import VideoCarousel from "@/components/EmblaCarousel/VideoCarousel";

const Media = ({ Images, Videos, movieId }: { Images: any, Videos: any, movieId: string }) => {
    const [type, setType] = useState("Videos");

    return (
        <section className="mx-auto my-4">
            <div className="flex heading justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <div className="w-1 rounded-sm h-full bg-white"></div>
                    <h1 className="text-3xl my-1">Media</h1>
                </div>

                <div className="flex justify-center items-center text-2xl w-full md:w-auto">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
                        <li className="align-middle block">
                            <button onClick={() => { setType("Videos") }} className="block px-3 text-white md:bg-transparent" aria-current="page">Videos</button>
                        </li>
                        <li>
                            <button onClick={() => { setType("Images") }} className="block px-3 text-white md:hover:bg-transparent md:border-0">Images</button>
                        </li>
                        <li className="w-40">
                            <button className="flex items-center px-3 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                <Link href={`${type == "Images" ? `/movie/${movieId}/images`: `/movie/${movieId}/videos`}`} className="inline-block align-middle hover:underline">All {type}</Link>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            { type == "Images" ? (
                <ImageCarousel Images={Images} />) :
                <VideoCarousel Videos={Videos} /> }
        </section>
    );
};

export default Media;
