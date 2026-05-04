import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { ArchitecturePage } from './pages/ArchitecturePage';
import DrawSystemPage from './pages/DrawSystemPage';
import { StaticHtmlPage } from './pages/StaticHtmlPage';
import './index.css';

function FullScreenStaticHtml({ fileName }: { fileName: string }) {
  return (
    <iframe 
      src={`/${fileName}`} 
      className="fixed inset-0 w-full h-full border-none z-[9999]"
      title={fileName}
    />
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/architecture-vehicle-management" element={<ArchitecturePage />} />
        <Route path="/draw-system" element={<DrawSystemPage />} />
        <Route path="/interview-prep" element={<FullScreenStaticHtml fileName="self-interview.html" />} />
        <Route path="/auth-pipeline" element={<StaticHtmlPage fileName="auth-pipeline-job.html" />} />
        <Route path="/de-interview" element={<StaticHtmlPage fileName="de-interview-v1.html" />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
