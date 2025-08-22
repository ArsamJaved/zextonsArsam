"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Zextons from "@/app/assets/ZEXTONS-LOGO-WHITE1.png"; // Adjust the path for Next.js
import Ecologi from "@/app/assets/ecologi.png"; // Adjust the path for Next.js

const Footer: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <footer className="bg-[#212121] text-gray-400 md:py-8" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:py-10 pb-10 md:pb-0">
        <div
          className="grid grid-cols-1 md:grid-cols-5 gap-3"
          aria-label="Footer Sections"
        >
          {/* Logo Section */}
          <section
            aria-labelledby="footer-logo"
            className="sm:py-0 flex flex-col items-center md:items-start justify-center md:justify-start"
          >
            <Link href="/" aria-label="Go to Zextons Home">
              <Image
                src={Zextons}
                alt="Zextons Tech Store Logo"
                width={180}
                height={100}
                loading="lazy"
              />
            </Link>
          </section>

          {/* Useful Links */}
          <section aria-labelledby="useful-links">
            <h3 id="useful-links" className="text-white text-lg font-medium">
              Useful Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/blogs" className="hover:text-gray-200 text-sm">
                  Read Our Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/why-buying-a-refurbished-iphone-is-a-good-idea"
                  className="hover:text-gray-200 text-sm"
                  aria-label="Learn why buying a refurbished iPhone is a good idea"
                >
                  Why Buying Refurbished iPhone is Good Idea?
                </Link>
              </li>
              <li>
                <a
                  // href="https://sell.zextons.co.uk/"
                  className="hover:text-gray-200 text-sm"
                  aria-label="Sell your mobile phone on Zextons"
                >
                  Sell My Mobile Phone
                </a>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-gray-200 text-sm"
                  aria-label="Explore Buy Now Pay Later options"
                >
                  Buy Now Pay Later
                </Link>
              </li>
              <li>
                <Link
                  href="/customer-reviews"
                  className="hover:text-gray-200 text-sm"
                  aria-label="Customer Reviews for Zextons"
                >
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/recycle-mobile-phone"
                  className="hover:text-gray-200 text-sm"
                  aria-label="Recycle your mobile phone in bulk"
                >
                  Bulk Recycling
                </Link>
              </li>
              <li>
                <Link
                  href="/zexton-trade-in"
                  className="hover:text-gray-200 text-sm"
                  aria-label="Learn more about Zextons Trade-in services"
                >
                  Zextons Trade-in
                </Link>
              </li>
              <li>
                <Link
                  href="https://zextons.tawk.help/"
                  className="hover:text-gray-200 text-sm"
                  aria-label="Help Center"
                >
                  Zextons Help Center
                </Link>
              </li>
            </ul>
          </section>

          {/* Customer Care */}
          <section aria-labelledby="customer-care">
            <h3 id="customer-care" className="text-white text-lg font-medium">
              Customer Care
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-gray-200 text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-gray-200 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/deals-and-discounts"
                  className="hover:text-gray-200 text-sm"
                >
                  Deals & Discounts
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-and-return-policy"
                  className="hover:text-gray-200 text-sm"
                >
                  Returns & Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-policy"
                  className="hover:text-gray-200 text-sm"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-gray-200 text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-gray-200 text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about-zextons"
                  className="hover:text-gray-200 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/subscribe-newsletter"
                  className="hover:text-gray-200 text-sm"
                >
                  Subscribe Our Newsletter
                </Link>
              </li>
            </ul>
          </section>

          {/* Social Links */}
          <section aria-labelledby="social-links">
            <h3 id="social-links" className="text-white text-lg font-medium">
              Follow Us
            </h3>
            <ul className="mt-4 flex flex-wrap align-middle" role="list">
              {/* Twitter */}
              <li className="text-center mx-1">
                <a
                  href="https://twitter.com/zextons_uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-200 text-sm"
                  aria-label="Follow Zextons on Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.8em"
                    height="1.8em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 18.5C3.765 19.521 5.814 20 8 20c6.48 0 11.762-5.137 11.992-11.562L22 4.5l-3.354.5A4 4 0 0 0 16 4c-2.572 0-4.5 2.517-3.88 4.98c-3.552.23-6.771-1.959-8.633-4.875c-1.236 4.197-.09 9.251 3.013 12.366c0 1.176-3 1.878-4.5 2.029" />
                  </svg>
                </a>
              </li>
              {/* YouTube */}
              <li className="text-center mx-1">
                <a
                  href="https://www.youtube.com/channel/UCb5pBW9HkmUo7CjszeJwqqQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-200 text-sm"
                  aria-label="Visit Zextons YouTube Channel"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.8em"
                    height="1.8em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20.5c1.81 0 3.545-.179 5.153-.507c2.01-.41 3.014-.614 3.93-1.792c.917-1.179.917-2.532.917-5.238v-1.926c0-2.706 0-4.06-.917-5.238c-.916-1.178-1.92-1.383-3.93-1.792A26 26 0 0 0 12 3.5c-1.81 0-3.545.179-5.153.507c-2.01.41-3.014.614-3.93 1.792C2 6.978 2 8.331 2 11.037v1.926c0 2.706 0 4.06.917 5.238c.916 1.178 1.92 1.383 3.93 1.792c1.608.328 3.343.507 5.153.507" />
                    <path d="M15.962 12.313c-.148.606-.938 1.04-2.517 1.911c-1.718.947-2.577 1.42-3.272 1.237a1.7 1.7 0 0 1-.635-.317C9 14.709 9 13.806 9 12s0-2.709.538-3.144c.182-.147.4-.256.635-.317c.695-.183 1.554.29 3.272 1.237c1.58.87 2.369 1.305 2.517 1.911c.05.206.05.42 0 .626" />
                  </svg>
                </a>
              </li>
              {/* Instagram */}
              <li className="text-center mx-1">
                <a
                  href="https://www.instagram.com/zextons.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-200 text-sm"
                  aria-label="Follow Zextons on Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.8em"
                    height="1.8em"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      d="M3 11c0-3.771 0-5.657 1.172-6.828C5.343 3 7.229 3 11 3h2c3.771 0 5.657 0 6.828 1.172C21 5.343 21 7.229 21 11v2c0 3.771 0 5.657-1.172 6.828C18.657 21 16.771 21 13 21h-2c-3.771 0-5.657 0-6.828-1.172C3 18.657 3 16.771 3 13z"
                    />
                    <circle cx="16.5" cy="7.5" r="1.5" fill="currentColor" />
                    <circle cx="12" cy="12" r="3.5" stroke="currentColor" />
                  </svg>
                </a>
              </li>
              <li className="text-center mx-1">
                <a
                  href="https://www.tiktok.com/@zextons"
                  className="hover:text-gray-200 text-sm"
                  aria-label="Visit Zextons on Tiktok"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.8em"
                    height="1.8em"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      color="currentColor"
                    >
                      <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                      <path d="M10.536 11.008c-.82-.116-2.69.075-3.606 1.77s.007 3.459.584 4.129c.569.627 2.378 1.814 4.297.655c.476-.287 1.069-.502 1.741-2.747l-.078-8.834c-.13.973.945 3.255 4.004 3.525" />
                    </g>
                  </svg>
                </a>
              </li>
              {/* Facebook */}
              <li className="text-center mx-1">
                <a
                  href="https://www.facebook.com/zextonstechstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-200 text-sm"
                  aria-label="Visit Zextons Facebook Page"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.8em"
                    height="1.8em"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill="currentColor"
                      d="M22 12C22 6.477 17.523 2 12 2S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H7.898v-2.888h2.54V9.845c0-2.504 1.492-3.89 3.777-3.89c1.094 0 2.24.196 2.24.196v2.46h-1.263c-1.244 0-1.63.773-1.63 1.563v1.884h2.773l-.443 2.887h-2.33v6.99C18.343 21.128 22 16.991 22 12z"
                    />
                  </svg>
                </a>
              </li>
              <li className="text-center mx-1">
                <a
                  href="https://www.pinterest.co.uk/zextons"
                  className="hover:text-gray-200 text-sm"
                  aria-label="Visit Zextons on Pinterest"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.8em"
                    height="1.8em"
                    viewBox="0 0 15 15"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      d="m4.5 13.5l3-7m-3.236 3a2.989 2.989 0 0 1-.764-2V7A3.5 3.5 0 0 1 7 3.5h1A3.5 3.5 0 0 1 11.5 7v.5a3 3 0 0 1-3 3a2.081 2.081 0 0 1-1.974-1.423L6.5 9m1 5.5a7 7 0 1 1 0-14a7 7 0 0 1 0 14Z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </section>

          {/* Climate Impact */}
          <div>
            <h3 className="text-white text-lg font-medium">
              Our Climate Impact
            </h3>
            <div className="mt-4 text-white">
              <p>We plant a tree with every order</p>
              <a
                href="https://ecologi.com/zextons"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Ecologi to plant a tree"
              >
                <Image
                  src={Ecologi}
                  alt="Ecologi"
                  className="w-auto mt-4"
                  width={230}
                  height={200}
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4">
        <p className="text-center text-gray-400 text-sm">
          ZEXTONS TECH STORE © {new Date().getFullYear()} All Rights Reserved.
          Company Number: 10256988. Designed and Developed by{" "}
          <a
            href="http://Inflix.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Inflix website"
          >
            <u>Inflix</u>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
