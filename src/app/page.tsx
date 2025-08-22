"use client";
import { Suspense, useEffect, useMemo, useState, useCallback } from "react";
import { fetchProducts } from "@/app/lib/features/products/getProductSlice";
import { fetchProductCategory } from "@/app/lib/features/categories/categoriesSlice";
import "./globals.css";
import TopBar from "./topbar/page";
import Nav from "./components/navbar/Nav";
import { useAppDispatch, useAppSelector } from "./lib/hooks";
import CategoriesCard from "./components/CategoriesCard";
import paypal from "@/app/assets/paypal.webp";
import clearpay from "@/app/assets/clearpay.webp";
import kalarna from "@/app/assets/kalarna.webp";
import tinyphones from "@/app/assets/tinylogo.webp";
import handlogo from "@/app/assets/handlogo.png";
import frontphone from "@/app/assets/frontphone.webp";
import backphone from "@/app/assets/backphone.webp";
import Image from "next/image";
import Link from "next/link";
import SwiperComponent from "./components/SwiperComponent";
import ProductCard from "./components/ProductCard";
import BlogsCard from "./components/blogs/BlogsCard";
import NewsletterSuccessModal from "./components/common/NewsletterSuccessModal";
import CookieConsent from "./components/common/ConsentCookie";
import TextSection from "./components/TextSection";
import Footer from "./components/footer/footer";
import Newsletter from "./components/Newsletter";
import axios from "axios";
import HeroSlider2 from "./components/HeroSlider2";
import ZextonsWelcome from "./components/ZextonsWelcome";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [latestProducts, setLatestProducts] = useState([]);
  const [refurbishedProducts, setRefurbishedProducts] = useState<any[]>([]);
  const [featuredCategoryProducts, setFeaturedCategoryProducts] = useState<
    any[]
  >([]);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  const newCategories = useAppSelector((state) => state.categories);
  const category = "";
  const [showThankYou, setShowThankYou] = useState(false);
  // const [showConsent, setShowConsent] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const fetchLatestProducts = useCallback(async () => {
    try {
      const response = await axios.get(`/api/products/latest`);
      return response.data.products;
    } catch (error) {
      console.error("Error fetching latest products:", error);
      return [];
    }
  }, []);
  const fetchRefurbishedProducts = useCallback(async () => {
    try {
      const response = await axios.get(`/api/products/refurbished`);
      return response.data.products;
    } catch (error) {
      console.error("Error fetching latest products:", error);
      return [];
    }
  }, []);

  const fetchFeaturedCategoryProducts = useCallback(async () => {
    try {
      const response = await axios.get(`/api/products/homepage`);
      return response.data.products;
    } catch (error) {
      console.error("Error fetching featured category products:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const latestProducts = await fetchLatestProducts();
      const featuredCategoryProducts = await fetchFeaturedCategoryProducts();
      const refurbishedProducts = await fetchRefurbishedProducts();
      // Update state with fetched data
      setLatestProducts(latestProducts);
      setFeaturedCategoryProducts(featuredCategoryProducts);
      setRefurbishedProducts(refurbishedProducts);
    };

    getProducts();
  }, [fetchLatestProducts, fetchFeaturedCategoryProducts, fetchRefurbishedProducts]);
  useEffect(() => {
    // Fetch products and categories concurrentl
    if (!products.length) {
      dispatch(fetchProducts());
    }
    if (!newCategories.categories.length) {
      dispatch(fetchProductCategory(category));
    }
  }, [dispatch, products.length, newCategories.categories.length, category]);

  // Find the first featured category
  const featuredCategory = newCategories?.categories.find(
    (category) => category.isFeatured
  );
  const featuredCategoryUrl = featuredCategory
    ? `/categories/${encodeURIComponent(featuredCategory.name)}`
    : "/";
  // console.log(featuredCategoryProducts?.products);
  // const FeaturedProducts = useMemo(
  //   () => featuredCategoryProducts?.filter((product) => product?.is_featured),
  //   [products]
  // );

  // const refurbishedIphones = useMemo(
  //   () =>
  //     products.filter(
  //       (product) =>
  //         product.category.includes("Apple") &&
  //         (product.condition === "Refurbished" ||
  //           product.condition === "Brand New") &&
  //         product.subCategory.includes("iPhone")
  //     ),
  //   [products]
  // );
  const iPhoneSubCategory = newCategories?.categories
    ?.find((category) => category.name === "Apple")
    ?.subCategory?.find((subCat) => subCat === "iPhone");
  const subCategoryUrl = iPhoneSubCategory
    ? `/subcategory/${encodeURIComponent(iPhoneSubCategory)}`
    : "/";
  // // Samsung Phones
  const samsungPhones = useMemo(
    () =>
      products.filter(
        (product) =>
          product.category.includes("Samsung") &&
          (product.condition === "Brand New" ||
            product.condition === "Refurbished")
      ),
    [products]
  );
  // Find Samsung subcategory URL for redirection
  const samsungCategory = newCategories?.categories?.find(
    (category) => category.name === "Samsung"
  );
  const samsungCategoryUrl = samsungCategory
    ? `/categories/${encodeURIComponent(
      samsungCategory.name.replace(/\s+/g, "-")
    )}`
    : "/";
  // // Filter products for iPads & Tablets
  const tabletsAndIpads = useMemo(
    () =>
      products.filter(
        (product) =>
          (product.category.includes("Apple") &&
            product.subCategory.includes("iPad")) ||
          product.category.includes("iPads-and-Tablets")
      ),
    [products]
  );
  // Find Tablets and iPads category URL for redirection
  const tabletsCategory = newCategories?.categories?.find(
    (category) => category.name === "iPads-and-Tablets"
  );
  const tabletsCategoryUrl = tabletsCategory
    ? `/categories/${encodeURIComponent(tabletsCategory.name)}`
    : "/";
  // // Filter products for Laptops & MacBooks
  const laptopsAndMacBooks = useMemo(
    () =>
      products.filter((product) =>
        product.category.includes("Laptops-and-Macbooks")
      ),
    [products]
  );
  // Find Laptops and MacBooks category URL for redirection
  const laptopsCategory = newCategories?.categories?.find(
    (category) => category.name === "Laptops-and-Macbooks"
  );
  const laptopsCategoryUrl = laptopsCategory
    ? `/categories/${encodeURIComponent(laptopsCategory.name)}`
    : "/";
  // // Filter products for Game Consoles
  const gameConsoles = useMemo(
    () =>
      products.filter((product) => product.category.includes("Game-Consoles")),
    [products]
  );
  // Find Game Consoles category URL for redirection
  const gameConsolesCategory = newCategories?.categories?.find(
    (category) => category.name === "Game-Consoles"
  );
  const gameConsolesCategoryUrl = gameConsolesCategory
    ? `/categories/${encodeURIComponent(gameConsolesCategory.name)}`
    : "/";
  // const latestProducts = useMemo(() => {
  //   if (products && products.length > 0) {
  //     return [...products].sort(
  //       (a, b) =>
  //         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //     );
  //   }
  //   return [];
  // }, [products]);
  const countItems = (categoryName: string) => {
    return products.filter((product: { category: string }) =>
      product.category.includes(categoryName)
    ).length;
  };
  const [showConsent, setShowConsent] = useState<boolean>(false);
  const handleClose = () => {
    setShowThankYou(false); // Reset thank you modal state
  };

  useEffect(() => {
    // Retrieve the cookie consent status from localStorage
    const consent = localStorage.getItem("cookieConsent");
    // Determine whether to show the CookieConsent banner
    setShowConsent(!consent || consent === "rejected");
  }, []);
  if (!mounted) return null;
  return (
    <>
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "ItemList",
            name: "Zextons Tech Store",
            url: "https://zextons.com/",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Buy Cheap Refurbished Phones Upto 70% off | Second Hand Phone | Zextons",
                url: "https://zextons.co.uk/categories/Refurbished",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Brand New Mobile Phones on Super Discount at Zextons",
                url: "https://zextons.co.uk/categories/Brand-New",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Buy Apple Refurbished & Brand New Phones & Technology in UK - Upto 70% Off",
                url: "https://zextons.co.uk/categories/Apple",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Samsung Galaxy Phones Brand New and Refurbished Phones at Zextons Tech Store",
                url: "https://zextons.co.uk/categories/Samsung",
              },
              {
                "@type": "ListItem",
                position: 5,
                name: "Shop iPads & Tablets Online | Best Prices at Zextons Tech Store",
                url: "https://zextons.co.uk/categories/iPads-and-Tablets",
              },
              {
                "@type": "ListItem",
                position: 6,
                name: "Shop Laptops & MacBooks | Best Deals at Zextons Tech Store",
                url: "https://zextons.co.uk/categories/Laptops-and-Macbooks",
              },
              {
                "@type": "ListItem",
                position: 7,
                name: "Affordable Game Consoles, Xbox , Nintendo Switch Cheap Options for Budget Gamers at Zextons",
                url: "https://zextons.co.uk/categories/Game-Consoles",
              },
              {
                "@type": "ListItem",
                position: 8,
                name: "Buy Google Pixel Phones | Newest and Refurbished Models & Exclusive Deals at Zextons",
                url: "https://zextons.co.uk/categories/Google-Pixel",
              },
              {
                "@type": "ListItem",
                position: 9,
                name: "Buy Your Ven Dens all Tech & Mobile Accessories On Big Discount Limited Time Offer | Zextons Tech Store",
                url: "https://zextons.co.uk/categories/Ven-Dens",
              },
              {
                "@type": "ListItem",
                position: 10,
                name: "Buy Mobile Accessories in the UK | Protection Bundles, Handsfree, Headphones & More – Zextons",
                url: "https://zextons.co.uk/categories/Accessories",
              },
              {
                "@type": "ListItem",
                position: 11,
                name: "Buy the Top Amazon Tablets, TV Sticks and Top Rated Products On Big Discount",
                url: "https://zextons.co.uk/categories/Amazon",
              },
            ],
          }),
        }}
      />
      <header className="relative">
        <nav className="" aria-label="Top">
          <TopBar />
          <Nav />
        </nav>
      </header>
      {/* <HeroSlider /> */}
      <HeroSlider2 />
      <div className="bg-white text-black py-3 border-b border-gray-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center">
          {[
            {
              icon: (
                <svg
                  className="text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="currentColor"
                    d="M236 128a108 108 0 0 1-216 0c0-42.52 24.73-81.34 63-98.9a12 12 0 1 1 10 21.81C63.24 64.57 44 94.83 44 128a84 84 0 0 0 168 0c0-33.17-19.24-63.43-49-77.09a12 12 0 1 1 10-21.81c38.27 17.56 63 56.38 63 98.9"
                  />
                </svg>
              ),
              title: "Fully Tested Devices",
              subtitle: "Buy with confidence",
            },
            {
              icon: (
                <svg
                  className="text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 16 16"
                >
                  <g fill="currentColor">
                    <path d="M8.069 0c.262 0 .52.017.76.057a4 4 0 0 1 .697.154q.34.102.674.263c.217.103.44.229.663.366c.377.24.748.434 1.126.589a7.5 7.5 0 0 0 2.331.525q.607.045 1.257.046v4q0 1.139-.291 2.166a9 9 0 0 1-.789 1.943a10.3 10.3 0 0 1-1.188 1.725a15 15 0 0 1-1.492 1.532a18 18 0 0 1-1.703 1.325q-.892.62-1.794 1.143l-.24.143l-.24-.143a27 27 0 0 1-1.806-1.143a16 16 0 0 1-1.703-1.325a15 15 0 0 1-1.491-1.532a11 11 0 0 1-1.194-1.725a9.8 9.8 0 0 1-.789-1.943A8 8 0 0 1 .571 6V2q.65-.001 1.258-.046a8 8 0 0 0 1.188-.171c.383-.086.766-.2 1.143-.354A6.6 6.6 0 0 0 5.28.846C5.72.56 6.166.349 6.606.21A4.8 4.8 0 0 1 8.069 0m6.502 2.983a9.6 9.6 0 0 1-2.234-.377a8 8 0 0 1-2.046-.943A4.3 4.3 0 0 0 9.23 1.16A3.9 3.9 0 0 0 8.074.994a4 4 0 0 0-1.165.166a4 4 0 0 0-1.058.503A8 8 0 0 1 3.8 2.61q-1.063.309-2.229.378v3.017q0 .993.258 1.908a8.6 8.6 0 0 0 .72 1.743a9.6 9.6 0 0 0 1.08 1.572c.417.491.862.948 1.342 1.382q.72.651 1.509 1.206q.797.556 1.594 1.017a22 22 0 0 0 1.589-1.017a15 15 0 0 0 1.514-1.206c.48-.434.926-.891 1.343-1.382a9.6 9.6 0 0 0 1.08-1.572a8.3 8.3 0 0 0 .709-1.743a6.8 6.8 0 0 0 .262-1.908z" />
                    <path
                      fillRule="evenodd"
                      d="m11.797 4.709l-.44-.378l-.406.035l-4.36 5.148l-1.485-2.12l-.4-.068l-.463.331l-.069.4l1.909 2.726l.217.12l.457.028l.234-.102l4.835-5.715z"
                      clipRule="evenodd"
                    />
                  </g>
                </svg>
              ),
              title: "18 Months Warranty",
              subtitle: "On all refurbished devices",
            },
            {
              icon: (
                <svg
                  className="text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M23.735.238V.236a.25.25 0 0 0-.2-.188c-.256-.04-6.336-.924-14.17 7.051a28 28 0 0 0-2.12 2.576l-4.047 1.166a.25.25 0 0 0-.124.08l-2.856 3.5a.248.248 0 0 0 .126.394l3.887 1.096l.484-.566q.268-.311.574-.58l.54-.472l-.38.608a6 6 0 0 1-.482.66l-.52.606c.008.79.214 1.488.62 2.068L3.68 19.653c-.148.16-.036.272.12.428l1.11 1.086c.153.16.255.258.41.1l1.505-1.534c.34.122 1.162.334 2.4.14l.75-.576q.32-.247.672-.442l.644-.36l-.514.53q-.28.288-.6.534l-.62.476l1.424 3.804a.246.246 0 0 0 .404.09l3.242-3.144a.25.25 0 0 0 .072-.136l.698-4.108c.884-.78 1.78-1.686 2.66-2.694c5.072-5.806 5.798-10.315 5.78-12.487c-.008-.702-.094-1.094-.1-1.122zM16.49 11.165c-1.274 1.296-3.1 1.564-4.082.6c-.98-.962-.744-2.794.53-4.09s3.1-1.566 4.08-.602c.982.964.746 2.796-.528 4.092"
                  />
                </svg>
              ),
              title: "Free & Fast Delivery",
              subtitle: "For all orders",
            },
            {
              icon: (
                <svg
                  className="text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 26 26"
                >
                  <path
                    fill="currentColor"
                    d="M24.906 0a.99.99 0 0 0-.375.125l-24 13a.99.99 0 0 0 .188 1.813l6.375 1.906c.149 1.179.813 6.285.937 7.281c.124.992.798 1.164 1.469.25c.454-.619 3.124-4.375 3.125-4.375l5.688 5.688a.99.99 0 0 0 1.656-.438l6-24A.99.99 0 0 0 24.906 0M23.47 2.938l-5.032 20.125l-5.656-5.657L21 6L8.219 15.125L3.563 13.75L23.468 2.937z"
                  />
                </svg>
              ),
              title: "30 Days Free Return",
              subtitle: "100% Refund",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2 my-1">
              {item.icon}
              <div className="flex flex-col">
                <span className="text-gray-900 font-bold text-sm">
                  {item.title}
                </span>
                <span className="text-xs">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Categories  */}

        <div className="relative">
          <div className="flex items-center gap-3 mt-10">
            <h2 className="text-2xl font-semibold text-primary">
              Popular Categories
            </h2>
            <div className="flex-grow border-b border-black mt-1"></div>
          </div>
        </div>
        <CategoriesCard newCategories={newCategories} countItems={countItems} />

        {/* Featured Products */}
        <SwiperComponent
          title={featuredCategory?.name || "Featured Products"}
          items={featuredCategoryProducts}
          renderCard={(product) => <ProductCard product={product} />}
          link={featuredCategoryUrl}
          linkText="View All"
        />
        {/* BUY NOW PAY LATER BANNER  */}
        <div className="bg-gradient-to-r from-gray-400 to-gray-200 rounded-lg py-12 px-5 flex justify-between items-center min-h-[120px] my-6">
          <div>
            <h2 className="text-2xl font-bold">
              Buy Now Pay Later | Interest-free Installments.
            </h2>
            <p className="text-sm mt-2">
              18+ T&C apply. Please Spend responsibly
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            {[paypal, kalarna, clearpay].map((img, idx) => (
              <div key={idx} className="relative h-10 w-24">
                <Image
                  src={img.src}
                  alt="Payment Option"
                  loading="lazy"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 96px, 30vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Latest Products  */}
        <SwiperComponent
          title="Latest Products"
          items={latestProducts}
          renderCard={(product) => <ProductCard product={product} />}
          link="/shopall"
          linkText="View All"
        />

        {/* buy and sell butons  */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold my-5">
            Buy Refurbished Mobile Phones & Tablets at the Lowest UK Prices
          </h2>
        </div>
        <div className="flex flex-col xs:flex-row justify-between gap-4 sum">
          <div className="bg-[#FE1054] rounded-3xl p-6 flex  flex-wrap items-center md:space-x-20 space-x-5 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-lg">
            <div>
              <h1 className="text-white lg:text-5xl text-2xl font-bold mb-2">
                Sell
              </h1>
              <p className="text-black mt-4 mb-10">
                Sell Your Old Devices For Cash.
              </p>
              <a
                href="https://sell.zextons.co.uk/"
                className="bg-white px-4 py-2 rounded-lg font-semibold text-nowrap"
              >
                Sell Now
              </a>
            </div>
            <div className="md:block hidden">
              <div className="relative md:w-48 w-36 md:h-48 h-36 xl:-mb-6 md:mt-0 sm:mt-20 mt-10">
                <Image
                  src={frontphone.src}
                  alt="Phone Image"
                  loading="lazy"
                  fill
                  className="object-contain rounded-md"
                  sizes="(min-width: 1024px) 12rem, 9rem"
                />
              </div>
            </div>
          </div>
          <div className="bg-primary transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-lg rounded-3xl p-6 flex flex-wrap items-center md:space-x-20 space-x-5  cursor-pointer">
            <div>
              <h2 className="text-white lg:text-5xl text-2xl font-bold mb-2">
                Buy
              </h2>
              <p className="text-white mt-4 mb-10">
                Approved Used refurbished phones.
              </p>
              <Link
                href="/shopall"
                className="bg-white px-4 py-2 rounded-lg font-semibold text-nowrap"
              >
                Shop Now
              </Link>
            </div>
            <div className="md:block hidden">
              <div className="relative md:w-48 w-36 md:h-48 h-36 xl:-mb-6 md:mt-0 sm:mt-20 mt-10">
                <Image
                  src={backphone.src}
                  alt="Phone Image"
                  loading="lazy"
                  fill
                  className="object-contain rounded-md"
                  sizes="(min-width: 1024px) 12rem, 9rem"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5 mt-4">
          <div className="flex justify-center mt-2 mb-1 w-full">
            {/* <!-- TrustBox widget - Mini --> */}
            <div className="flex justify-center items-center w-full">
              <div
                className="trustpilot-widget"
                data-locale="en-GB"
                data-template-id="53aa8807dec7e10d38f59f32"
                data-businessunit-id="62e8fdd30dc0c3a7268e8064"
                data-style-height="150px"
                data-style-width="100%"
                data-theme="light"
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
            {/* <!-- End TrustBox widget --> */}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-5">
        {/* refurbished Iphones  */}
        <SwiperComponent
          title="Refurbished iPhones"
          items={refurbishedProducts}
          renderCard={(product) => <ProductCard product={product} />}
          link={subCategoryUrl}
          linkText="View All"
        />

        <div className="bg-blue-800 rounded-lg flex items-center p-6 my-5">
          <div className="flex-1">
            <h2 className="text-white text-2xl font-semibold mb-2">
              {" Buy World's Smallest Phone"}
            </h2>
            <p className="text-white mb-4 text-sm">Zanco Tiny T1</p>
            <a
              href="https://tinyphones.uk/"
              className="bg-white px-4 py-2 rounded-full text-nowrap"
            >
              SHOP NOW
            </a>
          </div>
          <div className="flex-1 md:flex justify-end">
            <div className="relative h-20 w-full max-w-[390px]">
              <Image
                src={tinyphones.src}
                alt="Tiny Phone"
                loading="lazy"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 390px, 50vw"
              />
            </div>
          </div>
          <div className="flex-1 justify-end md:flex hidden">
            <div className="relative h-28 w-[137px]">
              <Image
                src={handlogo.src}
                alt="Hand with Phone"
                loading="lazy"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 137px, 20vw"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-5">
        {/* Samsung new and refurbished */}
        <SwiperComponent
          title="Samsung Galaxy"
          items={samsungPhones}
          renderCard={(product) => <ProductCard product={product} />}
          link={samsungCategoryUrl}
          linkText="View All"
        />

        {/* Ipad and Tablets */}
        <SwiperComponent
          title="iPads & Tablets"
          items={tabletsAndIpads}
          renderCard={(product) => <ProductCard product={product} />}
          link={tabletsCategoryUrl}
          linkText="View All"
        />

        {/* Game Consoles */}
        <SwiperComponent
          title="Games & Consoles"
          items={gameConsoles}
          renderCard={(product) => <ProductCard product={product} />}
          link={gameConsolesCategoryUrl}
          linkText="View All"
        />

        {/* Laptop & Macbooks */}
        <SwiperComponent
          title="Laptop & Macbooks"
          items={laptopsAndMacBooks}
          renderCard={(product) => <ProductCard product={product} />}
          link={laptopsCategoryUrl}
          linkText="View All"
        />
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Latest Blogs */}
        <BlogsCard />
        {/* News Letter  */}
        <Newsletter setShowThankYou={setShowThankYou} />
        <ZextonsWelcome />
        <TextSection />
      </section>
      <Footer />
      {showThankYou && (
        <Suspense fallback={<div>Loading...</div>}>
          <NewsletterSuccessModal onClose={handleClose} />
        </Suspense>
      )}
      {showConsent && <CookieConsent />}
    </>
  );
}
