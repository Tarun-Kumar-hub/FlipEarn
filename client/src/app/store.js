import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./features/chatSlice";
import listingReducer from "./features/listingSlice";

export const store = configureStore({
  reducer: {
    listing: listingReducer,
    chat: chatReducer,
  },
});
