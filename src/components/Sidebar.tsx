import { Category } from '../data';
import { cn, slugify } from '../lib/utils';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Server, 
  Network, 
  Code2, 
  Coffee, 
  TerminalSquare, 
  LayoutGrid,
  MonitorPlay,
  Container,
  MessageSquare,
  Repeat,
  Cloud,
  GitBranch,
  Activity,
  BrainCircuit,
  ShieldCheck,
  Binary,
  PenTool,
  Target
} from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  selectedCategory: Category | 'All';
}

const iconMap: Record<string, React.ReactNode> = {
  'All': <LayoutGrid className="w-5 h-5" />,
  'System Design': <Server className="w-5 h-5" />,
  'SQL': <Database className="w-5 h-5" />,
  'API Gateway': <Network className="w-5 h-5" />,
  'Service Mesh': <Network className="w-5 h-5" />,
  'Spring Boot': <Coffee className="w-5 h-5" />,
  'Python': <TerminalSquare className="w-5 h-5" />,
  'Frontend': <MonitorPlay className="w-5 h-5" />,
  'Docker & K8s': <Container className="w-5 h-5" />,
  'Message Queues': <MessageSquare className="w-5 h-5" />,
  'DevOps': <Repeat className="w-5 h-5" />,
  'AWS': <Cloud className="w-5 h-5" />,
  'Git': <GitBranch className="w-5 h-5" />,
  'Monitoring': <Activity className="w-5 h-5" />,
  'AI & ML': <BrainCircuit className="w-5 h-5" />,
  'Security': <ShieldCheck className="w-5 h-5" />,
  'DSA': <Binary className="w-5 h-5" />
};

export function Sidebar({ categories, selectedCategory }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 overflow-y-auto flex-shrink-0">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 mb-8 text-indigo-600 hover:opacity-80 transition-opacity">
          <Code2 className="w-8 h-8" />
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">TechPrep</h1>
        </Link>
        
        <nav className="space-y-1">
          <Link
            to="/"
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
              selectedCategory === 'All'
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            {iconMap['All']}
            All Topics
          </Link>
          
          <Link
            to="/architecture-vehicle-management"
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            <Server className="w-5 h-5" />
            System Architecture
          </Link>

          <Link
            to="/draw-system"
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            <PenTool className="w-5 h-5" />
            Canvas Architect
          </Link>

          <Link
            to="/interview-prep"
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-indigo-600 bg-indigo-50/50 hover:bg-indigo-50 font-bold border border-indigo-100 shadow-sm"
          >
            <Target className="w-5 h-5" />
            Interview Preparation
          </Link>
          
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Categories
            </p>
          </div>
          
          {categories.map((category) => (
            <Link
              key={category}
              to={`/topic/${slugify(category)}`}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                selectedCategory === category
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {iconMap[category] || <Code2 className="w-5 h-5" />}
              {category}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
