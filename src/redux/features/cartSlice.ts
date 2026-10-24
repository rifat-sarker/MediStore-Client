import { IProduct } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartProduct extends IProduct {
  orderQuantity: number;
}

interface InitialState {
  products: ICartProduct[];
}

const CART_STORAGE_KEY = "medistore_cart";

const loadCartFromStorage = (): ICartProduct[] => {
  if (typeof window === "undefined") return [];
  try {
    const item = localStorage.getItem(CART_STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (products: ICartProduct[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(products));
  } catch {}
};

const initialState: InitialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    rehydrateCart: (state) => {
      state.products = loadCartFromStorage();
    },
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
      saveCartToStorage(state.products);
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
      saveCartToStorage(state.products);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      saveCartToStorage(state.products);
    },
    clearCart: (state) => {
      state.products = [];
      saveCartToStorage(state.products);
    },
  },
});

export const { addProduct, updateQuantity, removeProduct, clearCart, rehydrateCart } =
  cartSlice.actions;

export default cartSlice.reducer;
