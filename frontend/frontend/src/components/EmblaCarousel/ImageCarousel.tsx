'use client';
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import React, { useCallback, useEffect, useState } from 'react'
import Image from "next/image";

import { NextButton, PrevButton } from './EmblaCarouselButtons';

type Axis = 'x' | 'y'

const ImageCarousel = ({ Images }: { Images: any[] }) => {
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

    const bannerpath = "https://image.tmdb.org/t/p/original";

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
        <div>
            <div className="embla my-6" data-axis={axis}>
                <div ref={emblaRef} className="embla__viewport">
                    <div className="embla__container flex transition-transform duration-0 delay-0">
                        {Images &&
                            Images.slice(0,10).map(
                                (category, index) =>
                                    category.image && (
                                        <div key={index} className="embla__slide flex-none mx-1.5 w-2/5">
                                            <Image
                                                src={bannerpath + category.image}
                                                alt={`${category.title}`}
                                                width={900}
                                                height={500}
                                                objectFit="cover"
                                                className="cursor-pointer slide rounded-md"
                                                placeholder="blur"
                                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0dgn9DwADSwHNRhjk3gAAAABJRU5ErkJggg=="
                                                unoptimized
                                            />
                                        </div>
                                    )
                            )}
                    </div>
                </div>
                <div className="items-center justify-evenly flex mt-6">
                    <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                    <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
                </div>
            </div>
        </div>
    );
}

export default ImageCarousel;
