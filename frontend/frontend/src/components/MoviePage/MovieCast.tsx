import React from "react";
import Image from "next/image";
import Link from "next/link";

const posterpath = "https://image.tmdb.org/t/p/w300";

const MovieCast = ({ MovieCast }: { MovieCast: any }) => {
    console.log(MovieCast)
    return (
        <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 md:w-[90%] w-[95%] mx-auto">
            { MovieCast.map((actor: any, index: number) => (
                actor.actor.images && (
                    <div key={index} className="m-4 mb-8 px-4 mx-auto">
                        <div className="flex flex-col h-full rounded-lg bg-gray-200 shadow-lg">
                            <Link href={`cast/actor/${actor.actor.id}`} className="flex flex-col flex-grow">
                                <div className="oot-card p-2 flex-grow">
                                    <Image
                                        src={posterpath + actor.actor.images.image}
                                        width={150}
                                        height={150}
                                        alt={`Movie_${index}`}
                                        className="mx-auto h-[150px] object-cover"
                                        placeholder="blur"
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                                        unoptimized
                                    />
                                    <div className="text-center my-3 text-black">
                                        <h1 className="font-bold">{actor.actor.name}</h1>
                                        <p className="font-light text-sm">{actor.character_name}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}

export default MovieCast;
