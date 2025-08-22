import { useAuth } from "@/app/context/Auth";
import Image from "next/image";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import VariantPrice from "@/app/(routes)/products/components/VariantPrice";
import Loading from "@/app/components/Loading";
const Tab = dynamic(() => import("@headlessui/react").then((mod) => mod.Tab));
import { TabList, TabGroup } from "@headlessui/react";
// const TabList = dynamic(() =>
//   import("@headlessui/react").then((mod) => mod.TabList)
// );
// const TabGroup = dynamic(() =>
//   import("@headlessui/react").then((mod) => mod.TabGroup)
// );
export default function ImagePart({
  images,
  selectedVariant,
  isZoomed,
  setIsZoomed,
}: {
  images: any;
  selectedVariant: any;
  isZoomed: boolean;
  setIsZoomed: (isZoomed: boolean) => void;
}) {
  const auth = useAuth();
  const loader = ({
    width,
    quality,
    src,
  }: {
    width: number;
    quality: number;
    src: string;
  }) => {
    const props = [`w=${width}`];
    if (quality) {
      props.push(`q=${quality}`);
    }
    const queryString = props.join("&");
    return `https://zextons.co.uk/${src}?${queryString}`;
  };
  const [currentImage, setCurrentImage] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const handleZoomClick = (index: number) => {
    setCurrentIndex(index);
    setCurrentImage(`${auth.ip}${images[index]?.path}`);
    setIsZoomed(true);
  };

  // Function to close zoomed image view
  const closeZoom = () => {
    setIsZoomed(false);
    setCurrentImage(null);
  };

  // Function to handle the next image
  const handleNextImage = () => {
    if (images?.length > 0) {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      if (isZoomed) {
        setCurrentImage(`${auth.ip}${images[nextIndex]?.path}`);
      }
    }
  };

  // Function to handle the previous image
  const handlePreviousImage = () => {
    if (images?.length > 0) {
      const prevIndex =
        currentIndex === 0 ? images?.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
      if (isZoomed) {
        setCurrentImage(`${auth.ip}${images[prevIndex]?.path}`);
      }
    }
  };
  if (!images || images.length === 0) {
    return (
     <Loading/>
    );
  }
  // console.log(images);
  return (
    <>
      <TabGroup
        as="div"
        className="flex flex-col-reverse xl:flex-row lg:sticky top-28"
      >
        {/* Image selector */}
        <div className="mx-auto mt-2 max-w-2xl md:w-fit w-full">
          <TabList className="grid grid-cols-4 xl:grid-cols-1 md:gap-6 gap-2 mt-4 px-4 justify-end">
            {images?.map(
              (
                image: { filename?: string; id?: string; path?: string },
                index: number
              ) => {
                return (
                  <Tab
                    key={image?.filename || image?.id}
                    className={`tab-rotate-on-load relative flex md:w-20 h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 ${
                      currentIndex === index
                        ? "ring-green-500 pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                        : ""
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    {() => (
                      <>
                        <span className="sr-only">{image?.filename}</span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <Image
                            src={`${auth.ip}${image?.path}`}
                            alt={"Mobile Image"}
                            className="object-contain object-center"
                            fill
                            sizes="(min-width: 768px) 5rem, 25vw"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
                            loader={({ src, width, quality }) =>
                              loader({ src, width, quality: quality || 75 })
                            }
                            unoptimized
                          />
                        </span>
                        <span
                          className={
                            currentIndex === index
                              ? `ring-green-500 pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2`
                              : `ring-transparent pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2`
                          }
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                );
              }
            )}{" "}
          </TabList>{" "}
        </div>

        <div className="mx-auto relative w-full md:ms-3 flex justify-center">
          <div className="absolute top-2 md:-top-5 left-2 md:left-0">
            <VariantPrice selectedVariant={selectedVariant} />
          </div>
          <div className="w-72 md:w-96 lg:h-[34rem] h-[22rem] relative flex items-center justify-center main-image-slider">
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <Image
                src={`${auth.ip}${images[currentIndex]?.path}`}
                alt={"Mobile Image"}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
                className="lg:h-[32rem] h-full w-full object-contain object-center mt-4"
                fill
                unoptimized
                loader={({ src, width, quality }) =>
                  loader({ src, width, quality: quality || 75 })
                }
              />
            </span>

            {/* Previous Button */}
            <button
              type="button"
              aria-label="Previous image"
              className="absolute -left-10 bg-gray-700 bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              onClick={handlePreviousImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M15.25 6.35q.3.3.3.713t-.3.712l-4.2 4.225l4.2 4.2q.275.275.287.688t-.287.712q-.3.3-.713.3t-.712-.3L9.1 12.725q-.3-.3-.3-.713t.3-.712l4.725-4.725q.3-.3.713-.3t.712.3Z"
                />
              </svg>
            </button>

            {/* Next Button */}
            <button
              type="button"
              aria-label="Next image"
              className="absolute -right-10  bg-gray-700 bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              onClick={handleNextImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M8.75 17.65q-.3-.3-.3-.713t.3-.712l4.2-4.225l-4.2-4.2q-.275-.275-.287-.688T8.75 6.35q.3-.3.713-.3t.712.3l4.725 4.725q.3.3.3.713t-.3.712L10.175 17.65q-.3.3-.713.3t-.712-.3Z"
                />
              </svg>
            </button>

            {/* Zoom Button */}
            <button
              type="button"
              aria-label="Zoom image"
              className="absolute top-2 -right-10  bg-gray-700 bg-opacity-50 p-1 rounded-full text-white hover:bg-opacity-75 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              onClick={() => handleZoomClick(currentIndex)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5.708 19H8.5q.213 0 .356.144t.144.357t-.144.356T8.5 20H4.808q-.343 0-.576-.232T4 19.192V15.5q0-.213.144-.356T4.501 15t.356.144T5 15.5v2.792l3.246-3.246q.14-.14.344-.15t.364.15t.16.354t-.16.354zm12.584 0l-3.246-3.246q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L19 18.292V15.5q0-.213.144-.356t.357-.144t.356.144t.143.356v3.692q0 .344-.232.576t-.576.232H15.5q-.213 0-.356-.144T15 19.499t.144-.356T15.5 19zM5 5.708V8.5q0 .213-.144.356T4.499 9t-.356-.144T4 8.5V4.808q0-.343.232-.576T4.808 4H8.5q.213 0 .356.144T9 4.501t-.144.356T8.5 5H5.708l3.246 3.246q.14.14.15.344t-.15.364t-.354.16t-.354-.16zm14 0l-3.246 3.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L18.292 5H15.5q-.213 0-.356-.144T15 4.499t.144-.356T15.5 4h3.692q.344 0 .576.232t.232.576V8.5q0 .213-.144.356T19.499 9t-.356-.144T19 8.5z"
                />
              </svg>
            </button>
          </div>

          {/* Full-screen Zoom Modal */}
          {isZoomed && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white top-[90px]">
              <span className="absolute inset-0 z-50">
                <Image
                  src={currentImage}
                  alt="Zoomed"
                  className="object-contain Zoomed"
                  fill
                  sizes="100vw"
                  loader={({ src, width, quality }) =>
                    loader({ src, width, quality: quality || 75 })
                  }
                  unoptimized
                />
              </span>

              {/* Previous Button */}
              <button
                type="button"
                aria-label="Previous image"
                className="absolute left-4 bg-gray-700 bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                onClick={handlePreviousImage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M15.25 6.35q.3.3.3.713t-.3.712l-4.2 4.225l4.2 4.2q.275.275.287.688t-.287.712q-.3.3-.713.3t-.712-.3L9.1 12.725q-.3-.3-.3-.713t.3-.712l4.725-4.725q.3-.3.713-.3t.712.3Z"
                  />
                </svg>
              </button>

              {/* Next Button */}
              <button
                type="button"
                aria-label="Next image"
                className="absolute right-4 bg-gray-700 bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                onClick={handleNextImage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M8.75 17.65q-.3-.3-.3-.713t.3-.712l4.2-4.225l-4.2-4.2q-.275-.275-.287-.688T8.75 6.35q.3-.3.713-.3t.712.3l4.725 4.725q.3.3.3.713t-.3.712L10.175 17.65q-.3.3-.713.3t-.712-.3Z"
                  />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Close zoom"
                className="absolute top-4 right-4 text-white p-2 bg-gray-700 bg-opacity-50 rounded-full hover:bg-opacity-75 z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                onClick={closeZoom}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </TabGroup>
    </>
  );
}
