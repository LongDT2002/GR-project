"use client"
import Image from "next/image"

const Search = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            {/* <div className="w-3/5">
                <form action="search/result" method="get">
                    <label htmlFor="default-search" className="mb-2 font-medium text-gray-900 sr-only">Search</label>
                    <div className="relative grid grid-cols-9 text-2xl">
                        <select id="type" name="type"
                            className="col-start-1 col-span-2 w-full focus:outline-none text-gray-900 rounded-l-lg px-2 md:px-3 py-0 md:py-1 tracking-wider border border-gray-300 bg-gray-50 focus:ring-neutral-500 focus:border-neutral-500">
                            <option value="Movie" selected>Movie</option>
                            <option value="Actor">Actor</option>
                            <option value="Director">Director</option>
                        </select>
                        <input type="search" id="default-search" name="search" className="block w-full col-start-3 col-span-8 p-4 pl-6 text-2xl text-gray-900 border border-gray-300 rounded-r-lg bg-gray-50 focus:ring-neutral-500 focus:border-neutral-500" placeholder="Search Movies..." required />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-xl px-4 py-2">Search</button>
                    </div>
                </form>
            </div> */}

            <Image
                src="/placeholder_popcorn.png"
                alt="popcorn"
                height={500}
                width={500}
                objectFit="cover"
            />
            <div className="text-3xl text-white mt-4">Create a more specific title search</div>
            <div className="text-xl text-white mt-4 text-center">
                Create a search using a variety of options to filter the different types of information we have in our catalog.
            </div>
        </div>
    )
}

export default Search
