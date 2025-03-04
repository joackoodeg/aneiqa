// src/components/providers/ToastProvider.tsx
"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster position="top-right" expand={true} richColors />
  );
}