import React from "react";

export default function ProductSummary({ product }: { product: any }) {
  return (
    <>
      <section className="relative z-10">
        <div className="flex h-full flex-col mb-5">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Product Summary :
            </h2>
          </div>
          <div className="relative flex-1 z-10">
            <div
              className="text-justify rounded-xl whitespace-pre-wrap break-words !text-black"
              dangerouslySetInnerHTML={{
                __html: product
                  ? product.Product_summary
                  : "<p>No content provided</p>",
              }}
            />
          </div>
        </div>
      </section>
      
    </>
  );
}
