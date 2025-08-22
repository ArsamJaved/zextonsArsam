"use client";
import Link from "next/link";
import React, { useState } from "react";
import TopBar from "@/app/topbar/page";
import Nav from "@/app/components/navbar/Nav";
import Footer from "@/app/components/footer/footer";
import { Offer } from "../../../../types";

const offers = [
  {
    id: 0,
    title: "iPhone 16 Offer",
    desc: "Get Up to 7% Off",
    type: "Deal",
    expiry: "31 December 2024",
    link: "/products/apple-iphone-16-unlocked-brand-new-128gb-black-brand-new",
    emoji: "📱",
  },
  {
    id: 1,
    title: "Hand Picked Deals",
    desc: "Get Up to £10 Off",
    type: "Coupon",
    expiry: "Expire Soon",
    coupontext: "GIFT10",
    emoji: "🏷️",
  },
  {
    id: 2,
    title: "Boxing Day Gifts",
    desc: "Get Up to £10 Off",
    type: "Expired",
    expiry: "31 December 2024",
    coupontext: "GIFT10",
    emoji: "🥊",
  },
  {
    id: 3,
    title: "Christmas Deals",
    desc: "Get Up to 70% Off",
    type: "Expired",
    expiry: "26 December 2024",
    link: "/categories/Christmas-Deals",
    emoji: "🎄",
  },
  {
    id: 4,
    title: "Christmas Gifts",
    desc: "Get Up to £10 Off",
    type: "Expired",
    expiry: "26 December 2024",
    coupontext: "GIFT10",
    emoji: "🎄",
  },

  {
    id: 5,
    title: "Free Delivery on All Orders",
    desc: "All Order above £30",
    type: "Deal",
    expiry: "No Expiry",
    link: "/shopall",
    emoji: "🚚",
  },
  {
    id: 6,
    title: "Get 5% Off Your First Order",
    desc: "Subscribe to our Newsletter",
    type: "Coupon",
    expiry: "31 December 2025",
    link: "/subscribe-newsletter",
    emoji: "✉️",
  },
  {
    id: 7,
    title: "Get 10% Off Your Next Order",
    desc: "Halloween Offer",
    type: "Expired",
    expiry: "31 October 2024",
    emoji: "🎃",
  },
  {
    id: 8,
    title: "Free Protection Bundle",
    desc: "On All Refurbished Phones",
    type: "Deal",
    expiry: "No Expiry",
    link: "/shopall",
    emoji: "🛡️",
  },
  {
    id: 9,
    title: "Black Friday Offer",
    desc: "Get Up to 70% Off",
    type: "Expired",
    expiry: "30 November 2024",
    link: "/categories/Black-Friday-Deals",
    emoji: "🛍️",
  },
];
const faqs = [
  {
    question:
      "What is the difference between a discount code and a promotional voucher?",
    answer:
      "A discount code is entered during checkout for an instant reduction in price. A promotional voucher may have specific usage conditions.",
  },
  {
    question: "Can I use my code or voucher online or in-store?",
    answer:
      "Some codes can be used online only, while others are valid for in-store purchases. Check the terms of the voucher.",
  },
  {
    question: "What product(s) is my code or voucher valid on?",
    answer:
      "Your code is valid on selected products only. Review the eligible product list for more details.",
  },
  {
    question: "Can I use multiple voucher codes?",
    answer:
      "Typically, only one code can be used per transaction unless stated otherwise.",
  },
  {
    question: "Can I use the code on top of other offers?",
    answer:
      "It depends on the offer. Check the terms of the code for stacking eligibility.",
  },
  {
    question: "Why isn't my code or voucher working online?",
    answer:
      "Ensure the code is entered correctly and still valid. Some codes may have expired or have usage restrictions.",
  },
];
// Reusable FilterButton Component
const FilterButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md font-medium transition ${
      active
        ? "bg-primary text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    {label}
  </button>
);

// Reusable OfferCard Component

const OfferCard = ({ offer }: { offer: Offer }) => {
  const [isCopied, setIsCopied] = useState(false); // State to track if coupon is copied

  const handleCopy = async (coupontext: string) => {
    try {
      await navigator.clipboard.writeText(coupontext);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div
      className={`border rounded-lg p-6 flex justify-between items-center shadow-md ${
        offer.type === "Expired" ? "bg-gray-100" : "bg-white"
      }`}
    >
      {/* Emoji Section */}
      <div className="flex-shrink-0 text-4xl mr-4">{offer.emoji}</div>

      {/* Offer Details */}
      <div className="flex-grow">
        <h3 className="text-lg font-bold">{offer.title}</h3>
        <p className="text-gray-500 font-medium">{offer.desc}</p>
        <p className="text-sm text-gray-500 mt-2">Expires: {offer.expiry}</p>
      </div>

      {/* Button Section */}
      {offer.type === "Expired" ? (
        <button
          className="px-4 py-2 rounded-md font-medium shadow bg-gray-400 text-white cursor-not-allowed"
          disabled
        >
          Expired
        </button>
      ) : offer.type === "Coupon" && offer?.coupontext ? (
        <button
          className="px-4 py-2 rounded-md font-medium shadow bg-primary text-white hover:bg-secondary-dark relative"
          onClick={() => handleCopy(offer.coupontext!)}
        >
          {isCopied ? "Copied!" : offer.coupontext}
        </button>
      ) : offer.type === "Coupon" && offer.link ? (
        <a
          href={offer.link} // Cleaned URL
          className="px-4 py-2 rounded-md font-medium shadow bg-primary text-white hover:bg-primary-dark"
        >
          USE COUPON
        </a>
      ) : offer.link && offer.link ? (
        <Link
          href={offer.link}
          className="px-4 py-2 rounded-md font-medium shadow bg-primary text-white hover:bg-primary-dark"
        >
          GET DEAL
        </Link>
      ) : offer.link ? (
        <a
          href={offer.link} // Cleaned URL
          className="px-4 py-2 rounded-md font-medium shadow bg-primary text-white hover:bg-primary-dark"
        >
          GET DEAL
        </a>
      ) : null}
    </div>
  );
};
export default function DealsAndDiscounts() {
  const [filter, setFilter] = useState<string>("All");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleFilter = (type: string) => {
    setFilter(type);
  };

  const filteredOffers =
    filter === "All" ? offers : offers.filter((offer) => offer.type === filter);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(
      (prevOpenFAQ: number | null) =>
        (prevOpenFAQ === index ? null : index) as number | null
    );
  };
  // const handleCopy = (code: string) => {
  //   navigator.clipboard.writeText(code);
  //   alert(`Promo code ${code} copied to clipboard!`);
  // };

  return (
    <>
      <header className="relative">
        <TopBar />
        <Nav />
      </header>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4 text-sm">
        <nav>
          <Link
            href={"/"}
            className="hover:underline"
            aria-label="Go to Zextons Home"
          >
            Home
          </Link>
          <span className="mx-2">»</span>
          <Link
            href={"/"}
            className="hover:underline"
            aria-label="Go to Zextons Home"
          >
            Home
          </Link>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Deals & Discounts
        </h1>
        <p className="text-lg md:text-xl">
          The latest promo codes and offers at Zextons and how to use them.
        </p>
      </div>

      {/* Filtering Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold mb-6">
          Next Discount Code, Coupons, and Promo Codes
        </h2>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-6">
          {["All", "Deal", "Coupon", "Expired"].map((type) => (
            <FilterButton
              key={type}
              label={type}
              active={filter === type}
              onClick={() => handleFilter(type)}
            />
          ))}
        </div>

        {/* Filtered Offers */}
        <div className="grid grid-cols-1 gap-6">
          {filteredOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>
      {/* How-To Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold mb-6">
          How to Use Our Online Discount Codes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-semibold text-lg">Step 1</h3>
            <h3 className="font-semibold text-lg">
              Step 1 : Browse and Add Items to Your Cart
            </h3>
            <p className="text-gray-600 mt-2">
              {` Look out for codes across our site, browse the complete list of
              active codes below or check your email for promotional vouchers.
              Start by shopping on our website and adding the items you wish to
              purchase to your shopping cart. When you're ready to checkout,
              click on the cart icon at the top right of the page to view your
              items. `}
            </p>
          </div>
          <div>
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="font-semibold text-lg">Step 2</h3>
            <h3 className="font-semibold text-lg">
              Step 2 : Enter Your Discount Code at Checkout
            </h3>
            <p className="text-gray-600 mt-2">
              {`  Check T&Cs to see how the code works. Browse eligible products,
              add them to your basket and head to checkout when ready. Once
              you're on the checkout page, you'll see a section labeled
              "Discount Code" or "Promo Code." Simply enter your unique discount
              code in the box provided. `}
            </p>
          </div>
          <div>
            <div className="text-4xl mb-4">✅</div>
            <h3 className="font-semibold text-lg">Step 3</h3>
            <h3 className="font-semibold text-lg">
              {` Step 3:Apply and Enjoy Your Discount `}
            </h3>
            <p className="text-gray-600 mt-2">
              {`  Select home delivery, or find your nearest Argos store or
              collection point. Enter the code on the payment page, click
              'Apply' and pay online. After entering your code, click the
              "Apply" button to activate the discount. You'll see the updated
              price reflecting the discount. Proceed with your payment to
              complete the order. `}
            </p>
          </div>
          <div>
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="font-semibold text-lg">Step 4</h3>
            <h3 className="font-semibold text-lg">
              {` Step 4 : We’ll Deliver to Your Door in a Timely Manner`}
            </h3>
            <p className="text-gray-600 mt-2">
              {`  We’ll deliver to you, or you can collect your order from your
              chosen Argos store or collection point. After completing your
              purchase, sit back and relax! We’ll handle the rest and ensure
              your items are delivered directly to your doorstep in a timely
              manner. `}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold mb-6">Frequently asked questions</h2>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-4">
              <button
                className="w-full text-left flex justify-between items-center text-lg font-semibold text-gray-900"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span>{openFAQ === index ? "−" : "+"}</span>
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  openFAQ === index ? "max-h-screen" : "max-h-0"
                }`}
              >
                <p className="mt-2 text-gray-600 text-base font-medium">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </>
  );
}
