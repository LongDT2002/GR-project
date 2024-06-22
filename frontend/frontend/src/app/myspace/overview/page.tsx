'use client';
import React, { useEffect, useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import Datepicker from "tailwind-datepicker-react";

import { getProfile, updateProfile } from '@/actions/auth';
import Loader from '@/components/Loader';

const Overview = () => {
    const [profile, setProfile] = useState(Object);
    const [tempProfile, setTempProfile] = useState(Object);

    const [isEditing, setEditing] = useState(false);
    const [changed, setChanged] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);

    const options = useMemo(() => countryList().getData(), []);
    const countryOptions = useMemo(() => countryList(), []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await getProfile();

                profileData.data.country = profileData.data.country ? countryOptions.getLabel(profileData.data.country) : '';
                setProfile(profileData.data);
                setTempProfile(profileData.data);
                setLoading(false);
            } catch (error) {
                console.error("Fetch profile data failed");
            }
        };
        fetchData();
    }, []);

    const onClick = () => {
        setEditing(!isEditing);
        if (!isEditing) {
            setTempProfile({ ...profile });
        }
    };

    const handleEdit = (e: { preventDefault(): unknown; target: { value: any; }; }, field: any) => {
        e.preventDefault()
        if (profile[field] !== e.target.value) {
            setChanged(true);
        }
        setProfile({
            ...profile,
            [field]: e.target.value
        });
    };

    const handleCountry = (e: any) => {
        setSelectedCountry(e);
        if (profile.country !== e.label) {
            setChanged(true);
        }
        setProfile({
            ...profile,
            "country": e.value
        });
    }

    const handleSave = async (e: any) => {
        e.preventDefault();
        console.log(profile);
        if (changed) {
            const repsonse = await updateProfile(profile);
            if (repsonse.status === 200) {
                setChanged(false);
                setProfile({ ...profile });
                setProfile({ ...profile, "country": countryOptions.getLabel(profile.country) });
            }
        }
        setTempProfile({});
        setEditing(false);
    }

    const handleCancel = (e: any) => {
        e.preventDefault();
        setProfile({ ...tempProfile });
        setSelectedCountry(tempProfile.country);
        setTempProfile({});
        setChanged(false);
        setEditing(false);
    }

    if (loading) {
        return <Loader />;
    }

    const dateOptions = {
        autoHide: true,
        todayBtn: true,
        clearBtn: true,
        clearBtnText: "Clear",
        maxDate: new Date("2030-01-01"),
        minDate: new Date("1950-01-01"),
        theme: {
            background: "",
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
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </span>,
            next: () => <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"   className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </span>,
        },
        datepickerClassNames: "top-12",
        defaultDate: new Date("2022-01-01"),
        language: "en",
        disabledDates: [],
        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        inputNameProp: "date",
        inputIdProp: "date",
        inputPlaceholderProp: "Select Date",
    }

    const handleDateChange = (selectedDate: Date) => {
        setProfile({
            ...profile,
            "birthday": selectedDate.toLocaleDateString("fr-CA")
        });
        setChanged(true);
    }

    const handleClose = (state: boolean) => {
        setShow(state)
    };
    
    return (
        <div className="w-full">
            <form className="p-3 px-[5%] pt-[2%] min-h-[80vh]">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="text-green-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </span>
                    <span className="tracking-wide text-2xl">Information</span>
                </div>
                <div className="text-gray-700 w-[80%] mx-auto">
                    <div className="grid md:grid-cols-2 text-md mt-4 gap-x-2">
                        <div className="grid grid-cols-3 mb-5">
                            <div className="px-4 py-2 font-semibold">First Name</div>
                            {isEditing ? (
                                <input className="px-4 py-2 col-start-2 col-span-2 bg-gray-50 border border-gray-300 rounded-lg"
                                    type="text"
                                    value={profile.first_name}
                                    onChange={(e) => handleEdit(e, 'first_name')}
                                />
                            ) : (
                                <div className="px-4 py-2 col-start-2 col-span-2 bg-gray-50 border border-gray-300 rounded-lg">{profile.first_name}</div>
                            )}
                        </div>

                        <div className="grid grid-cols-3 mb-5">
                            <div className="px-4 py-2 font-semibold">Last Name</div>
                            {isEditing ? (
                                <input className="px-4 py-2 col-start-2 col-span-2 bg-gray-50 border border-gray-300 rounded-lg"
                                    type="text"
                                    value={profile.last_name}
                                    onChange={(e) => handleEdit(e, 'last_name')}
                                />
                            ) : (
                                <div className="px-4 py-2 col-start-2 col-span-2 bg-gray-50 border border-gray-300 rounded-lg">{profile.last_name}</div>
                            )}
                        </div>

                        <div className="grid grid-cols-3 mb-5">
                            <div className="px-4 py-2 font-semibold">Email</div>
                            <div className="px-4 py-2 col-start-2 col-span-2 bg-gray-50 border border-gray-300 rounded-lg">{profile.account}</div>
                        </div>

                        <div className="grid grid-cols-3 mb-5">
                            <div className="px-4 py-2 font-semibold">Birthday</div>
                            {isEditing ? (<div className="relative max-w-sm">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <Datepicker options={{ ...dateOptions, inputDateFormatProp: { year: "numeric", month: "2-digit", day: "2-digit" } }} onChange={handleDateChange} show={show} setShow={handleClose}/>
                            </div>) :
                                (<div className="px-4 py-2 col-start-2 col-span-2 bg-gray-50 border border-gray-300 rounded-lg">{profile.birthday}</div>)
                            }

                        </div>

                        <div className="grid grid-cols-3 mb-5">
                            <div className="px-4 py-2 font-semibold">Country</div>
                            {isEditing ? (
                                <Select options={options} value={selectedCountry} onChange={handleCountry} className='col-start-2 col-span-2' />
                            ) : (
                                <div className="px-4 py-2 col-start-2 col-span-2 bg-gray-50 border border-gray-300 rounded-lg">{profile.country}</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="text-green-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </span>
                    <span className="tracking-wide text-2xl">Bio</span>
                </div>
                <div className="text-gray-700 w-[80%] mx-auto">
                    <div className="text-md mt-4">
                        <div className="mb-5">
                            {isEditing ? (
                                <textarea
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5 min-h-72"
                                    value={profile.bio}
                                    onChange={(e) => handleEdit(e, 'bio')}
                                />
                            ) : (
                                profile.bio ? (
                                    <div
                                        className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                                        style={{ whiteSpace: 'pre-wrap' }}
                                    >
                                        {profile.bio}
                                    </div>
                                ) : (
                                    <div></div>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {isEditing ?
                    (<div>
                        <button onClick={handleSave}
                            className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Save</button>
                        <button onClick={handleCancel}
                            className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Cancel</button>
                    </div>)
                    :
                    (<button onClick={onClick}
                        className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Edit</button>)
                }
            </form>
        </div>
    );
}

export default Overview;
