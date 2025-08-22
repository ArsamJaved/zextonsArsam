// components/homepage/categories/ProductCard.tsx

import React, { memo } from "react";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useAuth } from "@/app/context/Auth";
import { Product } from "../../../types";
import { useAppDispatch } from "../lib/hooks";
import { addProduct } from "@/app/lib/features/recentlyviewedproducts/recentlyViewedSlice";


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const auth = useAuth();
  const dispatch=useAppDispatch();
  const minPrice = product.minPrice;
  const minSalePrice = product.minSalePrice;
  const discountPercentage = Math.round(
    ((minPrice - minSalePrice) / minPrice) * 100
  );
  const productNameSlug = product.producturl;
  const averageRating = product.averageRating ? Math.round(product.averageRating * 10) / 10 : 0; // Round to one decimal place or default to 0
  const handleProductClick = () => {
    // Dispatch the product data to Redux
    dispatch(addProduct(product));
  };
  return (
    <Link href={`/products/${productNameSlug}`}>
      <div className="max-w-screen-xl mx-auto py-5 sm:py-10" onClick={handleProductClick}>
        <div className="bg-white rounded-lg shadow-xl sm:p-5 p-2 md:mb-0 mb-5 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-card-shadow group cursor-pointer flex flex-col justify-between h-full">
          <div className="mb-2 flex justify-between align-middle">
            <div>
              <span className="bg-gray-200 text-black xs:px-2 px-1 py-1 rounded-lg text-sm text-nowrap">
                {product.condition}
              </span>
            </div>
            <div className="sm:text-sm text-[10px] bg-black px-2 text-white rounded-lg flex flex-col items-center justify-center ms-1 text-nowrap">
              <span>{discountPercentage}% OFF</span>
            </div>
          </div>

          {/* Fixed height for product name */}
          <div className="text-lg mb-2 h-16 flex items-start">
            <span className="line-clamp-2 md:line-clamp-2">
              {product.name}
            </span>
          </div>

          {/* Ensure image container is consistent */}
          <div className="relative w-full sm:h-56 h-56 flex items-center justify-center">
            <Image
              className="object-contain transform transition-transform duration-1500 ease-in-out scale-105 group-hover:scale-110"
              src={`${auth.ip}${product.thumbnail_image.path}`}
              alt="Product Image"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
            />
          </div>

          {/* Force bottom section to align consistently */}
          <div className="flex flex-row justify-between items-end md:mt-5 mt-auto w-full">
            <div>
              <small className="text-gray-500 flex gap-1">
                From <del>£{minPrice}</del>
              </small>
              <div className="text-xl sm:text-2xl">£{minSalePrice}</div>
            </div>
            <div className="py-1 text-sm font-regular text-yellow-400 flex flex-row items-center">
              {[0, 1, 2, 3, 4].map((ratingIndex) => {
                const isFullStar = ratingIndex + 1 <= Math.floor(averageRating);
                const isHalfStar = !isFullStar && ratingIndex < averageRating;
                return (
                  <StarIcon
                    key={ratingIndex}
                    className={`h-4 w-4 ${
                      isFullStar
                        ? "text-amber-300"
                        : isHalfStar
                        ? "text-amber-200"
                        : "text-gray-300"
                    }`}
                    aria-hidden="true"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});
// Add display name for the memoized component
ProductCard.displayName = "ProductCard";

export default ProductCard;
