"use client";
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import React, { useCallback, useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";

import { NextButton, PrevButton } from './EmblaCarouselButtons';

type Axis = 'x' | 'y'
const CastCarousel = ({ Cast, movieId }: { Cast: any[], movieId: string }) => {
    const [axis, setAxis] = useState<Axis>('x')
    const [forceWheelAxis, setForceWheelAxis] = useState<Axis | undefined>()
    const [target, setTarget] = useState<Element | undefined>()
    const [emblaRef, embla] = useEmblaCarousel({ skipSnaps: false, axis }, [
        WheelGesturesPlugin({
            forceWheelAxis,
            target,
        }),
    ])

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

    const posterpath = "https://image.tmdb.org/t/p/w300";

    useEffect(() => {
        if (embla) {
            const onSelect = () => {
                setSelectedIndex(embla.selectedScrollSnap())
                setPrevBtnEnabled(embla.canScrollPrev())
                setNextBtnEnabled(embla.canScrollNext())
            }

            setScrollSnaps(embla.scrollSnapList())
            embla.on('select', onSelect)
            onSelect()
        }
    }, [embla])

    return (
        <section className="mx-auto mt-8 mb-4">
            <div className="flex heading justify-between">
                <div className="flex items-center space-x-2 mb-4">
                    <div className="w-1 rounded-sm h-full bg-white"></div>
                    <h1 className="text-3xl my-1">Cast & Crew</h1>
                </div>

                <button className="flex space-x-2 text-2xl py-2 px-3 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <Link href={`${movieId}/crew`} className="inline-block align-middle hover:underline">All Cast</Link>
                </button>
            </div>

            <div className="embla" data-axis={axis}>
                <div ref={emblaRef} className="embla__viewport">
                    <div className="embla__container flex transition-transform duration-0 delay-0">
                        {Cast &&
                            Cast.map(
                                (cast, index) =>
                                    cast.actor.images && (
                                        <div key={index} className="embla__slide flex-none mx-1.5 w-1/8">
                                            <Link href={"/cast/actor/" + `${cast.actor.id}`}>
                                                <Image
                                                    src={posterpath + cast.actor.images.image}
                                                    alt={`${cast.actor.name}`}
                                                    width={200}
                                                    height={200}
                                                    objectFit="cover"
                                                    className="cursor-pointer slide rounded-lg"
                                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                                                    unoptimized
                                                />
                                            </Link>
                                            <div className="text-center my-3">
                                                <h1 className="font-bold">{cast.actor.name}</h1>
                                                <p className="font-light text-sm">{cast.character_name}</p>
                                            </div>
                                        </div>
                                    )
                            )
                        }
                    </div>
                </div>
                <div className="items-center justify-evenly flex mt-8">
                    <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                    <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
                </div>
            </div>
        </section>
    )
}

export default CastCarousel;
