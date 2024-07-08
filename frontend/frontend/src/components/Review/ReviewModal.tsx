'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import requests from '@/utils/requests';


axios.defaults.baseURL = 'http://127.0.0.1:8000/';

const ReviewModal = ({ movieId, movie, handleModal, ownReview }: { movieId: string, movie: any, handleModal: () => void, ownReview: any }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [spoiled, setSpoiled] = useState(false);

    useEffect(() => {
        if (ownReview !== null) {
            setTitle(ownReview['title']);
            setContent(ownReview['content']);
            setSpoiled(ownReview['spoiled']);;
        }
    }, [ownReview]);

    async function handleSave(event: { preventDefault: () => void; }) {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
            }
        }

        if (ownReview !== null) {
            const api = requests.fetchMovieDetails + 'reviews/personal/';
            const body = JSON.stringify({
                "movie": movieId,
                "title": title,
                "content": content,
                "spoiled": spoiled
            });
            axios.put(api, body, config)
                .then((response) => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            const api = requests.fetchMovieDetails + movieId + '/reviews/new/';
            const body = JSON.stringify({
                "title": title,
                "content": content,
                "spoiled": spoiled
            });
            axios.post(api, body, config)
                .then((response) => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        handleModal();
    }

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
            },
            data: {
                "movie": movieId
            }
        }
        const api = requests.fetchMovieDetails + 'reviews/personal/';
        axios.delete(api, config)
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
        handleModal();
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
            <div className="relative max-h-full w-full max-w-2xl p-4">
                <div className="relative rounded-lg bg-white shadow">
                    <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
                        <div>
                            <h3 className="mb-1 text-lg font-semibold text-black">Add a review for:</h3>
                            <h3 className="font-medium text-black text-lg">{movie.title}</h3>
                        </div>
                        <button type="button" onClick={handleModal} className="absolute right-5 top-5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:hover:bg-gray-600 ">
                            <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form className="p-4 md:p-5" onSubmit={handleSave}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label htmlFor="title" className="mb-2 block text-md font-medium text-black">Review title</label>
                                <input
                                    type="text"
                                    value={title}
                                    placeholder='Your review title here...'
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    required
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600" />
                            </div>
                            <div className='col-span-2 flex justify-between'>
                                <div className="flex items-center">
                                    <input type="checkbox"
                                        checked={spoiled}
                                        onChange={(e) => { setSpoiled(e.target.checked) }}
                                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600  dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                    <label htmlFor="review-checkbox" className="ms-2 text-sm font-medium text-black">Spoiled</label>
                                </div>                                    
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="description" className="mb-2 block text-md font-medium text-black">Review description</label>
                                <textarea
                                    value={content}
                                    placeholder='Your review here...'
                                    onChange={(e) => { setContent(e.target.value) }}
                                    required
                                    rows={6} className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"></textarea>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 pt-4 md:pt-5 flex justify-between">
                            <div>
                                <button type="submit" className="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">{ownReview ? "Update" : "Save"}</button>
                                <button type="button" onClick={handleModal} className="me-2 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-black focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100">Cancel</button>
                            </div>
                            <div>
                                {ownReview && <button type="button" onClick={handleDelete} className="rounded-lg border border-red-500 bg-red-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-600 focus:z-10 focus:outline-none focus:ring-4 focus:ring-red-300">Delete</button>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
