import { IProduct } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";
import { initializeTraceState } from "next/dist/trace";

interface InitialState {
  products: IProduct[];
}

const initialState: InitialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
