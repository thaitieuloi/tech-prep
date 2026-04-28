import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { categories } from '../data';

interface StaticHtmlPageProps {
  fileName: string;
}

export function StaticHtmlPage({ fileName }: StaticHtmlPageProps) {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        categories={categories} 
        selectedCategory="All" 
      />
      
      <main className="flex-1 w-full flex flex-col">
        <iframe 
          src={`/${fileName}`} 
          className="flex-1 w-full border-none"
          title={fileName}
          style={{ height: '100vh' }}
        />
      </main>
    </div>
  );
}
