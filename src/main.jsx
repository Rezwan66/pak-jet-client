import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './router/router.jsx';
import ThemeProvider from './providers/ThemeProvider.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

AOS.init();
// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="font-urbanist">
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Suspense fallback={<div className="skeleton h-32 w-32"></div>}>
              <Toaster />
              <RouterProvider router={router} />
            </Suspense>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  </StrictMode>
);
