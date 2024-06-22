"use client"
import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa6';

const ReviewCarousel = (reviewResults: { reviewResults: any[]; }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center', dragFree: true });
    const [isLoaded, setIsLoaded] = useState(true);
    const [fullReview, setFullReview] = useState(Object);
    const [openFullReview, setOpenFullReview] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const handleFullReview = (review: any) => {
        setFullReview(review);
        setOpenFullReview(true);
    };

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (emblaApi) {
                emblaApi.reInit();
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [emblaApi]);
    const reviewData = reviewResults.reviewResults;

    return (
        <div className="embla">
            <div className="embla__viewport overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex space-x-2 transition-transform duration-300">
                    {reviewData && reviewData.map((review: any) => (
                        <div className='md:w-[500px] h-52 overflow-hidden p-3 ml-5 rounded-lg bg-neutral-700 embla__slide review_slide flex-none' key={review.id}>
                            <h3 className='text-xl font-bold'>{review.user.first_name} {review.user.last_name}</h3>
                            {review.spoiled ? (
                                <p className="text-lg mt-3 font-bold text-white">Spoil Warning!!</p>
                            ) : ""}
                            <p className='text-md line-clamp-5 mt-3 review-content'>{review.content}</p>
                            <button onClick={() => handleFullReview(review)}>Read More</button>
                        </div>
                    ))}
                </div>
            </div>
            {openFullReview && (<div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                    className="flexi-modal-back absolute inset-0 bg-black"
                ></div>
                <div className="flexi-modal-content md:w-[70%] max-w-5xl h-[70vh] md:min-h-[70vh] relative z-10 rounded">
                    <span
                        className="flexi-modal-close-icon sm:bg-white py-2 px-3 absolute sm:-right-10 right-5 -top-10 cursor-pointer sm:text-slate-500 text-white sm:rounded-full"
                        onClick={() => setOpenFullReview(false)}
                    >
                        <span className="sm:block hidden">✘</span>
                        <span className="sm:hidden block underline text-white">
                            Close
                        </span>
                    </span>
                    <div className='overflow-y-scroll h-[75vh] w-full max-w-5xl p-6 mx-auto divide-y rounded-md border-white border-2 pt-4 pl-4 flex flex-col'>
                        <div className="flex justify-between p-4">
                            <div className="flex space-x-4">
                                <div>
                                    <h4 className="font-bold text-3xl">{fullReview.user.first_name} {fullReview.user.last_name}</h4>
                                    <span className="text-2xl dark:text-gray-600">{fullReview.timestamp}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 dark:text-yellow-700">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                    <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                                </svg>
                                <span className="text-2xl font-bold">{fullReview.rate}</span>
                            </div>
                        </div>
                        <div className="p-4 space-y-2 dark:text-gray-600">
                            <h1 className="text-2xl">Title: {fullReview.title}</h1>
                            {fullReview.spoiled ? (
                                <p className="text-xl font-bold text-white">Spoil Warning!!</p>
                            ) : ""}
                            <p className="text-xl font-normal text-white">Content: </p>
                            <p className="text-xl font-normal text-white">{fullReview.content}</p>
                            {/* <div className="flex items-center gap-4">
                                <p className="text-lg font-medium text-white">Was it helpful to you?</p>
                                <div className="flex items-center">
                                    <FaThumbsUp />
                                    <label htmlFor="reviews-radio-3" className="ms-2 text-lg font-medium text-gray-300"> 1 </label>
                                </div>
                                <div className="flex items-center">
                                    <FaThumbsDown />
                                    <label htmlFor="reviews-radio-4" className="ms-2 text-lg font-medium text-gray-300">0 </label>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>)}
        </div>

    )
}

export default ReviewCarousel;
