import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // signin
    signinStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    signinFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // updating user
    updatingStart: (state) => {
      state.loading = true;
    },
    updatingSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    updatingFailed: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },

    // deleting user
    deletingStart: (state) => {
      state.loading = true;
    },
    deletingSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = null;
      state.error = null;
    },
    deletingFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // signingout user
    signingoutStart: (state) => {
      state.loading = true;
    },
    signingoutSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = null;
      state.error = null;
    },
    signingoutFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signinStart,
  signinSuccess,
  signinFailed,
  updatingStart,
  updatingSuccess,
  updatingFailed,
  deletingFailed,
  deletingStart,
  deletingSuccess,
  signingoutFailed,
  signingoutStart,
  signingoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
