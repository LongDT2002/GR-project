import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const UpcomingRelease = ({ upcomingdata }: { upcomingdata: any[] }) => {
    const posterpath = "https://image.tmdb.org/t/p/w300";
    const upcomingMovieData = upcomingdata || [];
    const maxIndex = upcomingMovieData.length - 1;
    var UpcomingArr = [];

    for (let i = 0; i < maxIndex; i++) {
        if (upcomingMovieData[i].poster != null && upcomingMovieData[i].poster != '' && upcomingMovieData[i].poster != undefined) {
            UpcomingArr.push(upcomingMovieData[i].poster);
        }
    }
    console.log(UpcomingArr);

    return (
        <div className='w-full relative h-auto'>
            <div className="absolute md:opacity-0 opacity-100 inset-0 z-20  bg-gradient-to-l from-black to-transparent"></div>
            <div className='md:w-[90%] w-[95%] overflow-hidden h-[25vh] flex rounded-md mx-auto'>
                <div className='relative bg-gradient-to-br from-black via-gray-700 to-slate-900 w-1/4'>
                    <div className="grid grid-cols-4 grid-rows-3 absolute md:-top-32 top-0 scale-125 md:-left-20 -left-32 rotate-45 md:gap-2 gap-1">
                        {UpcomingArr.map((upcoming, index) => (
                            <div key={index} className={`col-start-${(index % 4) + 1} rounded-lg row-start-${Math.floor(index / 4) + 1}`}>
                                <Image src={posterpath + upcoming} width={75} height={75} alt='upcomingbanner' className='rounded-lg shadow-lg' unoptimized />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bg-gradient-to-br from-black via-gray-700 flex items-center justify-end px-5 to-slate-900 w-3/4'>
                    <div className="text_container z-30 text-right  md:px-5 px-1">
                        <h1 className='md:text-2xl text-lg font-normal'>Explore Upcoming Movies <br />of this year</h1>
                        <Link href={'/upcoming/'}><button type="button" className="text-gray-900 my-3 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Expore</button></Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UpcomingRelease
