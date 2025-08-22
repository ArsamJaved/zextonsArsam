/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import TopBar from "@/app/topbar/page";
import Nav from "@/app/components/navbar/Nav";
import Footer from "@/app/components/footer/footer";
import ProductBattery from "@/app/(routes)/products/components/ProductBattery";
import ProductCart from "@/app/(routes)/products/components/ProductCart";
import ProductPerks from "@/app/(routes)/products/components/ProductPerks";
import ProductFAQS from "@/app/(routes)/products/components/ProductFAQS";
import ProductWarranty from "@/app/(routes)/products/components/ProductWarranty";
import ProductSpecs from "@/app/(routes)/products/components/ProductSpecs";
import ProductVerifiedRefurbished from "@/app/(routes)/products/components/ProductVerifiedRefurbished";
import ProductSimOptions from "@/app/(routes)/products/components/ProductSimOptions";
import ProductNotIncluded from "@/app/(routes)/products/components/ProductNotIncluded";
import BuyNow from "@/app/(routes)/products/components/BuyNow";
import ImagePart from "@/app/(routes)/products/components/ImagePart";
import RecentlyViewed from "@/app/(routes)/products/components/RecentlyViewed";
import ProductSummary from "@/app/(routes)/products/components/ProductSummary";
import ProductDescription from "@/app/(routes)/products/components/ProductDescription";
import DialogList from "@/app/(routes)/products/components/DialogList";
import { useAuth } from "@/app/context/Auth";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  CartItem,
  ConditionPrices,
  ExtractedOptions,
  ProductData,
  SelectedVariant,
  VariantDetails,
} from "../../../../../types";
import ComesWith from "../components/ComesWith";
import SimOptions from "../components/SimOptions";
import DeliverySection from "../components/DeliverySection";
import ProductInfo from "../components/ProductInfo";
import BatterySect from "../components/BatterySect";
import VariantFields from "../components/VariantFields";
// import ClipLoader from "react-spinners/ClipLoader";
import BreadCrumb from "@/app/components/common/Breadcrumb";
import NewsletterModal from "@/app/components/common/NewsletterModal";
import ConditionDescription from "../components/ConditionDescription";
import ReviewsDiv from "../components/ReviewsDiv";
import Loading from "@/app/components/Loading";
import TrustBoxWidget from "@/app/components/trusBoxWidget";
export default function ProductPage({
  product,
  variantInfo,
}: {
  product: ProductData;
  variantInfo: any;
}) {
  const auth = useAuth();
  const { slug } = useParams();
  const productName = slug;
  const [products, setProducts] = useState<CartItem[]>([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedVariant, setSelectedVariant] =
    useState<SelectedVariant | null>(null);
  const [metaSchemas, setMetaSchemas] = useState<any[]>(
    selectedVariant?.metaSchemas || []
  );
  const [conditionPrices, setConditionPrices] = useState<ConditionPrices[]>([]);
  const [openConditionDescription, setOpenConditionDescription] =
    useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openBattery, setOpenBattery] = useState<boolean>(false);
  const [openPerks, setOpenPerks] = useState<boolean>(false);
  const [openFAQs, setOpenFAQs] = useState<boolean>(false);
  const [openSpecs, setOpenSpecs] = useState<boolean>(false);
  const [openWarranty, setOpenWarranty] = useState<boolean>(false);
  const [verifiedRefurbished, setVerifiedRefurbished] =
    useState<boolean>(false);
  const [simOptions, setSimOptions] = useState<boolean>(false);
  const [notIncluded, setNotIncluded] = useState<boolean>(false);
  const [reviewsDiv, setReviewsDiv] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [navToken, setNavToken] = useState<number>(0);
  const [selectedSim, setSelectedSim] = useState<string>("");
  const [isSoldOut, setIsSoldOut] = useState<boolean>(false);
  const [isBuyButtonDisabled, setIsBuyButtonDisabled] =
    useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [variantDesc, setVariantDesc] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Extact the base product name from the full product name
  const extractBaseProductName = (fullName: string) => {
    // Remove the leading '/' if present
    const cleanedName = fullName.startsWith("/")
      ? fullName.substring(1)
      : fullName;
    // Define an array of possible conditions to identify where to split the product name
    const conditions = [
      "brand-new",
      "refurbished",
      "open-box",
      "like-new",
      "used-excellent",
      "used-very-good",
      "used-good",
      "certified-pre-owned",
      "factory-refurbished",
      "for-parts-or-not-working",
    ];
    // Create a regex pattern that matches any of the conditions as whole words
    const conditionPattern = conditions.join("|");
    const regex = new RegExp(`\\b(${conditionPattern})\\b`, "i");
    // Search for the first occurrence of any condition in the cleanedName
    const match = cleanedName.match(regex);
    if (match && match.index !== undefined) {
      const index = match.index;
      const conditionLength = match[0].length;
      // Include the condition in the base product name
      const baseProductName = cleanedName
        .substring(0, index + conditionLength)
        .replace(/-+$/g, "");
      // Extract the variant information after the condition
      const variantInfo = cleanedName
        .substring(index + conditionLength)
        .replace(/^-+/g, "");

      return { baseProductName, variantInfo };
    } else {
      // If no condition is found, return the original name as base product name
      return { baseProductName: cleanedName, variantInfo: "" };
    }
  }; // Api call for product details

  // useEffect(() => {
  //   const fetchProductByUrl = async (productName: string) => {
  //     try {
  //       // Extract base product name and variant info (if available)
  //       const { baseProductName, variantInfo } =
  //         extractBaseProductName(productName);
  //       console.log("Base Product Name:", baseProductName); // Check the value of base product name
  //       console.log("Variant Info:", variantInfo); // Check the value of variant info
  //       const requestData = { producturl: baseProductName }; // Create an object with baseProductName
  //       // Use `requestData` to send the request (only sending baseProductName to the API)
  //       const response = await axios.post(
  //         `${auth.ip}get/product/by/url`,
  //         requestData
  //       );
  //       if (response.data.status === 201) {
  //         const productData = response.data.product;
  //         setProduct(productData);
  //         console.log("Product data", productData);
  //       } else {
  //         console.error("Error fetching product:", response.data.message);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching product:", error);
  //     }
  //   };
  //   const slugifiedProductName = productName as string;
  //   fetchProductByUrl(slugifiedProductName);
  // }, [auth.ip, productName]);

  const breadcrumb = [
    { name: product?.name, link: `/products/${productName}`, current: true },
  ];
  const today = new Date();
  // Get the current time
  const currentHour = today.getHours();
  // Calculate delivery dates based on the current time
  const deliveryStart = new Date(today);
  const deliveryEnd = new Date(today);
  if (currentHour < 16) {
    // Before 4 PM
    deliveryStart.setDate(today.getDate() + 1);
    deliveryEnd.setDate(today.getDate() + 4);
  } else {
    // After 4 PM
    deliveryStart.setDate(today.getDate() + 2);
    deliveryEnd.setDate(today.getDate() + 5);
  }
  // Format dates to a readable string
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const deliveryStartStr = deliveryStart.toLocaleDateString("en-GB", options);
  const deliveryEndStr = deliveryEnd.toLocaleDateString("en-GB", options);
  // Images
  const images = useMemo(() => {
    return product?.productType?.type === "single"
      ? product?.Gallery_Images || [] // Default to an empty array
      : selectedVariant?.variantImages || [];
  }, [product, selectedVariant]);
  useEffect(() => {
    if (images?.length > 0) {
      setIsLoading(false);
    }
  }, [images]);
  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <ClipLoader color={"#36D7B7"} loading={isLoading} size={100} />
  //     </div>
  //   );
  // }

  // Sold Out
  const hardDiskTypes = [
    "HDD",
    "SSD",
    "Hybrid SSHD",
    "NVMe SSD",
    "SAS HDD",
    "SATA HDD",
    "SCSI HDD",
    "IDE HDD",
    "M.2 SSD",
    "U.2 SSD",
    "PCIe SSD",
  ];
  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  const hardDiskTypePattern = hardDiskTypes.map(escapeRegExp).join("|");

  const extractOptionsFromVariantName = (variantName: string) => {
    const conditionRegex = /^(.*?)-/;
    const storageRegex = new RegExp(
      `(\\d+(?:GB|TB)(?:\\s*(?:${hardDiskTypePattern}))?)`,
      "i"
    );
    const colorRegex = new RegExp(
      `-(.*?)(\\(\\#\\w+\\))?-(\\d+(?:GB|TB)(?:\\s*(?:${hardDiskTypePattern}))?)`,
      "i"
    );

    const conditionMatch = variantName.match(conditionRegex);
    const storageMatch = variantName.match(storageRegex);
    const colorMatch = variantName.match(colorRegex);

    const condition = conditionMatch ? conditionMatch[1].trim() : "";
    const storage = storageMatch ? storageMatch[1].trim() : "";
    let color = colorMatch ? colorMatch[1].trim() : "";

    // Include color code if present
    const colorCode = colorMatch && colorMatch[2] ? colorMatch[2].trim() : "";
    color = `${color} ${colorCode}`.trim();

    //   console.log(`Extracted Options:
    //   Condition: '${condition}'
    //   Color: '${color}'
    //   Storage: '${storage}'
    // `);

    return {
      condition: condition.toLowerCase(),
      color: color.toLowerCase(),
      storage: storage.toLowerCase(),
    };
  };
  const parseVariantParts = (
    parts: string[],
    conditionsList: string[],
    hardDiskTypes: string[]
  ) => {
    let storage = "";
    let hardDriveType = "";
    let condition = "";
    let color = "";
    let conditionFound = false;

    // First, search for storage and hard drive type in the parts
    let storageIndex = -1;
    let hardDriveTypeIndex = -1;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (/\d+(GB|TB)/i.test(part)) {
        storage = part;
        storageIndex = i;
      } else if (
        hardDiskTypes.some((hdt) => hdt.toLowerCase() === part.toLowerCase())
      ) {
        hardDriveType = part;
        hardDriveTypeIndex = i;
      }
    }

    // Combine storage and hard drive type if both are found
    if (storage && hardDriveType) {
      storage = `${storage} ${hardDriveType}`;
    } else if (hardDriveType && !storage) {
      storage = hardDriveType;
    }

    // Remove storage and hard drive type parts from parts array
    const remainingParts = parts.slice(); // clone the array

    if (storageIndex >= 0) {
      remainingParts.splice(storageIndex, 1);
      if (hardDriveTypeIndex > storageIndex) {
        hardDriveTypeIndex--;
      }
    }
    if (hardDriveTypeIndex >= 0) {
      remainingParts.splice(hardDriveTypeIndex, 1);
    }

    // Now, from the end, attempt to match known conditions
    for (let i = remainingParts.length; i > 0; i--) {
      const possibleConditionTwoWords = remainingParts
        .slice(i - 2, i)
        .join(" ")
        .toLowerCase();
      const possibleConditionOneWord = remainingParts[i - 1].toLowerCase();

      if (conditionsList.includes(possibleConditionTwoWords)) {
        condition = possibleConditionTwoWords;
        color = remainingParts.slice(0, i - 2).join("-"); // Keep hyphens in color
        conditionFound = true;
        break;
      } else if (conditionsList.includes(possibleConditionOneWord)) {
        condition = possibleConditionOneWord;
        color = remainingParts.slice(0, i - 1).join("-"); // Keep hyphens in color
        conditionFound = true;
        break;
      }
    }

    if (!conditionFound) {
      color = remainingParts.join("-"); // Keep hyphens in color
    }

    return [storage, color, condition];
  };
  const checkIfSoldOut = (variantCombination: {
    Quantity: number | null;
  }): boolean => {
    // console.log('Checking if variant is sold out:', variantCombination);
    return (
      variantCombination &&
      (variantCombination.Quantity === null ||
        variantCombination.Quantity === 0)
    );
  };

  // const checkIfAllColorsSoldOut = (selectedStorage: string) => {
  //   // console.log('Checking if all colors are sold out for storage:', selectedStorage);
  //   const result =
  //     product?.variantValues
  //       ?.filter((variant) => variant.name.includes(selectedStorage))
  //       ?.every((variant) => checkIfSoldOut(variant)) ?? false;
  //   // console.log('All colors sold out result:', result);
  //   return result;
  // };
  const updateSelectedVariant = (selectedOptions: Record<string, string>) => {
    const selectedStorageColorCombination = product?.variantValues?.find(
      (variant) => {
        return product.variantNames.every((v) => {
          const optionKey = v.name.trim();
          let selectedOption = selectedOptions[optionKey];
          if (!selectedOption) return false;
          selectedOption = processOptionValue(optionKey, selectedOption);
          if (optionKey.toLowerCase() === "color") {
            const variantColor = variant.name
              .match(/-(.*?)\s*\(/i)?.[1]
              ?.toLowerCase()
              ?.trim();
            return variantColor === selectedOption;
          } else {
            return variant.name.toLowerCase().includes(selectedOption);
          }
        });
      }
    );
    if (selectedStorageColorCombination) {
      // console.log('Filtered Variants', product.variantValues);
      const filteredVariants = product?.variantValues.filter((variant) => {
        const variantName = variant.name.toLowerCase();
        // Extract storage with optional hard drive type
        const variantColor = variantName.match(/-(.*?)\s*\(/i)?.[1]?.trim();
        const variantStorageMatch = variantName.match(
          /(\d+ ?(gb|tb))(?:\s*(hdd|ssd|hybrid sshd|nvme ssd|sas hdd|sata hdd|scsi hdd|ide hdd|m.2 ssd|u.2 ssd|pcie ssd))?/i
        );
        const variantStorage = variantStorageMatch
          ? variantStorageMatch[1]?.trim()
          : "";
        const variantHardDriveType = variantStorageMatch
          ? variantStorageMatch[3]?.trim()
          : "";
        // Combine storage and hard drive type if both exist
        const variantFullStorage = variantHardDriveType
          ? `${variantStorage} ${variantHardDriveType}`
          : variantStorage;
        const selectedColor = selectedOptions["color"];
        const selectedStorage = selectedOptions["storage"];
        return (
          variantColor === selectedColor &&
          variantFullStorage === selectedStorage
        );
      });
      // console.log('Filtered Variants ALL', filteredVariants);
      const conditionPrices = filteredVariants?.map((variant) => {
        const variantName = variant.name;
        const conditionMatch = variantName.match(/^([^‐-]+)-/i);
        const condition = conditionMatch ? conditionMatch[1] : null;
        const colorMatch = variantName.match(/-(.*?)\s*\(/i);
        const color = colorMatch ? colorMatch[1] : null;
        const storageMatch = variantName.match(
          /(\d+ ?(GB|TB))(?:\s*(HDD|SSD|Hybrid SSHD|NVMe SSD|SAS HDD|SATA HDD|SCSI HDD|IDE HDD|M.2 SSD|U.2 SSD|PCIe SSD))?/i
        );
        const storage = storageMatch
          ? `${storageMatch[1].trim()} ${
              storageMatch[3] ? storageMatch[3].trim() : ""
            }`.trim()
          : null;

        return {
          condition: `${condition} - ${color} - ${storage}`,
          price: variant.Price,
          salePrice: variant.salePrice,
        };
      });

      // console.log('Prices', conditionPrices);

      setConditionPrices(conditionPrices ?? []);
      setSelectedVariant(selectedStorageColorCombination);
    } else {
      setConditionPrices([]);
      setSelectedVariant(null);
    }
  };
  const findInitialSelectedVariant = () => {
    // console.log('Finding initial selected variant');
    const variant = product?.variantValues.find((variant) => {
      return product.variantNames.every((v) => {
        const optionKey = v.name.trim();
        return variant.name.includes(optionKey);
      });
    });
    // console.log('Initial selected variant:', variant);
    return variant;
  };
  useEffect(() => {
    if (
      product &&
      Array.isArray(product.variantValues) &&
      Array.isArray(product.variantNames) &&
      product.variantValues.length > 0
    ) {
      const initialSelectedVariant = findInitialSelectedVariant();

      if (initialSelectedVariant) {
        const initialSelectedOptions = product.variantNames.reduce(
          (acc: Record<string, string>, v) => {
            const optionKey = v.name.trim();
            const optionValue = initialSelectedVariant.name.includes(optionKey)
              ? "true"
              : "false";
            acc[optionKey] = optionValue;
            return acc;
          },
          {}
        );

        const isSelectedVariantSoldOut = checkIfSoldOut(initialSelectedVariant);
        setSelectedVariant(initialSelectedVariant);
        setIsSoldOut(isSelectedVariantSoldOut);
        setIsBuyButtonDisabled(isSelectedVariantSoldOut);
        setSelectedOptions(initialSelectedOptions);
        updateSelectedVariant(initialSelectedOptions);
      }
    }
  }, [product]);
  useEffect(() => {
    // console.log('Initial load state:', initialLoad);
    // console.log('Selected variant:', selectedVariant);
    if (!initialLoad && selectedVariant) {
      const isSelectedVariantSoldOut = checkIfSoldOut(selectedVariant);
      // console.log('Is selected variant sold out:', isSelectedVariantSoldOut);
      setIsSoldOut(isSelectedVariantSoldOut);
      setIsBuyButtonDisabled(isSelectedVariantSoldOut);
    }
    setInitialLoad(false);
  }, [initialLoad, selectedVariant]);

  const processOptionValue = (variantName: string, optionValue: string) => {
    let processedValue = optionValue.trim();
    if (variantName.toLowerCase() === "color") {
      // Remove color codes like "(#000000)"
      processedValue = processedValue.replace(/\s*\(#\w+\)/, "").trim();
    }
    // Keep spaces between multi-word conditions like 'brand new'
    if (variantName.toLowerCase() === "condition") {
      return processedValue.toLowerCase().trim();
    }
    return processedValue.toLowerCase();
  };
  const handleOptionChange = (variantName: string, selectedOption: any) => {
    const processedSelectedOption = processOptionValue(
      variantName,
      selectedOption
    );

    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = {
        ...prevSelectedOptions,
        [variantName.trim()]: processedSelectedOption,
      };

      const selectedVariantCombination =
        product?.variantValues.find((variant) => {
          return product.variantNames.every((v) => {
            const optionKey = v.name.trim();

            let optionValue = newSelectedOptions[
              optionKey as keyof typeof newSelectedOptions
            ] as string;
            if (!optionValue) return false;

            optionValue = processOptionValue(optionKey, optionValue);

            if (optionKey.toLowerCase() === "color") {
              const variantColor = variant.name
                .match(/-(.*?)\s*\(/i)?.[1]
                ?.toLowerCase()
                ?.trim();
              return variantColor === optionValue;
            } else {
              return variant.name.toLowerCase().includes(optionValue);
            }
          });
        }) ?? ({} as VariantDetails);
      console.log("Selected variant combination:", selectedVariantCombination);

      const isSelectedVariantSoldOut = selectedVariantCombination
        ? checkIfSoldOut({ Quantity: selectedVariantCombination.Quantity })
        : true;

      setSelectedVariant(selectedVariantCombination);
      setIsSoldOut(isSelectedVariantSoldOut);
      setIsBuyButtonDisabled(isSelectedVariantSoldOut);
      updateSelectedVariant(newSelectedOptions);
      
      // Immediately update URL after state changes
      setTimeout(() => {
        updateProductUrl(selectedVariantCombination, newSelectedOptions);
      }, 0);
      
      return newSelectedOptions;
    });
  };
  

  const findVariant = (selectedOptions: Record<string, string>) => {
    return product?.variantValues.find((variant: any) => {
      return product.variantNames.every((v) => {
        const optionKey = v.name.trim();
        let optionValue = selectedOptions[optionKey];
        if (!optionValue) return false;

        optionValue = processOptionValue(optionKey, optionValue);

        if (optionKey.toLowerCase() === "color") {
          const variantColor = variant.name
            .match(/-(.*?)\s*\(/i)?.[1]
            ?.toLowerCase()
            ?.trim();
          return variantColor === optionValue;
        } else {
          return variant.name.toLowerCase().includes(optionValue);
        }
      });
    });
  };
  const initialOptionsSet = useRef(false);
  useEffect(() => {
    if (product && product.variantNames && !initialOptionsSet.current) {
      let initialSelectedOptions: { [key: string]: string } = {};
      let variantFound = false;
      // Extract base product name and variant information from the URL
      const { variantInfo } = extractBaseProductName(
        location.pathname.split("/").pop() || ""
      );
      // console.log('Extracted baseProductName:', baseProductName);
      // console.log('Extracted variantInfo:', variantInfo);
      let urlVariantParts = variantInfo ? variantInfo.split("-") : [];
      // console.log('URL Variant Parts:', urlVariantParts);

      const conditions = [
        "brand new",
        "refurbished",
        "open box",
        "like new",
        "used excellent",
        "used very good",
        "used good",
        "certified pre-owned",
        "factory refurbished",
        "for parts or not working",
        "good",
        "very good",
        "excellent",
        "poor",
        "fair",
        "mint",
        "new",
      ];
   
      if (urlVariantParts.length >= 2) {
        const [storage, color, condition] = parseVariantParts(
          urlVariantParts,
          conditions,
          hardDiskTypes
        );

        urlVariantParts = [storage, color, condition];
        // console.log("Formatted URL Variant Parts:", urlVariantParts);
      }

      const optionValueToVariantName: { [key: string]: string } = {};
      product.variantNames.forEach((variant) => {
        const variantName = variant.name.trim();
        variant.options.forEach((option) => {
          let optionValue = processOptionValue(
            variantName,
            option
          ).toLowerCase();
          if (variantName.toLowerCase() === "condition") {
            optionValue = optionValue.replace(/-/g, " ");
          }
          optionValueToVariantName[optionValue] = variantName;
        });
      });

      // console.log('Option to Variant Name Mapping (Sanitized):', optionValueToVariantName);

      urlVariantParts.forEach((part) => {
        let partSanitized = part.toLowerCase().trim();

        if (conditions.includes(partSanitized.replace(/-/g, " "))) {
          partSanitized = partSanitized.replace(/-/g, " ");
        }

        const matchedVariantName = optionValueToVariantName[partSanitized];

        if (matchedVariantName) {
          initialSelectedOptions[matchedVariantName] = partSanitized;
          console.log(
            `Matched part '${part}' to variant '${matchedVariantName}'`
          );
        } else if (part) {
          console.warn(`Could not match part '${part}' to any variant name`);
        }
      });

      // console.log('Initial Selected Options from URL (Sanitized):', initialSelectedOptions);

      const selectedVariantFromURL = findVariant(initialSelectedOptions);

      if (selectedVariantFromURL) {
        // console.log('Selected Variant from URL:', selectedVariantFromURL);
        setSelectedVariant(selectedVariantFromURL);
        setSelectedOptions(initialSelectedOptions);
        updateSelectedVariant(initialSelectedOptions);
        initialOptionsSet.current = true;
        variantFound = true;
      } else {
        console.warn("No matching variant found for selected options from URL");
      }

      if (!variantFound) {
        // console.log('No variant found from URL, selecting default options');
        initialSelectedOptions = {};

        product.variantNames.forEach((variant) => {
          if (variant.options && variant.options.length > 0) {
            const optionKey = variant.name.trim();
        const optionValue = processOptionValue(optionKey, variant.options[0]);
        initialSelectedOptions[optionKey] = optionValue;
          }
        });

        // console.log('Initial Selected Options (Default):', initialSelectedOptions);

        const selectedVariant = findVariant(initialSelectedOptions);

        if (
          selectedVariant &&
          (!selectedVariant.Quantity || selectedVariant.Quantity === 0)
        ) {
          // console.log('Initially selected variant is out of stock, searching for available variant');

          const availableVariant = product.variantValues.find(
            (variantValue) => variantValue.Quantity && variantValue.Quantity > 0
          );

          if (availableVariant) {
            // console.log(`Available Variant found: '${availableVariant.name}' with Quantity: ${availableVariant.Quantity}`);
            const extractedOptions: ExtractedOptions =
              extractOptionsFromVariantName(availableVariant.name);

            Object.keys(extractedOptions).forEach((optionKey) => {
              const selectedOption = processOptionValue(
                optionKey,
                extractedOptions[optionKey]
              );
              // console.log(`Setting option '${optionKey}' to '${selectedOption}' from available variant '${availableVariant.name}'`);
              initialSelectedOptions[optionKey] = selectedOption;
            });
          } else {
            console.warn("No available variant found");
          }
        }

        // Ensure first color is always set for auto-select
        if (product?.variantNames) {
          const colorVariant = product.variantNames.find(v => v.name.trim().toLowerCase() === "color");
          if (colorVariant && colorVariant.options && colorVariant.options.length > 0) {
            const processedFirstColor = processOptionValue("color", colorVariant.options[0]);
            if (!initialSelectedOptions["color"]) {
              initialSelectedOptions["color"] = processedFirstColor;
            }
          }
        }
        setSelectedOptions(initialSelectedOptions);
        setSelectedVariant(selectedVariant ?? null);
        updateSelectedVariant(initialSelectedOptions);
        initialOptionsSet.current = true;
      }
    }
  }, [
    product,
    setSelectedVariant,
    updateSelectedVariant,
    setSelectedOptions,
    findVariant,
    hardDiskTypes,
    extractOptionsFromVariantName,
  ]);

  // Cart Data
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    const cart = cartData ? JSON.parse(cartData) : [];
    setProducts(cart);
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // Function to update product URL based on selected options
  // Function to generate a title based on variant information
  const generateVariantTitle = (product: ProductData, variant: SelectedVariant, options: Record<string, string>) => {
    if (!product || !variant) return '';
    
    // Extract variant components
    const storage = (options as { storage: string })["storage"] || "";
    const color = (options as { color: string })["color"] || "";
    const condition = (options as { condition: string })["condition"] || "";
    
    // Create a formatted title
    let title = product.name || "";
    
    // Add variant details to the title
    const variantDetails = [condition, color, storage].filter(Boolean).join(" - ");
    if (variantDetails) {
      title = `${title} - ${variantDetails}`;
    }
    
    return title;
  };

  const updateProductUrl = useCallback((selectedVariant: any, currentOptions: Record<string, string>) => {
    if (!product || !product.producturl) return;
    
    // Extract the variant components directly from currentOptions
    const storage = (currentOptions as { storage: string })["storage"] || "";
    const color = (currentOptions as { color: string })["color"] || "";
    const condition = (currentOptions as { condition: string })["condition"] || "";
    
    // Construct the variant name slug
    const variantName = [storage, color, condition]
      .filter(Boolean) // Remove any empty values
      .join(" ") // Join with a single space
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, "-") // Replace non-alphanumeric characters with a single dash
      .replace(/^-+|-+$/g, "") // Remove leading or trailing dashes
      .toLowerCase();
    
    // Construct the expected URL
    const expectedUrl = variantName
      ? `/products/${product.producturl}-${variantName}`
      : `/products/${product.producturl}`;
    
    // Update URL if different
    if (location.pathname !== expectedUrl) {
      console.log("Updating URL to:", expectedUrl);
      window.history.replaceState({}, "", expectedUrl);
      
      // Update canonical URL
      updateCanonicalUrl(variantName ? `${product.producturl}-${variantName}` : product.producturl);
    }
  }, [product]);
  
  // Function to update canonical URL tag
  const updateCanonicalUrl = (productUrlWithVariant: string) => {
    // Find existing canonical link or create a new one
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    
    // Update the href attribute with the new URL
    const fullCanonicalUrl = `${window.location.origin}/products/${productUrlWithVariant}`;
    canonicalLink.href = fullCanonicalUrl;
    
    console.log('Selected variant details:', selectedVariant);
  };

  // Initial URL update on component mount and when product/variant changes
  useEffect(() => {
    if (product && selectedVariant && selectedOptions) {
      updateProductUrl(selectedVariant, selectedOptions);
      
      // Update page metadata when variant changes
      // Create a title based on variant information if metaTitle is not available
      const variantTitle = selectedVariant.metaTitle || generateVariantTitle(product, selectedVariant, selectedOptions);
      if (variantTitle) {
        document.title = variantTitle;
        
        // Also update the title meta tag
        let metaTitleTag = document.querySelector('meta[property="og:title"]');
        if (!metaTitleTag) {
          metaTitleTag = document.createElement('meta');
          metaTitleTag.setAttribute('property', 'og:title');
          document.head.appendChild(metaTitleTag);
        }
        metaTitleTag.setAttribute('content', variantTitle);
        
        // Update the h1 title in the DOM if it exists
        const titleElements = document.querySelectorAll('h1.product-title');
        if (titleElements.length > 0) {
          titleElements.forEach(el => {
            el.textContent = variantTitle;
          });
        }
      }
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      if (selectedVariant.metaDescription) {
        metaDescription.setAttribute('content', selectedVariant.metaDescription);
      }
      
      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      if (selectedVariant.metaKeywords) {
        metaKeywords.setAttribute('content', selectedVariant.metaKeywords);
      }
      
      console.log('Updated page metadata with variant-specific data:', {
        title: variantTitle,
        description: selectedVariant.metaDescription,
        keywords: selectedVariant.metaKeywords
      });
    }
  }, [product, selectedVariant, selectedOptions, updateProductUrl]);
  
  // Set canonical URL on initial page load
  useEffect(() => {
    if (product && product.producturl) {
      // Get current URL path without domain
      const currentPath = window.location.pathname;
      const productSlug = currentPath.split('/products/')[1] || product.producturl;
      
      // Update canonical URL with current path
      updateCanonicalUrl(productSlug);
    }
  }, [product]);
  
  // Debug logging for URL and selected options
  useEffect(() => {
    if (selectedOptions && Object.keys(selectedOptions).length > 0) {
      console.log("Current selected options:", selectedOptions);
      console.log("Current URL:", window.location.href);
    }
  }, [selectedOptions]);

  const addToCart = (variant: { [x: string]: string; _id: string }) => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the variant is already in the cart
    const existingProductIndex = cart.findIndex(
      (item: CartItem) => item._id === variant._id
    );

    if (existingProductIndex !== -1) {
      // Increment the quantity if the product is already in the cart
      cart[existingProductIndex].qty =
        (cart[existingProductIndex].qty || 1) + 1;
    } else {
      // Add the new product to the cart with an initial quantity of 1
      const cartItem: CartItem = {
        ...variant,
        productName: product?.name,
        qty: 1,
        productId: product?._id || "", // Ensure non-null string
        salePrice: updatedPrice,
        selectedSim: selectedSim, // Include the selected SIM option
        productthumbnail:
          product?.productType?.type === "single"
            ? product.thumbnail_image?.filename || ""
            : undefined,
        name: variant.name || "", // Include name from variant
      };
      cart.push(cartItem);
    }

    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update state with the new cart
    setProducts(cart);
    setNavToken((prevToken) => prevToken + 1);
  };

  const removeFromCart = (id: string) => {
    // console.log(productId);
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = cart.filter((product: { _id: string }) => product._id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    setProducts(cart);
    // updateCartItemCount(cart);
    setNavToken((prevToken) => prevToken + 1);
  };
  const updateCartQuantity = (quantity: number, id: string) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productIndex = cart.findIndex(
      (product: { _id: string }) => product._id === id
    );

    if (productIndex !== -1) {
      cart[productIndex].qty = parseInt(quantity.toString(), 10);
      localStorage.setItem("cart", JSON.stringify(cart));
      setProducts(cart);
    }
    // updateCartItemCount(cart);
    setNavToken((prevToken) => prevToken + 1);
  };
  const calculateTotalSalePrice = (
    products: { salePrice: number; qty: number }[]
  ): string => {
    return products
      .reduce((total, product) => {
        return total + parseFloat((product.salePrice * product.qty).toFixed(2));
      }, 0)
      .toFixed(2);
  };
  // Batter option
  const batteryJson = JSON.parse(product?.battery?.[0] || "{}");
  const batteryPrice = batteryJson?.batteryPrice
    ? parseFloat(batteryJson.batteryPrice)
    : 0;
  const standardBatteryPrice = selectedVariant
    ? parseFloat(selectedVariant.salePrice).toFixed(2)
    : product?.variantValues && product.variantValues.length > 0
    ? parseFloat(product?.variantValues[0]?.salePrice).toFixed(2)
    : 0;

  const initialBatteryOption = `£${standardBatteryPrice}`;
  const [updatedPrice, setUpdatedPrice] = useState<number>(
    parseFloat(standardBatteryPrice.toString())
  );

  const [selectedBatteryOption, setSelectedBatteryOption] = useState("");
  useEffect(() => {
    setSelectedBatteryOption(initialBatteryOption);
    setUpdatedPrice(parseFloat(standardBatteryPrice.toString()));
  }, [initialBatteryOption, standardBatteryPrice]);

  const handleBatteryOptionChange = (selectedOption: string) => {
    setSelectedBatteryOption(selectedOption);
    const selectedVariantId = selectedVariant?._id;
    if (selectedOption === `£${batteryPrice.toFixed(2)}`) {
      const standardPrice = selectedVariant?.salePrice
        ? parseFloat(selectedVariant.salePrice)
        : 0;
      const newPrice = standardPrice + parseFloat(batteryPrice.toFixed(2));
      setUpdatedPrice(newPrice);

      // Update the salePrice of the product in the cart
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingProductIndex = cart.findIndex(
        (item: ProductData) => item._id === selectedVariantId
      );
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].salePrice = newPrice;
        localStorage.setItem("cart", JSON.stringify(cart));
        setProducts(cart);
      }
    } else if (selectedOption === initialBatteryOption) {
      setUpdatedPrice(parseFloat(standardBatteryPrice.toString()));

      // Update the salePrice of the product in the cart
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const existingProductIndex = cart.findIndex(
        (item: ProductData) => item._id === selectedVariantId
      );
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].salePrice = parseFloat(
          standardBatteryPrice.toString()
        );
        localStorage.setItem("cart", JSON.stringify(cart));
        setProducts(cart);
      }
    }
  };
  const batteryOptions = [
    {
      name: "Standard Battery",
      value: `£${standardBatteryPrice}`,
    },
    {
      name: "New Battery",
      value: `£${batteryPrice.toFixed(2)}`,
    },
  ];
  const batteryStatus = product?.battery?.[0]
    ? JSON.parse(product.battery[0]).status
    : false;
  const totalSalePrice = calculateTotalSalePrice(products);
  // console.log("Product", selectedVariant?.metaSchemas);
  return (
    <>
      <NewsletterModal mode="product" />
      <header className="relative">
        <TopBar />
        <Nav />
      </header>
      <BreadCrumb
        breadcrumb={breadcrumb.map((item) => ({
          ...item,
          name: item.name ?? "",
        }))}
      />

      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 md:pb-20 pb-10">
        {selectedVariant?.metaSchemas &&
          selectedVariant.metaSchemas.length > 0 && (
            <>
              {selectedVariant?.metaSchemas?.map((schema, index) => {
                try {
                  const parsedSchema =
                    typeof schema === "string" ? JSON.parse(schema) : schema;

                  // Additional check to ensure parsedSchema is a valid object
                  if (
                    !parsedSchema ||
                    typeof parsedSchema !== "object" ||
                    Object.keys(parsedSchema).length === 0
                  ) {
                    console.warn(`Invalid schema at index ${index}:`, schema);
                    return null;
                  }

                  return (
                    <script
                      key={index}
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify(parsedSchema),
                      }}
                    />
                  );
                } catch (error) {
                  console.error(
                    `Error parsing schema at index ${index}:`,
                    error
                  );
                  return null;
                }
              })}
            </>
          )}
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <ImagePart
              images={images}
              selectedVariant={selectedVariant}
              isZoomed={isZoomed}
              setIsZoomed={setIsZoomed}
            />
            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <ProductInfo
                product={product}
                totalReviews={totalReviews}
                averageRating={averageRating}
                selectedOptions={selectedOptions}
                selectedVariant={selectedVariant}
              />

              <DeliverySection
                product={product}
                isZoomed={isZoomed}
                setOpenWarranty={setOpenWarranty}
                setSimOptions={setSimOptions}
                setVerifiedRefurbished={setVerifiedRefurbished}
              />
              <div
                className={`mt-6 space-y-5 relative ${
                  isZoomed ? "-z-10" : "z-0"
                }`}
              >
                <VariantFields
                  product={product}
                  setOpenConditionDescription={setOpenConditionDescription}
                  setVariantDesc={setVariantDesc}
                  setActiveTab={setActiveTab}
                  selectedOptions={selectedOptions}
                  handleOptionChange={handleOptionChange}
                  processOptionValue={processOptionValue}
                  checkIfSoldOut={checkIfSoldOut}
                  conditionPrices={conditionPrices}
                />
                <BatterySect
                  batteryStatus={batteryStatus}
                  batteryOptions={batteryOptions}
                  selectedBatteryOption={selectedBatteryOption}
                  handleBatteryOptionChange={handleBatteryOptionChange}
                  setOpenBattery={setOpenBattery}
                />
                {/* comes with  */}

                <ComesWith product={product} />

                <SimOptions
                  product={product}
                  selectedSim={selectedSim}
                  setSelectedSim={setSelectedSim}
                  setNotIncluded={setNotIncluded}
                />
              </div>

              {/* summary/spec Button */}
              <DialogList
                selectedVariant={selectedVariant}
                openFAQs={openFAQs}
                setOpenFAQs={setOpenFAQs}
                openPerks={openPerks}
                setOpenPerks={setOpenPerks}
                openSpecs={openSpecs}
                setOpenSpecs={setOpenSpecs}
                checkIfSoldOut={checkIfSoldOut}
                isBuyButtonDisabled={isBuyButtonDisabled}
                setOpenCart={setOpenCart}
                isZoomed={isZoomed}
                addToCart={addToCart}
                reviewsDiv={reviewsDiv}
                setReviewsDiv={setReviewsDiv}
              />
            </div>
          </div>
          <div>
            
            <ReviewsDiv
              product={product}
              reviewsDiv={reviewsDiv}
              isZoomed={isZoomed}
              averageRating={averageRating}
              setAverageRating={setAverageRating}
              totalReviews={totalReviews}
              setTotalReviews={setTotalReviews}
            />


            <TrustBoxWidget />
            <Suspense fallback={<Loading/>}>
              <RecentlyViewed product={product!} />
            </Suspense>
            <div className="max-w-screen-xl mx-auto w-full px-4">
              <div className="bg-white rounded-lg shadow-xl border border-gray-200  px-4 sm:px-6 py-3 relative -z-20">
                <ProductSummary product={product} />
                <ProductDescription product={product} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ProductBattery
        openBattery={openBattery}
        setOpenBattery={setOpenBattery}
      />
      <BuyNow
        setOpenCart={setOpenCart}
        product={product}
        deliveryStartStr={deliveryStartStr}
        deliveryEndStr={deliveryEndStr}
        selectedVariant={selectedVariant}
        selectedSim={selectedSim}
        addToCart={addToCart}
        selectedOptions={selectedOptions}
        isBuyButtonDisabled={isBuyButtonDisabled}
        updatedPrice={updatedPrice}
      />
      <ProductCart
        openCart={openCart}
        setOpenCart={setOpenCart}
        isZoomed={isZoomed}
        totalSalePrice={Number(totalSalePrice)}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        products={products}
      />

      <ProductPerks openPerks={openPerks} setOpenPerks={setOpenPerks} />
      <ProductFAQS openFAQs={openFAQs} setOpenFAQs={setOpenFAQs} />
      <ConditionDescription
        openConditionDescription={openConditionDescription}
        setActiveTab={setActiveTab}
        setOpenConditionDescription={setOpenConditionDescription}
        variantDesc={variantDesc}
        activeTab={activeTab}
      />
      <ProductSpecs
        openSpecs={openSpecs}
        setOpenSpecs={setOpenSpecs}
        product={product}
      />
      <ProductWarranty
        openWarranty={openWarranty}
        setOpenWarranty={setOpenWarranty}
      />
      <ProductVerifiedRefurbished
        verifiedRefurbished={verifiedRefurbished}
        setVerifiedRefurbished={setVerifiedRefurbished}
      />
      <ProductSimOptions
        simOptions={simOptions}
        setSimOptions={setSimOptions}
      />
      <ProductNotIncluded
        notIncluded={notIncluded}
        setNotIncluded={setNotIncluded}
      />
    </>
  );
}
