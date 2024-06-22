"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

const bannerpath = "https://image.tmdb.org/t/p/original";
const posterpath = "https://image.tmdb.org/t/p/w500";
const logopath = "https://image.tmdb.org/t/p/w200";

const Banner = ({ bannerContent }: { bannerContent: any[] }) => {
    const [firstbannerContent, setBannerContent] = useState(bannerContent[0]);
    const [gradientDirection, setGradientDirection] = useState("left");

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.innerWidth < 640) {
                setGradientDirection("bottom");
            } else {
                setGradientDirection("left");
            }
        }
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "60px",
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 10000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "40px",
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "40px",
                    slidesToShow: 1,
                },
            },
        ],
    };

    const handleBannerContent = (index: number) => {
        setBannerContent(bannerContent[index]);
    };

    return (
        <div className="relative text-lg">
            <div
                key={firstbannerContent.id}
                style={{
                    backgroundImage: `linear-gradient(to  ${gradientDirection}, transparent, black), url(${bannerpath + firstbannerContent.images.backdrop
                        })`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
                className={`bannerContainer sm:h-[100vh] h-full  sm:aspect-auto  aspect-square w-full relative overflow-x-hidden`}
            >
                <div className="bannerTextContainer md:w-1/2 w-[75%] absolute md:top-1/5 top-1/5 bottom-2/4 left-[10%]">
                    {firstbannerContent.images &&
                        firstbannerContent.images.logo ? (
                        <Image
                            src={`${logopath}${firstbannerContent.images.logo}`}
                            height={150}
                            width={150}
                            alt="slider_img"
                            className="md:mx-0 mx-auto"
                            unoptimized
                        />
                    ) : (
                        <h1
                            className={`font-bold md:text-left text-center ${firstbannerContent &&
                                firstbannerContent.title &&
                                firstbannerContent.title.length > 25
                                ? "text-2xl"
                                : "text-4xl"
                                }`}
                        >
                            {firstbannerContent.title && firstbannerContent.title}
                        </h1>
                    )}
                    {firstbannerContent.release_date && (
                        <ul className="smallContent md:justify-start justify-center flex gap-7 list-none my-3">
                            <li>{firstbannerContent.release_date}</li>
                            <li className="list-disc">
                                {firstbannerContent.original_country}
                            </li>
                            <li className="list-disc">
                                <span className="flex items-center flex-row ">
                                    <span className="material-icons mr-2 text-sm">star</span>
                                    {firstbannerContent.ave_rate.toFixed(1) + "/ " + "5.0"}
                                </span>
                            </li>
                        </ul>
                    )}
                    <p className="line-clamp-5 text-base md:text-lg hidden sm:block ">
                        {firstbannerContent.summary && firstbannerContent.summary}
                    </p>
                    <Link
                        href={`/movie/${firstbannerContent.id}`}
                        style={{ cursor: "pointer !important" }}
                    >
                        <button className="py-2 px-5 bg-neutral-800 my-3 rounded-md font-bold mx-auto md:mx-0 block text-sm  hover:bg-neutral-800/50 cursor-pointer text-white">
                            Know More
                        </button>
                    </Link>
                </div>
            </div>
            
            <div className="posterContainer bannerSliderContainer absolute bottom-4 w-full flex-row sm:flex hidden justify-end">
                <div className="w-[65%] overflow-x-hidden mx-5 gap-5">
                    <Slider
                        {...settings}
                        afterChange={(index) => handleBannerContent(index)}
                    >
                        {bannerContent.map((banner, index) => (
                            <Image
                                src={posterpath + banner.images.poster}
                                key={index}
                                alt={`${banner.title}`}
                                width={100}
                                height={100}
                                onClick={() => handleBannerContent(index)}
                                className="cursor-pointer sm:visible invisible slide"
                                unoptimized
                            />
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Banner;
