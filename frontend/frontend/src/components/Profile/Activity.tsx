
import React from 'react';

const Activity = ({ personalReview }: { personalReview: any }) => {
    return (
        <div className="bg-white p-3 px-[5%] pb-[2%] flex justify-start">
        <div className='flex w-[50%] p-2'>
            <div className='w-full'>
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span className="text-green-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </span>
                    <span className="tracking-wide">Your Ratings</span>
                </div>
                <ul className="list-inside space-y-2">
                    <li className='border-gray-400 border-2'>
                        <div className="text-teal-600">Hello World</div>
                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                    </li>
                </ul>
            </div>
        </div>
        <div className='flex w-[50%] p-2'>
            <div className='w-full'>
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span className="text-green-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </span>
                    <span className="tracking-wide">Your Reviews</span>
                </div>
                <ul className="list-inside space-y-2">
                    {personalReview.map((review: { movie: string }, index: number) => (
                        <li key={index} className='border-gray-400 border-2'>
                            <div className="text-teal-600">{review.movie}</div>
                            <div className="text-gray-500 text-xs">March 2020 - Now</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
    );
}

export default Activity;
