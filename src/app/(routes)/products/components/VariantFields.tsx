import React from "react";
import { ConditionPrices } from "../../../../../types";
import { RadioGroup, Radio } from "@headlessui/react";
// const RadioGroup = dynamic(
//   () => import("@headlessui/react").then((mod) => mod.RadioGroup),
//   {
//     ssr: false,
//   }
// );
// const RadioGroupOption = dynamic(
//   () => import("@headlessui/react").then((mod) => mod.RadioGroup.Option),
//   {
//     ssr: false,
//   }
// );
export default function VariantFields({
  product,
  setOpenConditionDescription,
  setVariantDesc,
  setActiveTab,
  selectedOptions,
  handleOptionChange,
  processOptionValue,
  checkIfSoldOut,
  conditionPrices,
}: {
  product: any;
  setOpenConditionDescription: (value: boolean) => void;
  setVariantDesc: (value: string) => void;
  setActiveTab: (value: string) => void;
  selectedOptions: { [key: string]: string };
  handleOptionChange: (variantName: string, selectedOption: any) => void;
  processOptionValue: (variantName: string, optionValue: string) => string;
  checkIfSoldOut: (variantCombination: any) => boolean;
  conditionPrices: ConditionPrices[];
}) {
  function classNames(
    ...classes: (string | undefined | null | false)[]
  ): string {
    return classes.filter(Boolean).join(" ");
  }
  const variantFields = product?.variantNames?.map((variant: any) => {
    const variantName = variant?.name?.trim();
    return (
      <fieldset key={variant?.name?.trim()}>
        <div className="flex items-center justify-between">
          <legend className="text-sm font-semibold leading-6 text-gray-900 capitalize">
            {variant?.name?.trim()}
          </legend>
          {product?.variantDescription?.[0]?.[variant?.name?.trim()] &&
            Object.values(
              product?.variantDescription[0][variant?.name?.trim()]
            ).some((value) => value !== "") && (
              <button
                onClick={() => {
                  // console.log('Opening guide for variant:', variant?.name?.trim());
                  setOpenConditionDescription(true);
                  setVariantDesc(
                    product?.variantDescription[0][variant?.name?.trim()]
                  );
                  setActiveTab(
                    Object.keys(
                      product?.variantDescription[0][variant?.name?.trim()]
                    )[0]
                  );
                }}
                type="button"
                className="text-sm font-medium text-primary hover:text-green-500 hover:underline"
              >
                See Guide
              </button>
            )}
        </div>
        <RadioGroup
          value={selectedOptions[variantName] ?? ""}
          onChange={(selectedOption) => {
            handleOptionChange(variantName, selectedOption);
          }}
          className="mt-2 grid gap-y-6 md:grid-cols-3 grid-cols-2 gap-x-4"
        >
          {variant.options.map((optionValue: string) => {
            if (optionValue) {
              const optionName = processOptionValue(variantName, optionValue);
              let optionCode = null;

              if (
                variantName.toLowerCase() === "color" &&
                optionValue.includes("(")
              ) {
                // Extract color code
                const colorMatch = optionValue.match(/\((#\w+)\)/);
                if (colorMatch) {
                  optionCode = colorMatch[1].trim();
                }
              }

              // const selectedOptionValue = selectedOptions[variantName];
              // const isChecked = selectedOptionValue === optionName;

              // Determine if the option is sold out
              let isOptionSoldOut = false;

              // Implement sold out logic using processed option values
              if (variantName.toLowerCase() === "color") {
                // Check if this specific color option is sold out
                const variantCombination = product.variantValues.find(
                  (v: { name: string }) => {
                    const variantColor = v.name
                      .match(/-(.*?)\s*\(/i)?.[1]
                      ?.toLowerCase()
                      ?.trim();
                    const variantStorage = v.name
                      .match(/(\d+ ?(gb|tb))/i)?.[1]
                      ?.toLowerCase()
                      ?.trim();
                    const variantConditionMatch = v.name.match(/^([^‐-]+)-/i);
                    const variantCondition = variantConditionMatch
                      ? variantConditionMatch[1].toLowerCase()
                      : null;

                    return (
                      variantColor === optionName &&
                      variantStorage === selectedOptions["storage"] &&
                      variantCondition === selectedOptions["condition"]
                    );
                  }
                );

                isOptionSoldOut = checkIfSoldOut(variantCombination);
              } else if (variantName.toLowerCase() === "storage") {
                // Check if all color options are sold out for this storage and condition
                const allColorsSoldOut = product.variantValues
                  .filter(
                    (v: { name: string }) =>
                      v.name.toLowerCase().includes(optionName) &&
                      v.name
                        .toLowerCase()
                        .includes(selectedOptions["condition"])
                  )
                  .every((v: { name: string }) => checkIfSoldOut(v));

                isOptionSoldOut = allColorsSoldOut;
              } else if (variantName.toLowerCase() === "condition") {
                // Check if all color and storage options are sold out for this condition
                const allColorsSoldOut = product.variantValues
                  .filter(
                    (v: { name: string }) =>
                      v.name
                        .toLowerCase()
                        .includes(selectedOptions["storage"]) &&
                      v.name.toLowerCase().includes(optionName)
                  )
                  .every((v: { name: string }) => checkIfSoldOut(v));

                const allStorageSoldOut = product.variantValues
                  .filter((v: { name: string }) =>
                    v.name.toLowerCase().includes(optionName)
                  )
                  .every((v: { name: string }) => checkIfSoldOut(v));

                isOptionSoldOut = allColorsSoldOut && allStorageSoldOut;
              }
              const formatColorForDisplay = (colorName: string) => {
                return colorName.replace(/-/g, " "); // Replace hyphens with spaces
              };
              return (
                <Radio
                  key={optionName}
                  value={optionName}
                  disabled={isOptionSoldOut}
                  className={({ checked }: { checked: boolean }) =>
                    classNames(
                      checked
                        ? "border-primary ring-1 ring-primary bg-[#e7f0ea] opacity relative z-10 overflow-hidden capitalize "
                        : "",
                      isOptionSoldOut
                        ? "opacity-90 cursor-not-allowed relative z-10 overflow-hidden"
                        : "cursor-pointer",
                      "relative flex rounded-lg border px-4 py-3 shadow-sm focus:outline-none hover:bg-gray-50 z-10 capitalize"
                    )
                  }
                >
                  {() => (
                    <>
                      <span
                        className={`flex justify-center w-full ${
                          optionCode ? "flex-row gap-3" : "flex-col"
                        }`}
                      >
                        <span className="block text-sm font-medium text-gray-900 text-center">
                          {variantName.toLowerCase() === "storage"
                            ? optionName.toUpperCase()
                            : formatColorForDisplay(optionName)}
                        </span>
                        {optionCode && (
                          <span
                            className="inline-block w-4 h-4 rounded-full border border-black"
                            style={{ backgroundColor: optionCode }}
                          ></span>
                        )}

                        {/* Show Sold Out tag for individual colors */}
                        {isOptionSoldOut &&
                          variant.name.toLowerCase() === "color" && (
                            <span
                              className="absolute bottom-0 left-0 bg-red-600 text-white text-[10px] text-center font-normal px-3 pt-[1px] transform rotate-45 origin-bottom-right"
                              style={{
                                transform: "translate(-5%, 45%) rotate(-45deg)",
                                transformOrigin: "bottom left",
                                width: "78px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Sold Out
                            </span>
                          )}

                        {isOptionSoldOut &&
                          variant.name.toLowerCase() === "storage" && (
                            <span
                              className="absolute bottom-0 left-0 bg-red-600 text-white text-[10px] text-center font-normal px-3 pt-[1px] transform rotate-45 origin-bottom-right"
                              style={{
                                transform: "translate(-5%, 45%) rotate(-45deg)",
                                transformOrigin: "bottom left",
                                width: "78px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Sold Out
                            </span>
                          )}
                        {isOptionSoldOut &&
                          variant.name.toLowerCase() === "condition" && (
                            <span
                              className="w-[90px] absolute bottom-0 left-0 bg-red-600 text-white text-xs font-normal ps-6 py-0.5 transform -z-10 origin-bottom-left overflow-clip"
                              style={{
                                transform:
                                  "translate(-5%, -20%) rotate(-45deg)",
                                transformOrigin: "bottom left",
                                // textAlign: 'center',
                                whiteSpace: "nowrap",
                              }}
                            >
                              Sold Out
                            </span>
                          )}
                        {/* Display condition prices if variant is 'condition' */}
                        {variantName.toLowerCase() === "condition" && (
                          <span className="text-sm text-gray-900 text-center">
                            {conditionPrices.find((cond) => {
                              const conditionName =
                                cond.condition.split(" - ")[0];
                              return (
                                conditionName.toLowerCase() ===
                                optionName.toLowerCase()
                              );
                            }) && (
                              <div className="flex justify-center items-center gap-5">
                                <s className="text-gray-700 font-medium">
                                  £
                                  {
                                    conditionPrices.find((cond: any) => {
                                      const conditionName =
                                        cond.condition.split(" - ")[0];
                                      return (
                                        conditionName.toLowerCase() ===
                                        optionName.toLowerCase()
                                      );
                                    })?.price
                                  }
                                </s>
                                <p className="text-base font-medium">
                                  {" "}
                                  £
                                  {
                                    conditionPrices.find((cond) => {
                                      const conditionName =
                                        cond.condition.split(" - ")[0];
                                      return (
                                        conditionName.toLowerCase() ===
                                        optionName.toLowerCase()
                                      );
                                    })?.salePrice
                                  }
                                </p>
                              </div>
                            )}
                          </span>
                        )}
                      </span>
                    </>
                  )}
                </Radio>
              );
            }
            return null;
          })}
        </RadioGroup>
      </fieldset>
    );
  });
  return <>{variantFields}</>;
}
