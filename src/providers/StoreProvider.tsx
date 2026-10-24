"use client";
import { AppStore, makeStore } from "@/redux/store";
import { rehydrateCart } from "@/redux/features/cartSlice";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.dispatch(rehydrateCart());
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
