import { createAction, createReducer } from "@reduxjs/toolkit";

// Typings
export enum Page {
  VAULTS = "vaults",
  MINT = "mint",
  TREASURY = "treasury",
  FAQ = "faq",
}

interface GlobalState {
  currentPage?: Page;
}

const initialState: GlobalState = {
  currentPage: Page.VAULTS,
};

// Actions
export const setCurrentPage = createAction<{ nextPage: Page }>(
  "global/setCurrentPage"
);

// Reducer
export default createReducer(initialState, (builder) =>
  builder.addCase(setCurrentPage, (state, action) => {
    const { nextPage } = action.payload;
    return { ...state, currentPage: nextPage };
  })
);
