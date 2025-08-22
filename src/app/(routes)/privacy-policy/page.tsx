'use client'
import Footer from '@/app/components/footer/footer';
import Nav from "@/app/components/navbar/Nav";
import TopBar from '@/app/topbar/page';
import pp from '@/app/assets/p&p.png';
import Image from 'next/image';
import Link from 'next/link';
export default function PrivacyPolicyPage() {
  return (
    <>
      <header className="relative">
        <TopBar />
        <Nav />
      </header>
      <div className="max-w-7xl mx-auto p-6">
        <nav className="mb-4 text-sm text-gray-600">
          <Link
            href={"/"}
            className="hover:underline"
            aria-label="Go to Zextons Home"
          >
            Home
          </Link>
          <span className="mx-2">»</span>
          <Link
            href="/privacy-policy"
            className="hover:underline"
            aria-label="Read our detailed Privacy Policy page"
          >
            Privacy Policy
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
            </svg>{" "}
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
            src={pp}
            alt="Terms and Conditions Banner"
            className="w-full h-auto"
          />
        </div>
        <section className="mb-8">
          <h2 className="text-2xl text-primary font-bold mb-4">
            Privacy Policy
          </h2>
          <p className="mb-4">
            At Zextons, accessible from protecting the privacy of our visitors
            is a top priority. This Privacy Policy document outlines the types
            of information we collect and how we use it.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions or required information about our Privacy
            Policy, please contact us at hello@zextons.co.uk.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Scope of this Policy
          </h2>
          <p className="mb-4">
            This Privacy Policy applies to our online activities and is valid
            for visitors to our website regarding the information they share
            and/or that we collect on Zextons. It does not apply to any
            information collected offline or via channels other than this
            website.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Your Consent</h2>
          <p className="mb-4">
            By using our website, you consent to our Privacy Policy and agree to
            its terms.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Information We Collect
          </h2>
          <p>We collect information you provide directly when you:</p>
          <ul className="mb-4 list-disc list-inside">
            <li>Place an order</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact us</li>
            <li>Create an account</li>
            <li>
              Participate in surveys or feedback mechanisms (including
              Trustpilot)
            </li>
            <li>Sign up for text message marketing (using WhatsApp API)</li>
          </ul>
          <p>
            The information we collect may include your name, contact details
            (email, phone number), demographic information (such as preferences
            and interests), and any other details necessary for processing your
            orders, sending communications, or improving our services.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Information We Collect
          </h2>
          <p>
            We also collect certain information automatically when you visit our
            website. This includes:
          </p>
          <ul className="mb-4 list-disc list-inside">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Internet Service Provider (ISP)</li>
            <li>Referring/exit pages</li>
            <li>Date and time stamp</li>
            <li>Clickstream data (pages visited, links clicked)</li>
            <p>
              This information helps us analyze trends, administer the website,
              track user movement, and gather demographic information to enhance
              website functionality. This data is not linked to personally
              identifiable information.
            </p>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Cookies and Web Beacons
          </h2>
          <p>
            Like many websites, Zextons uses cookies to store information about
            visitor preferences and the pages accessed or visited. This
            information allows us to customize website content to match your
            preferences.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Analytics and Advertising Partners
          </h2>
          <p className="mb-4">
            We use analytics and advertising partners to help improve your
            experience and provide relevant advertisements:
          </p>
          <ul className="space-y-6">
            <li>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Google Analytics
              </h3>
              <p>
                We use Google Analytics to analyze website traffic and visitor
                behavior. Google Analytics may collect data via cookies and
                similar technologies. You can read about Google’s data practices
                in{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                  aria-label="Read Google’s detailed Privacy Policy for GDPR compliance"
                >
                  Google&apos;s Privacy Policy
                </a>
                .
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Facebook Meta
              </h3>
              <p>
                {`  We use Facebook’s Meta tools for targeted advertising and
                retargeting. Data collected may include your interactions with
                our website and is used for ad optimization.You can read about
                Facebook's `}
                <a
                  href="https://www.facebook.com/policy.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                  aria-label="Read Facebook's detailed Privacy Policy for GDPR compliance"
                >
                  Data Policy
                </a>
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Microsoft Clarity
              </h3>
              <p>
                {` Microsoft Clarity allows us to monitor and analyze user
                engagement on our website. This tool helps us improve
                functionality and user experience. You can read about
                Microsoft’s{" "} `}
                <a
                  href="https://privacy.microsoft.com/en-us/privacystatement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                  aria-label="Read Microsoft’s detailed Privacy Policy for GDPR compliance"
                >
                  Privacy Statement
                </a>
                .
              </p>
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Third-Party Advertising
          </h2>
          <p>
            In addition to the above, we partner with other advertising
            platforms (including Google, Bing, TikTok, Pinterest) to display ads
            across the web. These partners may use cookies and web beacons to
            collect browsing activity data. Please visit their websites for
            further information about their privacy practices.{" "}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Mailing Partners
          </h2>
          <p>
            We use Royal Mail, FedEx, and DPD to deliver your orders. We only
            share your name, delivery address, and order details with these
            partners for the purpose of fulfilling your order.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Newsletters</h2>
          <p>
            We send newsletters to customers who opt in. The information you
            provide for subscriptions (such as your email address) is used
            solely for these communications. You can unsubscribe from our
            newsletters at any time.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            WhatsApp Marketing
          </h2>
          <p>
            We use the WhatsApp API to send marketing messages to subscribers.
            You can opt out of receiving these messages by following the
            instructions provided in each message.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Order and Shipping Updates
          </h2>
          <p>
            We send emails and text messages with order updates, shipping
            details, and other relevant notifications related to your purchases
            to keep you informed and fulfill your orders.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Trustpilot Reviews
          </h2>
          <p>
            We request feedback from customers on Trustpilot. When you leave a
            review, some information (such as your username) may be shared with
            Trustpilot. Please refer to Trustpilot’s Privacy Policy for further
            information.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            {` Children's Information `}
          </h2>
          <p>
            We do not knowingly collect any personal identifiable information
            from children under the age of 13. If you believe your child has
            provided us with such information, please contact us, and we will
            promptly remove it from our records.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Visitor Comments
          </h2>
          <p>
            Visitor comments may be checked through automated or manual spam
            detection services.
          </p>
        </section>
        <h2 className="text-3xl font-bold text-primary mb-8">
          Your Data Protection Rights
        </h2>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            CCPA (California Consumer Privacy Act) Rights
          </h2>
          <p>California consumers have the right to:</p>
          <ul className="mb-4 list-disc list-inside">
            <li>
              Request disclosure of the categories and specific pieces of
              personal data collected about them.
            </li>
            <li>Request deletion of their personal data.</li>
            <li>
              Opt-out of the sale of their personal data (we do not sell your
              data).
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            GDPR (General Data Protection Regulation) Rights
          </h2>
          <p>You have the following data protection rights under GDPR:</p>
          <ul className="mb-4 list-disc list-inside">
            <li>
              Access - You have the right to request copies of your personal
              data.
            </li>
            <li>
              Rectification - You have the right to request that we correct any
              inaccurate information.
            </li>
            <li>
              Erasure - You have the right to request that we erase your
              personal data under certain conditions.
            </li>
            <li>
              Restriction - You have the right to request that we restrict the
              processing of your data under certain conditions.{" "}
            </li>
            <li>
              Objection - You can object to data processing under certain
              conditions.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Kelkoo Sales Tracking
          </h2>
          <p>
            We use Kelkoo Sales Tracking for campaign performance analysis.
            Kelkoo may collect user data such as device information and browsing
            interactions. This data helps us optimize our marketing strategies.
            For information, please review{" "}
            <a
              href="https://developers.kelkoogroup.com/app/documentation/navigate/_merchant/salesTrackingWS/_/_/GDPR"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
              aria-label="Read Kelkoo's detailed Privacy Policy for GDPR compliance"
            >
              {`  Kelkoo's Privacy Policy `}
            </a>
            You can opt out of Kelkoo tracking by adjusting your browser
            settings.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
