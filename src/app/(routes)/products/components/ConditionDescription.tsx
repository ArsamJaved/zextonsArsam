import React, { Fragment } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
// const Dialog = dynamic(() =>
//   import("@headlessui/react").then((mod) => mod.Dialog)
// );
// const DialogTitle = dynamic(() =>
//   import("@headlessui/react").then((mod) => mod.Dialog.Title)
// );
// const DialogPanel = dynamic(() =>
//   import("@headlessui/react").then((mod) => mod.Dialog.Panel)
// );
// const Transition = dynamic(() =>
//   import("@headlessui/react").then((mod) => mod.Transition)
// );
// const TransitionChild = dynamic(() =>
//   import("@headlessui/react").then((mod) => mod.Transition.Child)
// );
import { XMarkIcon } from "@heroicons/react/24/solid";
// const XMarkIcon = dynamic(() =>
//   import("@heroicons/react/20/solid").then((mod) => mod.XMarkIcon)
// );
import Fair from "@/app/assets/fair.jpg";
import Good from "@/app/assets/good.jpg";
import Excellent from "@/app/assets/excellent.jpg";
import BrandNew from "@/app/assets/brandnew.jpg";
export default function ConditionDescription({
  openConditionDescription,
  setOpenConditionDescription,
  variantDesc,
  activeTab,
  setActiveTab,
}: {
  openConditionDescription: boolean;
  setOpenConditionDescription: (open: boolean) => void;
  variantDesc: any;
  activeTab: string | null;
  setActiveTab: (tab: string) => void;
}) {
  const processedContent =
    activeTab != null
      ? variantDesc[activeTab]?.replace(/(?<!\w)-/g, "<br />-")
      : "132121";
  const imageMap: { [key: string]: any } = {
    Fair: Fair,
    Good: Good,
    Excellent: Excellent,
    "Brand New": BrandNew,
  };
  console.log(variantDesc);
  
  return (
    <>
      <Transition show={openConditionDescription} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setOpenConditionDescription(false)}
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
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                            Condition Description
                          </DialogTitle>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                              onClick={() => setOpenConditionDescription(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {activeTab &&
                          variantDesc[activeTab] &&
                          typeof variantDesc[activeTab] !== "object" && (
                            <>
                              <Image
                                src={imageMap[activeTab]}
                                className="w-full h-auto"
                                alt="Condition"
                              />
                              <nav
                                className="flex space-x-4 justify-between mt-5"
                                aria-label="Tabs"
                              >
                                {Object.keys(variantDesc).map((tab) => (
                                  <button
                                    key={tab}
                                    onClick={() => {
                                      setActiveTab(tab);
                                    }}
                                    className={`${
                                      tab === activeTab
                                        ? "border-primary ring-2 ring-primary bg-gray-50 w-full"
                                        : ""
                                    } relative flex cursor-pointer rounded-lg border p-2 shadow-sm focus:outline-none w-full`}
                                    aria-current={
                                      tab === activeTab ? "page" : undefined
                                    }
                                  >
                                    {tab}
                                  </button>
                                ))}
                              </nav>

                              <p
                                className="mt-5 bg-gray-50 p-5 text-justify rounded-xl"
                                dangerouslySetInnerHTML={{
                                  __html: processedContent,
                                }}
                              ></p>
                            </>
                          )}
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );

}