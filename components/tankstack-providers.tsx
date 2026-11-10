"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function TanStackProviders({ children }: { children: React.ReactNode }) {
//   Use useState to ensure that a new QueryClient is not created on every page navigation
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // ১ মিনিট পর্যন্ত ডেটা ফ্রেশ হিসেবে ধরবে (ঐচ্ছিক)
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}