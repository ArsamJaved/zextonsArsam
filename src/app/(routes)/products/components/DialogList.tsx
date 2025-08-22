import dynamic from "next/dynamic";
// const MinusIcon = dynamic(() =>
//   import("@heroicons/react/20/solid").then((mod) => mod.MinusIcon)
// );
// const PlusIcon = dynamic(() =>
//   import("@heroicons/react/20/solid").then((mod) => mod.PlusIcon)
// );
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import React from "react";
export default function DialogList({
  isBuyButtonDisabled,

  openSpecs,
  setOpenSpecs,
  isZoomed,
  openPerks,
  setOpenPerks,
  openFAQs,
  setOpenFAQs,
  reviewsDiv,
  setReviewsDiv,
  setOpenCart,
  addToCart,
  selectedVariant,
}: {
  openSpecs: boolean;
  setOpenSpecs: (open: boolean) => void;
  openPerks: boolean;
  setOpenPerks: (open: boolean) => void;
  openFAQs: boolean;
  setOpenFAQs: (open: boolean) => void;
  setOpenCart: (open: boolean) => void;
  reviewsDiv: boolean;
  isBuyButtonDisabled: boolean;
  checkIfSoldOut: (variantCombination: any) => boolean;
  setReviewsDiv: (open: boolean) => void;
  isZoomed: boolean;
  selectedVariant: any;
  addToCart: (variant: any) => void;
}) {
  function classNames(
    ...classes: (string | undefined | null | false)[]
  ): string {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <ul
        role="list"
        className={`divide-y divide-gray-200 relative ${
          isZoomed ? "-z-10" : "z-0"
        }`}
      >
        <li className="sm:px-0 border-t border-gray-200 mt-4">
          <button
            className="group relative flex w-full items-center justify-between py-3 text-left"
            onClick={() => setOpenSpecs(true)}
          >
            <span
              className={classNames(
                openSpecs ? "text-primary" : "text-gray-900",
                "text-sm font-medium"
              )}
            >
              Product Specifications
            </span>
            <span className="ml-6 flex items-center">
              {openSpecs ? (
                <MinusIcon
                  className="block h-6 w-6 text-green-400 group-hover:text-green-500"
                  aria-hidden="true"
                />
              ) : (
                <PlusIcon
                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              )}
            </span>
          </button>
        </li>
        <li className="sm:px-0">
          <button
            className="group relative flex w-full items-center justify-between py-3 text-left"
            onClick={() => setOpenPerks(true)}
          >
            <span
              className={classNames(
                openPerks ? "text-primary" : "text-gray-900",
                "text-sm font-medium"
              )}
            >
              Perks & Benefits Included
            </span>
            <span className="ml-6 flex items-center">
              {openPerks ? (
                <MinusIcon
                  className="block h-6 w-6 text-green-400 group-hover:text-green-500"
                  aria-hidden="true"
                />
              ) : (
                <PlusIcon
                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              )}
            </span>
          </button>
        </li>

        <li className=" sm:px-0">
          <button
            className="group relative flex w-full items-center justify-between py-3 text-left"
            onClick={() => setOpenFAQs(true)}
          >
            <span
              className={classNames(
                openFAQs ? "text-primary" : "text-gray-900",
                "text-sm font-medium"
              )}
            >
              FAQs
            </span>
            <span className="ml-6 flex items-center">
              {openFAQs ? (
                <MinusIcon
                  className="block h-6 w-6 text-green-400 group-hover:text-green-500"
                  aria-hidden="true"
                />
              ) : (
                <PlusIcon
                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              )}
            </span>
          </button>
        </li>

        <li className="sm:px-0">
          <button
            className="group relative flex w-full items-center justify-between py-3 text-left"
            onClick={() => setReviewsDiv(!reviewsDiv)}
          >
            <span
              className={classNames(
                reviewsDiv ? "text-primary" : "text-gray-900",
                "text-sm font-medium"
              )}
            >
              Reviews
            </span>
            <span className="ml-6 flex items-center">
              {reviewsDiv ? (
                <MinusIcon
                  className="block h-6 w-6 text-green-400 group-hover:text-green-500"
                  aria-hidden="true"
                />
              ) : (
                <PlusIcon
                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              )}
            </span>
          </button>
        </li>
        <li className="sm:px-2">
          <div className="flex justify-center items-center my-3">
            <button
              className={`bg-primary text-white text-lg font-medium py-2.5 text-center px-4 rounded-md flex justify-center items-center gap-2 w-full ${
                !selectedVariant || isBuyButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={!selectedVariant || isBuyButtonDisabled}
              onClick={() => {
                if (!isBuyButtonDisabled) {
                  setOpenCart(true);
                  addToCart(selectedVariant);
                }
              }}
            >
              {!isBuyButtonDisabled ? (
                <>
                  <span>Add to Cart</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </>
              ) : (
                "Out of Stock"
              )}
            </button>
          </div>
        </li>
      </ul>
    </>
  );
}
