'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore } from '@/app/lib/store';
import { persistStore } from 'redux-persist';
import { AuthProvider } from './context/Auth';
import { ToastContainer } from 'react-toastify';

export function Providers({ children }: { children: React.ReactNode }) {
  const store = makeStore();
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          {children}
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}
