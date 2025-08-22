"use client";
import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";

// Custom Card Components
const CustomCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CustomCardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-6 pb-4 ${className}`}>{children}</div>;

const CustomCardTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2 className={`text-2xl font-bold text-gray-800 ${className}`}>
    {children}
  </h2>
);

const CustomCardDescription = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p
    className={`text-gray-700 text-[15px] leading-relaxed max-w-3xl ${className}`}
  >
    {children}
  </p>
);

const CustomCardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-6  ${className}`}>{children}</div>;

// Custom Accordion Components
const CustomAccordion = ({
  children,
  type = "single",
  collapsible = true,
  className = "",
}: {
  children: React.ReactNode;
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
}) => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (value: string) => {
    if (type === "single" && collapsible) {
      setOpenItem(openItem === value ? null : value);
    } else if (type === "multiple") {
      // For multiple, you'd manage an array of open items
      // This example only supports single for simplicity
    }
  };
  return (
    <div className={`w-full ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === CustomAccordionItem) {
          return React.cloneElement(child as React.ReactElement<{
            isOpen: boolean;
            onToggle: () => void;
          }>, {
            isOpen: openItem === child.props.value,
            onToggle: () => toggleItem(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
};

const CustomAccordionItem = ({
  children,
  value,
  isOpen,
  onToggle,
  className = "",
}: {
  children: React.ReactNode;
  value: string;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}) => (
  <div className={`border-b border-gray-200 ${className}`}>
    {React.Children.map(children, (child) => {
      if (
        React.isValidElement(child) &&
        (child.type === CustomAccordionTrigger ||
          child.type === CustomAccordionContent)
      ) {
        return React.cloneElement(child as React.ReactElement<{
          isOpen: boolean;
          onToggle: () => void;
        }>, { isOpen, onToggle });
      }
      return child;
    })}
  </div>
);

const CustomAccordionTrigger = ({
  children,
  isOpen,
  onToggle,
  className = "",
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}) => (
  <button
    className={`flex items-center justify-between w-full py-4 text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors duration-200 ${className}`}
    onClick={onToggle}
    aria-expanded={isOpen}
  >
    {children}
    <svg
      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      }`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
);

const CustomAccordionContent = ({
  children,
  isOpen,
  className = "",
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  className?: string;
}) => (
  <div
    className={`overflow-hidden transition-all duration-300 ease-in-out ${
      isOpen ? "max-h-screen opacity-100 py-2" : "max-h-0 opacity-0"
    }`}
  >
    <div
      className={`pb-4 text-gray-700 text-[15px] leading-relaxed max-w-3xl ${className}`}
    >
      {children}
    </div>
  </div>
);

// Custom Icons (SVG)
const CheckCircleIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-5 h-5 text-green-600 ${className}`}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-8.5" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const MailIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-5 h-5 text-green-600 ${className}`}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-5 h-5 text-green-600 ${className}`}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-1.18 2.19l-.7.35a18.76 18.76 0 0 0 6 6l.35-.7a2 2 0 0 1 2.19-1.18 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ClockIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-5 h-5 text-green-600 ${className}`}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const StarIcon = ({ className = "", fill = "none" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-4 h-4 ${className}`}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// New custom icons for features
const ShieldCheckIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-5 h-5 text-green-600 ${className}`}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const TruckIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-5 h-5 text-green-600 ${className}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M19.5 17.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m-10 0a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0" />
      <path d="M14.5 17.5h-5m10 0h.763c.22 0 .33 0 .422-.012a1.5 1.5 0 0 0 1.303-1.302c.012-.093.012-.203.012-.423V13a6.5 6.5 0 0 0-6.5-6.5M2 4h10c1.414 0 2.121 0 2.56.44C15 4.878 15 5.585 15 7v8.5M2 12.75V15c0 .935 0 1.402.201 1.75a1.5 1.5 0 0 0 .549.549c.348.201.815.201 1.75.201M2 7h6m-6 3h4" />
    </g>
  </svg>
);

const GiftIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-5 h-5 text-green-600 ${className}`}
  >
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v9" />
    <path d="M5 12v9" />
    <path d="M22 8H2" />
    <path d="M12 8V2H7a2 2 0 0 0-2 2v4" />
    <path d="M12 8V2h5a2 2 0 0 1 2 2v4" />
  </svg>
);

const HeadphonesIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-5 h-5 text-green-600 ${className}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M11 21v-2h8v-7.1q0-2.925-2.037-4.962T12 4.9T7.038 6.938T5 11.9V18H2v-5.725h1l.075-1.325q.2-1.7.988-3.15t1.975-2.525T8.762 3.6T12 3t3.225.6t2.725 1.663t1.975 2.512t1 3.15l.075 1.35h1V18h-1v3zm-2-7q-.425 0-.712-.288T8 13t.288-.712T9 12t.713.288T10 13t-.288.713T9 14m6 0q-.425 0-.712-.288T14 13t.288-.712T15 12t.713.288T16 13t-.288.713T15 14m-8.975-1.55Q5.85 9.8 7.625 7.9T12.05 6q2.225 0 3.913 1.412T18 11.026Q15.725 11 13.813 9.8t-2.938-3.25q-.4 2-1.687 3.563T6.025 12.45"
    />
  </svg>
);

const LockIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-5 h-5 text-green-600 ${className}`}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

interface WelcomeSectionData {
  title: string;
  content: string[];
  type?:
    | "default"
    | "features"
    | "categories"
    | "grading"
    | "testimonials"
    | "faqs"
    | "contact";
}

interface FAQ {
  question: string;
  answer: string;
}

interface DetailedTestimonial {
  reviewer: string;
  initials: string;
  reviewsCount: number;
  location: string;
  rating: number;
  timeAgo: string;
  reviewText: string;
  date: string;
  reply?: {
    text: string;
    email?: string;
    website?: string;
  };
}

// Helper function to get the appropriate icon for a feature
const getFeatureIcon = (feature: string) => {
  if (feature.includes("Warranty")) {
    return <>🛡️</>;
  }
  if (feature.includes("Delivery")) {
    return <>🚚</>;
  }
  if (feature.includes("Protection Bundle")) {
    return <>🎁</>;
  }
  if (feature.includes("Support")) {
    return <>🎧</>;
  }
  if (
    feature.includes("Secure Checkout") ||
    feature.includes("Trusted Reviews")
  ) {
    return <>🔒</>;
  }
  return <CheckCircleIcon />; // Default icon if no specific match
};

const ZextonsWelcome: React.FC = () => {
  const welcomeData: WelcomeSectionData[] = [
    {
      title: "Welcome to Zextons – Your Trusted Tech Store in the UK",
      content: [
        "Looking for high-quality refurbished phones, tablets, and tech accessories? At Zextons, we offer expertly tested, warranty-backed devices at unbeatable prices — with next-day delivery and 5-star service you can rely on.",
      ],
      type: "default",
    },
    {
      title: "Why Choose Zextons?",
      content: [
        "18-Month Warranty on all refurbished devices",
        "Free UK Next-Day Delivery",
        "Free Protection Bundle with screen protector & case",
        "Expert UK-Based Support",
        "Secure Checkout & Trusted Reviews",
      ],
      type: "features",
    },
    {
      title: "Refurbished Devices, Graded by Experts",
      content: [
        "We sell brand new and refurbished tech with transparent grading:",
        "Brand New – Sealed, unused, full warranty",
        "Refurbished – Excellent – Like-new condition",
        "Refurbished – Good – Light wear, fully tested",
        "Refurbished – Fair – Visible marks, 100% functional",
      ],
      type: "grading",
    },
  ];

  const testimonials: DetailedTestimonial[] = [
    {
      reviewer: "Stephen Dawes",
      initials: "SD",
      reviewsCount: 6,
      location: "GB",
      rating: 5,
      timeAgo: "5 days ago",
      reviewText:
        "Phone Arrived within the delivery time, Also came with a cover and screen protector, customer service was prompt when answering a query.",
      date: "30 July 2025",
      reply: {
        text: "Thank you for the great feedback! 😊 We're glad your phone arrived on time and that you appreciated the free case and screen protector. It's also great to hear our team was able to assist you promptly — we're always happy to help!",
        email: "hello@zextons.co.uk",
        website: "zextons.co.uk",
      },
    },
    {
      reviewer: "Peter O'Gorman",
      initials: "PO",
      reviewsCount: 16,
      location: "GB",
      rating: 5,
      timeAgo: "A day ago",
      reviewText:
        "Perfect service, good value for money, delivered on time, would use again rather than mainstream retailers. Nice to have screen protector and case included!",
      date: "3 August 2025",
    },
    {
      reviewer: "Colin shepherd",
      initials: "CS",
      reviewsCount: 6,
      location: "GB",
      rating: 5,
      timeAgo: "18 hours ago",
      reviewText:
        "Ordered on a Sunday at 1600hrs. Delivered Tuesday at 1200hrs. Tracked parcel with signature required.Excellent service with a great price. Included a phone cover and screen glass. Would definitely to buy again from Zextons.",
      date: "3 August 2025",
    },
    {
      reviewer: "Paul hunt",
      initials: "PH",
      reviewsCount: 24,
      location: "GB",
      rating: 5,
      timeAgo: "31 Jul 2025",
      reviewText:
        "Great service 24hr from order to delivery Great price £125 cheaper than Apple plus got a free screen protector and case so could use phone straight away Very well packed",
      date: "28 July 2025",
      reply: {
        text: "Thank you so much for the fantastic feedback! 🙌 We're thrilled to hear your order arrived within 24 hours and that you're happy with the savings, packaging, and free extras. Enjoy your new device — and we're always here if you need us again!",
      },
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "What kind of warranty do you offer?",
      answer:
        "All refurbished devices come with an 18-month warranty. Brand new items follow manufacturer warranty terms.",
    },
    {
      question: "Are Zextons devices unlocked?",
      answer:
        "Yes! All phones and tablets sold by Zextons are unlocked and SIM-free, ready to use with any UK network.",
    },
    {
      question: "Is next-day delivery really free?",
      answer:
        "Absolutely. Orders placed before our cut-off time qualify for free UK next-day delivery.",
    },
    {
      question: "Do I need an account to order?",
      answer:
        "Yes, creating an account ensures secure checkout and helps you track your order and warranty.",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = () => {
      emblaApi.scrollNext();
    };

    const interval = setInterval(autoplay, 3000); // Autoplay every 3 seconds

    return () => clearInterval(interval);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const renderSection = (section: WelcomeSectionData, index: number) => {
    switch (section.type) {
      case "features":
        return (
          <CustomCard key={index} className="mb-12">
            <CustomCardHeader>
              <CustomCardTitle className="text-2xl font-bold text-gray-800">
                {section.title}
              </CustomCardTitle>
            </CustomCardHeader>
            <CustomCardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.content.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                  >
                    {getFeatureIcon(feature)}
                    <span className="text-gray-800 font-medium text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </CustomCardContent>
          </CustomCard>
        );
      case "grading":
        return (
          <CustomCard key={index} className="mb-12">
            <CustomCardHeader>
              <CustomCardTitle className="text-2xl font-bold text-gray-900">
                {section.title}
              </CustomCardTitle>
              <CustomCardDescription className="text-gray-700 text-[15px] leading-relaxed max-w-3xl">
                {section.content[0]}
              </CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent>
              <div className="space-y-3">
                {section.content.slice(1).map((grade, idx) => {
                  const [title, description] = grade.split(" – ");
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                    >
                      <CheckCircleIcon className="mt-1 flex-shrink-0" />
                      <div>
                       
                        {description && (
                          <span className="font-semibold text-gray-900">
                            {" "}
                            – {description}
                          </span>
                        )}
                         <span className="text-gray-600 pl-2">
                          ({title})
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4">
                <Link
                  href="/grading-guide"
                  className="text-green-600 hover:underline font-medium text-sm"
                >
                  See full grading guide
                </Link>
              </div>
            </CustomCardContent>
          </CustomCard>
        );
      case "categories": // This type is not used in the provided data, but keeping the structure for completeness
        return (
          <CustomCard key={index} className="mb-12">
            <CustomCardHeader>
              <CustomCardTitle className="text-[28px] sm:text-[36px] font-semibold text-gray-800">
                {section.title}
              </CustomCardTitle>
              <CustomCardDescription className="text-gray-700 text-[15px] leading-relaxed max-w-3xl">
                {section.content[0]}
              </CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.content.slice(1).map((category, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <span className="text-gray-800 font-medium text-sm">
                      {category}
                    </span>
                  </div>
                ))}
              </div>
            </CustomCardContent>
          </CustomCard>
        );
      default:
        return (
          <section key={index} className="mb-12">
            <h1 className="text-3xl font-bold text-gray-800 text-left mb-6">
              {section.title}
            </h1>
            {section.content.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-left text-gray-700 text-[16px] leading-relaxed max-w-7xl mb-4"
              >
                {paragraph}
              </p>
            ))}
          </section>
        );
    }
  };

  return (
    <div className="sm:container sm:mx-auto">
      {welcomeData.map((section, index) => renderSection(section, index))}

      {/* Testimonials */}
      <CustomCard className="mb-12">
        <CustomCardHeader>
          <CustomCardTitle className="text-2xl font-bold text-gray-900">
            Why Customers Love Zextons
          </CustomCardTitle>
        </CustomCardHeader>
        <CustomCardContent>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {" "}
                {/* embla__container */}
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="flex-none min-w-0 pl-4 w-full">
                    {" "}
                    {/* embla__slide */}
                    <CustomCard className="shadow-sm hover:shadow-md transition h-full flex flex-col">
                      <CustomCardContent className="p-6 flex-grow">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm mr-3">
                            {testimonial.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {testimonial.reviewer}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`text-green-500 ${
                                i < testimonial.rating
                                  ? "fill-green-500"
                                  : "fill-muted stroke-muted-foreground"
                              }`}
                              fill={
                                i < testimonial.rating ? "currentColor" : "none"
                              }
                            />
                          ))}
                          <span className="text-green-600 font-semibold text-sm ml-1">
                            Verified
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2">
                          {testimonial.reviewText.split(",")[0]}{" "}
                          {/* Assuming first part is the title */}
                        </h3>
                        <p className="text-gray-800 text-[15px] mb-4">
                          {testimonial.reviewText}
                        </p>
                      </CustomCardContent>
                    </CustomCard>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 disabled:opacity-50"
              onClick={scrollPrev}
              disabled={!emblaApi || emblaApi.selectedScrollSnap() === 0}
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 disabled:opacity-50"
              onClick={scrollNext}
              disabled={
                !emblaApi ||
                emblaApi.selectedScrollSnap() ===
                  emblaApi.scrollSnapList().length - 1
              }
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </CustomCardContent>
      </CustomCard>

      {/* FAQs */}
      <CustomCard className="mb-12">
        <CustomCardHeader>
          <CustomCardTitle className="text-2xl font-bold text-gray-800">
            FAQs – Zextons at a Glance
          </CustomCardTitle>
        </CustomCardHeader>
        <CustomCardContent>
          <CustomAccordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <CustomAccordionItem key={index} value={`item-${index}`}>
                <CustomAccordionTrigger>{faq.question}</CustomAccordionTrigger>
                <CustomAccordionContent>{faq.answer}</CustomAccordionContent>
              </CustomAccordionItem>
            ))}
          </CustomAccordion>
        </CustomCardContent>
      </CustomCard>

      {/* Contact */}
      <CustomCard className="mb-12">
        <CustomCardHeader>
          <CustomCardTitle className="text-2xl font-bold text-gray-900">
            Get in Touch
          </CustomCardTitle>
          <CustomCardDescription className="text-gray-700 text-[15px] leading-relaxed max-w-3xl">
            Questions? We're here to help.
          </CustomCardDescription>
        </CustomCardHeader>
        <CustomCardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <CustomCard className="text-center p-4">
              <CustomCardContent className="p-0">
                <h3 className="flex justify-center items-center gap-2 font-semibold text-gray-900 mb-2 text-xl">
                  <MailIcon /> Email
                </h3>
                <Link
                  href="mailto:hello@zextons.co.uk"
                  className="text-green-600 hover:underline text-sm"
                >
                  hello@zextons.co.uk
                </Link>
              </CustomCardContent>
            </CustomCard>
            <CustomCard className="text-center p-4">
              <CustomCardContent className="p-0">
                <h3 className="flex justify-center items-center gap-2 font-semibold text-gray-900 mb-2 text-xl">
                  <PhoneIcon /> Phone
                </h3>
                <Link
                  href="tel:03333448541"
                  className="text-green-600 hover:underline text-sm"
                >
                  0333 344 8541
                </Link>
              </CustomCardContent>
            </CustomCard>
            <CustomCard className="text-center p-4">
              <CustomCardContent className="p-0">
                <h3 className="flex justify-center items-center gap-2 font-semibold text-gray-900 mb-2 text-xl">
                  <ClockIcon /> Hours
                </h3>
                <p className="text-gray-700 text-sm">Mon–Fri, 10am–6pm</p>
              </CustomCardContent>
            </CustomCard>
          </div>
        </CustomCardContent>
      </CustomCard>
    </div>
  );
};

export default ZextonsWelcome;
