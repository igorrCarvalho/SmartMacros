import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query';
import { router } from "./router";
import './App.css'
import { queryClient } from './api/queryClient';
import AuthProvider from './api/providers/AuthProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient }>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
