import { useState, useEffect } from 'react';
import { Category } from '../data';
import { cn, slugify } from '../lib/utils';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
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
  Target,
  Award,
  ChevronLeft,
  Menu
} from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  selectedCategory: Category | 'All';
}

const iconMap: Record<string, React.ReactNode> = {
  'All': <LayoutGrid className="w-5 h-5 flex-shrink-0" />,
  'System Design': <Server className="w-5 h-5 flex-shrink-0" />,
  'SQL': <Database className="w-5 h-5 flex-shrink-0" />,
  'API Gateway': <Network className="w-5 h-5 flex-shrink-0" />,
  'Service Mesh': <Network className="w-5 h-5 flex-shrink-0" />,
  'Spring Boot': <Coffee className="w-5 h-5 flex-shrink-0" />,
  'Python': <TerminalSquare className="w-5 h-5 flex-shrink-0" />,
  'Frontend': <MonitorPlay className="w-5 h-5 flex-shrink-0" />,
  'Docker & K8s': <Container className="w-5 h-5 flex-shrink-0" />,
  'Message Queues': <MessageSquare className="w-5 h-5 flex-shrink-0" />,
  'DevOps': <Repeat className="w-5 h-5 flex-shrink-0" />,
  'AWS': <Cloud className="w-5 h-5 flex-shrink-0" />,
  'Git': <GitBranch className="w-5 h-5 flex-shrink-0" />,
  'Monitoring': <Activity className="w-5 h-5 flex-shrink-0" />,
  'AI & ML': <BrainCircuit className="w-5 h-5 flex-shrink-0" />,
  'Security': <ShieldCheck className="w-5 h-5 flex-shrink-0" />,
  'DSA': <Binary className="w-5 h-5 flex-shrink-0" />
};

export function Sidebar({ categories, selectedCategory }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(isCollapsed));
  }, [isCollapsed]);

  const isTopicActive = (topic: string) => {
    return currentPath === `/topic/${slugify(topic)}` || selectedCategory === topic;
  };

  const getLinkClasses = (to: string, exact = true) => {
    const isActive = exact 
      ? (currentPath === to || currentPath === to + '/') 
      : currentPath.startsWith(to);
    
    return cn(
      "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
      isCollapsed ? "justify-center px-0" : "",
      isActive
        ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100 font-bold"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    );
  };

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      className="bg-white border-r border-slate-200 h-screen sticky top-0 overflow-y-auto flex-shrink-0 z-50 group flex flex-col"
    >
      <div className="p-4 flex flex-col flex-1">
        <div className={cn("flex items-center justify-between mb-8", isCollapsed ? "flex-col gap-4" : "px-2")}>
          <Link to="/" className={cn("flex items-center gap-2 text-indigo-600 hover:opacity-80 transition-opacity", isCollapsed ? "justify-center" : "")}>
            <Code2 className="w-8 h-8 flex-shrink-0" />
            {!isCollapsed && (
              <motion.h1 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold text-slate-900 tracking-tight whitespace-nowrap"
              >
                TechPrep
              </motion.h1>
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            title={isCollapsed ? "Mở rộng thanh bên" : "Thu gọn thanh bên"}
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
        
        <nav className="space-y-1">
          <Link
            to="/"
            className={getLinkClasses("/", true)}
            title={isCollapsed ? "Tất cả chủ đề" : undefined}
          >
            {iconMap['All']}
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">All Topics</span>}
          </Link>
          
          <Link
            to="/architecture-vehicle-management"
            className={getLinkClasses("/architecture-vehicle-management")}
            title={isCollapsed ? "Vehicle Architecture" : undefined}
          >
            <Server className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">Vehicle Architecture</span>}
          </Link>
 
          <Link
            to="/architecture-best-practice"
            className={getLinkClasses("/architecture-best-practice")}
            title={isCollapsed ? "Architecture Best Practice" : undefined}
          >
            <Award className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">Architecture Best Practice</span>}
          </Link>
 
          <Link
            to="/architecture-hsc"
            className={getLinkClasses("/architecture-hsc")}
            title={isCollapsed ? "HSC Architecture" : undefined}
          >
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">HSC Architecture</span>}
          </Link>
 
          <Link
            to="/architecture-project"
            className={getLinkClasses("/architecture-project")}
            title={isCollapsed ? "Project Architecture" : undefined}
          >
            <Target className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">Project Architecture</span>}
          </Link>
 
          <Link
            to="/interview-prep"
            className={getLinkClasses("/interview-prep")}
            title={isCollapsed ? "Interview Preparation" : undefined}
          >
            <Target className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">Interview Preparation</span>}
          </Link>
          
          <Link
            to="/rontech-mdm-interview"
            className={getLinkClasses("/rontech-mdm-interview")}
            title={isCollapsed ? "Rontech MDM Interview" : undefined}
          >
            <BrainCircuit className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">Rontech MDM Interview</span>}
          </Link>
 
          <Link
            to="/auth-pipeline"
            className={getLinkClasses("/auth-pipeline")}
            title={isCollapsed ? "Auth Pipeline Job" : undefined}
          >
            <GitBranch className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">Auth Pipeline Job</span>}
          </Link>
 
          <Link
            to="/de-interview"
            className={getLinkClasses("/de-interview")}
            title={isCollapsed ? "DE Interview Ques" : undefined}
          >
            <BrainCircuit className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">DE Interview Ques</span>}
          </Link>
          
          <Link
            to="/security-interview"
            className={getLinkClasses("/security-interview")}
            title={isCollapsed ? "Security Interview" : undefined}
          >
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">Security Interview</span>}
          </Link>
          
          <div className="pt-4 pb-2">
            {isCollapsed ? (
              <div className="h-px bg-slate-200 mx-2" />
            ) : (
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Categories
              </p>
            )}
          </div>
          
          {categories.map((category) => (
            <Link
              key={category}
              to={`/topic/${slugify(category)}`}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                isCollapsed ? "justify-center px-0" : "",
                isTopicActive(category)
                  ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
              title={isCollapsed ? category : undefined}
            >
              {iconMap[category] || <Code2 className="w-5 h-5 flex-shrink-0" />}
              {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{category}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
}

