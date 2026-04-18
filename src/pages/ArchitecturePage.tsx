import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function ArchitecturePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm hover:bg-white hover:shadow text-slate-700 font-medium transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to App
        </button>
      </div>
      <iframe
        src="/architecture-vehicle-management.html"
        className="w-full h-full border-none"
        title="Vehicle Management System - Architecture"
      />
    </div>
  );
}
