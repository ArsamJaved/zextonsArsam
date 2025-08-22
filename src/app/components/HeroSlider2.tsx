"use client";
import { useState, useRef, useEffect } from "react";
import type React from "react";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Fade from "embla-carousel-fade";
import newbggg from "@/app/assets/newbggg.webp";
import samsunggalaxys25ultra from "@/app/assets/samsunggalaxys25ultra.webp";
import smallnewbggg from "@/app/assets/smallnewbggg.webp";
import newbgggblack from "@/app/assets/newbgggblack.webp";
import ipad9gen from "@/app/assets/ipad9gen.webp";
import newbgggblacksmall from "@/app/assets/newbgggblacksmall.webp";
import mobileinhand from "@/app/assets/mobileinhand.png";
import mobileinhandbg from "@/app/assets/mobileinhandbg.png";
import mobileinhandbgsmall from "@/app/assets/mobileinhandbgsmall.png";
// Define the banner type
interface BannerContent {
  title: string;
  subtitle: string;
  paragraph?: string;
  price?: string;
  buynow?: string;
  sellnow?: string;
  warranty?: string[];
}

interface Banner {
  id: number;
  srcLarge: string;
  srcSmall: string;
  alt: string;
  content?: BannerContent;
  extraImage?: string;
}

// CSS animations are added dynamically via useEffect below

const banners: Banner[] = [
  {
    id: 3,
    srcLarge: mobileinhandbg.src,
    srcSmall: mobileinhandbgsmall.src,
    alt: "iPhone 16e",
    content: {
      title: "",
      subtitle: "NEW IPHONE 16e 128GB",
      paragraph: "£499.99",
      price: "",
      warranty: [
        "1-Year Official Apple Warranty",
        "Free Express Delivery (1-2 Days)",
        "30-Day No-Question Returns",
        "Unlocked & Factory Sealed",
        "Free Protection Bundle Included",
      ],
      buynow: "#",
    },
    extraImage: mobileinhand.src,
  },
  {
    id: 1,
    srcLarge: newbggg.src,
    srcSmall: smallnewbggg.src,
    alt: "Refurbished iPhones",
    content: {
      title: "SMART SAVINGS",
      subtitle: "Up To 70% Off",
      paragraph: "Refurbished iPhones",
      warranty: [
        "18-Month Warranty Guarantee",
        "Free Next-Day Delivery",
        "30-Day Risk-Free Returns",
      ],
    },
    extraImage: samsunggalaxys25ultra.src,
  },
  {
    id: 2,
    srcLarge: newbgggblack.src,
    srcSmall: newbgggblacksmall.src,
    alt: "Amazon Fire HD 10 Kids Tablet 2023",
    content: {
      title: "Buy Amazon Fire HD 10 Kids Tablet 2023",
      subtitle: "From £199.99 to £129.99",
      paragraph: "",
      warranty: [
        "1-Year Worry-Free Warranty",
        "Kid-Proof Case Included",
        "Free Next-Day Delivery",
      ],
      buynow:
        "https://zextons.co.uk/products/amazon-fire-hd-10-2023-kids-tablet-10.1in-32gb-brand-new-32gb-blue-brand-new",
    },
    extraImage: ipad9gen.src,
  },
];

const BlackFridayBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade()]);
  const autoplayInterval = 5000; // 5 seconds for autoplay
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      });

      // Start autoplay when the component is mounted
      autoplayRef.current = setInterval(() => {
        emblaApi.scrollNext();
      }, autoplayInterval);

      // Clear autoplay on component unmount
      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
      };
    }
  }, [emblaApi]);

  // Function to handle pagination dot click
  const handleDotClick = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  useEffect(() => {
    // Add animation styles to document
    const style = document.createElement("style");
    style.textContent = `
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-slideUp {
      animation: slideUp 0.8s ease forwards;
    }
    .animate-fadeIn {
      animation: fadeIn 0.8s ease forwards;
    }
    .text-shadow {
      text-shadow: 0 1px 3px rgba(0,0,0,0.8);
    }
  `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="embla__container flex">
          {banners.map((banner, index) => (
            <div key={banner.id} className="embla__slide flex-[0_0_100%]">
              <div className="relative w-full">
                {/* Responsive banner image */}
                <div className="relative w-full min-h-[420px] sm:min-h-[300px] md:min-h-[400px]">
                  <Image
                    src={banner.srcLarge || "/placeholder.svg"}
                    alt={banner.alt}
                    className="object-cover"
                    fill
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    sizes="100vw"
                    quality={90}
                  />
                </div>

                {/* Three-section layout for desktop */}
                <div className="absolute inset-0 hidden sm:flex">
                  {/* Left section - Button */}
                  <div className="w-3/12 md:w-2/12 lg:w-2/12 relative flex items-end pb-6 pl-6">
                    <a
                      href={
                        banner.id === 1
                          ? "https://zextons.co.uk/subcategory/iPhone"
                          : banner.id === 2
                          ? "https://zextons.co.uk/products/amazon-fire-hd-10-2023-kids-tablet-10.1in-32gb-brand-new-32gb-blue-brand-new"
                          : banner.id === 3
                          ? "https://zextons.co.uk/products/apple-iphone-16e-unlocked-brand-new-128gb-white-brand-new"
                          : "#"
                      }
                      className="bg-white text-black text-sm lg:text-base font-bold py-1.5 lg:py-2 px-4 lg:px-6 rounded-lg flex items-center gap-2"
                    >
                      {banner.id === 1
                        ? "ORDER NOW"
                        : banner.id === 2
                        ? "BUY NOW"
                        : "SHOP NOW"}
                      <span className="flex items-center justify-center w-4 lg:w-5 h-4 lg:h-5 bg-black text-white rounded-lg">
                        →
                      </span>
                    </a>
                  </div>

                  {/* Middle section - Product image */}
                  <div className="md:w-4/12 lg:w-4/12 relative -rotate-12">
                    {banner.extraImage && (
                      <div
                        className={`absolute -bottom-5 transform -translate-y-1/4 hidden sm:block ${
                          currentSlide === index && index !== 0
                            ? "animate-slideUp"
                            : currentSlide === index && index === 0
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px]">
                          <Image
                            src={banner.extraImage || "/placeholder.svg"}
                            alt={`${banner.alt} device`}
                            className="object-contain"
                            fill
                            priority={index === 0}
                            loading={index === 0 ? "eager" : "lazy"}
                            fetchPriority={index === 0 ? "high" : "auto"}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right section - Text content */}
                  <div className="w-6/12 lg:w-6/12 relative lg:pl-3 md:pl-5">
                    <div className="absolute top-1/4 -translate-y-1/4 transform">
                      {banner.content && (
                        <div
                          className={`${
                            currentSlide === index && index !== 0
                              ? "animate-fadeIn"
                              : currentSlide === index && index === 0
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        >
                          <div
                            className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider ${
                              banner.id === 3 ? "text-black" : "text-white"
                            }`}
                          >
                            {banner.content.title}
                          </div>
                          {banner.content.subtitle && (
                            <div
                              className={`text-xl sm:text-2xl lg:text-5xl xl:text-6xl font-extrabold leading-none tracking-wide ${
                                banner.id === 3 ? "text-black" : "text-primary"
                              }`}
                            >
                              {banner.id === 1 ? (
                                <>
                                  UPTO
                                  <span className="text-yellow-300"> 70</span>
                                  <span className="text-yellow-300 align-top text-3xl lg:text-5xl">
                                    %
                                  </span>
                                  OFF
                                </>
                              ) : banner.id === 2 ? (
                                <>
                                  From{" "}
                                  <del className="text-red-500">£199.99</del> to{" "}
                                  <span className="text-yellow-300">
                                    £129.99
                                  </span>
                                </>
                              ) : (
                                banner.content.subtitle
                              )}
                            </div>
                          )}
                          {banner.content.paragraph && (
                            <p
                              className={`${
                                banner.id === 3
                                  ? "text-white lg:text-5xl lg:font-bold"
                                  : "text-white"
                              } text-sm sm:text-base mt-2 lg:text-2xl max-w-[90%] lg:max-w-[70%]`}
                            >
                              {banner.id === 3 && (
                                <del className="text-red-500 mr-5">£599</del>
                              )}
                              {banner.content.paragraph}
                            </p>
                          )}
                          {banner.content.price && (
                            <p
                              className={`${
                                banner.id === 3 ? "text-black" : "text-red-500"
                              } text-xl sm:text-2xl lg:text-3xl font-bold mt-2`}
                            >
                              {banner.content.price}{" "}
                              {index === 2 && (
                                <span
                                  className={`${
                                    banner.id === 3
                                      ? "text-black"
                                      : "text-white"
                                  } text-base`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="inline-block h-5 w-5 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                  </svg>
                                  +5% Newsletter Discount MAX £30
                                </span>
                              )}
                            </p>
                          )}
                          {banner.content.warranty && (
                            <div
                              className={`mt-2 lg:mt-4 text-base lg:text-2xl ${
                                banner.id === 3 ? "text-black" : "text-white"
                              }`}
                            >
                              {banner.content.warranty.map((item, i) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-2"
                                >
                                  <div
                                    className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full ${
                                      banner.id === 3 ? "bg-black" : "bg-white"
                                    }`}
                                  ></div>
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Media - Fixed at top right */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hidden sm:block">
                  <div className="text-xs sm:text-sm font-medium mb-1">
                    Follow Us Now
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <a
                      href="https://www.facebook.com/zextonstechstore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-full inline-flex items-center justify-center w-11 h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent shadow-sm"
                      aria-label="Visit Zextons Facebook Page"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com/zextons_uk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-full inline-flex items-center justify-center w-11 h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent shadow-sm"
                      aria-label="Follow Zextons on Twitter"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCb5pBW9HkmUo7CjszeJwqqQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-full inline-flex items-center justify-center w-11 h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent shadow-sm"
                      aria-label="Visit Zextons YouTube Channel"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/zextons.co.uk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-full inline-flex items-center justify-center w-11 h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent shadow-sm"
                      aria-label="Follow Zextons on Instagram"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Extra Image (Phone) */}

                {/* Mobile content display */}
                <div className="sm:hidden absolute inset-0 flex flex-col items-center text-center p-4">
                  {banner.extraImage && (
                    <div
                      className={`relative w-full max-w-[150px] h-[150px] mx-auto mt-4 ${
                        currentSlide === index && index !== 0
                          ? "animate-slideUp"
                          : currentSlide === index && index === 0
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <Image
                        src={banner.extraImage || "/placeholder.svg"}
                        alt={`${banner.alt} device`}
                        priority={banner.id === 1}
                        loading={banner.id === 1 ? "eager" : "lazy"}
                        className="object-contain"
                        fill
                        sizes="(max-width: 640px) 40vw, 20vw"
                      />
                    </div>
                  )}
                  {banner.content && (
                    <div
                      className={`mt-4 ${
                        currentSlide === index && index !== 0
                          ? "animate-fadeIn"
                          : currentSlide === index && index === 0
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <h2
                        className={`${
                          banner.id === 3 ? "text-black" : "text-white"
                        } text-sm font-bold mb-1 text-shadow`}
                      >
                        {banner.content.title}
                      </h2>
                      <h3
                        className={`${
                          banner.id === 3 ? "text-black" : "text-white"
                        } text-xl font-bold mb-1 text-shadow`}
                      >
                        {banner.id === 2 ? (
                          <>
                            From <del className="text-red-500">£199.99</del> to{" "}
                            <span className="text-yellow-300">£129.99</span>
                          </>
                        ) : (
                          banner.content.subtitle
                        )}
                      </h3>
                      {banner.content.paragraph && (
                        <p
                          className={`${
                            banner.id === 3 ? "text-black" : "text-white"
                          } text-[10px] mb-1 text-shadow max-w-[250px] mx-auto`}
                        >
                          {banner.id === 3 && (
                            <del className="text-red-500 mr-2">£599</del>
                          )}
                          {banner.content.paragraph}
                        </p>
                      )}
                      {banner.content.price && (
                        <p
                          className={`${
                            banner.id === 3 ? "text-black" : "text-red-500"
                          } text-lg font-bold mb-1 text-shadow`}
                        >
                          {banner.content.price}
                        </p>
                      )}
                      {banner.content.warranty && (
                        <div
                          className={`${
                            banner.id === 3 ? "text-black" : "text-white"
                          } text-[10px] text-shadow mb-2`}
                        >
                          {banner.content.warranty.map((item, i) => (
                            <div key={i} className="mb-0.5">
                              • {item}
                            </div>
                          ))}
                        </div>
                      )}
                      <a
                        href={
                          banner.id === 1
                            ? "https://zextons.co.uk/subcategory/iPhone"
                            : banner.id === 2
                            ? "https://zextons.co.uk/products/amazon-fire-hd-10-2023-kids-tablet-10.1in-32gb-brand-new-32gb-blue-brand-new"
                            : banner.id === 3
                            ? "#"
                            : "#"
                        }
                        className="mt-2 bg-white text-black text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 mx-auto w-fit"
                      >
                        {banner.id === 1
                          ? "ORDER NOW"
                          : banner.id === 2
                          ? "BUY NOW"
                          : "SHOP NOW"}
                        <span className="flex items-center justify-center w-3 h-3 bg-black text-white rounded-full text-[8px]">
                          →
                        </span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleDotClick(index)}
            className="w-11 h-11 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index ? "true" : undefined}
          >
            <span
              className={`${
                currentSlide === index ? "bg-primary" : "bg-white"
              } block w-2.5 h-2.5 md:w-3 md:h-3 rounded-full shadow-md`}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlackFridayBanner;
