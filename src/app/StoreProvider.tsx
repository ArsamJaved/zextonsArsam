"use client";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore } from "@/app/lib/store";
import { persistStore } from "redux-persist";
import Loading from "./components/Loading";

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  // We use useRef to ensure the store and persistor are only created once.
  const storeRef = useRef<{
    store: ReturnType<typeof makeStore>;
    persistor: ReturnType<typeof persistStore> | null;
  }>();

  if (!storeRef.current) {
    const store = makeStore();
    const persistor =
      typeof window !== "undefined" ? persistStore(store) : null;
    storeRef.current = { store, persistor };
  }

  return (
    <Provider store={storeRef.current.store}>
      {storeRef.current.persistor ? (
        <PersistGate
        loading={<Loading />}
          persistor={storeRef.current.persistor}
        >
          {children}
        </PersistGate>
      ) : (
        // When SSR, persistor is null, so we skip PersistGate
        children
      )}
    </Provider>
  );
};
export default StoreProvider;
