import { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileJson, Upload, Layout, MousePointer2, BookTemplate as Template, Loader2 } from 'lucide-react';

// Dynamically import Excalidraw and utilities
const Excalidraw = lazy(() => import('@excalidraw/excalidraw').then(m => ({ default: m.Excalidraw })));
const exportToBlob = async (props: any) => {
  const { exportToBlob: ex } = await import('@excalidraw/excalidraw');
  return ex(props);
};
const serializeAsJSON = async (...args: any[]) => {
  const { serializeAsJSON: ser } = await import('@excalidraw/excalidraw');
  return (ser as any)(...args);
};

const TEMPLATES = {
  microservices: {
    elements: [
      { type: "rectangle", x: 100, y: 100, width: 140, height: 60, strokeColor: "#00e5ff", backgroundColor: "rgba(0,229,255,0.1)", fillStyle: "solid", roundness: { type: 2 } },
      { type: "text", x: 120, y: 120, text: "API Gateway", fontSize: 16, strokeColor: "#ffffff" },
      { type: "arrow", x: 240, y: 130, points: [[0, 0], [60, 0]], strokeColor: "#64748b" },
      { type: "rectangle", x: 300, y: 100, width: 120, height: 60, strokeColor: "#a78bfa", backgroundColor: "rgba(167,139,250,0.1)", fillStyle: "solid", roundness: { type: 2 } },
      { type: "text", x: 320, y: 120, text: "User Service", fontSize: 14, strokeColor: "#ffffff" },
      { type: "arrow", x: 420, y: 130, points: [[0, 0], [40, 40]], strokeColor: "#64748b" },
      { type: "ellipse", x: 440, y: 170, width: 80, height: 60, strokeColor: "#00c9a7", backgroundColor: "rgba(0,196,167,0.1)", fillStyle: "solid" },
      { type: "text", x: 455, y: 190, text: "PostgreSQL", fontSize: 12, strokeColor: "#ffffff" }
    ]
  },
  eventDriven: {
    elements: [
      { type: "rectangle", x: 100, y: 150, width: 100, height: 50, strokeColor: "#cdd9e5", text: "Producer" },
      { type: "text", x: 120, y: 165, text: "Producer", fontSize: 14, strokeColor: "#ffffff" },
      { type: "arrow", x: 200, y: 175, points: [[0, 0], [80, 0]], strokeColor: "#f5a623" },
      { type: "rectangle", x: 280, y: 140, width: 180, height: 70, strokeColor: "#f5a623", backgroundColor: "rgba(245,166,35,0.1)", fillStyle: "solid" },
      { type: "text", x: 340, y: 165, text: "KAFKA", fontSize: 18, strokeColor: "#f5a623" },
      { type: "arrow", x: 460, y: 175, points: [[0, 0], [80, 0]], strokeColor: "#f5a623" },
      { type: "rectangle", x: 540, y: 150, width: 100, height: 50, strokeColor: "#cdd9e5" },
      { type: "text", x: 555, y: 165, text: "Consumer", fontSize: 14, strokeColor: "#ffffff" }
    ]
  }
};

export default function DrawSystemPage() {
  const navigate = useNavigate();
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);

  useEffect(() => {
    console.log("Canvas Architect Mounted");
  }, []);

  const applyTemplate = (type: keyof typeof TEMPLATES) => {
    if (!excalidrawAPI) return;
    const template = TEMPLATES[type];
    excalidrawAPI.updateScene({
      elements: template.elements,
      scrollToContent: true
    });
  };

  const handleExportImage = async () => {
    if (!excalidrawAPI) return;
    const elements = excalidrawAPI.getSceneElements();
    if (!elements || elements.length === 0) {
      alert("Please draw something first!");
      return;
    }
    const blob = await exportToBlob({
      elements,
      mimeType: "image/png",
      appState: excalidrawAPI.getAppState(),
      files: excalidrawAPI.getFiles(),
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `system-architecture-${Date.now()}.png`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExportJSON = async () => {
    if (!excalidrawAPI) return;
    const elements = excalidrawAPI.getSceneElements();
    const appState = excalidrawAPI.getAppState();
    const files = excalidrawAPI.getFiles();
    
    const json = await serializeAsJSON(elements, appState, files, "database");
    const blob = new Blob([json], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `system-architecture-${Date.now()}.excalidraw`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (excalidrawAPI && data.elements) {
          excalidrawAPI.updateScene({
            elements: data.elements,
            appState: data.appState,
            files: data.files,
          });
        }
      } catch (err) {
        alert("Failed to import file. Please make sure it's a valid .excalidraw file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-[#02040a] text-white selection:bg-indigo-500/30">
      {/* Premium Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#05080f]/40 backdrop-blur-xl z-50">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
          </button>
          
          <div className="flex flex-col">
            <h1 className="text-[11px] font-black tracking-[0.2em] uppercase text-indigo-400/80 mb-0.5">Canvas Architect</h1>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-200 tracking-tight">System Design Engine</span>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">v1.2 // PRO</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Templates Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2.5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all">
              <Template className="w-3.5 h-3.5 text-indigo-400" />
              Templates
            </button>
            <div className="absolute top-full right-0 mt-3 w-64 bg-[#0c1220]/95 backdrop-blur-2xl border border-white/10 rounded-2xl py-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-[60] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="px-4 pb-2 mb-2 border-b border-white/5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Architecture BLUEPRINTS</span>
              </div>
              <button 
                onClick={() => applyTemplate('microservices')}
                className="w-full text-left px-4 py-2.5 text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>Microservices Grid</span>
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50"></div>
              </button>
              <button 
                onClick={() => applyTemplate('eventDriven')}
                className="w-full text-left px-4 py-2.5 text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>Event-Driven Bridge</span>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50"></div>
              </button>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-white/10 mx-1"></div>

          <label className="flex items-center gap-2.5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-bold uppercase tracking-widest cursor-pointer transition-all">
            <Upload className="w-3.5 h-3.5" />
            Import
            <input type="file" accept=".excalidraw,.json" className="hidden" onChange={handleImportJSON} />
          </label>
          
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-2.5 px-4 py-2 bg-white/5 hover:bg-indigo-500/10 border border-white/10 hover:border-indigo-500/30 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all"
          >
            <FileJson className="w-3.5 h-3.5" />
            Save
          </button>

          <button
            onClick={handleExportImage}
            className="flex items-center gap-2.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] text-white shadow-[0_10px_20px_rgba(79,70,229,0.2)] transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </header>

      {/* Canvas Area */}
      <main className="flex-1 relative w-full overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>
        <Suspense fallback={
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#02040a] text-slate-400">
            <div className="relative">
              <Loader2 className="w-12 h-12 animate-spin mb-4 text-indigo-500" />
              <div className="absolute inset-0 blur-xl bg-indigo-500/20 rounded-full animate-pulse"></div>
            </div>
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] animate-pulse">Initializing Neural Canvas</p>
          </div>
        }>
          <Excalidraw
            excalidrawAPI={(api) => setExcalidrawAPI(api)}
            theme="dark"
            UIOptions={{
              welcomeScreen: false,
              canvasActions: {
                changeViewBackgroundColor: true,
                clearCanvas: true,
                export: { saveFileToDisk: false },
                loadScene: false,
                saveToActiveFile: false,
                toggleTheme: false,
              }
            }}
            initialData={{
              appState: {
                viewBackgroundColor: "#02040a",
                currentItemStrokeColor: "#cbd5e1",
                currentItemBackgroundColor: "transparent",
                currentItemFillStyle: "solid",
                gridSize: 20,
                gridModeEnabled: true,
                zenModeEnabled: false,
              }
            }}
          />
        </Suspense>

        {/* Floating Tooltips Pane */}
        <div className="absolute bottom-8 left-8 z-10">
          <div className="bg-[#0c1220]/80 border border-white/10 p-5 rounded-[24px] backdrop-blur-2xl shadow-2xl max-w-xs ring-1 ring-white/5 translate-y-0 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                <Layout className="w-4 h-4 text-indigo-400" />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/90">Design System Tips</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Use <span className="text-white font-bold">Rectangles</span> for Microservices & Load Balancers.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></div>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Use <span className="text-white font-bold">Diamonds</span> for Decision Logic & API Gateways.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Use <span className="text-white font-bold">Ellipses</span> for DB Clusters & External Storage.</p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Keyboard shortcuts</span>
              <kbd className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] text-slate-400 font-mono">?</kbd>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
