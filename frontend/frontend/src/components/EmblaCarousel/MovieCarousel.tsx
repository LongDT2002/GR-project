"use client";
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import React, { useCallback, useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";

import { NextButton, PrevButton } from './EmblaCarouselButtons';

type Axis = 'x' | 'y'

const MovieCarousel = ({ Categories }: { Categories: any[] }) => {
    const [axis, setAxis] = useState<Axis>('x')
    const [forceWheelAxis, setForceWheelAxis] = useState<Axis | undefined>()
    const [target, setTarget] = useState<Element | undefined>()
    const [emblaRef, embla] = useEmblaCarousel({ skipSnaps: true, axis }, [
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
        <div className="embla" data-axis={axis}>
            <div ref={emblaRef} className="embla__viewport">
                <div className="embla__container flex transition-transform duration-0 delay-0">
                    {Categories &&
                        Categories.map(
                            (category, index) =>
                                category.poster && (
                                    <div key={index} className="embla__slide flex-none mx-1.5 w-1/8">
                                        <div className="">
                                            <Link href={"/movie/" + `${category.id}`}>
                                                <Image
                                                    src={posterpath + category.poster}
                                                    alt={`${category.title}`}
                                                    width={200}
                                                    height={200}
                                                    objectFit="cover"
                                                    className="cursor-pointer slide rounded-md"
                                                    placeholder="blur"
                                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                                                    unoptimized
                                                />
                                                
                                            </Link>
                                        </div>
                                    </div>
                                )
                        )}
                </div>
            </div>
            <div className="items-center justify-evenly flex mt-8">
                <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
            </div>
        </div>
    )
}

export default MovieCarousel;
