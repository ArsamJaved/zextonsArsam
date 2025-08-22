import React from 'react'
import Image from 'next/image';
import boxsd from "@/app/assets/box.png";
import Tree from "@/app/assets/Tree";
import UsbCable from "@/app/assets/usbCable.png";
import Plug from "@/app/assets/plug.png";
import onexcontrollerImg from "@/app/assets/onexcontroller.png";
import twoxcontrollerImg from "@/app/assets/twoxcontroller.png";
import ScreenProtectorImg from "@/app/assets/screenprotector.png";
import BackCoverImg from "@/app/assets/backcover.png";
import hdmiCable from "@/app/assets/hdmi-cable.png";
import powerCableNew from "@/app/assets/Pawer-cable.png";
export default function ComesWith({ product }: any) {
  const hasAnyAccessory = Object.values(product?.comes_With || {}).some(value => value === true);

  if (!hasAnyAccessory) return null;

  return (
    <>
      <div>
        <h2 className="text-sm font-semibold leading-6 text-gray-900">
          Comes with
        </h2>
        <div className="grid md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 grid-cols-2 justify-start gap-3 items-center">
          {product?.comes_With?.powerAdapter && (
            <div className="flex flex-row items-center gap-3 border p-2  rounded-lg bg-green-50">
              <Image src={Plug} className="h-6 w-6" alt="Power Adapter" />
              <label
                htmlFor="powerAdapter"
                className="text-xs font-medium leading-6 text-gray-900 lg:whitespace-nowrap"
              >
                Power Adapter
              </label>
            </div>
          )}
          {product?.comes_With?.powerCable && (
            <div className="flex flex-row items-center gap-3 border p-2 rounded-lg bg-green-50">
              <Image src={UsbCable} className="h-6 w-6" alt="Power Cable" />
              <label
                htmlFor="powerCable"
                className="text-xs font-medium leading-6 text-gray-900 lg:whitespace-nowrap"
              >
                Charging Cable
              </label>
            </div>
          )}
          {product?.comes_With?.protectionBundle && (
            <div className="flex flex-row items-center md:justify-between gap-3 md:gap-1 border p-2 rounded-lg bg-green-50 w-full">
              <Image
                src={boxsd}
                className="h-5 w-5 rotate-0"
                alt="Protection Bundle"
              />

              <label
                htmlFor="powerCable"
                className="text-xs font-medium leading-6 text-gray-900 lg:whitespace-nowrap"
              >
                Protection Bundle
              </label>
            </div>
          )}

          {product?.comes_With?.onexcontroller && (
            <div className="flex flex-row items-center gap-3 border p-2 rounded-lg bg-green-50">
              <Image
                src={onexcontrollerImg}
                className="h-6"
                alt="onex controller"
              />
              <label
                htmlFor="onexcontroller"
                className="text-xs font-medium leading-6 text-gray-900 lg:whitespace-nowrap"
              >
                1x Controller
              </label>
            </div>
          )}

          {product?.comes_With?.twoxcontroller && (
            <div className="flex flex-row items-center gap-3 border p-2 rounded-lg bg-green-50">
              <Image
                src={twoxcontrollerImg}
                className="h-6"
                alt="twox controller"
              />
              <label
                htmlFor="twoxcontroller"
                className="text-xs font-medium leading-6 text-gray-900 lg:whitespace-nowrap"
              >
                2x Controller
              </label>
            </div>
          )}

          {product?.comes_With?.hdmi && (
            <div className="flex flex-row items-center gap-3 border p-2 rounded-lg bg-green-50">
              <Image src={hdmiCable} className="h-6" alt="HDMI Cable" />
              <label
                htmlFor="hdmi"
                className="text-xs font-medium leading-6 text-gray-900 lg:whitespace-nowrap"
              >
                HDMI Cable
              </label>
            </div>
          )}

          {product?.comes_With?.powerCableNewIncluded && (
            <div className="flex flex-row items-center gap-3 border p-2 rounded-lg bg-green-50">
              <Image
                src={powerCableNew}
                className="h-6"
                alt="Power Cable New"
              />
              <label
                htmlFor="powerCableNewIncluded"
                className="text-xs font-medium leading-6 text-gray-900 lg:whitespace-nowrap"
              >
                Power Cable
              </label>
            </div>
          )}
          {product?.comes_With?.onexScreenProtector && (
            <div className="flex flex-row items-center gap-3 border p-2 rounded-lg bg-green-50">
              <Image
                src={ScreenProtectorImg}
                className="h-6"
                alt="Screen Protector"
              />
              <label
                htmlFor="powerCableNewIncluded"
                className="text-xs font-medium leading-6 text-gray-900 lg:whitespace-nowrap"
              >
                Screen Protector
              </label>
            </div>
          )}
          {product?.comes_With?.onexBackCover && (
            <div className="flex flex-row items-center gap-3 border p-2 rounded-lg bg-green-50">
              <Image src={BackCoverImg} className="h-6" alt="Back Cover" />
              <label
                htmlFor="powerCableNewIncluded"
                className="text-xs font-medium leading-6 text-gray-900 lg:whitespace-nowrap"
              >
                Back Cover
              </label>
            </div>
          )}
          {product?.comes_With?.treePlanted && (
            <div className="flex flex-row items-center gap-3 border p-2  rounded-lg bg-green-50">
              <div className="h-4 w-4">
                <Tree />
              </div>
              <label
                htmlFor="treePlanted"
                className="text-xs font-medium leading-6 text-gray-900 lg:whitespace-nowrap"
              >
                Tree Planted
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  );
}