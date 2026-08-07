'use client';

import React from 'react';
import Link from 'next/link';
import MatrixIoTPage from '@/app/matrix-iot/page';
import { ChevronRight } from 'lucide-react';

export default function ProductMatrixIoTPage() {
  return (
    <div className="space-y-4">
      {/* Breadcrumb Header for Products Page Hierarchy */}
      <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs text-slate-500 pt-2 px-1">
        <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <Link href="/products" className="hover:text-slate-900 transition-colors">Products</Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-semibold text-blue-600">Matrix-IoT Platform</span>
      </div>

      {/* Main Product Component */}
      <MatrixIoTPage />
    </div>
  );
}
