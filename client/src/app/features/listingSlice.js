import { createSlice } from "@reduxjs/toolkit";

import { dummyListings } from "../../assets/assets";
const initialState = {
  listings: dummyListings,
  userListings: dummyListings,
  balance: {
    earned: 0,
    withdrawn: 0,
    availble: 0,
  },
};

export const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setListings } = listingSlice.actions;

export default listingSlice.reducer;
