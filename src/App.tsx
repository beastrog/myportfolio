import { Suspense, lazy, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Seo from '@/components/Seo';
import LoadingSpinner from '@/components/ui/loading-spinner';
import FuturisticCursor from '@/components/ui/FuturisticCursor';

// Lazy load pages for better performance
const Index = lazy(() => import('@/pages/Index'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Configure query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const AppContent = () => {
  const location = useLocation();
  
  // Add data-cursor attribute to all interactive elements
  useEffect(() => {
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, [role="button"], [role="link"]'
    );

    interactiveElements.forEach(el => {
      if (!el.hasAttribute('data-cursor')) {
        el.setAttribute('data-cursor', 'true');
      }
    });
  }, []);

  return (
    <>
      <Seo />
      <FuturisticCursor />
      <Toaster />
      <Sonner position="top-center" richColors />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-950 via-background to-purple-950 animate-gradient-move">
          <LoadingSpinner size={64} />
        </div>
      }>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        <Analytics />
        <SpeedInsights />
      </Suspense>
    </>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HelmetProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </HelmetProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
