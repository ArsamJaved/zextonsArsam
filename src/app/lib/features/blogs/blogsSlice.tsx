import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Blog } from "../../../../../types";

interface BlogState {
  blogs: Blog[]; // Array to store blogs
  isLoading: boolean;
  error: string | null;
}

// Thunk for fetching blogs
export const fetchBlogs = createAsyncThunk<
  Blog[], // Type of the returned data (an array of Blog objects)
  void, // No argument passed to the thunk
  { rejectValue: string } // Type of the error message in case of rejection
>("blogs/fetchBlogs", async (_, { rejectWithValue, getState }) => {
  const state = getState() as { auth: { ip: string } }; // Type the getState() return
  const ip = state.auth.ip; // Get API base URL from auth state

  try {
    console.log("Fetching blogs from:", `${ip}get/blog/latest`);
    const response = await axios.get(`${ip}get/blog/latest`);

    if (response.data.status === 201) {
      return response.data.data; // Return blogs data on success
    } else {
      console.error("Error:", response.data.message);
      return rejectWithValue(response.data.message); // Reject with error message
    }
  } catch (error: any) {
    console.error("Error fetching blogs:", error.message);
    return rejectWithValue(error.message); // Reject with error message
  }
});

// Blog Slice
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [], // Initialize blogs as an empty array
    isLoading: false,
    error: null,
  } as BlogState, // Type the initial state
  reducers: {}, // No synchronous reducers for now
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous error on new request
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.isLoading = false;
        state.blogs = action.payload; // Set fetched blogs in state
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Set error message
      });
  },
});

export default blogSlice.reducer;
