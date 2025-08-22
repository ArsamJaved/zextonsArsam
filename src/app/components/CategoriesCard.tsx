"use client";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import bgcategory1 from "@/app/assets/category-bg-1.webp";
import bgcategory2 from "@/app/assets/category-bg-2.webp";
import bgcategory3 from "@/app/assets/category-bg-3.webp";
import bgcategory4 from "@/app/assets/category-bg-4.webp";
import categoryimg1 from "@/app/assets/category-img-1.webp";
import categoryimg2 from "@/app/assets/category-img-2.webp";
import categoryimg3 from "@/app/assets/category-img-3.webp";
import categoryimg4 from "@/app/assets/category-img-4.webp";
import Image from "next/image";
import Link from "next/link";

// Define types for props
interface Category {
  name: string;
}

interface CategoriesCardProps {
  countItems: (categoryName: string) => number;
  newCategories: { categories: Category[] };
}

const categoryBackgrounds = [
  bgcategory2,
  bgcategory3,
  bgcategory1,
  bgcategory4,
];
const categoryImages = [categoryimg2, categoryimg3, categoryimg1, categoryimg4];

const CategoriesCard: React.FC<CategoriesCardProps> = ({
  countItems,
  newCategories,
}) => {
  // Local state to manage the categories data
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  // Initialize categories data
  useEffect(() => {
    // Simulating async data fetching
    const timer = setTimeout(() => {
      // Filter categories once data is loaded
      const filteredCategories = newCategories?.categories?.filter((category) =>
        [
          "Mobile-Phones",
          "iPads-and-Tablets",
          "Game-Consoles",
          "Laptops-and-Macbooks",
        ].includes(category.name)
      );
      setCategories(filteredCategories || []);
      setLoading(false); // Stop loading after data is set
    }, 1000); // Simulate a delay in fetching data

    return () => clearTimeout(timer);
  }, [newCategories]);

  // Handle Embla events
  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      };

      emblaApi.on("select", onSelect);

      return () => {
        emblaApi.off("select", onSelect);
      };
    }
  }, [emblaApi]);

  // Function to handle pagination dot click
  const handleDotClick = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi]
  );

  if (loading) {
    // Show static placeholders while the data is loading
    return (
      <div className="relative">
        <div className="embla overflow-hidden">
          <div className="embla__container flex">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="embla__slide flex-[0_0_100%]">
                <div className="max-w-screen-xl mx-auto py-5 sm:py-10 px-2">
                  <div
                    className="rounded-lg shadow-xl p-2 sm:p-5 md:mb-0 mb-5 card-hover cursor-pointer"
                    style={{
                      backgroundImage: `url(${
                        categoryBackgrounds[index % categoryBackgrounds.length]
                          .src
                      })`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="text-lg font-bold mb-2 sm:line-clamp-1 line-clamp-2 hover:text-gray-900 relative z-10">
                      Loading...
                    </div>
                    <p className="text-gray-500">Loading items...</p>
                    <div className="w-full h-40 sm:w-60 sm:h-56">
                      <Image
                        className="object-contain w-full h-full categories-card-imagess"
                        src={categoryImages[index % categoryImages.length].src}
                        alt="Loading..."
                        width="380"
                        height="380"
                        loading="lazy"
                        fetchPriority="high"
                      />
                    </div>
                    <div className="flex xs:flex-nowrap flex-wrap justify-between items-center md:mt-5">
                      <p className="transition ease-in-out delay-100 relative z-10 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 md:py-2.5 py-1.5">
                        Loading...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {categories.map((category, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%] xl:flex-[0_0_25%]"
            >
              <div className="max-w-screen-xl mx-auto py-5 sm:py-10 px-2">
                <div
                  className="rounded-lg shadow-xl p-2 sm:p-5 md:mb-0 mb-5 cursor-pointer 
                  transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-card-shadow group"
                  style={{
                    backgroundImage: `url(${
                      categoryBackgrounds[index % categoryBackgrounds.length]
                        .src
                    })`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <Link
                    href={`/categories/${encodeURIComponent(category.name)}`}
                  >
                    <p className="text-lg font-bold mb-2 sm:line-clamp-1 line-clamp-2 hover:text-gray-900 relative z-10">
                      {category.name.replace(/-/g, " ")}
                    </p>
                  </Link>
                  <p className="text-gray-500">
                    {countItems(category.name)} items
                  </p>
                  <div className="w-full h-40 sm:w-60 sm:h-56">
                    <Image
                      className="object-contain w-full h-full transform transition-transform duration-1500 ease-in-out scale-150 lg:scale-130 xs:scale-150 group-hover:scale-165"
                      src={categoryImages[index % categoryImages.length].src}
                      alt={category.name.replace(/-/g, " ")}
                      width="380"
                      height="380"
                      loading="lazy"
                      // fetchPriority="high"
                    />
                  </div>
                  <div className="flex xs:flex-nowrap flex-wrap justify-between items-center md:mt-5">
                    <Link
                      href={`/categories/${encodeURIComponent(category.name)}`}
                    >
                      <p className="transition ease-in-out delay-100 relative z-10 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-900 hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 md:py-2.5 py-1.5">
                        Shop Now
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 xl:hidden">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-500"
            } transition-colors`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesCard;
