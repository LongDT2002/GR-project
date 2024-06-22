import React from "react";
import axios from "axios";

import Link from "next/link";
import requests from "@/utils/requests";

axios.defaults.baseURL = 'http://127.0.0.1:8000';

async function getGenreResponse() {
    const GenreApiresponse = await axios.get(requests.fetchGenreList);
    if (GenreApiresponse.status !== 200) {
        return new Error("data not fetching!");
    }
    
    return GenreApiresponse.data;
}

const Genre = async () => {
    const genredata = await getGenreResponse();

    return (
        <div>
            <div className="w-[85%] mx-auto text-2xl my-5">
                <h1>Genre</h1>
            </div>
            <div className="w-full h-full p-5 grid md:grid-cols-3 grid-cols-1 gap-4 justify-center items-center">
                {genredata.map((genre: any, index: any) => (
                    <Link href={`/genre/${genre.id}/page/1`} key={index}>
                        <div
                            className="genre_container rounded-md"
                            style={{
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                paddingTop: "50px",
                                paddingBottom: "50px",
                            }}
                        >
                            <h1 className="text-2xl mr-8 font-bold text-center text-white">
                                {genre.name}
                            </h1>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Genre;
