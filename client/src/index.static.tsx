import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { createPortal } from 'react-dom';

import RoutesComponent from './app.tsx';
import './index.css';
import { Toaster } from '@client/src/components/ui/sonner';

const CLIENT_BASE_PATH = '/';

const StaticErrorFallback = ({ error }: { error: unknown }) => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
      <h1 className="text-xl font-bold text-red-600 mb-2">页面出错了</h1>
      <p className="text-sm text-slate-600 mb-4">
        {error instanceof Error ? error.message : '未知错误'}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-slate-800 text-white text-sm rounded hover:bg-slate-700 transition-colors"
      >
        刷新页面
      </button>
    </div>
  </div>
);

const MainApp = () => {
  return (
    <BrowserRouter basename={CLIENT_BASE_PATH}>
      <ErrorBoundary FallbackComponent={StaticErrorFallback}>
        <RoutesComponent />
        {createPortal(<Toaster />, document.body)}
      </ErrorBoundary>
    </BrowserRouter>
  );
};

createRoot(document.getElementById('root')!).render(<MainApp />);
