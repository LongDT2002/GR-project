"use client"

import { useLayoutEffect, useState, useRef } from "react";


const useTruncatedElement = ({ ref }: any) => {
    const [isTruncated, setIsTruncated] = useState(false);
    const [isReadingMore, setIsReadingMore] = useState(false);

    useLayoutEffect(() => {
        const { offsetHeight, scrollHeight } = ref.current || {};

        if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
            setIsTruncated(true);
        } else {
            setIsTruncated(false);
        }
    }, [ref]);

    return {
        isTruncated,
        isReadingMore,
        setIsReadingMore
    };
};

const BigTextContent = ({ textData }: { textData: string }) => {
    const ref = useRef(null);
    const { isTruncated, isReadingMore, setIsReadingMore } = useTruncatedElement({
        ref
    });
    return (
        <div>
            <p className={`break-words transition text-justify text-lg text-slate-300 duration-300 ${!isReadingMore && "line-clamp-5"
                }`} ref={ref}>
                {textData}
            </p>
            {isTruncated &&
                (isReadingMore ? (
                    <button className="font-bold text-lg" onClick={() => setIsReadingMore(false)}>Read less</button>
                ) : (
                    <button className="font-bold text-lg" onClick={() => setIsReadingMore(true)}>Read more</button>
                ))}
        </div>
    );
};

export default BigTextContent;
