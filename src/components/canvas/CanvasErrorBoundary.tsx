"use client";

import React, { Component, ReactNode, ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("CanvasErrorBoundary caught a runtime error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="p-6 rounded-3xl bg-cream-pure/90 dark:bg-zinc-900/90 border border-saffron/40 text-center shadow-gold max-w-sm backdrop-blur-md">
              <div className="w-14 h-14 rounded-full bg-nandini-blue text-white flex items-center justify-center font-serif font-black mx-auto mb-3 text-sm shadow-md border border-gold">
                KMF
              </div>
              <h3 className="font-serif font-black text-xl text-bronze dark:text-cream-pure">
                ನಂದಿನಿ · Nandini Badam Milk
              </h3>
              <p className="text-xs text-bronze-soft dark:text-cream-soft mt-1">
                Pure cow milk infused with Kashmiri Kesar & California Almonds
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
