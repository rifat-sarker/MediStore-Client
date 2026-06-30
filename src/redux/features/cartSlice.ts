import { IProduct } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartProduct extends IProduct {
  orderQuantity: number;
}

interface InitialState {
  products: ICartProduct[];
}

const initialState: InitialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      const productToAdd = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (productToAdd) {
        if (productToAdd.orderQuantity < productToAdd.stock) {
          productToAdd.orderQuantity += 1;
        }
      } else {
        state.products.push({ ...action.payload, orderQuantity: 1 });
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; type: "increment" | "decrement" }>
    ) => {
      const productToUpdate = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (productToUpdate) {
        if (
          action.payload.type === "increment" &&
          productToUpdate.orderQuantity < productToUpdate.stock
        ) {
          productToUpdate.orderQuantity += 1;
        } else if (
          action.payload.type === "decrement" &&
          productToUpdate.orderQuantity > 1
        ) {
          productToUpdate.orderQuantity -= 1;
        }
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const { addProduct, updateQuantity, removeProduct, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
