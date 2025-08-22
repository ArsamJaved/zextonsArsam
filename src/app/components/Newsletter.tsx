"use client";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/app/context/Auth";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import iphone13 from "@/app/assets/iphone13-green.webp";
import huawei from "@/app/assets/huwawei-logo.webp";
import samsungg from "@/app/assets/samsung-logo.webp";
import oneplus from "@/app/assets/oneplus-logo.webp";
import sony from "@/app/assets/sony-logo.webp";
import apple from "@/app/assets/apple-logo.webp";
import { useTrustPWidget } from "@/app/hooks/useTrustPWidget";
import Image from "next/image";

export default function Newsletter({
  setShowThankYou,
}: {
  setShowThankYou: (value: boolean) => void;
}) {
  const auth = useAuth();
  const [email, setEmail] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      console.log("Please provide your email.");
      return;
    }

    const fullName = auth?.user
      ? `${auth?.user?.firstname} ${auth?.user?.lastname}`
      : null;

    try {
      const response = await axios.post(`${auth.ip}newsletter/subscribers`, {
        fullName,
        email,
        mode: "homepage",
      });
      if (response.status === 200) {
        setEmail(""); // Clear email field after successful subscription
        setShowThankYou(true);
      } else {
        console.log("Something went wrong. Please try again.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error: " + err.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  const brands = [
    { src: huawei, alt: "Huawei" },
    { src: samsungg, alt: "Samsung" },
    { src: apple, alt: "Apple" },
    { src: oneplus, alt: "OnePlus" },
    { src: sony, alt: "Sony" },
    // Uncomment if you have the other logo
    // { src: otherlogo, alt: "Other" },
  ];

  useTrustPWidget();

  // Embla Carousel setup
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    dragFree: false,
    align: "start",
    slidesToScroll: 1,
    slidesToShow: 2,
    breakpoints: {
      1200: {
        slidesToScroll: 1,
        slidesToShow: 4,
      },
      1024: {
        slidesToScroll: 1,
        slidesToShow: 4,
      },
      768: {
        slidesToScroll: 1,
        slidesToShow: 3,
      },
    },
  } as EmblaOptionsType);
  useTrustPWidget();
  return (
    <>
      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto flex justify-center items-center">
        <div className="bg-gray-200 px-2 md:px-8 rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:justify-evenly w-full py-10 mt-5">
          <div className="w-full">
            <h2 className="md:text-4xl font-bold mb-2">
              Subscribe To Newsletter
            </h2>
            <p className="text-gray-600 mb-4">
              Get free guide about smart watches daily.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col xs:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-300 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-white p-2 rounded-md hover:brightness-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/70"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="wobble-animation mt-5 flex justify-center items-center w-full">
            <Image
              src={iphone13}
              alt="Smart Watch"
              className="w-56 h-56 object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <div className="pt-5">
        {/* TrustBox widget */}
        <div
          className="trustpilot-widget"
          data-locale="en-GB"
          data-template-id="53aa8912dec7e10d38f59f36"
          data-businessunit-id="62e8fdd30dc0c3a7268e8064"
          data-style-height="140px"
          data-style-width="100%"
          data-stars="1,2,3,4,5"
          data-review-languages="en"
        >
          <a
            href="https://uk.trustpilot.com/review/zextons.co.uk"
            target="_blank"
            rel="noopener"
          >
            Trustpilot
          </a>
        </div>
      </div>
      {/* Brand Logos Embla Carousel */}
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_50%] md:flex-[0_0_75%] lg:flex-[0_0_25%] px-1.5"
            >
              <div className="max-w-screen-xl mx-auto my-5 sm:px-5 px-2 relative rounded-lg overflow-hidden flex justify-center items-center">
                <Image
                  className="md:h-36 md:w-36 w-full"
                  src={brand.src}
                  alt={brand.alt}
                  width="144"
                  height="144"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
