import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myApi from "@src/lib/axios-instance";

const initialState = {
  user: {
    username: ''
  },
  accessToken: "",
  isSessionPending: true,
};

export const getSession = createAsyncThunk("auth/get-session", async (_, thunkAPI) => {
  try {
    const res = await myApi.get("/auth/session");
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload.user ?? {};
    },
    resetState: () => initialState,
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSession.pending, (state) => {
        state.isSessionPending = true;
      })
      .addCase(getSession.rejected, (state) => {
        state.isSessionPending = false;
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isSessionPending = false;
      });
  },
});

export const { updateUser, resetState, updateAccessToken} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
