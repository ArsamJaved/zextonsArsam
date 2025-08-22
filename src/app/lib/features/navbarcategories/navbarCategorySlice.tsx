import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define types for Navbar Category
interface NavbarCategory {
  _id: string;
  name: string;
  isPublish: boolean;
  isFeatured: boolean;
  subCategory: string[];
  order: number;
  createdAt: string;
}

interface NavbarCategoryState {
  categories: NavbarCategory[];
  isLoading: boolean;
  error: string | null;
}

// Thunk for fetching navbar categories
interface RootState {
  auth: {
    ip: string;
  };
}

/**
 * Fetches navbar categories from the API.
 * 
 * @returns {NavbarCategory[]} An array of navbar categories.
 */
export const fetchNavbarCategory = createAsyncThunk<
  NavbarCategory[],
  void,
  { rejectValue: string; state: RootState }
>(
  "navbarCategory/fetchNavbarCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/navbar`, { timeout: 8000 });
      if (response.status === 200) {
        return response.data.data as NavbarCategory[];
      } else {
        const errorMessage =
          response.data?.message || "Unknown error occurred";
        return rejectWithValue(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// Navbar Category Slice
const navbarCategorySlice = createSlice({
  name: "navbarCategory",
  initialState: {
    categories: [], // Initialize categories as an empty array
    isLoading: false,
    error: null,
  } as NavbarCategoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavbarCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(
        fetchNavbarCategory.fulfilled,
        (state, action: PayloadAction<NavbarCategory[]>) => {
          state.isLoading = false;
          state.categories = action.payload; // Store fetched categories in state
        }
      )
      .addCase(fetchNavbarCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Set error message
      });
  },
});

export default navbarCategorySlice.reducer;
