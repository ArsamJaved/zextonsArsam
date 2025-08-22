import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import TopBar from "@/app/topbar/page"; // Adjust import paths as needed
import Nav from "@/app/components/navbar/Nav"; // Adjust import paths as needed
import Footer from "@/app/components/footer/footer"; // Adjust import paths as needed
import Image from "next/image";
import shipping from "@/app/assets/shipping.png";
const ShippingPolicy: FC = () => {
  return (
    <div>
      <Head>
        <title>Shipping Policy | Zextons</title>
        <meta name="description" content="Shipping Policy of Zextons" />
      </Head>
      <TopBar />
      <Nav />
      <div className="max-w-7xl mx-auto p-6">
        <nav className="mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">»</span>
          <span className="hover:underline">Shipping Policy</span>
        </nav>

        <div className="mb-8">
          <Image
            src={shipping}
            alt="Shipping Policy Banner"
            className="w-full h-auto"
          />
        </div>

        <div className="max-w-screen-xl mx-auto w-full">
          <h1 className="text-3xl font-bold mb-4 text-primary">
            Shipping Policy
          </h1>
          <section className="w-full">
            <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
              Fast &amp; Reliable Dispatch
            </h2>
            <p>
              At Zextons Tech Store, we understand that receiving your order
              swiftly is essential. That&apos;s why we offer same-day dispatch
              for orders placed and paid for before 3 PM on any regular business
              day (Monday through Friday, excluding bank/public holidays).
              Orders placed after 3 PM on Friday and over the weekend will be
              dispatched on the following Monday or the next working day. We
              prioritize efficient processing and preparation of your orders to
              ensure quick dispatch. Please note that our same-day dispatch is
              not available on bank holidays.
            </p>
          </section>
          <section className="w-full">
            <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
              Order Progress and Updates
            </h2>
            <p>
              We believe in keeping our customers informed every step of the
              way. After placing your order, you will receive regular email
              updates regarding its status. These updates will ensure you are
              always aware of your order&apos;s progress from dispatch through
              delivery. If you do not see these updates in your inbox, please
              check your Spam or Junk folder. Once the tracking details are
              available, you will receive an automated email with the tracking
              number and courier company details, allowing you to follow your
              order&apos;s journey to your doorstep.
            </p>
          </section>
          <section className="w-full">
            <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
              Complimentary Shipping and Delivery Times
            </h2>
            <p>
              Zextons Tech Store is pleased to offer free shipping on eligible
              orders, with an estimated delivery time of 1-3 working days. We
              strive to deliver your purchases as quickly and efficiently as
              possible, but delivery times may vary depending on your specific
              location and current safety measures. Rest assured, we work
              tirelessly to minimize any potential delays and deliver your order
              promptly.
            </p>
          </section>
          <section className="w-full">
            <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
              Expedited Next-Day Delivery
            </h2>
            <p>
              For those who need their order quickly, we offer a next-day
              delivery service. This option ensures that your order is
              prioritized and delivered on the next working day. Please be aware
              that while we do our best to meet these deadlines, occasionally,
              delivery times may be affected by factors beyond our control,
              including but not limited to Covid-19 restrictions and other
              unforeseen circumstances. Should any delays occur, we are
              committed to keeping you updated and will work diligently to get
              your order to you as quickly as possible.
            </p>
          </section>
          <section className="w-full">
            <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
              Choosing Your Delivery Partner
            </h2>
            <p>
              We use Royal Mail for most of our deliveries, known for their
              reliability and efficiency. In some cases, depending on the nature
              of the product or delivery area, we may also utilize other
              reputable carriers such as DPD and FedEx. This flexibility helps
              us ensure that your order arrives safely and on time.
            </p>
          </section>
          <section className="w-full">
            <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
              Tracking Your Order
            </h2>
            <p>
              Stay informed with our easy-to-use “Track Your Order” feature.
              After your order is dispatched, you will receive a link to
              real-time tracking information. This service allows you to monitor
              the delivery status of your order, providing peace of mind and
              transparency throughout the delivery process.
            </p>
          </section>
          <section className="w-full">
            <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
              Addressing Delays and Lost Parcels
            </h2>
            <p>
              If your parcel is delayed and you have chosen next-day delivery,
              we will refund the shipping cost. Please note that for orders with
              free shipping, no refund is made for delays. Should your parcel
              become lost or stuck in transit, we will issue a full refund after
              15 working days from the shipping date, ensuring that you are not
              disadvantaged by such rare occurrences.
            </p>
          </section>
          <section className="w-full">
            <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
              Damaged or Tampered Deliveries
            </h2>
            <p>
              If you notice that the package is damaged, tampered with, or
              resealed, please refuse the delivery and notify us immediately.
              This step is crucial in protecting you against any potential loss.
              If the package is accepted and later found to be compromised,
              please contact the courier company to document the issue, as this
              evidence is vital for any subsequent refund or replacement
              process. Please understand that accepting a compromised package
              without reporting it may impact our ability to resolve the issue
              effectively.
            </p>
          </section>
          <section className="w-full">
            <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
              Proof of Non-Delivery
            </h2>
            <p>
              In the unlikely event that your parcel is marked as “delivered”
              but has not been received, we require you to provide evidence of
              non-delivery within 10 days from the delivery date. Please contact
              the courier directly and forward their response to{" "}
              <a href="mailto:hello@zextons.co.uk">hello@zextons.co.uk</a>.
              Valid evidence is required to process a claim. Merely providing
              enquiry or complaint references is not sufficient. We strive to
              resolve these issues promptly once proper evidence is submitted.
            </p>
          </section>
          <section className="w-full">
            <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
              Customer Service Contact
            </h2>
            <p>
              For any queries or concerns about our shipping practices or your
              order, please feel free to reach out to us at{" "}
              <a href="mailto:hello@zextons.co.uk">hello@zextons.co.uk</a>. Our
              dedicated customer service team is here to assist you and ensure a
              seamless shopping experience.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
