/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, {
  Suspense,
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
import { useParams } from "next/navigation";
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
import { updateProductUrl as updateProductUrlService, updateCanonicalUrl as updateCanonicalUrlService } from "../services/urlService";
import { updatePageMetadata } from "../services/metadataService";
import { addToCart as addToCartService, removeFromCart as removeFromCartService, updateCartQuantity as updateCartQuantityService, calculateTotalSalePrice as calculateTotalSalePriceService } from "../services/cartService";
import { getBatteryStatus, getBatteryPrice, getStandardBatteryPrice, generateBatteryOptions, updateProductPriceInCart } from "../services/batteryService";
import {
  processOptionValue,
  checkIfSoldOut,
  findInitialSelectedVariant as findInitialSelectedVariantService,
  extractOptionsFromVariantName as extractOptionsFromVariantNameService,
  findVariant as findVariantService,
  parseVariantParts as parseVariantPartsService,
  extractBaseProductName as extractBaseProductNameService,
  updateSelectedVariant as updateSelectedVariantService,
} from "../services/variantService";
import { calculateDeliveryDates, getProductImages, createBreadcrumb } from "../services/productDataService";
import { HARD_DISK_TYPES, CONDITIONS_SPACED } from "../services/constants";
export default function ProductPage({
  product,
  variantInfo: _variantInfo,
}: {
  product: ProductData;
  variantInfo: any;
}) {
  const { slug } = useParams();
  const productName = slug;
  const [products, setProducts] = useState<CartItem[]>([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedVariant, setSelectedVariant] =
    useState<SelectedVariant | null>(null);
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
  const [, setNavToken] = useState<number>(0);
  const [selectedSim, setSelectedSim] = useState<string>("");
  const [, setIsSoldOut] = useState<boolean>(false);
  const [isBuyButtonDisabled, setIsBuyButtonDisabled] =
    useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [variantDesc, setVariantDesc] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("");
  const [, setIsLoading] = useState<boolean>(true);
  // Api call for product details


  const breadcrumb = createBreadcrumb(product, productName as any);
  const { deliveryStartStr, deliveryEndStr } = calculateDeliveryDates();
  // Images
  const images = useMemo(() => getProductImages(product, selectedVariant), [product, selectedVariant]);
  useEffect(() => {
    if (images?.length > 0) {
      setIsLoading(false);
    }
  }, [images]);

  // Sold Out
  const hardDiskTypes: string[] = [...HARD_DISK_TYPES];
  const updateSelectedVariant = (selectedOptions: Record<string, string>) => {
    const { selectedVariant: sel, conditionPrices } = updateSelectedVariantService(product, selectedOptions);
    setConditionPrices(conditionPrices ?? []);
    setSelectedVariant(sel);
  };

  const findInitialSelectedVariant = () => findInitialSelectedVariantService(product);
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
        updateProductUrlService(product, selectedVariantCombination, newSelectedOptions);
      }, 0);
      
      return newSelectedOptions;
    });
  };
  

  const findVariant = (selectedOptions: Record<string, string>) => findVariantService(product, selectedOptions);
  const initialOptionsSet = useRef(false);
  useEffect(() => {
    try {
      if (product && product.variantNames && !initialOptionsSet.current) {
        let initialSelectedOptions: { [key: string]: string } = {};
        let variantFound = false;
        // Extract base product name and variant information from the URL
        const lastPathSegment = typeof window !== "undefined"
          ? window.location.pathname.split("/").pop() || ""
          : "";
        const { variantInfo } = extractBaseProductNameService(lastPathSegment);
        // console.log('Extracted baseProductName:', baseProductName);
        // console.log('Extracted variantInfo:', variantInfo);
        let urlVariantParts = variantInfo ? variantInfo.split("-") : [];
        // console.log('URL Variant Parts:', urlVariantParts);

      const conditions: string[] = [...CONDITIONS_SPACED];
   
      if (urlVariantParts.length >= 2) {
        const [storage, color, condition] = parseVariantPartsService(
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

      const selectedVariantFromURL = findVariantService(product, initialSelectedOptions);

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
              extractOptionsFromVariantNameService(availableVariant.name, hardDiskTypes);

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
    } catch (err) {
      console.error("Error while initializing options from URL:", err);
    }
  }, [
    product,
    setSelectedVariant,
    updateSelectedVariant,
    setSelectedOptions,
    findVariant,
    hardDiskTypes,
    extractOptionsFromVariantNameService,
  ]);

  // Cart Data
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const cartData = window.localStorage.getItem("cart");
      const cart = cartData ? JSON.parse(cartData) : [];
      setProducts(cart);
    } catch (e) {
      console.warn("Failed to read cart from localStorage:", e);
      setProducts([]);
    }
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // Initial URL update on component mount and when product/variant changes
  useEffect(() => {
    try {
      if (product && selectedVariant && selectedOptions) {
        updateProductUrlService(product, selectedVariant, selectedOptions);
        updatePageMetadata(product, selectedVariant, selectedOptions);
      }
    } catch (err) {
      console.error("Error updating URL/metadata:", err);
    }
  }, [product, selectedVariant, selectedOptions]);
  
  
  // Set canonical URL on initial page load
  useEffect(() => {
    try {
      if (product && product.producturl && typeof window !== "undefined") {
        // Get current URL path without domain
        const currentPath = window.location.pathname;
        const productSlug = currentPath.split('/products/')[1] || product.producturl;
        
        // Update canonical URL with current path
        updateCanonicalUrlService(productSlug);
      }
    } catch (err) {
      console.error("Error updating canonical URL:", err);
    }
  }, [product]);
  
  // Debug logging for URL and selected options
  useEffect(() => {
    if (selectedOptions && Object.keys(selectedOptions).length > 0) {
      console.log("Current selected options:", selectedOptions);
      if (typeof window !== "undefined") {
        console.log("Current URL:", window.location.href);
      }
    }
  }, [selectedOptions]);

  const addToCart = (variant: { [x: string]: string; _id: string }) => {
    const cart = addToCartService(variant, product, selectedSim, updatedPrice);
    setProducts(cart);
    setNavToken((prevToken) => prevToken + 1);
  };

  const removeFromCart = (id: string) => {
    const cart = removeFromCartService(id);
    setProducts(cart);
    setNavToken((prevToken) => prevToken + 1);
  };
  const updateCartQuantity = (quantity: number, id: string) => {
    const cart = updateCartQuantityService(quantity, id);
    setProducts(cart);
    setNavToken((prevToken) => prevToken + 1);
  };
  const calculateTotalSalePrice = (
    products: { salePrice: number; qty: number }[]
  ): string => {
    return calculateTotalSalePriceService(products);
  };
  // Battery options
  const batteryPrice = getBatteryPrice(product);
  const standardBatteryPrice = getStandardBatteryPrice(selectedVariant, product);

  const initialBatteryOption = `£${standardBatteryPrice}`;
  const [updatedPrice, setUpdatedPrice] = useState<number>(
    parseFloat(standardBatteryPrice)
  );

  const [selectedBatteryOption, setSelectedBatteryOption] = useState("");
  useEffect(() => {
    setSelectedBatteryOption(initialBatteryOption);
    setUpdatedPrice(parseFloat(standardBatteryPrice.toString()));
  }, [initialBatteryOption, standardBatteryPrice]);

  const handleBatteryOptionChange = (selectedOption: string) => {
    setSelectedBatteryOption(selectedOption);
    const newPrice = updateProductPriceInCart(
      selectedOption,
      standardBatteryPrice,
      selectedVariant,
      batteryPrice
    );
    setUpdatedPrice(newPrice);
    // Refresh cart state from localStorage to reflect any updates
    try {
      if (typeof window !== "undefined") {
        const data = window.localStorage.getItem("cart");
        const parsed = data ? JSON.parse(data) : [];
        setProducts(parsed);
      }
    } catch (e) {
      console.warn("Failed to refresh cart from localStorage:", e);
    }
  };
  const batteryOptions = generateBatteryOptions(standardBatteryPrice, batteryPrice);
  const batteryStatus = getBatteryStatus(product);
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
