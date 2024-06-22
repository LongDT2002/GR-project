import Link from "next/link";
import React from "react";

import ReviewCarousel from "../EmblaCarousel/ReviewCarousel";

const ReviewSlider = ({ Reviews, movieId }: { Reviews: any[], movieId: string }) => {
    return (
        <section className="mx-auto my-4">
            <div className="flex heading justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <div className="w-1 rounded-sm h-full bg-white"></div>
                    <h1 className="text-3xl my-1">Review</h1>
                </div>

                <button className="flex space-x-2 px-3 text-2xl items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <Link href={`${movieId}/reviews`} className="inline-block align-middle hover:underline">All Review</Link>
                </button>
            </div>
            { Reviews && Reviews.length > 0 ? (
                <ReviewCarousel reviewResults={Reviews}/>) :
                <p className="text-2xl">No reviews found</p> }
        </section>
    );
};

export default ReviewSlider;
