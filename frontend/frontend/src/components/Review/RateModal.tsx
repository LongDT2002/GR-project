"use client"
import React, { useState } from 'react';
import axios from 'axios';
import requests from '@/utils/requests';

axios.defaults.baseURL = 'http://127.0.0.1:8000/';

const RateModal = ({ movieId, movieTitle }: { movieId: string, movieTitle: string }) => {
    const [openModal, setModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [ownRating, setOwnRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const api = requests.fetchMovieDetails + movieId + '/rate/';
    
    async function fetchOwnRating() {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
            }
        };
        axios.get(api, config)
            .then((response) => {
                if (response.data.rate) {
                    setRating(response.data.rate);
                    setOwnRating(response.data.rate);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleModal = () => {
        fetchOwnRating();
        setModal(!openModal)
    }

    const handleSave = () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
            }
        };
        const body = JSON.stringify({
            "movie": movieId,
            "rate": rating
        });

        if (ownRating == 0) {
            axios.post(api, body, config)
                .then((response) => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (ownRating > 0) {
            axios.put(api, body, config)
                .then((response) => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        handleModal();
    }

    const handleRemove = () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
            }
        };
        axios.delete(api, config)
            .then((response) => {
                handleModal();
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <button
                className="flex items-center justify-center rounded-full bg-slate-800 px-4 py-3 hover:bg-slate-600 cursor-pointer text-white"
                onClick={handleModal}
                type="button"
            >
                What's your Vibe?
            </button>
            {openModal &&
                <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
                    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
                    <div className='relative w-[600px] h-2/5 bg-slate-800 shadow-lg py-2 rounded-md z-10 flex flex-col'>
                        <h1 className='text-3xl font-medium text-slate-50 pt-3 px-6 mb-4'>Rating</h1>
                        <div className='px-4 mt-2 flex flex-col items-center'>
                            <div className="text-center mb-6 text-2xl">
                                What do you think about {movieTitle}?
                            </div>
                            <div className="flex items-center justify-center">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <svg
                                        key={index}
                                        className={`w-8 h-8 me-1 cursor-pointer ${index < (hoverRating || rating) ? 'text-yellow-300' : 'text-white'}`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                        onMouseEnter={() => setHoverRating(index + 1)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setRating(index + 1)}
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                        
                        <div className='flex justify-evenly items-center px-4 my-8'>
                            <button
                                type='button'
                                className='h-10 px-4 text-lg rounded-md bg-gray-700 text-white hover:bg-white/20 '
                                onClick={handleSave}
                            >
                                Save
                            </button>

                            <button
                                type='button'
                                className='h-10 px-4 text-lg rounded-md bg-gray-700 text-white hover:bg-white/20 '
                                onClick={handleModal}
                            >
                                Close
                            </button>
                        </div>
                        <div className="text-center text-2xl">
                            <button
                                type='button'
                                className='h-10 px-4 text-lg rounded-md text-white hover:font-semibold'
                                onClick={handleRemove}
                            >
                                Clear my rating
                            </button>
                        </div>

                    </div>
                </div>
            }
        </div>
    );
};

export default RateModal;
