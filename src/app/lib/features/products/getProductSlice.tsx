// redux/getProductsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../../../../types";

interface ProductsState {
  products: Product[]; // Array of products
  isLoading: boolean;
  error: string | null;
}

// Thunk for fetching products
export const fetchProducts = createAsyncThunk<
  Product[], // The returned data type (an array of Product objects)
  void, // No argument is passed to the thunk
  { rejectValue: string } // The type of the error
>("products/fetchProducts", async (_, { rejectWithValue, getState }) => {
  const state = getState() as { auth: { ip: string } }; // Type the getState() return
  const ip = state.auth.ip; // Get API base URL from auth state

  try {
    const response = await axios.get(`/api/products/homepage`, { timeout: 8000 });

    if (response.data.status === 201) {
      return response.data.products; // Return products if successful
    } else {
      return rejectWithValue(response.data.message); // Reject with error message
    }
  } catch (error: any) {
    return rejectWithValue(error.message); // Reject with error message
  }
});

// Products Slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [], // Initialize products as an empty array
    isLoading: false,
    error: null,
  } as ProductsState, // Type the initial state
  reducers: {}, // No synchronous reducers for now
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous error on new request
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.isLoading = false;
          state.products = action.payload; // Set fetched products in state
        }
      )
      .addCase(
        fetchProducts.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string; // Set error message
        }
      );
  },
});

export default productsSlice.reducer;
