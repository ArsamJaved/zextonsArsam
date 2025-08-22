// Centralized constants for the products route

// API endpoints used across product pages
export const API_ENDPOINTS = {
  GET_PRODUCT_BY_URL: "https://api.zextons.co.uk/get/product/by/url",
} as const;

// Storage and disk type identifiers that can appear in variant names
export const HARD_DISK_TYPES = [
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
] as const;

// Condition labels in spaced format (used when parsing URL parts into human-friendly values)
export const CONDITIONS_SPACED = [
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
  // Additional generic conditions used elsewhere
  "good",
  "very good",
  "excellent",
  "poor",
  "fair",
  "mint",
  "new",
] as const;

// Condition labels in hyphenated format (used for regex on slug in server component)
export const CONDITIONS_HYPHENATED = [
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
] as const;
