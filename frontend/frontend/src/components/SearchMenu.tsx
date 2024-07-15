'use client';
import React, { useEffect, useState } from "react";
import Datepicker from "tailwind-datepicker-react";
import { useSearchParams } from 'next/navigation'

const SearchMenu = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);
    const [fromDate, setFromDate] = useState(new Date("2000-01-01"));
    const [toDate, setToDate] = useState(new Date("2030-12-31"));
    const [searchType, setSearchType] = useState(type ? type : "Movie");

    useEffect(() => {
        if(dateFrom) {
            setFromDate(new Date(dateFrom));
        }
        if(dateTo) {
            setToDate(new Date(dateTo));
        }
    }, [])


    const dateOptions = {
        autoHide: true,
        todayBtn: true,
        clearBtn: true,
        clearBtnText: "Clear",
        maxDate: new Date("2030-01-01"),
        minDate: new Date("1950-01-01"),
        theme: {
            background: "translate-x-[-50%]",
            todayBtn: "Today",
            clearBtn: "",
            icons: "",
            text: "",
            disabledText: "bg-gray-300 text-zinc-900",
            input: "",
            inputIcon: "",
            selected: "",
        },
        icons: {
            prev: () => <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blackColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </span>,
            next: () => <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blackColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </span>,
        },
        datepickerClassNames: "",
        defaultDate: null,
        language: "en",
        disabledDates: [],
        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        inputPlaceholderProp: "Select Date",
    }

    const handleFromChange = (selectedDate: Date) => {
        console.log(searchType)
        setFromDate(selectedDate);
    }

    const handleToChange = (selectedDate: Date) => {
        setToDate(selectedDate)
    }

    const handleCloseFrom = (state: boolean) => {
        setShowFrom(state)
    };

    const handleCloseTo = (state: boolean) => {
        setShowTo(state)
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchType(event.target.value);
    }

    return (
        <form action="/search/result" method="get">
            <div className="border-2 border-black max-w-sm bg-card text-card-foreground rounded-lg overflow-visible bg-slate-200 text-black text-lg top-9 right-10 m-4 fixed">
                <div className="flex justify-between bg-primary rounded-t-lg bg-w text-primary-foreground items-center px-4 py-4 border-2 border-b-black">
                    <h2 className="font-semibold text-2xl">Search</h2>
                    <select
                        id="type" name="type"
                        value={type == searchType ? type : searchType}
                        onChange={handleSelectChange}
                        className="text-gray-900 rounded-lg px-2 md:px-3 py-0 md:py-1 tracking-wider border border-black text-xl bg-gray-50">
                        <option value="Movie">Movie</option>
                        <option value="Actor">Actor</option>
                        <option value="Director">Director</option>
                    </select>
                </div>
                <div className="px-4 pt-4 pb-6 border-2 border-b-black">
                    <label htmlFor="default-input" className="block mb-2 text-xl font-medium text-gray-900">
                        {searchType == "Movie" ? "Movie Title" : "Name"}
                    </label>
                    <input
                        type="search" id="default-search" name="search" required
                        defaultValue={search || ''}
                        className="bg-gray-50 border-2 border-black text-gray-900 text-xl rounded-lg block w-full p-2.5"
                    />
                </div>
                {searchType == "Movie" &&
                    <div className="px-4 pt-4 pb-6 border-2 border-b-black">
                        <label htmlFor="default-input" className="block mb-2 text-xl font-medium text-gray-900">Release date</label>
                        <div className="flex justify-between items-center relative">
                            <div className="relative">
                                <Datepicker
                                    value={fromDate}
                                    options={{
                                        ...dateOptions,
                                        inputDateFormatProp: { year: "numeric", month: "2-digit", day: "2-digit" },
                                        inputNameProp: "dateFrom",
                                        inputIdProp: "dateFrom",
                                    }}
                                    onChange={handleFromChange} show={showFrom} setShow={handleCloseFrom} classNames="rounded-lg border border-black" />
                            </div>

                            <label htmlFor="default-input" className="block mb-2 text-xl px-4 font-medium text-gray-900">To</label>

                            <div className="relative">
                                <Datepicker
                                    value={toDate}
                                    options={{
                                        ...dateOptions,
                                        inputDateFormatProp: { year: "numeric", month: "2-digit", day: "2-digit" },
                                        inputNameProp: "dateTo",
                                        inputIdProp: "dateTo",
                                    }}
                                    onChange={handleToChange} show={showTo} setShow={handleCloseTo} classNames="rounded-lg border border-black" />
                            </div>
                        </div>
                    </div>
                }
                <div className="flex justify-center">
                    <button type="submit" className="hover:bg-white text-2xl h-full w-full py-3">Search</button>
                </div>
            </div>
        </form>
    );
}

export default SearchMenu;
