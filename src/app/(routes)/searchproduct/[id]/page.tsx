"use client";
import Nav from "@/app/components/navbar/Nav";
import { useAuth } from "@/app/context/Auth";
import TopBar from "@/app/topbar/page";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Product, SortOption } from "../../../../../types";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";
import SortMenu from "@/app/components/SortMenu";
import Pagination from "@/app/components/Pagination";
import ProductCard from "@/app/components/ProductCard";
import { SortOptions } from "@/app/components/SortOptions";
import SidebarCommon from "@/app/components/SidebarCommon";
import axios from "axios";

export default function SearchPage() {
  const auth = useAuth();
  const { id: searchTerm } = useParams();
  const formatSearchTerm = (term: string | string[] | undefined) => {
    if (!term) return "";

    const termString = Array.isArray(term) ? term.join(" ") : term;

    return (
      termString
        // Remove all hyphens
        .replace(/-/g, " ")
        // Split into words, capitalize the first letter of each word, and join back into a string
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    );
  };
  const formattedSearchTerm = formatSearchTerm(searchTerm);

  const encodedTerm = encodeURIComponent(searchTerm as string);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSort, setSelectedSort] = useState<SortOption>(SortOptions[0]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 50;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = useMemo(() => {
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, indexOfFirstProduct, indexOfLastProduct]);
  // Fetch subcategory products

  useEffect(() => {
    const getSearchedProduct = () => {
      setLoading(true);
      axios
        .get(`${auth.ip}get/product/by/search/${encodedTerm}`)
        .then((response) => {
          if (response.data.status === 201) {
            setProducts(response.data.products);
            setFilteredProducts(response.data.products);
            setLoading(false);
          } else {
            console.log(response.data.message);
          }
        });
    };
    getSearchedProduct(); // Call the function to fetch products for the category
  }, [encodedTerm,auth.ip]);
  const noProducts = filteredProducts.length === 0;
  return (
    <>
      <header className="relative">
        <nav className="" aria-label="Top">
          <TopBar />
          <Nav />
        </nav>
      </header>
      <div className="max-w-7xl mx-auto p-3">
        <nav className="mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">»</span>
          <Link
            href={`/searchproduct/${encodedTerm}`}
            className="hover:underline"
          >
            {formattedSearchTerm}
          </Link>
        </nav>
        <div className="relative">
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 rounded-md">
                <ClipLoader color="#36D7B7" loading={loading} size={100} />
              </div>
            )}
            {loading && noProducts && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-60 backdrop-blur-lg z-10 rounded-md">
                <div className="text-center animate-fadeIn">
                  <h1 className="text-4xl lg:text-6xl font-extrabold text-primary drop-shadow-md">
                    Coming Soon
                  </h1>
                  <p className="mt-4 text-lg lg:text-2xl text-gray-700">
                    Stay tuned for exciting new products!
                  </p>
                </div>
              </div>
            )}
            <div
              className={`relative grid grid-flow-row-dense lg:grid-cols-5 my-5 py-5 ${
                loading || (!noProducts && !loading)
                  ? "filter blur-none"
                  : "filter blur-sm"
              }`}
            >
              <SidebarCommon
                products={products}
                setFilteredProducts={setFilteredProducts}
                selectedSort={selectedSort}
                id={encodedTerm}
              />
              <div className="sm:col-span-4 col-span-5">
                <div className="flex items-center justify-end">
                  <SortMenu
                    selectedSort={selectedSort}
                    setSelectedSort={
                      setSelectedSort as React.Dispatch<
                        React.SetStateAction<{ name: string }>
                      >
                    }
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:p-5">
                  {currentProducts.length === 0 ? (
                    <div>No products found</div>
                  ) : (
                    currentProducts.map((product, index) => (
                      <ProductCard key={index} product={product} />
                    ))
                  )}
                </div>
                <Pagination
                  filteredProducts={filteredProducts}
                  productsPerPage={productsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  indexOfFirstProduct={indexOfFirstProduct}
                  indexOfLastProduct={indexOfLastProduct}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
