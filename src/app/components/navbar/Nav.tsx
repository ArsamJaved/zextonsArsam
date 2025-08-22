"use client";
import Zextons from "@/app/assets/Zextons.png";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
// const Bars3Icon = dynamic(
//   () => import("@heroicons/react/24/solid").then((mod) => mod.Bars3Icon),
//   { ssr: false }
// );
// const ShoppingCartIcon = dynamic(
//   () =>
//     import("@heroicons/react/24/outline").then((mod) => mod.ShoppingCartIcon),
//   { ssr: false }
// );

// const MagnifyingGlassIconSolid = dynamic(
//   () =>
//     import("@heroicons/react/24/solid").then((mod) => mod.MagnifyingGlassIcon),
//   { ssr: false }
// );
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/app/context/Auth";
import { fetchNavbarCategory } from "@/app/lib/features/navbarcategories/navbarCategorySlice";

import NavbarSearch from "@/app/components/navbar/NavbarSearch";

import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import NavbarCart from "@/app/components/navbar/NavbarCart";
import { RootState as StoreRootState } from "@/app/lib/store";
import Image from "next/image";
import CategoryItem from "./CategoryItem";
import MoreDropdown from "./MoreDropdown";
import CategorySmallMenu from "./CategorySmallMenu";

interface CategoryData {
  _id: string;
  name: string;
  isPublish: boolean;
  isFeatured: boolean;
  subCategory: string[];
  order: number;
  createdAt: string;
}

interface NavbarCategoryState {
  data: CategoryData[]; // Add the missing data property
  loading: boolean;
  error: string | null;
}


export interface RootState {
  navbarCategory: NavbarCategoryState;
}
export interface AuthUser {
  role: "admin" | "user" | string;
  // Add other user properties if necessary
}

export default function Nav() {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState<boolean>(false);
  // Redux selectors
  const { categories, isLoading } = useAppSelector(
    (state: StoreRootState & { navbarCategory: NavbarCategoryState }) => state.navbarCategory
  );

  // Sort categories by their "order" property
  const sortedCategories: CategoryData[] = useMemo(() => {
    return categories && categories.length > 0
      ? [...categories].sort((a, b) => a.order - b.order)
      : [];
  }, [categories]);

  useEffect(() => {
    dispatch(fetchNavbarCategory() as any);
  }, [dispatch]);

  // Handle scroll to toggle sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 768) {
        if (window.scrollY > window.innerHeight * 0.3) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle functions
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };
  const toggleCart = () => setIsCartOpen((prev) => !prev);
  // Determine navigation destination for any authenticated user
  const determineDestination = useMemo(() => {
    if (!auth.user) return "/login";
    return "/customer/dashboard";
  }, [auth.user]);

  return (
    <>
      {/* upper nav with search icon */}
      <div
        className={`bg-white border-b border-primary py-3 ${
          isSticky ? "fixed top-0 left-0 w-full z-20" : ""
        }`}
      >
        <div className="mx-auto max-w-7xl lg:px-8 ">
          <nav className="px-4 py-0">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center lg:flex-1 lg:items-center me-20 md:me-0">
                  <button
                    className="lg:hidden block p-2 text-gray-700"
                    onClick={toggleDrawer}
                    aria-controls="drawer-navigation"
                    aria-expanded={isDrawerOpen ? "true" : "false"}
                    aria-label="Toggle navigation drawer"
                  >
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <Link href="/">
                    <Image
                      src={Zextons.src}
                      className="w-40 md:ps-0"
                      alt="Zextons"
                      width={360}
                      height={192}
                      priority
                    />
                  </Link>
                </div>
              </div>
              <div className="flex-grow hidden lg:flex items-center md:mx-20">
                <NavbarSearch />
              </div>
              <div className="lg:flex hidden items-center space-x-2">
                <div className="md:flex hidden flex-col">
                  <span className="text-gray-700 text-xs">Need Help?</span>
                  <span className="text-gray-700 font-bold">0333 344 8541</span>
                </div>
                <Link href={determineDestination} aria-label="Go to profile">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <svg
                      className="lg:h-9 h-6 lg:w-9 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <g fill="none" stroke="#000" strokeWidth="2">
                        <circle cx="12" cy="7" r="5" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 14h.352a3 3 0 0 1 2.976 2.628l.391 3.124A2 2 0 0 1 18.734 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7"
                        />
                      </g>
                    </svg>
                  </div>
                </Link>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <button
                    onClick={toggleCart}
                    className="group -m-2 flex items-center p-2"
                    aria-label="Open basket"
                  >
                    <div className="md:flex hidden flex-col">
                      <span className="text-gray-700 text-xs">Basket</span>
                      <span className="text-gray-700 font-bold">£0.00</span>
                    </div>
                    <ShoppingCartIcon
                      className="lg:h-10 h-6 lg:w-10 w-6 flex-shrink-0 text-black-400 group-hover:text-black ms-1"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cartItemCount}
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col lg:hidden">
                <div className="flex items-center lg:hidden">
                  <button
                    onClick={toggleSearchBar}
                    className="text-white focus:outline-none mr-4"
                    aria-label="Toggle search bar"
                  >
                    <MagnifyingGlassIcon
                      className="text-gray-900 size-6"
                      aria-hidden="true"
                      fontWeight={"bold"}
                    />
                  </button>
                  <button
                    className="text-white focus:outline-none mr-4"
                    aria-label="Open profile"
                  >
                    <Link
                      href={determineDestination}
                      aria-label="Go to profile"
                    >
                      <svg
                        style={{ height: "50px", width: "25px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <g fill="none" stroke="#000" strokeWidth="2">
                          <circle cx="12" cy="7" r="5" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 14h.352a3 3 0 0 1 2.976 2.628l.391 3.124A2 2 0 0 1 18.734 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7"
                          />
                        </g>
                      </svg>
                    </Link>
                  </button>

                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingCartIcon
                      className="h-6 w-6 flex-shrink-0 text-black-400 group-hover:text-black"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cartItemCount}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {isSearchBarVisible && (
              <div className="flex lg:hidden items-center justify-center mb-3">
                <NavbarSearch />
              </div>
            )}
          </nav>
        </div>
      </div>
      {/* Bottom Nav with Dropdowns for Larger Screens */}

      {isLoading && (
        <div className="bg-primary text-white py-3 md:px-5 lg:flex hidden">
          <ul className="flex flex-wrap justify-between space-x-4 px-1 mx-auto max-w-7xl">
            <li>Loading...</li>
          </ul>
        </div>
      )}
      {!isLoading && sortedCategories.length > 0 && (
        <div className="bg-primary text-white py-3 md:px-5 lg:flex hidden">
          <ul className="flex flex-wrap justify-between space-x-4 px-1 mx-auto max-w-7xl">
            {sortedCategories.slice(0, 8).map((category) => (
              <CategoryItem key={category._id} category={category} />
            ))}
            {sortedCategories.length > 8 && (
              <MoreDropdown categories={sortedCategories.slice(8)} />
            )}
          </ul>
        </div>
      )}
      {/* Drawer */}
      <CategorySmallMenu
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        sortedCategories={sortedCategories}
      />
      <NavbarCart
        openCart={isCartOpen}
        setOpenCart={setIsCartOpen}
        setCartItemCount={setCartItemCount}
      />
    </>
  );
}
