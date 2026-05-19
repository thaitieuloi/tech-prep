import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
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
        <Route path="/architecture-vehicle-management" element={<StaticHtmlPage fileName="architecture-vehicle-management.html" />} />
        <Route path="/architecture-hsc" element={<StaticHtmlPage fileName="architecture-hsc-management.html" />} />
        <Route path="/architecture-project" element={<StaticHtmlPage fileName="architecture-project-management.html" />} />
        <Route path="/architecture-best-practice" element={<StaticHtmlPage fileName="architecture-best-practice-diagram.html" />} />
        <Route path="/interview-prep" element={<StaticHtmlPage fileName="self-interview.html" />} />
        <Route path="/auth-pipeline" element={<StaticHtmlPage fileName="auth-pipeline-job.html" />} />
        <Route path="/de-interview" element={<StaticHtmlPage fileName="de-interview-v1.html" />} />
        <Route path="/security-interview" element={<StaticHtmlPage fileName="security-interview-v1.html" />} />
        <Route path="/rontech-mdm-interview" element={<StaticHtmlPage fileName="rontech-mdm-interview.html" />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
