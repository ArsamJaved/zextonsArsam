import { ProductData, SelectedVariant } from "../../../../../types";

/**
 * Update product URL based on selected options
 */
export const updateProductUrl = (
  product: ProductData | undefined,
  selectedVariant: SelectedVariant | null,
  currentOptions: Record<string, string>
): void => {
  if (!product || !product.producturl) return;
  if (typeof window === "undefined") return;
  
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
  if (window.location.pathname !== expectedUrl) {
    console.log("Updating URL to:", expectedUrl);
    try {
      window.history.replaceState({}, "", expectedUrl);
      // Update canonical URL
      updateCanonicalUrl(variantName ? `${product.producturl}-${variantName}` : product.producturl);
    } catch (e) {
      console.warn("Failed to update URL/canonical:", e);
    }
  }
};

/**
 * Update canonical URL tag in document head
 */
export const updateCanonicalUrl = (productUrlWithVariant: string): void => {
  if (typeof document === "undefined" || typeof window === "undefined") return;
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
};
