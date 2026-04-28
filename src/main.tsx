import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { ArchitecturePage } from './pages/ArchitecturePage';
import DrawSystemPage from './pages/DrawSystemPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import { StaticHtmlPage } from './pages/StaticHtmlPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/architecture-vehicle-management" element={<ArchitecturePage />} />
        <Route path="/draw-system" element={<DrawSystemPage />} />
        <Route path="/interview-prep" element={<InterviewPrepPage />} />
        <Route path="/auth-pipeline" element={<StaticHtmlPage fileName="auth-pipeline-job.html" />} />
        <Route path="/de-interview" element={<StaticHtmlPage fileName="de-interview-v1.html" />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
