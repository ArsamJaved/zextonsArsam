import Nav from "@/app/components/navbar/Nav";
import TopBar from "@/app/topbar/page";
import Footer from "@/app/components/footer/footer";
import React from "react";

export default function AboutZextons() {
  return (
    <div>
      <header className="relative">
        <TopBar />
        <Nav />
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-primary">
          About Zextons: Your Trusted Source for Refurbished Tech
        </h1>
        <p className="mb-4">
          {`At Zextons, we're passionate about making top-quality tech accessible
          to everyone, while also minimizing our environmental impact. We offer
          a wide selection of refurbished mobile devices, laptops, and video
          game consoles, all at competitive prices.`}
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
          Why Choose Refurbished?
        </h2>
        <p className="mb-4">
          {`Buying refurbished isn't just good for your wallet, it's good for the
          planet. By extending the life cycle of existing devices, we reduce
          electronic waste and its associated environmental burden.`}
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
          Quality You Can Trust
        </h2>
        <p className="mb-4">
          {` We understand the importance of peace of mind when buying refurbished
          tech. That's why we go above and beyond to ensure every device we sell
          meets our rigorous standards:`}
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong className="">Sourced Responsibly:</strong> We source our
            devices through trusted channels like buyback programs and reputable
            auction houses.
          </li>
          <li>
            {`<strong className="">Industry-Leading Testing:</strong> Each device
            undergoes a comprehensive diagnostic process using the market's most
            advanced software to guarantee functionality and identify any
            potential issues.`}
          </li>
          <li>
            {` <strong className="">Transparent Grading:</strong> We clearly
            categorize devices as either "Like New" (Grade A) or "Good" (Grade
            B) or “Fair” (Grade C) based on their cosmetic condition. All grades
            are fully functional and have an 18-month warranty and a 30-day
            return policy for your peace of mind.`}
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
          Experience the Zextons Difference
        </h2>
        <p className="mb-4">
          {`We've been in the business for 15 years, and our success is built on a
          commitment to exceptional service, quality products, and competitive
          prices. Our team of experts is passionate about technology and
          dedicated to helping you find the perfect device for your needs. `}
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
          {` Here's what sets us apart:`}
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            {` <strong className="">Consistent Supply & Quality:</strong> We have a
            reliable supply chain to ensure consistent availability of
            top-quality devices. `}
          </li>
          <li>
            {`<strong className="">Unmatched Customer Support:</strong> We
            prioritize customer satisfaction and offer dedicated support to
            assist you before, during, and after your purchase. `}
          </li>
          <li>
            {` <strong className="">Competitive Prices:</strong> Enjoy high-quality
            tech at budget-friendly prices.`}
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
          Ready to join the Zextons community?
        </h2>
        <p>
          {` Browse our extensive selection of refurbished devices and discover the
          perfect tech solution for you. We're confident you'll be impressed
          with the quality, affordability, and positive environmental impact of
          choosing Zextons.`}
        </p>
      </div>
      <Footer />
    </div>
  );
}
