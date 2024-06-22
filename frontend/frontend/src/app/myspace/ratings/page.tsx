import React from 'react';

const Ratings = () => {
    return (
        <div className="w-full">
            <div className="p-3 px-[5%] pt-[2%]">
                <div className= "px-4 pb-4">
                    <div className="flex justify-between">
                        <h2 className="text-3xl font-bold text-zinc-900 flex items-center">
                            My Ratings
                        </h2>
                        <div className="flex space-x-2 items-center">
                            <span className="text-zinc-700 text-xl">Sort by:</span>
                            <form className="max-w-sm mx-auto">
                                <select className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option selected value="date">Date added</option>
                                    <option value="name">Title</option>
                                    <option value="rate">Rate</option>
                                </select>
                            </form>
                            <span className="text-zinc-700 text-xl">Order:</span>
                            <a href="#" className="text-zinc-700">↑</a>
                            <a href="#" className="text-zinc-700">↓</a>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="px-[5%] h-screen">
                <div className="px-4 pb-4">
                    <p className="text-zinc-700 text-xl">You haven't rated any movies.</p>
                </div>
            </div>
        </div>
    );
}

export default Ratings;
