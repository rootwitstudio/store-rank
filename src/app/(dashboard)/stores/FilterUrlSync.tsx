"use client";

import { useEffect } from 'react';
import { useActiveFilters } from './useActiveFilters';

export default function FilterUrlSync() {
  const { initializeFromUrl } = useActiveFilters();

  useEffect(() => {
    // Initialize filters from URL when component mounts
    initializeFromUrl();
  }, [initializeFromUrl]);

  // Re-initialize when URL changes (for navigation between pages)
  useEffect(() => {
    const handlePopState = () => {
      initializeFromUrl();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [initializeFromUrl]);

  return null; // This component doesn't render anything
} 