import React from "react";
import Image from "next/image";
import TrustpilotWidget from "./TrustpilotWidget";
import SingleSim from "@/app/assets/singleSim.png";
import DualSim from "@/app/assets/dualSim.png";
import Signal from "@/app/assets/signal.png";
import Wifi from "@/app/assets/wifi.png";
export default function DeliverySection({
  isZoomed,
  product,
  setOpenWarranty,
  setSimOptions,
  setVerifiedRefurbished,
}: {
  isZoomed: boolean;
  product: any;
  setOpenWarranty: (open: boolean) => void;
  setSimOptions: (open: boolean) => void;
  setVerifiedRefurbished: (open: boolean) => void;
    }) {
      const dualSimOptions = [
        "Dual Sim (Physical Dual Sim)",
        "Dual Sim (Physical Sim + eSIM)",
        "Dual eSim",
      ];
      const singleSimOptions = ["Single Sim"];
      const wifiOptions = ["Wifi Only"];
      const cellularOptions = ["Wifi + Cellular"];
      const getSimIcon = (simOption: string) => {
        if (dualSimOptions.includes(simOption)) {
          return <Image src={DualSim} className="w-5" alt="Dual Sim" />;
        } else if (singleSimOptions.includes(simOption)) {
          return <Image src={SingleSim} className="w-5" alt="Single Sim" />;
        } else if (wifiOptions.includes(simOption)) {
          return <Image src={Wifi} className="w-5" alt="Wifi" />;
        } else if (cellularOptions.includes(simOption)) {
          return <Image src={Signal} className="w-5" alt="Signal" />;
        } else {
          return <Image src={Signal} className="w-5" alt="Signal" />;
        }
      };
  return (
    <>
      <div className="border-t border-gray-200  border-b ">
        <div className="flex sm:flex-row flex-col gap-5 justify-between py-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-3 items-center">
              <div className="p-3 bg-green-100 rounded-lg flex gap-2 items-center">
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  className=" w-5"
                >
                  <path
                    d="M17 14.5C17.83 14.5 18.5 13.83 18.5 13C18.5 12.17 17.83 11.5 17 11.5C16.17 11.5 15.5 12.17 15.5 13C15.5 13.83 16.17 14.5 17 14.5ZM18.5 5.5H16V8H20.46L18.5 5.5ZM5 14.5C5.83 14.5 6.5 13.83 6.5 13C6.5 12.17 5.83 11.5 5 11.5C4.17 11.5 3.5 12.17 3.5 13C3.5 13.83 4.17 14.5 5 14.5ZM19 4L22 8V13H20C20 14.66 18.66 16 17 16C15.34 16 14 14.66 14 13H8C8 14.66 6.66 16 5 16C3.34 16 2 14.66 2 13H0V2C0 0.89 0.89 0 2 0H16V4H19ZM2 2V11H2.76C3.31 10.39 4.11 10 5 10C5.89 10 6.69 10.39 7.24 11H14V2H2Z"
                    fill="black"
                  />
                </svg>

                <p className="text-sm font-bold leading-6 text-gray-900 text-start uppercase">
                  Free Next Day Delivery
                  {/* By {deliveryStartStr} - {deliveryEndStr} */}
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-3 items-center justify-between w-full">
              {product?.has_warranty?.status && (
                <div className="flex flex-row gap-3 items-center ">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg
                      width="14"
                      height="18"
                      viewBox="0 0 14 18"
                      fill="none"
                      className=" w-5"
                    >
                      <path
                        d="M7 17.962C4.99067 17.3654 3.32167 16.1484 1.993 14.311C0.664333 12.4737 0 10.4034 0 8.10003V2.69203L7 0.0770264L14 2.69203V8.10003C14 10.4027 13.3357 12.4727 12.007 14.31C10.6783 16.1474 9.00933 17.364 7 17.962ZM7 16.901C8.73333 16.351 10.1667 15.251 11.3 13.601C12.4333 11.951 13 10.1177 13 8.10103V3.37503L7 1.14503L1 3.37503V8.10003C1 10.1167 1.56667 11.95 2.7 13.6C3.83333 15.25 5.26667 16.351 7 16.901Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <button
                    className="hover:cursor-pointer underline"
                    onClick={() => setOpenWarranty(true)}
                  >
                    <div>
                      {product?.is_refundable?.status && (
                        <p className="text-sm font-medium leading-6 text-gray-900 text-start">
                          Free {product?.is_refundable?.refund_duration}{" "}
                          {product?.is_refundable?.refund_type} Return
                        </p>
                      )}
                      {product?.has_warranty?.status &&
                        (product?.has_warranty?.has_replacement_warranty ? (
                          <p className="text-sm font-medium leading-6 text-gray-900 text-start">
                            {product?.has_warranty?.Warranty_duration}{" "}
                            {product?.has_warranty?.Warranty_type} Warranty
                          </p>
                        ) : (
                          // <p className="text-sm font-medium leading-6 text-gray-900 text-start">no Warranty</p>
                          <p className="text-sm font-medium leading-6 text-gray-900 text-start">
                            {product?.has_warranty?.Warranty_duration}{" "}
                            {product?.has_warranty?.Warranty_type} Warranty
                          </p>
                        ))}
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {product?.sim_options && product.sim_options !== "null" && (
              <div className="flex flex-row gap-3 items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  {getSimIcon(product.sim_options)}
                </div>
                <button
                  className="hover:cursor-pointer underline text-sm font-medium text-start leading-6 text-gray-900"
                  onClick={() => setSimOptions(true)}
                >
                  {product.sim_options}
                </button>
              </div>
            )}
            {product?.is_authenticated && (
              <div className="flex flex-row gap-3 items-center">
                <div className="flex p-3 bg-green-100 rounded-lg">
                  <svg
                    width="321"
                    height="449"
                    viewBox="0 0 321 449"
                    fill="none"
                    className=" w-5 h-5"
                  >
                    <path
                      d="M64 0C28.7 0 0 28.7 0 64V416C0 433.7 14.3 448 32 448C49.7 448 64 433.7 64 416V288H159.3L261.8 434.4C271.9 448.9 291.9 452.4 306.4 442.3C320.9 432.2 324.4 412.2 314.3 397.7L230.1 277.5C282.8 256.1 320 204.4 320 144C320 64.5 255.5 0 176 0H64ZM176 224H64V64H176C220.2 64 256 99.8 256 144C256 188.2 220.2 224 176 224Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <button
                  className="hover:cursor-pointer underline text-sm font-medium leading-6 text-gray-900"
                  onClick={() => setVerifiedRefurbished(true)}
                >
                  Verified Refurbished
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={`mb-3 relative ${isZoomed ? "-z-10" : "z-0"}`}>
          <TrustpilotWidget />
        </div>
      </div>
    </>
  );
}
