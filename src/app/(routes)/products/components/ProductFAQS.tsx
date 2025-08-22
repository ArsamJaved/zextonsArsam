import dynamic from "next/dynamic";
import {
  Disclosure,
  Transition,
  Dialog,
  DialogTitle,
  DialogPanel,
  DisclosurePanel,
  DisclosureButton,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";

export default function ProductFAQS({
  openFAQs,
  setOpenFAQs,
}: {
  openFAQs: boolean;
  setOpenFAQs: (open: boolean) => void;
}) {
  const faqs = [
    {
      question: "What is the difference between used, refurbished, and brand new phones?",
      answer: `
        <ul class="list-disc list-inside space-y-1">
          <li><strong>Used phones:</strong> Pre-owned devices sold as-is, usually with minimal testing or repairs.</li>
          <li><strong>Refurbished phones:</strong> Professionally tested, repaired (if needed), cleaned, and restored to full working condition. They may come with a warranty.</li>
          <li><strong>Brand new phones:</strong> Factory-sealed, never used, and come with a full manufacturer warranty.</li>
        </ul>
      `,
    },
    {
      question: "Are your refurbished phones tested before sale?",
      answer: `
        <p>Yes, all our refurbished phones go through a thorough <strong>30+ point inspection</strong> to ensure they are fully functional, checking battery health, screen responsiveness, cameras, charging ports, and more.</p>
      `,
    },
    {
      question: "Do your phones come with a warranty?",
      answer: `
        <ul class="list-disc list-inside space-y-1">
          <li><strong>Brand new phones:</strong> Come with a standard manufacturer warranty.</li>
          <li><strong>Refurbished phones:</strong> Typically come with an 18-month warranty.</li>
          <li><strong>Used phones:</strong> May or may not include a limited warranty—please refer to the individual product listing.</li>
        </ul>
      `,
    },
    {
      question: "What condition are the used phones in?",
      answer: `<p>We clearly list the condition of each used phone (e.g., Fair, Good, Excellent). All used phones are tested for functionality, but may show signs of cosmetic wear.</p>`,
    },
    {
      question: "Are your phones unlocked?",
      answer: `<p>Yes, unless otherwise stated, all our phones are fully unlocked and compatible with any UK network, including Vodafone, O2, EE, and Three.</p>`,
    },
    {
      question: "What accessories come with the phone?",
      answer: `
        <ul class="list-disc list-inside space-y-1">
          <li><strong>Brand new phones:</strong> Come with the original box and standard accessories.</li>
          <li><strong>Refurbished & used phones:</strong> May come with compatible accessories (e.g., charging cable). Packaging may not be original.</li>
        </ul>
      `,
    },
    {
      question: "Can I return the phone if I change my mind?",
      answer: `<p>Yes, we offer a <strong>30-day return policy</strong> on most phones. The phone must be returned in the same condition as received. Please check our return policy page for full details.</p>`,
    },
    {
      question: "How long does delivery take?",
      answer: `<p>We offer fast and secure UK delivery, usually within <strong>1–2 working days</strong>. Tracking information is provided once your order has shipped.</p>`,
    },
    {
      question: "Do you offer \"Buy Now, Pay Later\" or installment options?",
      answer: `<p>Yes, we offer Buy Now, Pay Later options through trusted payment providers at checkout. Terms and availability vary by device.</p>`,
    },
    {
      question: "Is it safe to buy refurbished phones online?",
      answer: `<p>Absolutely. At <strong>Zextons Tech Store</strong>, every refurbished phone is professionally restored, tested, and backed by a warranty. You’re getting a reliable device at a lower cost—with peace of mind.</p>`,
    },
  ];

  return (
    <Transition show={openFAQs} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setOpenFAQs(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6 flex items-center justify-between">
                      <DialogTitle className="text-lg font-semibold text-gray-900">
                        Frequently Asked Questions
                      </DialogTitle>
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        onClick={() => setOpenFAQs(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="relative flex-1 px-4 sm:px-6 mt-5">
                      <dl className="space-y-6 divide-y divide-gray-200">
                        {faqs.map((faq) => (
                          <Disclosure
                            as="div"
                            key={faq.question}
                            className="pt-6"
                          >
                            {({ open }) => (
                              <>
                                <dt>
                                  <DisclosureButton className="flex w-full items-start justify-between text-left text-gray-900">
                                    <span className="text-base font-medium">
                                      {faq.question}
                                    </span>
                                    <span className="ml-6 flex h-7 items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="h-6 w-6"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="h-6 w-6"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </DisclosureButton>
                                </dt>
                                <DisclosurePanel as="dd" className="mt-2 pr-12">
                                  <div
                                    className="text-base leading-7 text-gray-600 space-y-2"
                                    dangerouslySetInnerHTML={{
                                      __html: faq.answer.trim(),
                                    }}
                                  />
                                </DisclosurePanel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </dl>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
