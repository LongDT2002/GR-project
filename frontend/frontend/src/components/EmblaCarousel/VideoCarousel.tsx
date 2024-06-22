'use client';
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import React, { useCallback, useEffect, useState } from 'react'
import Image from "next/image";

import { NextButton, PrevButton } from './EmblaCarouselButtons';
import Popups from '@/components/Popups';

type Axis = 'x' | 'y'

const VideoCarousel = ({ Videos }: { Videos: any[] }) => {
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
    return (
        <div>
            <div className="embla my-6" data-axis={axis}>
                <div ref={emblaRef} className="embla__viewport">
                    <div className="embla__container flex transition-transform duration-0 delay-0">
                        {Videos &&
                            Videos.slice(0,5).map(
                                (category, index) =>
                                    category.link && (
                                        <div className="embla__slide flex-none mx-1.5 w-2/5">
                                            <button key={index} onClick={() => handleLink(`https://www.youtube.com/embed${category.link}`)}>
                                                <Image
                                                    src={`https://img.youtube.com/vi${category.link}/0.jpg`}
                                                    className="w-full"
                                                    alt={`${category.title}`}
                                                    width={900}
                                                    height={500}
                                                    objectFit="cover"
                                                ></Image>
                                            </button>
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
        </div>
    );
}

export default VideoCarousel;
