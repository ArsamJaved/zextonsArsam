export const normalizeColor = (color: string) => {
  return color.replace(/\s*\(#[a-fA-F0-9]+\)/, "").toLowerCase();
};
export const getSeoMetaData = (
  response: any,
  variantInfoFromUrl: string | null = null
) => {
  const productMetaData = response.productMetaData;
  const productType = response.productType?.type;

  if (!productMetaData || !productType) {
    console.warn("Product metadata or product type is missing.");
    return {
      metaTitle: "Default Title",
      metaDescription: "Default Description",
      metaKeywords: "",
      metaSchemas: [],
      metaImage: "",
    };
  }

  const defaultTitle = `Buy ${response.name} at Zextons`;
  const defaultDescription = `Get ${response.name} in excellent condition`;

  let metaTitle = defaultTitle;
  let metaDescription = defaultDescription;
  let metaKeywords = response.name || "";
  let metaSchemas = [];
  let metaImage = "";

  if (productType === "variant") {
    const variantValues = response.variantMetaDatas || [];
    let matchedVariant = null;

    if (variantInfoFromUrl && Array.isArray(variantValues)) {
      // Compare variant info from URL with the variant names
      matchedVariant = variantValues.find((variant: any) => {
        const sanitizedVariantName = variant.name.toLowerCase();
        const formattedUrlParts = variantInfoFromUrl
          .toLowerCase()
          .split("-")
          .filter(Boolean); // Remove empty parts

        return formattedUrlParts.every((part) =>
          sanitizedVariantName.includes(part)
        );
      });
    }

    const activeVariant = matchedVariant || variantValues[0];
    if (activeVariant) {
      metaTitle = activeVariant.metaTitle || defaultTitle;
      metaDescription = activeVariant.metaDescription || defaultDescription;
      metaKeywords = activeVariant.metaKeywords || response.name;
      metaSchemas = activeVariant.metaSchemas || [];
      metaImage = activeVariant.metaImage?.path || "";
    } else {
      console.warn("No matching variant found; using default metadata.");
    }
  } else if (productType === "single") {
    metaTitle = productMetaData.metaTitle || defaultTitle;
    metaDescription = productMetaData.metaDescription || defaultDescription;
    metaKeywords = productMetaData.metaKeywords || response.name;
    metaSchemas = productMetaData.metaSchemas || [];
    metaImage = response.meta_Image?.path || "";
  }

  return {
    metaTitle,
    metaDescription,
    metaKeywords,
    metaSchemas,
    metaImage,
  };
};

export const extractBaseProductName = (fullName: string) => {
  const cleanedName = fullName.startsWith("/")
    ? fullName.substring(1)
    : fullName;

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

  const conditionPattern = conditions.join("|");
  const regex = new RegExp(`\\b(${conditionPattern})\\b`, "i");

  const match = cleanedName.match(regex);

  if (match && match.index !== undefined) {
    const index = match.index;
    const conditionLength = match[0].length;

    const baseProductName = cleanedName
      .substring(0, index + conditionLength)
      .replace(/-+$/g, "");
    const variantInfo = cleanedName
      .substring(index + conditionLength)
      .replace(/^-+/g, "");

    return { baseProductName, variantInfo };
  } else {
    return { baseProductName: cleanedName, variantInfo: "" };
  }
}; // Function to fetch subcategory data dynamically
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
// function escapeRegExp(string: string) {
//   return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// }
// const hardDiskTypePattern = hardDiskTypes.map(escapeRegExp).join("|");
// const extractOptionsFromVariantName = (variantName: string) => {
//   const conditionRegex = /^(.*?)-/;
//   const storageRegex = new RegExp(
//     `(\\d+(?:GB|TB)(?:\\s*(?:${hardDiskTypePattern}))?)`,
//     "i"
//   );
//   const colorRegex = new RegExp(
//     `-(.*?)(\\(\\#\\w+\\))?-(\\d+(?:GB|TB)(?:\\s*(?:${hardDiskTypePattern}))?)`,
//     "i"
//   );

//   const conditionMatch = variantName.match(conditionRegex);
//   const storageMatch = variantName.match(storageRegex);
//   const colorMatch = variantName.match(colorRegex);

//   const condition = conditionMatch ? conditionMatch[1].trim() : "";
//   const storage = storageMatch ? storageMatch[1].trim() : "";
//   let color = colorMatch ? colorMatch[1].trim() : "";

//   // Include color code if present
//   const colorCode = colorMatch && colorMatch[2] ? colorMatch[2].trim() : "";
//   color = `${color} ${colorCode}`.trim();

//   //   console.log(`Extracted Options:
//   //   Condition: '${condition}'
//   //   Color: '${color}'
//   //   Storage: '${storage}'
//   // `);

//   return {
//     condition: condition.toLowerCase(),
//     color: color.toLowerCase(),
//     storage: storage.toLowerCase(),
//   };
// };
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
export function getVariantFromUrlAndMetadata(
  apiResponse: any,
  urlPath: string
) {
  // Extract base product name and variant information from the URL
  const { variantInfo } = extractBaseProductName(
    urlPath.split("/").pop() || ""
  );

  const urlVariantParts = variantInfo ? variantInfo.split("-") : [];
  const { variantMetaDatas } = apiResponse;

  if (!variantMetaDatas || !Array.isArray(variantMetaDatas)) {
    console.warn("Invalid variantMetaDatas in API response");
    return null;
  }

  let formattedUrlVariantParts = urlVariantParts;

  // Parse variant parts if the URL contains multiple components
  if (urlVariantParts.length >= 2) {
    const [storage, color, condition] = parseVariantParts(
      urlVariantParts,
      conditions,
      hardDiskTypes
    );

    formattedUrlVariantParts = [storage, color, condition];
  }

  // Find a matching variant
  for (const metadata of variantMetaDatas) {
    const sanitizedVariantName = metadata.name.toLowerCase();
    const matchesAllParts = formattedUrlVariantParts.every((part) =>
      sanitizedVariantName.includes(part.toLowerCase())
    );

    if (matchesAllParts) {
      return metadata; // Return the first matching variant
    }
  }

  console.warn("No matching variant found for URL variant info");
  return null;
}
