import React from "react";
import Footer from "@/app/components/footer/footer";
import Link from "next/link";
import TopBar from "@/app/topbar/page";
import Nav from "@/app/components/navbar/Nav";
export default function ZextonsTradeIn() {
  return (
    <>
      <header className="relative">
        <TopBar />
        <Nav />
      </header>
      <div className="max-w-7xl mx-auto p-6">
        <nav className="mb-4 text-sm text-gray-600">
          <Link href={"/"} className="hover:underline">
            Home
          </Link>
          <span className="mx-2">»</span>
          <Link href="/zexton-trade-in" className="hover:underline">
            Trade in
          </Link>
        </nav>
        <div className="">
          <h1 className="text-2xl text-primary font-bold mb-4">
            Trade in Your Old Device and Get a Discount on a New One
          </h1>
          <p className="text-muted-foreground mb-6">
            At <span className="font-semibold text-primary">Zextons</span>,
            {`we're excited to introduce our innovative Trade-In program. Use our
            tool above to estimate the value of your old device before deciding
            to upgrade. Simply provide details about the brand, model, and
            condition of your device, and our tool will calculate its current
            market value. `}
          </p>
          <h2 className="text-2xl text-primary font-bold mb-4">
            Why Choose ZextonsTrade-In?
          </h2>
          <p className="text-muted-foreground mb-4">
            {` Our generous trade-in policies make upgrading to cutting-edge
            gadgets like the Samsung Galaxy S22 or Apple iPhone 14 more
            affordable. When you trade in your device with
            <span className="font-semibold text-primary">Zextons</span>, the
            value of your trade-in is deducted from your total purchase, giving
            you an instant discount. Plus,
            <span className="font-semibold text-primary">Zextons</span> is the
            only company that buys back devices with broken screens, so don't
            let that damage go unnoticed. Beyond smartphones, we also buy and
            sell Galaxy tablets, watches, headphones, and select gadgets from
            other brands. `}
          </p>

          <h2 className="text-2xl text-primary font-bold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside text-muted-foreground mb-4">
            <li className="py-1">
              {` Estimate Your Trade-In Value: Use the pop-up tool to answer
              questions about your device's brand, model, and condition. `}
            </li>
            <li className="py-1">
              {`Get an Instant Quote: If you accept the trade-in estimate, you'll
              receive immediate credit or a discount on a new device by agreeing
              to the terms and conditions. `}
            </li>
            <li className="py-1">
              {`Send Us Your Device: If you accept the online estimate when
              purchasing a new device, we'll coordinate the shipping of your old
              device to us. `}
            </li>
            <li className="py-1">
              {` Receive Your New Device: Once we inspect your old device and
              everything is in order, we'll send your new device to you. This
              process typically takes about two to three days. `}
            </li>
          </ol>

          <h2 className="text-2xl text-primary font-bold mb-4">
            Trade-In Eligible Devices
          </h2>
          <p className="text-muted-foreground mb-4">
            You can trade in refurbished phones (iPhone, Samsung Galaxy,
            Xiaomi), iPads, game consoles, and smartwatches.
          </p>

          <h2 className="text-2xl text-primary font-bold mb-4">
            Track Your Order
          </h2>
          <p className="text-muted-foreground mb-4">
            Track your trade-in device through our online portal.
          </p>

          <h2 className="text-2xl text-primary font-bold mb-4">
            Cancellation Policy
          </h2>
          <p className="text-muted-foreground mb-4">
            {` You can cancel your trade-in if you haven't already sent or dropped
            off your old device. No cancellations will be accepted once we have
            received your device for trade-in. If the final offer is less than
            the initial estimate, you have the option to decline the revised
            offer. `}
          </p>

          <h2 className="text-2xl text-primary font-bold mb-4">
            Your Device Not Listed?
          </h2>
          <p className="text-muted-foreground mb-4">
            If your device is not listed in our trade-in section, don’t worry!
            Email us at{" "}
            <a
              href="mailto:sell@zextons.co.uk"
              className="text-primary underline"
            >
              {" "}
              sell@zextons.co.uk
            </a>{" "}
            for a quote or visit our buy-back website.
          </p>

          <h2 className="text-2xl text-primary font-bold mb-4">
            Additional Terms and Conditions
          </h2>
          <ol className="list-decimal list-inside text-muted-foreground mb-4">
            <li className="py-1">
              Eligibility: Devices must meet our criteria for brand, model, and
              condition to qualify for trade-in. Devices with significant damage
              other than a broken screen may not be eligible.
            </li>
            <li className="py-1">
              Ownership: You must be the legal owner of the device you are
              trading in. Stolen or counterfeit devices are not accepted.
            </li>
            <li className="py-1">
              Data Security: Ensure all personal data is removed from your
              device before sending it to us. Zextons is not responsible for any
              data left on the device.
            </li>
            <li className="py-1">
              Inspection: All trade-ins are subject to an inspection upon
              receipt. If the device condition does not match the information
              provided, the trade-in value may be adjusted.
            </li>
            <li className="py-1">
              Payment: Trade-in credits can only be applied toward the purchase
              of new devices from Zextons. No cash payments will be made.
            </li>
            <li className="py-1">
              Shipping: You are responsible for shipping your device to us. We
              recommend using a tracked and insured shipping method.
            </li>
            <li className="py-1">
              Trade-In Rejection: If your device is found to be ineligible
              during inspection, it will be returned to you at no additional
              cost.
            </li>
            <li className="py-1">
              Offer Validity: Trade-in offers are valid for 14 days from the
              date of issuance. If the trade-in is not completed within this
              timeframe, a new estimate may be required.
            </li>
            <li className="py-1">
              Device Condition: Devices must be in working order except for
              noted damage (e.g., broken screen). Devices that do not power on,
              have water damage, or are otherwise non-functional may not
              qualify.
            </li>
            <li className="py-1">
              Multiple Trade-Ins: Zextons reserves the right to limit the number
              of devices traded in by a single customer.
            </li>
          </ol>
        </div>
      </div>
      <Footer />
    </>
  );
}
