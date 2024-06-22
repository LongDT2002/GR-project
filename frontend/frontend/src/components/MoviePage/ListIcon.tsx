"use client";

import { useState } from "react";
import { FaList } from "react-icons/fa6";

const ListIcon = ({ favMovie }: { favMovie: string }) => {
    const movieId = favMovie;
    const [isFavorited, setIsFavorited] = useState(false);

    const handleFavoriteClick = () => {
        setIsFavorited(true);
    };

    const handleRemoveFavorite = () => {
        setIsFavorited(false);
    };
    return (
        <div>
            <FaList 
                className="text-white my-auto cursor-pointer"
                    onClick={handleFavoriteClick}
            />
        </div>
    );
};

export default ListIcon;
