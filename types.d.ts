export interface ThumbnailImage {
  filename: string;
  path: string;
}
export interface CategoryData {
  _id: string;
  name: string;
  isPublish: boolean;
  isFeatured: boolean;
  subCategory: string[];
  order: number;
  createdAt: string;
}
export interface Product {
  _id: string;
  name: string;
  category: string;
  
  subCategory: string; // You might want to type this more specifically if needed
  condition: string;
  is_featured: boolean;
  thumbnail_image: ThumbnailImage;
  createdAt: string;
  updatedAt: string;
  producturl: string;
  minPrice: number;
  minSalePrice: number;
  averageRating: number | null;
}
export interface ProductData {
  is_refundable: {
    status: boolean;
    refund_duration: number;
    refund_type: string;
  };
  description: string;
  comes_With: {
    powerAdapter: boolean;
    powerCable: boolean;
    protectionBundle: boolean;
    treePlanted: boolean;
    hdmi: boolean | null;
    powerCableNewIncluded: boolean | null;
    onexcontroller: boolean | null;
    twoxcontroller: boolean | null;
    freeSim: boolean;
    onexBackCover: boolean | null;
    onexScreenProtector: boolean | null;
  };
  thumbnail_image: {
    filename: string;
    path: string;
  };
  has_warranty: {
    status: boolean;
    has_replacement_warranty: boolean;
    Warranty_duration: number;
    Warranty_type: string;
  };
  productType: {
    type: string;
  };
  Seo_Meta: {
    metaTitle: string | null;
    metaDescription: string | null;
    metaKeywords: string | null;
    metaSchemas: any[];
  };
  _id: string;
  name: string;
  producturl: string;
  category: string;
  subCategory: string;
  brand: string;
  battery: string[];
  condition: string;
  tags: string;
  is_featured: boolean;
  is_authenticated: boolean;
  low_stock_quantity_alert: number | null;
  sim_options: string;
  product_Specifications: {
    key: string;
    value: string;
  }[];
  variantDescription: {
    condition: Record<string, string>;
    color: Record<string, string>;
    storage: Record<string, string>;
  }[];
  Gallery_Images: {
    filename: string;
    path: string;
  }[];
  variantValues: {
    metaImage: {
      filename: string;
      path: string;
    };
    name: string;
    variantImages: {
      filename: string;
      path: string;
    }[];
    Cost: number | null;
    Price: number;
    Quantity: number | null;
    SKU: string;
    EIN: string;
    MPN: string | null;
    salePrice: string;
    metaTitle: string;
    metaKeywords: string;
    metaSchemas: any[];
    metaDescription: string;
    _id: string;
  }[];
  variantNames: {
    name: string;
    options: string[];
    _id: string;
  }[];
  varImgGroup: {
    name: string;
    varImg: {
      filename: string;
      path: string;
    }[];
    _id: string;
  }[];
  Product_summary: string;
  Product_description: string;
  status: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
  reviewDetails: any[];
  __v: number;
  seeAccessoriesWeDontNeed: boolean;
  isdeleted: boolean;
}
export interface SelectedVariant {
  metaImage: {
    filename: string;
    path: string;
  };
  name: string;
  variantImages: {
    filename: string;
    path: string;
  }[];
  Cost: number | null;
  Price: number;
  Quantity: number | null;
  SKU: string;
  EIN: string;
  MPN: string | null;
  salePrice: string;
  metaTitle: string;
  metaKeywords: string;
  metaSchemas: string[];
  metaDescription: string;
  _id: string;
}
export interface VariantDetails {
  metaImage: {
    filename: string;
    path: string;
  };
  name: string;
  variantImages: {
    filename: string;
    path: string;
  }[];
  Cost: number | null;
  Price: number;
  Quantity: number | null;
  SKU: string;
  EIN: string;
  MPN: string | null;
  salePrice: string;
  metaTitle: string;
  metaKeywords: string;
  metaSchemas: string[]; // Array of schema strings
  metaDescription: string;
  _id: string;
}
export interface ExtractedOptions {
  [key: string]: string;
  condition: string;
  color: string;
  storage: string;
}
export interface ConditionPrices {
  condition: string;
  price: number;
  salePrice: string;
}
export interface SelectedOptions {
  [key: string]: string;
  condition: string;
  color: string;
  storage: string;
}

export interface SelectedOptions {
  [variantName: string]: string;
}

export interface CartItem {
  _id: string;
  productName: string | undefined;
  qty: number;
  productId: string;
  salePrice: number;
  selectedSim: string;
  productthumbnail?: string;
  name: string;
}


export interface Category {
  _id: string;
  name: string;
  bannerImage?: {
    path: string;
  };
  content?: string;
  metaTitle?: string;
  metaSchemas?: any[]; // Replace `any` with a more specific type if available
  metaDescription?: string;
  subCategory: string[];
  metasubCategory: {
    subcategoryName: string;
    metaTitle: string;
    metaDescription: string;
    content: string;
  }[];
}
export interface SortOption {
  name: string;
  key: string;
  sortFunc: (a: any, b: any) => number;
}

export interface Category {
  _id: string;
  name: string;
  isPublish: boolean;
  isFeatured: boolean;
  subCategory: string[];
  order: number;
  createdAt: string;
}
export interface NavbarCategory {
  categories: Category[]; // Add the missing data property
  loading: boolean;
  error: string | null;
}
export interface Blog {
  _id: string;
  permalink: string;
  name: string;
  thumbnailImage: string;
  blogthumbnailImageAlt: string;
  content?: string;
  blogImage: string;
  blogImageAlt: string;
  blogShortDescription?: string;
  blogCategory: string;
  createdAt?: string;
  updatedAt?: string;
  blogpublisheddate: string;
  title?: string;
  categories?: (string | { name: string })[];

}
export interface BlogData {
  _id: string;
  permalink: string;
  name: string;
  content: string;
  blogImage: string;
  blogImageAlt: string;
  blogShortDescription: string;
  blogCategory: string;
  createdAt: string;
  updatedAt: string;
  blogpublisheddate: string;
}
export interface Offer {
  coupontext?: string;
  type: string;
  emoji: string;
  title: string;
  desc: string;
  expiry: string;
  link?: string; // Make the link property optional
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}


export interface User {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
  firstname: string;
  lastname: string;
  companyname: string;
  phoneNumber: string;
  password: string;
  address: {
    address: string;
    apartment: string;
    city: string;
    country: string;
    state: string;
    county: string;
    postalCode: string;
  } 
  // add other fields depending on your user data
}


// Checkout types
export interface Address {
  address: string;
  apartment?: string;
  country: string;
  city: string;
  county?: string;
  postalCode: string;
}

export interface ShippingInformation {
  firstName: string;
  lastName: string;
  companyName: string;
  address: string;
  apartment: string;
  country: string;
  city: string;
  county: string;
  postalCode: string;
  phoneNumber: string;
}

export interface Errors {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  county: string;
  country: string;
  postalCode: string;
  password: string;
  confirmPassword: string;
  [key: string]: string;
}

export interface ContactInfo {
  email: string;
  userId: string;
}

export interface Coupon {
  code: string;
  discount_type: "flat" | "percentage";
  discount: number;
  upto?: number;
}

export interface ProductItem {
  _id: string;
  name: string;
  productName: string;
  salePrice: number;
  qty: number;
  variantImages?: { path: string }[];
  productthumbnail?: { path: string };
  selectedSim?: string;
}
// types/Product.ts

export interface VariantImage {
  path: string;
}

export interface ProductItem {
  _id: string;
  name: string;
  productName: string;
  salePrice: number;
  qty: number;
  variantImages?: VariantImage[];
  productthumbnail?: VariantImage;
  selectedSim?: string;
}

export interface Coupon {
  code: string;
  discount_type: 'flat' | 'percentage';
  discount: number;
  upto?: number;
}

export interface ProductDetailsProps {
  discountedPrice: number;
  products: ProductItem[];
  removeFromCart: (productId: string) => void;
  totalSalePrice: number;
  appliedCoupon?: Coupon | null;
  isChecked: boolean;
  handleTermsCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showWarning: boolean;
  enteredCoupon: string;
  handleCouponInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCouponValid: boolean;
  handleApplyCoupon: (e: React.MouseEvent<HTMLButtonElement>) => void;
  updateCheckoutSession: () => void;
}
// Loginn types
export interface Errors {
  email?: string;
  password?: string;
}

export interface LoginFormProps {
  toggleFormVisibility: () => void;
  showForm: boolean;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleLogin: () => void;
  errors: Errors;
}

export interface Window {
  dataLayer: any[];
}
