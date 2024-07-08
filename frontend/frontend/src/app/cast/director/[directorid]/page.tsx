'use client';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import axios from "axios";

import BigTextContent from "@/components/BigTextContent";
import MovieCarousel from "@/components/EmblaCarousel/MovieCarousel";
import Loader from '@/components/Loader';
import requests from "@/utils/requests";


axios.defaults.baseURL = "http://127.0.0.1:8000/";
const personimgpath = "https://image.tmdb.org/t/p/original";

async function getPersonDetails(directorid: string) {
    const api = requests.fetchDirectorDetails + directorid + "/";
    const ActorApiresponse = await axios.get(api)
        .then((response) => {
            return response.data;
        })

    return ActorApiresponse;
}

async function getPersonImages(directorid: string) {
    const api = requests.fetchDirectorDetails + directorid + "/images/";
    const PersonsImgresponse = await axios.get(api)
        .then((response) => {
            return response.data;
        })

    return PersonsImgresponse;
}
async function getPersonMovies(directorid: string) {
    const api = requests.fetchDirectorDetails + directorid+ "/movies/";
    const PersonsMovieresponse = await axios.get(api)
        .then((response) => {
            return response.data;
        })

    return PersonsMovieresponse;
}

const Actor = ({ params }: { params: any }) => {
    const [personDetails, setPersonDetails] = useState<any>({});
    const [personImages, setPersonImages] = useState<any>([]);
    const [personMovies, setPersonMovies] = useState<any>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [personData, personImgData, personMoviesData] = await Promise.all([
                    getPersonDetails(params.directorid),
                    getPersonImages(params.directorid),
                    getPersonMovies(params.directorid)
                ])

                setPersonDetails(personData);
                setPersonImages(personImgData);
                setPersonMovies(personMoviesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching actor data:', error);
            }
        };
        fetchData();
    }, [params.directorid]);

    if(loading){
        return <Loader />
    }

    return (
        <div className='min-h-[100vh]'>
            <div className="flex md:flex-row flex-col w-100 md:h-full py-10 md:my-0 my-5 h-full">
                <div className="basis-1/3 h-full m-auto">
                    <div className="my-auto">
                        { personImages.length > 0 ? 
                            <Image
                                src={personimgpath + personImages[0].image}
                                alt={personDetails.name}
                                width={150}
                                height={150}
                                className="m-auto w-[300px]"
                                unoptimized
                            /> :
                            <Image
                                src="/placeholder_person.png"
                                alt={personDetails.name}
                                width={100}
                                height={100}
                                className="m-auto w-[300px] bg-white"
                                unoptimized
                            />
                        }
                        <h1 className="font-bold mt-3 text-xl text-center">
                            {personDetails.name}
                        </h1>
                        <p className="font-italic text-slate-300 text-center text-lg">
                            Known For: Directing
                        </p>
                    </div>
                </div>
                <div className="flex-1 h-full my-auto mr-32 md:p-10 px-2 flex items-center justify-start">
                    <div className="person_details_container md:p-0 p-3 justify-start">
                        <div className='text-xl'>
                            <span className="font-bold">Birthday: </span>
                            {personDetails.birthday != null ? (
                                `${personDetails.birthday}`
                            ) : (
                                "No information"
                            )}
                        </div>
                        <div className='text-xl'>
                            <span className="font-bold">Day of Death: </span>
                            {personDetails.deathday != null ? (
                                `${personDetails.deathday}`
                            ) : (
                                "No information"
                            )}
                            
                        </div>
                        <div className='text-xl'>
                            <span className="font-bold">Place Of Birth: </span>
                            {personDetails.place_of_birth != null ? (
                                `${personDetails.place_of_birth}`
                            ) : (
                                "No information"
                            )}
                        </div>
                        <div className='text-xl'>
                            <span className="font-bold">Biography: </span>
                            {personDetails.biography != "" ? (
                                <BigTextContent textData={personDetails.biography} />
                            ) : 
                                "No information"
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-100 my-3 min-h-[50vh]">
                <div className="md:w-[80%] w-[95%] mx-auto">
                    <div className="heading">
                        <h1 className="text-2xl my-3">Known for</h1>
                    </div>
                    <div className="latestReleases my-5 w-full ml-auto">
                        <div className="ml-0 latestinner h-full overflow-hidden">
                            {(<MovieCarousel Categories={personMovies} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Actor;
