"use client";
import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { useCartProductStore, useSidebarUi } from "@/store";

export const TopMenu = () => {
  const isSideMenuOpen = useSidebarUi((state) => state.isSideMenuOpen);
  const openSideMenu = useSidebarUi((state) => state.openSideMenu);
  const totalItemsIncart = useCartProductStore((state) =>
    state.getTotalItems()
  );

  const [load, setload] = useState(true);

  useEffect(() => {
    setload(false);
  }, []);

  return load ? (
    "loading..."
  ) : (
    <div className="relative bg-blend-screen">
      <nav className="flex px-5 justify-between items-center w-full ">
        {/* Logo */}
        <div>
          <Link href="/">
            <span className={`${titleFont.className} antialiased font-bold`}>
              Oslo
            </span>
            <span> | Shop</span>
          </Link>
        </div>

        {/* Center Menu */}
        <div className="hidden sm:block">
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            href="/gender/men"
          >
            Men
          </Link>
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            href="/gender/women"
          >
              Women
          </Link>
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            href="/gender/kid"
          >
            Kids
          </Link>
        </div>

        {/* Search, Cart, Menu */}
        <div className="flex items-center">
          {/* <Link href="/search" className="mx-2">
            <IoSearchOutline className="w-5 h-5" />
          </Link> */}

          <Link
            href={totalItemsIncart == 0 && !load ? "/empty" : "/cart"}
            className="mx-2"
          >
            <div className="relative">
              {!load && totalItemsIncart > 0 && (
                <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                  {totalItemsIncart}
                </span>
              )}
              <IoCartOutline className="w-5 h-5" />
            </div>
          </Link>

          <button
            onClick={openSideMenu}
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          >
            Menu
          </button>
        </div>
      </nav>
    </div>
  );
};
