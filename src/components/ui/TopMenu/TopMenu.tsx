"use client"
import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'
import Sidebar from '../Sidebar/Sidebar'
import { useSidebarUi } from '@/store'
import clsx from 'clsx'


export default function TopMenu() {
    const isSideMenuOpen = useSidebarUi((state) => state.isSideMenuOpen)
    const openSideMenu = useSidebarUi((state) => state.openSideMenu)


    return (
        <div className='relative bg-blend-screen'>
            <nav className="flex px-5 justify-between items-center w-full ">
                {/* Logo */}
                <div>
                    <Link
                        href="/">
                        <span className={`${titleFont.className} antialiased font-bold`} >Oslo</span>
                        <span> | Shop</span>
                    </Link>
                </div>

                {/* Center Menu */}
                <div className="hidden sm:block">

                    <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/men">Hombres</Link>
                    <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/women">Mujeres</Link>
                    <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/kids">Niños</Link>

                </div>


                {/* Search, Cart, Menu */}
                <div className="flex items-center">

                    <Link href="/search" className="mx-2">
                        <IoSearchOutline className="w-5 h-5" />
                    </Link>

                    <Link href="/cart" className="mx-2">
                        <div className="relative">
                            <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-gray-100 text-white">
                                3
                            </span>
                            <IoCartOutline className="w-5 h-5" />
                        </div>
                    </Link>

                    <button
                        onClick={openSideMenu}
                        className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    >
                        Menú
                    </button>

                </div>
            </nav>

        </div>
    )
}