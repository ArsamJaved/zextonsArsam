import Footer from '@/app/components/footer/footer';
import Nav from "@/app/components/navbar/Nav";
import TopBar from '@/app/topbar/page';
import Link from 'next/link';
import Image from 'next/image';
import tc from '@/app/assets/t&c.png';
import React from 'react'

export default function TermsandConditions() {
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
          <Link href="/terms-and-conditions" className="hover:underline">
            Terms and Conditions
          </Link>
        </nav>
        <div className="flex justify-between items-center bg-gray-200 p-5">
          <div className="text-primary">
            <span className="text-primary">Zextons</span> – Tech Store – 27
            Church Street | St Helens | WA10 1AX
          </div>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <g fill="green">
                <path d="M22 7.535V17a3 3 0 0 1-2.824 2.995L19 20H5a3 3 0 0 1-2.995-2.824L2 17V7.535l9.445 6.297l.116.066a1 1 0 0 0 .878 0l.116-.066z" />
                <path d="M19 4c1.08 0 2.027.57 2.555 1.427L12 11.797l-9.555-6.37a3 3 0 0 1 2.354-1.42L5 4z" />
              </g>
            </svg>
            <a
              href="mailto:hello@zextons.co.uk"
              className="text-primary hover:underline"
            >
              hello@zextons.co.uk
            </a>
          </div>
        </div>
        <div className="mb-8">
          <Image
            src={tc}
            alt="Terms and Conditions Banner"
            className="w-full h-auto"
          />
        </div>
        <section className="mb-8">
          <h2 className="text-2xl text-primary font-bold mb-4">
            Return Policy
          </h2>
          <p className="mb-4">
            <strong>Welcome to Zextons!</strong>
          </p>
          <p className="mb-4">
           {` Welcome to Zextons! These terms and conditions ("Terms") outline the
            rules for using our website located at &nbsp; `}
            <a
              href="https://zextons.co.uk/"
              className="text-primary hover:underline"
            >
              https://zextons.co.uk/&nbsp;
            </a>
            {` ("Website") . By accessing or using the Website, you agree to these
            Terms. If you don't agree, please don't use the Website `}
          </p>
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Our Content
            </h2>
            <p className="mb-4">
            {`  The content on this website, including text, images, and designs,
              is protected by copyright and intellectual property laws. You can
              access and use this content for personal, non-commercial purposes
              only. Copying, reproducing, distributing, or modifying this
              content without our written permission is strictly prohibited. `}
            </p>
          </section>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Comments</h2>
          <p className="mb-4">
          {`   We encourage users to post comments on our website. However, we
            reserve the right to monitor and remove any comments that are
            inappropriate, offensive, or violate these Terms. When you post a
            comment, you warrant that you have the right to do so and that the
            comment doesn't infringe on any third-party rights. You also grant
            us a non-exclusive license to use, reproduce, edit, and publish your
            comments. `}
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Linking to Us
          </h2>
          <p className="mb-4">
          {`   We welcome links to our website from other websites. However,
            linking should not imply sponsorship, endorsement, or approval of
            the linking party and its products or services. We reserve the right
            to request the removal of any link at our discretion. `}
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">User Content</h2>
          <p className="mb-4">
           {`   You are responsible for any content you post on our website ("User
            Content"). You warrant that you have the right to post User Content
            and that it doesn't infringe on any third-party rights. You also
            agree to indemnify and hold us harmless from any claims arising from
            your User Content.{" "} `}
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Disclaimer</h2>
          <p className="mb-4">
          {`     We use reasonable efforts to provide accurate information on the
            Website. However, we make no representations or warranties about the
            accuracy, completeness, or timeliness of the content. You use the
            Website at your own risk. We disclaim all liability for any loss or
            damage arising from your use of the Website.{" "} `}
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Limitation of Liability
          </h2>
          <p className="mb-4">
            To the maximum extent permitted by law, we exclude all warranties
            and liabilities (including negligence) that may arise from your use
            of the Website.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Order Cancellation
          </h2>
          <p className="mb-4">
            We reserve the right to cancel any order if we suspect suspicious
            activity.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Verification</h2>
          <p className="mb-4">
            In order to process your order, we may request proof of ID and proof
            of address for verification purposes.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Images</h2>
          <p className="mb-4">
            Please note that the images displayed on our website are for
            illustrative purposes only. The actual product you receive may
            differ slightly in color.{" "}
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Changes to the Terms
          </h2>
          <p className="mb-4">
            We may revise these Terms at any time. The revised Terms will be
            effective immediately upon posting on the Website. Your continued
            use of the Website after the revised Terms are posted constitutes
            your agreement to the revised Terms.{" "}
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Governing Law
          </h2>
          <p className="mb-4">
            These Terms are governed by and construed in accordance with the
            laws of England and Wales.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at
            hello@zextons.co.uk.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Return Policy
          </h2>
          <p className="mb-4">
          {` Our refund and returns policy last 30 days. If 30 days have passed
            since your purchase, we can't offer you a full refund or exchange. `}
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Eligibility for Return
          </h2>
          <ul className="mb-4 list-disc list-inside">
            <li>Unused item</li>
            <li>In the same condition as received</li>
            <li>Original packaging & accessories</li>
            <li>Receipt or proof of purchase</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Return Process
          </h2>
          <ol className="mb-4 list-decimal list-inside">
            <li>
              Email customer service at hello@zextons.co.uk to obtain a Return
              Merchandise Authorization (RMA) number.
            </li>
            <li>Securely pack the item in its original packaging.</li>
            <li>
              Ship the return to: Zextons – 27 Church Street | St Helens | WA10
              1AX
            </li>
            <li>
              You are responsible for return shipping costs and a trackable
              method is recommended.
            </li>
          </ol>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Before You Return
          </h2>
          <ul className="mb-4 list-disc list-inside">
            <li>Remove all security and parental locks</li>
            <li>Remove SIM cards and memory cards (if applicable)</li>
            <li>Sign out of your iCloud/Samsung/Google account</li>
            <li>Back up and remove any personal data from the device </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Before You Return
          </h2>
          <ul className="mb-4 list-disc list-inside">
            <li>Device with obvious signs of use</li>
            <li>Damaged or missing parts (not due to our error)</li>
            <li>Missing accessories or original packaging</li>
            <li>Items returned more than 30 days after delivery</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Full Return & Refund Policy
          </h2>
          <p className="mb-4">
            For detailed information on our full return and refund policy,
            please visit this{" "}
            <a
              href="https://zextons.co.uk/refund-and-return-policy"
              className="text-primary underline"
            >
              Link
            </a>
            .
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
