'use client';
import Link from 'next/link';
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { getProfile } from '@/actions/auth';

interface Tab {
    name: string;
    url: string;
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}


const Widget = () => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState('Overview');
    const [underlineStyle, setUnderlineStyle] = useState<React.CSSProperties>({});
    const tabs: Tab[] = [
        // { name: 'Lists', url: '/myspace/lists' },
        { name: 'Watchlist', url: '/myspace/mywatchlist' }
    ];
    const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const currentTab = tabs.find(tab => tab.url === window.location.pathname);
        if (currentTab) {
            setSelectedTab(currentTab.name);
        }
    }, [tabs]);

    useLayoutEffect(() => {
        const currentIndex = tabs.findIndex(tab => tab.name === selectedTab);
        const currentTabElement = tabRefs.current[currentIndex];
        if (currentTabElement) {
            setUnderlineStyle({
                left: currentTabElement.offsetLeft,
                width: currentTabElement.clientWidth,
                transition: 'left 0.3s ease, width 0.3s ease'
            });
        }
    }, [selectedTab]);

    const handleTabClick = (tab: Tab) => {
        setSelectedTab(tab.name);
        router.push(tab.url);
    };

    const [profile, setProfile] = useState(Object);

    useEffect(() => {
        const fetchData = async () => {
            const profile = await getProfile();
            if (profile) {
                setProfile(profile.data);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className="bg-zinc-200 border-t-4 border-green-400 pt-[2%] px-[5%] rounded-t-md">
                <div className="flex items-center space-x-4">
                    <div>
                        <h1 className="text-zinc-700 text-4xl font-bold">{profile.first_name} {profile.last_name}</h1>
                        <p className="text-zinc-700">Member since March 2024</p>
                    </div>
                </div>
                {/* <div className="flex space-x-8 mt-4">
                    <div className="text-center">
                        <div className="text-zinc-700 text-3xl font-bold">0%</div>
                        <p className="text-zinc-700">Average Movie Score</p>
                    </div>
                </div> */}
            </div>
            <div className="bg-zinc-200 ">
                <div className="relative flex justify-center items-center border-b border-zinc-300 dark:border-zinc-700">
                    <div className="flex justify-round space-x-12">
                        <div>
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 text-xl text-zinc-800 hover:text-teal-500 items-center">
                                        Overview
                                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-black" aria-hidden="true" />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        <MenuItem>
                                            {({ focus }) => (
                                                <Link href="/myspace/overview"
                                                    className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-md')}
                                                >
                                                    Profile
                                                </Link>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ focus }) => (
                                                <Link href="/myspace/recommendation"
                                                    className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-md')}
                                                >
                                                    Recommendation
                                                </Link>
                                            )}
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Menu>
                        </div>
                        <div>
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 text-xl text-zinc-800 hover:text-teal-500 items-center">
                                        Activities
                                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-black" aria-hidden="true" />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        <MenuItem>
                                            {({ focus }) => (
                                                <Link href="/myspace/ratings"
                                                    className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-md')}
                                                >
                                                    Ratings
                                                </Link>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ focus }) => (
                                                <a
                                                    href="/myspace/reviews"
                                                    className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-md')}
                                                >
                                                    Reviews
                                                </a>
                                            )}
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Menu>
                        </div>
                        {tabs.map((tab, index) => (
                            <div
                                key={tab.name}
                                ref={(el) => { tabRefs.current[index] = el; }}
                                onClick={() => handleTabClick(tab)}
                                className={`text-xl tab-link cursor-pointer text-zinc-800 hover:text-teal-500 ${selectedTab === tab.name ? 'active' : ''}`}
                            >
                                {tab.name}
                            </div>
                        ))}
                    </div>
                    <div className="underline" style={underlineStyle}></div>
                </div>
            </div>
        </div>
    );
};

export default Widget;
