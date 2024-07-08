'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa6';
import { PassThrough } from 'stream';

axios.defaults.baseURL = "http://127.0.0.1:8000";

const token = localStorage.getItem("token");
const api = "movie/review/";
const config = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json'
    },
};

const ReviewItem = (review: any, index: number) => {
    const [reviewItem, setReviewItem] = useState(review.review);
    const [upVote, setUpVote] = useState(review.review.vote.up);
    const [upVoteClicked, setUpVoteClicked] = useState(false);
    const [downVote, setDownVote] = useState(review.review.vote.down);
    const [downVoteClicked, setDownVoteClicked] = useState(false);

    useEffect(() => {
        if (review.review.own_vote) {
            setUpVoteClicked(true);
        } else if (review.review.own_vote == false) {
            setDownVoteClicked(true);
        }
    }, [review.review.own_vote]);

    useEffect(() => {
        setReviewItem(review.review);
    }, [reviewItem.vote.up, reviewItem.vote.down]);

    const handleUpVote = () => {
        const body = JSON.stringify({
            "vote": "true"
        })

        if(!upVoteClicked) {
            if (downVoteClicked) {
                axios.put(api + reviewItem.id + "/vote/", body, config)
                    .then((response) => {
                        review.review.vote.down -= 1;
                        review.review.vote.up += 1;
                        setDownVote(review.review.vote.down);
                        setDownVoteClicked(false);
                        setUpVote(review.review.vote.up);
                        setUpVoteClicked(true);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                axios.post(api + reviewItem.id + "/vote/", body, config)
                    .then((response) => {
                        review.review.vote.up += 1;
                        setUpVote(review.review.vote.up);
                        setUpVoteClicked(true);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } else {
            axios.delete(api + reviewItem.id + "/vote/", config)
                .then((response) => {
                    review.review.vote.up -= 1;
                    setUpVote(review.review.vote.up);
                })
                .catch((error) => {
                    console.error(error);
                });
            setUpVoteClicked(false);
        }
    }

    const handleDownVote = () => {
        const body = JSON.stringify({
            "vote": "false"
        })

        if(!downVoteClicked) {
            if (upVoteClicked) {
                axios.put(api + reviewItem.id  + "/vote/", body, config)
                    .then((response) => {
                        review.review.vote.up -= 1;
                        review.review.vote.down += 1;
                        setUpVote(review.review.vote.up);
                        setUpVoteClicked(false);
                        setDownVote(review.review.vote.down);
                        setDownVoteClicked(true);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                axios.post(api + reviewItem.id  + "/vote/", body, config)
                    .then((response) => {
                        review.review.vote.down += 1;
                        setDownVote(review.review.vote.down);
                        setDownVoteClicked(true);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }

        } else {
            axios.delete(api + reviewItem.id + "/vote/", config)
                .then((response) => {
                    review.review.vote.down -= 1;
                    setDownVote(review.review.vote.down);
                    setDownVoteClicked(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    return (
        <div>
            <div key={index} className="gap-5 py-6 sm:flex sm:items-start">
                <div className="shrink-0 space-y-2 sm:w-32 md:w-56 max-w-64">
                    <div className="space-y-0.5">
                        {reviewItem.user.last_name ? (
                            <p className="text-2xl font-semibold text-white">{reviewItem.user.first_name} {reviewItem.user.last_name}</p>
                        ) : (
                            <p className="text-2xl font-semibold text-white">User @{reviewItem.user.id}</p>
                        )}

                        <p className="text-xl font-normal text-white">{reviewItem.timestamp}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: reviewItem.rate }).map((_, index) => (
                            <svg key={index} className="h-4 w-4 text-yellow-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                            </svg>
                        ))}
                        {Array.from({ length: 5 - reviewItem.rate }).map((_, index) => (
                            <svg key={index} className="h-4 w-4 text-gray-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                            </svg>
                        ))}
                    </div>
                </div>

                <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                    <h1 className="text-2xl">Title: {reviewItem.title}</h1>
                    {reviewItem.spoiled ? (
                        <p className="text-xl font-bold text-white">Spoil Warning!!</p>
                    ) : ""}
                    <p className="text-xl font-normal text-white">Content: </p>
                    <p className="text-xl font-normal text-white">{reviewItem.content}</p>
                    <div className="flex items-center gap-4 justify-end">
                        <p className="text-lg font-medium text-white">Was it helpful to you?</p>
                        <button onClick={handleUpVote} className="flex items-center w-11">
                            <FaThumbsUp className='text-xl'/>
                            <label htmlFor="reviews-radio-3" className="ms-2 text-xl font-medium text-gray-300">{upVote}</label>
                        </button>
                        <button onClick={handleDownVote} className="flex items-center w-11">
                            <FaThumbsDown className='text-xl'/>
                            <label htmlFor="reviews-radio-4" className="ms-2 text-xl font-medium text-gray-300">{downVote}</label>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewItem;
