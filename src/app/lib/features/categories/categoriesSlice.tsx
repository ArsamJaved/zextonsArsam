// redux/productCategorySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define a Type for the product category based on the response structure
interface ThumbnailImage {
  filename: string;
  path: string;
}

interface MetaSchema {
  // Add the structure of metaSchemas if needed
  [key: string]: string;
}

interface ProductCategory {
  _id: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  isPublish: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  subCategory: string[];
  metaSchemas: MetaSchema[];
  content: string | null;
  Logo: ThumbnailImage;
  bannerImage: ThumbnailImage;
  metaImage: ThumbnailImage | null;
  metasubCategory: SubCategory[];
}

interface SubCategory {
  subcategoryName: string;
  subCategoryIndex: number;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  metaSchemas: string[];
  content: string | null;
  _id: string;
}

interface ProductCategoryState {
  categories: ProductCategory[];
  isLoading: boolean;
  error: string | null;
}

// Initial state of the product category slice
const initialState: ProductCategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

// Async thunk to fetch product categories
export const fetchProductCategory = createAsyncThunk<
  ProductCategory[], // Return type of the fulfilled action
  string, // Argument type (category string)
  { rejectValue: string } // Reject value type
>(
  "productCategory/fetchProductCategory",
  async (category, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { ip: string } }; // Assuming you have an auth slice for IP
    const ip = state.auth.ip;

    try {
      const response = await axios.get(`${ip}get/product/category/customized`);
      if (response.data.status === 201) {
        console.log(response.data.productCategories);
        return response.data.productCategories; // Return the categories
      } else {
        return rejectWithValue(response.data.message); // Reject with message if not success
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message); // Reject with error message
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Create slice for product categories
const productCategorySlice = createSlice({
  name: "productCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProductCategory.fulfilled,
        (state, action: PayloadAction<ProductCategory[]>) => {
          state.isLoading = false;
          state.categories = action.payload; // Update categories when fulfilled
        }
      )
      .addCase(
        fetchProductCategory.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? "An error occurred"; // Set error message if rejected
        }
      );
  },
});

export default productCategorySlice.reducer;
