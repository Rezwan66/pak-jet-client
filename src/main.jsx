import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './router/router.jsx';
import ThemeProvider from './providers/ThemeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="font-urbanist max-w-7xl mx-auto">
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  </StrictMode>
);
