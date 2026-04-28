import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, FileText, CheckCircle2, Star, AlertCircle, Mail, ChevronUp, Briefcase, Calendar, Cpu, Users, Zap, Search, MessageSquare, ShieldAlert, GitBranch, Terminal, LineChart, AlertTriangle, Brain, Network, Database, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function InterviewPrepPage() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl shadow-sm hover:bg-white hover:shadow transition-all text-slate-600 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại Dashboard
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-24">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#D946EF] text-white p-10 md:p-14 rounded-3xl shadow-2xl mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-20">
            <Target className="w-64 h-64 rotate-12" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/20">Studio Edition · v2.0 — Post-Interview Improved</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">🎯 TECHNICAL LEADER INTERVIEW</h1>
            <p className="text-xl text-slate-100 mb-8 font-medium opacity-90 italic">Bilingual Q&A Preparation Guide · Song ngữ Anh–Việt</p>
            
            {/* New: Improvement Alert */}
            <div className="bg-white/15 border border-white/20 rounded-2xl p-4 mb-6 backdrop-blur-md">
              <p className="text-sm font-bold text-yellow-200 flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4" /> Cải tiến dựa trên feedback buổi phỏng vấn thực tế:
              </p>
              <p className="text-white/80 text-xs">Đã bổ sung: Kafka Deep Dive · RAG Pipeline chuẩn · System Design Flow · Communication Framework · Câu trả lời được cấu trúc lại</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-300" /> Thái Tiểu Lôi
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-300" /> Tech Lead / Senior Dev
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-300" /> 10+ năm kinh nghiệm
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium flex items-center gap-2 text-nowrap">
                <Cpu className="w-4 h-4 text-blue-300" /> Java · Cloud · AI/RAG
              </span>
            </div>
          </div>
        </motion.div>

        {/* NEW: Post-Interview Feedback Analysis */}
        <motion.div
          id="pre-feedback"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 mb-12"
        >
          <h3 className="text-lg font-black text-red-700 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> ⚠️ Phân tích buổi phỏng vấn trước — Điểm cần cải thiện ngay
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-red-100 rounded-2xl p-5">
              <span className="text-xs font-black uppercase text-red-500 tracking-widest">Vấn đề #1</span>
              <h4 className="font-black text-slate-800 mt-2 mb-2">Communication Structure</h4>
              <p className="text-xs text-slate-500">Câu trả lời rời rạc, không có flow rõ ràng. Interviewer phản hồi: <em>"It did, but it's not very helpful."</em></p>
              <div className="mt-3 p-2 bg-green-50 rounded-lg text-xs text-green-700 font-bold">✓ Fix: Dùng framework BLUF + STAR cho mọi câu</div>
            </div>
            <div className="bg-white border border-red-100 rounded-2xl p-5">
              <span className="text-xs font-black uppercase text-red-500 tracking-widest">Vấn đề #2</span>
              <h4 className="font-black text-slate-800 mt-2 mb-2">Thiếu Flow & Diagram</h4>
              <p className="text-xs text-slate-500">System design không vẽ flow end-to-end. Kafka không giải thích partition/scaling strategy.</p>
              <div className="mt-3 p-2 bg-green-50 rounded-lg text-xs text-green-700 font-bold">✓ Fix: Học thuộc flow diagrams trong guide này</div>
            </div>
            <div className="bg-white border border-red-100 rounded-2xl p-5">
              <span className="text-xs font-black uppercase text-red-500 tracking-widest">Vấn đề #3</span>
              <h4 className="font-black text-slate-800 mt-2 mb-2">Thiếu Insight & Trade-off</h4>
              <p className="text-xs text-slate-500">Kafka & RAG chưa nói sâu về limitation, trade-off. Chỉ nói "tôi dùng Kafka" mà không giải thích WHY.</p>
              <div className="mt-3 p-2 bg-green-50 rounded-lg text-xs text-green-700 font-bold">✓ Fix: Mỗi câu đều có Trade-off section mới</div>
            </div>
          </div>
        </motion.div>

        {/* NEW: Communication Framework */}
        <motion.div
          id="pre-framework"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white border border-slate-200 rounded-3xl p-8 mb-12 shadow-sm"
        >
          <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-500" />
            🗣️ Communication Framework — Cấu trúc câu trả lời chuẩn
          </h3>
          <p className="text-sm text-slate-500 mb-8">Áp dụng cho MỌI câu hỏi kỹ thuật. Interviewer muốn nghe theo cấu trúc này.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-indigo-100 bg-indigo-50 rounded-2xl p-6">
              <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Template 1 — BLUF (Bottom Line Up Front)</span>
              <p className="text-xs text-slate-500 mt-1 mb-4">Dùng cho câu hỏi kỹ thuật trực tiếp</p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">1</span>
                  <div>
                    <p className="text-xs font-black text-slate-800">ANSWER FIRST (1 câu)</p>
                    <p className="text-xs text-slate-500 italic">"We chose Kafka because it decouples services and handles 10K+ TPS."</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">2</span>
                  <div>
                    <p className="text-xs font-black text-slate-800">WHY / HOW (2-3 câu)</p>
                    <p className="text-xs text-slate-500 italic">"Specifically, we had DB write bottleneck causing 800ms latency..."</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">3</span>
                  <div>
                    <p className="text-xs font-black text-slate-800">TRADE-OFF (1 câu)</p>
                    <p className="text-xs text-slate-500 italic">"The trade-off is eventual consistency, which was acceptable for this use case."</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 bg-indigo-400 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">4</span>
                  <div>
                    <p className="text-xs font-black text-slate-800">RESULT (số liệu)</p>
                    <p className="text-xs text-slate-500 italic">"Result: latency dropped from 800ms → 380ms."</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-amber-100 bg-amber-50 rounded-2xl p-6">
              <span className="text-xs font-black text-amber-600 uppercase tracking-widest">Template 2 — STAR (Situational)</span>
              <p className="text-xs text-slate-500 mt-1 mb-4">Dùng cho câu behavioral / "tell me about a time"</p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">S</span>
                  <div>
                    <p className="text-xs font-black text-slate-800">SITUATION (context ngắn gọn)</p>
                    <p className="text-xs text-slate-500 italic">"At HSC, we were handling 1,500 TPS and needed to scale to 10K..."</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">T</span>
                  <div>
                    <p className="text-xs font-black text-slate-800">TASK (vai trò của bạn)</p>
                    <p className="text-xs text-slate-500 italic">"As Tech Lead, my responsibility was to redesign the persistence layer..."</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">A</span>
                  <div>
                    <p className="text-xs font-black text-slate-800">ACTION (cụ thể, kỹ thuật)</p>
                    <p className="text-xs text-slate-500 italic">"I introduced Kafka as WAL buffer, partitioned by symbol..."</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">R</span>
                  <div>
                    <p className="text-xs font-black text-slate-800">RESULT (số liệu bắt buộc)</p>
                    <p className="text-xs text-slate-500 italic">"10,000 TPS sustained with p99 under 50ms."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TipBox 
            en='Practice saying "The trade-off is..." after every technical decision. This single habit separates Senior from Principal engineers in interviews.'
            vi='Luyện tập nói "The trade-off is..." sau mỗi quyết định kỹ thuật. Thói quen này phân biệt Senior với Principal engineer trong phỏng vấn.'
          />
        </motion.div>

        {/* Legend */}
        <div id="legend" className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-12 border-l-4 border-l-[#2E75B6]">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            🎨 Chú thích màu highlight – Keyword Recognition
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <Highlight type="tech">Công nghệ</Highlight>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Tech</span>
            </div>
            <div className="flex items-center gap-2">
              <Highlight type="num">10,000 TPS</Highlight>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Metrics</span>
            </div>
            <div className="flex items-center gap-2">
              <Highlight type="action">Led team</Highlight>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Action</span>
            </div>
            <div className="flex items-center gap-2">
              <Highlight type="soft">Soft skills</Highlight>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Skills</span>
            </div>
            <div className="flex items-center gap-2">
              <Highlight type="key">Key concept</Highlight>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Concept</span>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative">
          {/* Sidebar TOC - Sticky Column (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 order-2">
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 overflow-y-auto max-h-[80vh] border-l-4 border-l-indigo-500">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-500" /> NAVIGATION
              </h3>
              <nav className="space-y-1">
                {[
                  { id: 'pre-feedback', label: 'Analysis Analysis', icon: <AlertTriangle className="w-3 h-3" /> },
                  { id: 'pre-framework', label: 'Comm. Framework', icon: <MessageSquare className="w-3 h-3" /> },
                  { id: 's1', label: 'Self Introduction' },
                  { id: 's2', label: 'Java & Micro' },
                  { id: 's3', label: 'Architecture Flow' },
                  { id: 's4', label: 'Performance 10k' },
                  { id: 's5', label: 'Kafka Deep Dive' },
                  { id: 's6', label: 'RAG Pipeline' },
                  { id: 's7', label: 'DevOps & Cloud' },
                  { id: 's8', label: 'Leadership' },
                  { id: 's9', label: 'Behavioral' },
                  { id: 's10', label: 'Q to Interviewer' },
                  { id: 's11', label: 'Interview Closing' },
                  { id: 's12', label: 'Final Tips' }
                ].map((item, idx) => (
                  <a 
                    key={item.id} 
                    href={`#${item.id}`}
                    className="group flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-all text-slate-500 hover:text-indigo-600 border border-transparent hover:border-slate-100"
                  >
                    <span className="w-5 h-5 bg-slate-50 rounded-lg flex items-center justify-center text-[10px] font-black group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      {idx + 1}
                    </span>
                    <span className="text-[11px] font-bold truncate">{item.label}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <button 
                  onClick={scrollToTop}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200"
                >
                  <ChevronUp className="w-3 h-3" /> Top
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Column */}
          <div className="lg:col-span-9 order-1">
            {/* Table of Contents (Landing View) */}
            <div id="toc" className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100 flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#1F4E79]" />
                📋 Mục lục / Table of Contents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                {[
                  { id: 'pre-feedback', label: 'Analysis – Điểm cần cải thiện', icon: <AlertTriangle className="w-4 h-4 text-red-500" /> },
                  { id: 'pre-framework', label: 'Communication Framework', icon: <MessageSquare className="w-4 h-4 text-blue-500" /> },
                  { id: 's1', label: 'Interview Opening' },
                  { id: 's2', label: 'Java & Microservices' },
                  { id: 's3', label: 'System Design & Architecture' },
                  { id: 's4', label: 'Performance Optimization' },
                  { id: 's5', label: 'Kafka Deep Dive ★', star: true },
                  { id: 's6', label: 'RAG Pipeline ★', star: true },
                  { id: 's7', label: 'DevOps & Cloud' },
                  { id: 's8', label: 'Leadership & Mentoring' },
                  { id: 's9', label: 'Behavioral & Situational' },
                  { id: 's10', label: 'Questions to Interviewer' },
                  { id: 's11', label: 'Interview Closing' },
                  { id: 's12', label: 'Final Tips' }
                ].map((item, idx) => (
                  <a 
                    key={item.id} 
                    href={`#${item.id}`}
                    className={cn(
                      "group flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 hover:text-[#2E75B6]",
                      item.star && "bg-amber-50/50"
                    )}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-100 group-hover:bg-[#1F4E79] group-hover:text-white flex items-center justify-center text-[10px] font-bold transition-colors shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-[13px] font-semibold flex items-center gap-2">
                      {item.label}
                      {item.icon}
                      {item.star && <Star className="w-3 h-3 text-amber-500 fill-amber-500" />}
                    </span>
                  </a>
                ))}
              </div>
            </div>

        {/* Section 1: Opening */}
        <section id="s1" className="mb-16 scroll-mt-24">
          <SectionHeader num={1} title="Interview Opening – Self Introduction" sub="Mở đầu buổi phỏng vấn – Giới thiệu bản thân" />
          
          <QuestionBlock 
            qNum="OP"
            qEn="Could you walk me through your career journey and tell me a bit about yourself?"
            qVi="Anh có thể giới thiệu về bản thân và hành trình sự nghiệp một cách chuyên nghiệp không?"
          >
            <div className="space-y-8">
              <div>
                <Label lang="en">Professional Narrative (EN)</Label>
                <ul className="space-y-3 mt-4 text-slate-700">
                  <ListItem>I am a <Highlight type="key">Technical Leader</Highlight> with extensive experience in architecting high-scale financial and automotive systems. My core expertise lies in <Highlight type="tech">Java Microservices, Performance Tuning,</Highlight> and more recently, <Highlight type="tech">AI-driven Architectures</Highlight>.</ListItem>
                  <ListItem>I began my career as a <Highlight type="soft">C++ Engineer</Highlight> focusing on Security, which gave me a very strong foundation in <Highlight type="key">System Performance</Highlight> and memory management.</ListItem>
                  <ListItem>I then transitioned into the <Highlight type="key">Global Software Service Sector</Highlight> at Hitachi, where I rose from a Senior Developer to a <Highlight type="action">Technical Leader</Highlight>, leading large-scale projects like <Highlight type="tech">Connected Vehicle Systems</Highlight> using high-availability stacks.</ListItem>
                  <ListItem>Prior to my current role, I led the development of one of the <Highlight type="action">highest-throughput Trading Platforms</Highlight> in the securities industry, achieving <Highlight type="num">10,000 TPS</Highlight> with millisecond latency, and optimized complex business workflows by <Highlight type="num">50%</Highlight> using state-of-the-art orchestration.</ListItem>
                  <ListItem>Currently, I am focused on bridging the gap between <Highlight type="key">Distributed Systems</Highlight> and <Highlight type="tech">Modern AI (RAG)</Highlight>, engineering low-latency vector search and intelligent retrieval systems.</ListItem>
                </ul>
              </div>
              <div className="pt-6 border-t border-slate-100">
                <Label lang="vi">Phần giới thiệu tối ưu (VI)</Label>
                <p className="mt-4 text-slate-600 text-[13px] leading-relaxed italic">
                  "Tôi là một Technical Leader với chuyên môn sâu về kiến trúc hệ thống quy mô lớn. Tôi bắt đầu sự nghiệp từ lập trình C++ hệ thống, giúp tôi có tư duy tối ưu hiệu năng ngay từ đầu. Sau đó, tại Hitachi, tôi chuyển hướng và dẫn dắt các dự án Connected Vehicle phức tạp. Đáng chú ý nhất là giai đoạn tại mảng Securities, tôi đã thiết kế và vận hành nền tảng giao dịch 10.000 TPS và tối ưu hóa 50% thời gian xử lý nghiệp vụ. Hiện tại, tôi đang tập trung vào việc tích hợp AI (RAG) vào các hệ thống backend hiện đại để tạo ra các sản phẩm thông minh hơn."
                </p>
              </div>
              <TipBox 
                en="Focus on ROLES and IMPACT, not specific years. Let the interviewer ask for the timeline if they need it. Narrative is king."
                vi="Tập trung vào vai trò và tầm ảnh hưởng, đừng quá sa đà vào mốc thời gian cụ thể (trừ khi được hỏi). Kể một câu chuyện có tính kết nối mới là quan trọng nhất."
              />
            </div>
          </QuestionBlock>

          <QuestionBlock 
            qNum="Q2"
            qEn="What motivated you to apply for this Technical Leader position?"
            qVi="Điều gì thúc đẩy anh ứng tuyển vị trí Technical Leader này?"
          >
            <ul className="space-y-3 text-slate-700">
              <ListItem>
                <div>
                  <p><Highlight type="key">Three main reasons:</Highlight> First, your company's technical challenges align with my expertise — <Highlight type="tech">scalable backend, microservices, high-throughput systems</Highlight>.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Ba lý do chính: Đầu tiên, thách thức kỹ thuật của công ty rất phù hợp với chuyên môn của tôi về hệ thống backend mở rộng và throughput cao.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p>Second, I'm looking for a role where I can combine <Highlight type="action">hands-on engineering with team leadership</Highlight>.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Thứ hai, tôi tìm kiếm một vai trò có sự kết hợp giữa lập trình thực tế và dẫn dắt đội ngũ.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p>Third, I'm excited about the opportunity to apply <Highlight type="tech">AI and RAG architectures</Highlight> in production.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Thứ ba, tôi rất hào hứng với cơ hội triển khai các kiến trúc AI và RAG vào môi trường thực tế.</p>
                </div>
              </ListItem>
            </ul>
          </QuestionBlock>
        </section>

        {/* Section 2: Java */}
        <section id="s2" className="mb-16 scroll-mt-24">
          <SectionHeader num={2} title="Java, Spring Boot & Microservices" sub="Kỹ thuật chuyên sâu – Java, Spring Boot & Microservices" />

          <QuestionBlock 
            qNum="Q3"
            qEn="Can you explain the key differences between Java 8, 11, 17, and 21?"
            qVi="Giải thích sự khác biệt chính giữa Java 8, 11, 17 và 21?"
          >
            <ul className="space-y-3 text-slate-700">
              <ListItem>
                <div>
                  <p><Highlight type="tech">Java 8</Highlight>: Lambdas, Stream API, Optional.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Java 8: Đưa vào Lambda, Stream API và Optional, thay đổi cách viết code Java.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="tech">Java 11</Highlight>: 'var' keyword, HTTP Client, LTS version.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Java 11: Có từ khóa 'var', HTTP Client mới và là bản hỗ trợ dài hạn (LTS).</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="tech">Java 17</Highlight>: Sealed classes, Records, Pattern matching.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Java 17: Thêm Sealed classes, Records (tối ưu DTO) và Pattern matching.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="tech">Java 21</Highlight>: Virtual threads (Project Loom) for high concurrency.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Java 21: Đột phá với Virtual threads giúp xử lý hàng triệu request đồng thời.</p>
                </div>
              </ListItem>
            </ul>
          </QuestionBlock>

          <QuestionBlock 
            qNum="CON"
            qEn="When should you NOT use Virtual Threads (Java 21) in your Microservices?"
            qVi="Khi nào bạn KHÔNG nên sử dụng Virtual Threads (Java 21)?"
          >
            <ul className="space-y-3 text-slate-700">
              <ListItem>
                <div>
                  <p>Don't use them for <Highlight type="key">CPU-bound tasks</Highlight> (e.g., intensive cryptography). Virtual threads don't make CPU faster.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Không dùng cho các tác vụ tốn CPU (mã hóa, xử lý video). Virtual threads không làm CPU nhanh hơn.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p>Avoid them if your code uses <Highlight type="key">ThreadLocal</Highlight> heavily for large objects, risking <Highlight type="soft">OutOfMemoryError</Highlight>.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Tránh dùng nếu code lạm dụng ThreadLocal cho các object lớn, dễ gây lỗi tràn bộ nhớ khi có hàng triệu thread.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p>Be careful with <Highlight type="key">Synchronized blocks</Highlight> that perform IO; they can still <Highlight type="soft">pin</Highlight> the carrier thread.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Cẩn thận với Synchronized block có chứa IO; chúng có thể gây hiện tượng "pin" thread thật bên dưới.</p>
                </div>
              </ListItem>
            </ul>
          </QuestionBlock>

          <QuestionBlock 
            qNum="Q4"
            qEn="How do you design a microservices system? What are the main pitfalls?"
            qVi="Cách thiết kế hệ thống microservices và các lỗi thường gặp?"
          >
            <ul className="space-y-3 text-slate-700">
              <ListItem>
                <div>
                  <p>Follow <Highlight type="key">Domain-Driven Design</Highlight> for service boundaries.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Tuân thủ Domain-Driven Design (DDD) để xác định ranh giới nghiệp vụ chuẩn xác.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p>Key components: API Gateway, Service Registry, Config Server.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Các thành phần core: API Gateway, Discovery Service và Config Server.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="key">Main pitfalls:</Highlight> Distributed transactions (use Saga), and Observability gaps.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Lỗi thường gặp: Giao dịch phân tán (giải quyết bằng Saga pattern) và thiếu khả năng giám sát (Observability).</p>
                </div>
              </ListItem>
            </ul>
          </QuestionBlock>

          <QuestionBlock 
            qNum="ADV"
            qEn="How do you handle Distributed Locking in a Microservices architecture?"
            qVi="Bạn xử lý Distributed Locking như thế nào trong kiến trúc Microservices?"
          >
            <ul className="space-y-3 text-slate-700">
              <ListItem>
                <div>
                  <p>For simple exclusion, I use <Highlight type="tech">ShedLock</Highlight> or <Highlight type="tech">Redis SETNX</Highlight> with an expiration.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Cho các trường hợp đơn giản như chặn job chạy trùng, dùng ShedLock hoặc lệnh SETNX của Redis kèm TTL.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p>For critical shared resources, I prefer <Highlight type="tech">Redisson</Highlight> with its <Highlight type="key">Watchdog</Highlight> feature.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Cho tài nguyên quan trọng, tôi ưu tiên Redisson vì có cơ chế Watchdog tự động gia hạn lock.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="key">Redlock</Highlight> is used for higher reliability but has significant network overhead.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Redlock được dùng khi cần độ tin cậy cực cao nhưng tốn chi phí mạng lớn.</p>
                </div>
              </ListItem>
            </ul>
          </QuestionBlock>
        </section>

        {/* Section 3: System Design — IMPROVED with Flow Diagrams */}
        <section id="s3" className="mb-16 scroll-mt-24">
          <SectionHeader num={3} title="System Design & Architecture — End-to-End Flow" sub="Thiết kế hệ thống & Kiến trúc — Cải thiện với sơ đồ rõ ràng" />

          {/* NEW: Architecture Flow Visual */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-10">
            <h3 className="text-lg font-black text-slate-800 mb-2 flex items-center gap-2">
              <Network className="w-5 h-5 text-indigo-500" />
              🏗️ System Architecture Flow — HSC Trading Platform
            </h3>
            <p className="text-xs text-slate-500 mb-6">Vẽ sơ đồ này khi bị hỏi "Describe your architecture end-to-end". Nói từng bước theo mũi tên.</p>
            
            <div className="bg-slate-950 rounded-2xl p-6 font-mono text-sm overflow-x-auto">
              <div className="text-green-400 text-xs mb-4">// Architecture Flow — HSC Stock Trading Platform (10,000 TPS)</div>
              <div className="space-y-1 text-slate-300 text-xs leading-6">
                <div><span className="text-yellow-400">CLIENT</span> (Mobile / Web)</div>
                <div className="pl-4">↓ HTTPS</div>
                <div><span className="text-blue-400">API GATEWAY</span> (Kong / Nginx) <span className="text-slate-500">// Rate limiting, Auth, SSL termination</span></div>
                <div className="pl-4">↓ Internal HTTP</div>
                <div><span className="text-blue-400">ORDER SERVICE</span> (Spring Boot) <span className="text-slate-500">// Validate, Enrich order</span></div>
                <div className="pl-4">↓ Publish Event</div>
                <div><span className="text-orange-400">KAFKA TOPIC: orders.{"{symbol}"}</span> <span className="text-slate-500">// Partitioned by symbol for ordering</span></div>
                <div className="pl-4 grid grid-cols-3 gap-4 my-2">
                  <div className="border border-slate-700 rounded p-2 text-center">
                    <div className="text-green-400 text-xs">MATCHING ENGINE</div>
                    <div className="text-slate-400 text-[10px]">Single thread/symbol</div>
                    <div className="text-slate-400 text-[10px]">Deterministic order</div>
                  </div>
                  <div className="border border-slate-700 rounded p-2 text-center">
                    <div className="text-purple-400 text-xs">RISK SERVICE</div>
                    <div className="text-slate-400 text-[10px]">Compliance check</div>
                    <div className="text-slate-400 text-[10px]">Async parallel</div>
                  </div>
                  <div className="border border-slate-700 rounded p-2 text-center">
                    <div className="text-cyan-400 text-xs">NOTIFICATION</div>
                    <div className="text-slate-400 text-[10px]">Push / Email</div>
                    <div className="text-slate-400 text-[10px]">Fire & forget</div>
                  </div>
                </div>
                <div className="pl-4">↓ Trade executed → Publish to settlement topic</div>
                <div><span className="text-orange-400">KAFKA TOPIC: trades.settled</span></div>
                <div className="pl-4">↓ Consume</div>
                <div className="flex gap-4">
                  <div><span className="text-red-400">PostgreSQL</span> <span className="text-slate-500">// Positions (CP - Strong consistent)</span></div>
                  <div className="ml-8"><span className="text-red-400">Cassandra</span> <span className="text-slate-500">// Trade history (AP - Eventual)</span></div>
                </div>
                <div className="pl-4">↓ Cache Layer</div>
                <div><span className="text-green-400">REDIS</span> <span className="text-slate-500">// User positions, session (60% DB load reduction)</span></div>
                <div className="mt-4 border-t border-slate-700 pt-4">
                  <div className="text-slate-500">Monitoring: <span className="text-blue-300">Prometheus</span> + <span className="text-orange-300">Grafana</span> + <span className="text-yellow-300">ELK Stack</span></div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <span className="text-xs font-black text-blue-600 uppercase">Key Design Decision #1</span>
                <p className="text-sm font-bold text-slate-800 mt-1">Partition by Symbol</p>
                <p className="text-xs text-slate-500 mt-1">Ensures order per instrument without global lock. Trade-off: uneven partition load for hot symbols.</p>
                <p className="text-[11px] text-slate-400 italic mt-2">🇻🇳 Phân vùng theo Symbol đảm bảo thứ tự khớp lệnh. Đánh đổi: phân vùng có thể mất cân bằng với symbol hot.</p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                <span className="text-xs font-black text-purple-600 uppercase">Key Design Decision #2</span>
                <p className="text-sm font-bold text-slate-800 mt-1">CP vs AP per data type</p>
                <p className="text-xs text-slate-500 mt-1">Balance (money) = CP (PostgreSQL). History = AP (Cassandra). This is CAP theorem applied in practice.</p>
                <p className="text-[11px] text-slate-400 italic mt-2">🇻🇳 Số dư tiền cần nhất quán tức thì. Lịch sử giao dịch chịu được eventual consistency.</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <span className="text-xs font-black text-green-600 uppercase">Key Design Decision #3</span>
                <p className="text-sm font-bold text-slate-800 mt-1">WAL via Kafka</p>
                <p className="text-xs text-slate-500 mt-1">Don't write to DB synchronously in hot path. Write to Kafka first (WAL), then project to DB async. 3x speed gain.</p>
                <p className="text-[11px] text-slate-400 italic mt-2">🇻🇳 Ghi Kafka trước (WAL), sau đó mới đồng bộ sang DB, tăng 3x tốc độ.</p>
              </div>
            </div>
          </div>

          <QuestionBlock 
            qNum="Q7"
            qEn="Design a stock trading system that handles 10,000 transactions per second."
            qVi="Thiết kế hệ thống giao dịch chứng khoán đạt ngưỡng 10.000 TPS."
            isMustKnow
          >
            <div className="space-y-6">
              <p className="font-bold text-[#1F4E79] italic">"Architecture highlights based on my HSC experience:"</p>
              <ul className="space-y-3 text-slate-700">
                <ListItem>
                  <div>
                    <p><Highlight type="key">Matching engine:</Highlight> single-threaded per instrument for deterministic ordering.</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Matching engine: Xử lý đơn luồng trên từng mã chứng khoán để đảm bảo thứ tự khớp lệnh tuyệt đối.</p>
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <p><Highlight type="tech">Kafka topics partitioned by symbol</Highlight> — ensures order per symbol.</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Phân vùng Kafka theo Symbol: Đảm bảo thứ tự cho từng mã trong khi vẫn cho phép chạy song song.</p>
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <p><Highlight type="key">Persistence:</Highlight> write-ahead log (WAL) then async projection to PostgreSQL/Cassandra.</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Lưu trữ: Ghi log (WAL) trước để tối ưu tốc độ, sau đó mới đồng bộ hóa dữ liệu xuống DB.</p>
                  </div>
                </ListItem>
              </ul>
            </div>
          </QuestionBlock>

          <QuestionBlock 
            qNum="Q9"
            qEn="Explain the CAP theorem with a practical example."
            qVi="Giải thích định lý CAP với ví dụ thực tế."
          >
            <ul className="space-y-3 text-slate-700">
              <ListItem>
                <div>
                  <p><Highlight type="key">CAP theorem</Highlight>: Choose between Consistency and Availability during a Partition.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Định lý CAP: Phải chọn giữa tính nhất quán (Consistency) và tính sẵn sàng (Availability) khi có sự cố mạng.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="key">HSC Example:</Highlight> Balance must be Strong Consistent (CP), trade history can be Eventual Consistent (AP).</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Ví dụ tại HSC: Số dư tiền phải nhất quán tức thì (CP), nhưng lịch sử giao dịch có thể trễ vài giây (AP) để tối ưu hiệu năng.</p>
                </div>
              </ListItem>
            </ul>
          </QuestionBlock>
        </section>

        {/* Section 4: Performance */}
        <section id="s4" className="mb-16 scroll-mt-24">
          <SectionHeader num={4} title="Performance Optimization – 10,000 TPS" sub="Tối ưu hiệu năng – Case study 10.000 TPS" />

          <QuestionBlock 
            qNum="OPT"
            qEn="Describe exactly how you reduced processing time by 50% using Camunda & Java."
            qVi="Mô tả chính xác cách bạn giảm 50% thời gian xử lý bằng Camunda & Java."
            isMustKnow
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[10px] font-black uppercase text-indigo-500">Problem (The Baseline)</span>
                  <p className="text-sm mt-1">Our trade settlement workflow was <Highlight type="key">sequential</Highlight>. Database IO, Compliance checks, and Ledger updates ran synchronously, causing massive thread blocking.</p>
                  <p className="text-[11px] text-slate-500 italic mt-2">🇻🇳 Vấn đề: Quy trình tất toán chạy tuần tự. Các bước check compliance, IO và update sổ cái chạy đồng bộ gây nghẽn luồng xử lý.</p>
                </div>
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <span className="text-[10px] font-black uppercase text-emerald-600">Solution (The 50% Gain)</span>
                  <p className="text-sm mt-1">I architected a <Highlight type="key">State-Machine</Highlight> using Camunda where non-dependent steps were executed <Highlight type="action">in parallel using Async Handlers</Highlight>.</p>
                  <p className="text-[11px] text-slate-500 italic mt-2">🇻🇳 Giải pháp: Thiết kế State-Machine qua Camunda, cho phép các bước không phụ thuộc chạy song song nhờ Async Handlers.</p>
                </div>
              </div>
              <ul className="space-y-3 text-slate-700">
                <ListItem>
                  <div>
                    <p><Highlight type="action">Result:</Highlight> Settlement time dropped from <Highlight type="num">800ms</Highlight> to <Highlight type="num">380ms</Highlight> (roughly 52%).</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Kết quả: Thời gian tất toán giảm từ 800ms xuống còn 380ms (khoảng 52%).</p>
                  </div>
                </ListItem>
              </ul>
            </div>
          </QuestionBlock>

          <QuestionBlock 
            qNum="Q10"
            qEn="How did you reach 10,000 TPS from a 1,500 TPS baseline?"
            qVi="Cách bạn nâng cấp hệ thống từ 1.500 TPS lên 10.000 TPS?"
            isMustKnow
          >
            <div className="space-y-4">
              <ul className="space-y-3 text-slate-700">
                <ListItem>
                   <div>
                     <p>Profiling with async-profiler to find hotspots.</p>
                     <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Sử dụng async-profiler để tìm chính xác các điểm thắt nút cổ chai (hotspots).</p>
                   </div>
                </ListItem>
                <ListItem>
                   <div>
                     <p>Switched to Async Persistence via Kafka WAL.</p>
                     <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Chuyển sang cơ chế lưu trữ bất đồng bộ thông qua Kafka WAL (tăng 3 lần tốc độ).</p>
                   </div>
                </ListItem>
                <ListItem>
                   <div>
                     <p>Redis caching for user positions (60% load reduction).</p>
                     <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Áp dụng cache Redis cho số dư/vị thế người dùng (giảm 60% tải cho Database).</p>
                   </div>
                </ListItem>
              </ul>
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm font-bold">
                Result: 10,000+ TPS sustained with p99 under 50ms.
              </div>
            </div>
          </QuestionBlock>
        </section>

        {/* Section 5: Kafka DEEP DIVE — COMPLETELY NEW */}
        <section id="s5" className="mb-16 scroll-mt-24">
          <SectionHeader num={5} title="Kafka Deep Dive ★ — Được cải thiện" sub="Kỹ thuật dữ liệu – Kafka chuyên sâu theo feedback phỏng vấn" />

          {/* NEW: Why Kafka — BLUF Template */}
          <QuestionBlock 
            qNum="WHY"
            qEn="Why did you choose Kafka? What problem does it solve?"
            qVi="Tại sao chọn Kafka? Nó giải quyết vấn đề gì? — Câu bị hỏi trong phỏng vấn"
            isMustKnow
          >
            <div className="space-y-6">
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-4">
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Câu trả lời chuẩn theo BLUF Template</span>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <div className="flex gap-3">
                    <span className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">1</span>
                    <p><strong>ANSWER:</strong> "We chose Kafka because it <Highlight type="key">decouples services and handles high throughput</Highlight> asynchronously."</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">2</span>
                    <p><strong>WHY:</strong> "Specifically, our DB write throughput was our bottleneck. Synchronous writes caused <Highlight type="num">800ms</Highlight> latency. Kafka acts as a <Highlight type="tech">write-ahead buffer</Highlight>, taking DB pressure off the hot path."</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">3</span>
                    <p><strong>TRADE-OFF:</strong> "The trade-off is we moved from synchronous to <Highlight type="key">eventual consistency</Highlight>. For trade history this is acceptable, but for account balance we kept synchronous DB writes."</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">4</span>
                    <p><strong>RESULT:</strong> "Latency dropped from <Highlight type="num">800ms to 380ms</Highlight>, and we scaled to <Highlight type="num">10,000 TPS</Highlight>."</p>
                  </div>
                </div>
              </div>
              <ul className="space-y-3 text-slate-700">
                <ListItem>
                  <div>
                    <p>4 core reasons to use Kafka: <Highlight type="key">Decoupling · High Throughput · Durability · Replay</Highlight></p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 4 lý do cốt lõi: Tách rời hệ thống, thông lượng cao, độ bền dữ liệu, khả năng replay event.</p>
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <p>Kafka is especially suited for <Highlight type="key">spike traffic buffering</Highlight> — absorbs burst loads and lets downstream consume at their own pace.</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Kafka đặc biệt phù hợp để buffer khi có spike traffic — hấp thụ tải đột biến, cho downstream xử lý theo tốc độ riêng.</p>
                  </div>
                </ListItem>
              </ul>
            </div>
          </QuestionBlock>

          {/* NEW: Kafka Partition Strategy */}
          <QuestionBlock 
            qNum="PAR"
            qEn="How did you design your Kafka partition strategy? How do you scale from 10K to 100K TPS?"
            qVi="Chiến lược partition Kafka của bạn là gì? Scale từ 10K lên 100K TPS thế nào? — Câu hỏi khó trong buổi phỏng vấn"
            isMustKnow
          >
            <div className="space-y-6">
              <div className="bg-slate-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto">
                <div className="text-green-400 mb-3">// Kafka Partition Strategy at HSC</div>
                <div className="space-y-1 text-slate-300">
                  <div className="text-yellow-400">Topic: orders.{"{symbol}"}</div>
                  <div className="pl-4 text-slate-400">// Partition key = symbol (VNM, HPG, VIC...)</div>
                  <div className="pl-4">Partition 0: VNM, FPT</div>
                  <div className="pl-4">Partition 1: HPG, MWG</div>
                  <div className="pl-4">Partition 2: VIC, CTG</div>
                  <div className="pl-4 text-slate-400">// Same symbol → same partition → guaranteed order</div>
                  <div className="pl-4 text-slate-400">// Different symbols → parallel processing</div>
                  <div className="mt-3 text-yellow-400">Consumer Group: matching-engine-group</div>
                  <div className="pl-4">Consumer 0 → Partition 0 (1:1 mapping)</div>
                  <div className="pl-4">Consumer 1 → Partition 1</div>
                  <div className="pl-4">Consumer 2 → Partition 2</div>
                  <div className="pl-4 text-slate-400">// Rule: #consumers ≤ #partitions</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <span className="text-xs font-black text-blue-600 uppercase">Scaling 10K → 100K TPS Strategy</span>
                  <ul className="mt-3 space-y-2 text-xs text-slate-600">
                    <li className="flex gap-2"><span className="text-blue-500">▸</span> <span><strong>Step 1:</strong> Increase partitions (e.g., 3 → 30)</span></li>
                    <li className="flex gap-2"><span className="text-blue-500">▸</span> <span><strong>Step 2:</strong> Scale consumer group horizontally (add pods)</span></li>
                    <li className="flex gap-2"><span className="text-blue-500">▸</span> <span><strong>Step 3:</strong> Optimize producer batching (linger.ms, batch.size)</span></li>
                    <li className="flex gap-2"><span className="text-blue-500">▸</span> <span><strong>Step 4:</strong> Scale Kafka brokers + disk IOPS</span></li>
                    <li className="flex gap-2"><span className="text-blue-500">▸</span> <span><strong>Step 5:</strong> Tune replication factor vs durability</span></li>
                  </ul>
                  <p className="text-[10px] text-slate-400 mt-3 italic">🇻🇳 Muốn scale Kafka: tăng partition → thêm consumer → optimize batch → mở rộng broker</p>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                  <span className="text-xs font-black text-amber-600 uppercase">⚠️ Kafka Auto-Scaling Caveat</span>
                  <p className="text-xs text-slate-600 mt-3"><strong>Kafka does NOT auto-scale easily</strong> because partition count is fixed at topic creation.</p>
                  <ul className="mt-3 space-y-2 text-xs text-slate-600">
                    <li className="flex gap-2"><span className="text-amber-500">!</span> <span>Adding partitions breaks key-based ordering</span></li>
                    <li className="flex gap-2"><span className="text-amber-500">!</span> <span>Must re-partition → requires consumer group reset</span></li>
                    <li className="flex gap-2"><span className="text-green-600">✓</span> <span><strong>Solution:</strong> Pre-plan partition count (10x expected load)</span></li>
                    <li className="flex gap-2"><span className="text-green-600">✓</span> <span>Or use <Highlight type="tech">Kafka Streams</Highlight> re-partitioning strategy</span></li>
                  </ul>
                  <p className="text-[10px] text-slate-400 mt-3 italic">🇻🇳 Kafka không auto-scale đơn giản. Cần pre-plan số partition từ đầu hoặc chấp nhận re-partition phức tạp.</p>
                </div>
              </div>

              <TipBox 
                en='When asked "How do you scale Kafka?", always mention: (1) more partitions = more parallelism, (2) partition count is fixed — this is the key constraint, (3) consumer count ≤ partition count.'
                vi='Khi bị hỏi "Scale Kafka thế nào?", luôn đề cập: (1) Thêm partition = thêm song song, (2) Số partition cố định — đây là constraint chính, (3) Số consumer ≤ số partition.'
              />
            </div>
          </QuestionBlock>

          {/* NEW: Kafka Challenges */}
          <QuestionBlock 
            qNum="KCHA"
            qEn="What are the real challenges when using Kafka in production?"
            qVi="Khó khăn thực tế khi dùng Kafka trong production là gì? — Câu hỏi Insight"
          >
            <ul className="space-y-4 text-slate-700">
              <ListItem>
                <div>
                  <p><Highlight type="key">Challenge 1 — Message Ordering:</Highlight> Only guaranteed within a partition, not across partitions. Solution: partition by business key (symbol, userId).</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Thứ tự message: Chỉ đảm bảo trong cùng partition. Giải pháp: partition theo business key.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="key">Challenge 2 — Duplicate Messages:</Highlight> At-least-once delivery means duplicates are possible. Solution: <Highlight type="tech">Idempotent consumers</Highlight> with dedup key in DB.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Message trùng lặp: At-least-once delivery có thể gây duplicate. Giải pháp: Idempotent consumer với dedup key trong DB.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="key">Challenge 3 — Consumer Lag:</Highlight> When consumers fall behind producers. Fix: scale consumers, batch tuning, async offset commit.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Consumer lag: Khi consumer không kịp theo producer. Fix: scale consumer, tuning batch, async commit.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="key">Challenge 4 — Exactly-Once:</Highlight> Very hard to achieve. Requires <Highlight type="tech">Kafka transactions + idempotent producers</Highlight>. High overhead.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Exactly-once rất khó đạt được. Cần Kafka transactions + idempotent producer. Chi phí hiệu năng cao.</p>
                </div>
              </ListItem>
            </ul>
          </QuestionBlock>

          <QuestionBlock 
            qNum="Q11"
            qEn="How do you handle Kafka consumer lag in a high-throughput system?"
            qVi="Cách xử lý tình trạng lag của Kafka consumer trong hệ thống throughput cao?"
          >
            <ul className="space-y-3 text-slate-700">
              <ListItem>
                <div>
                  <p><Highlight type="action">Scale horizontally:</Highlight> Increase the number of partitions and consumers in the group.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Mở rộng hàng ngang: Tăng số lượng partition và số lượng consumer trong cùng group.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="key">Batch processing:</Highlight> Tune `fetch.min.bytes` and `max.poll.records` to process more data per poll.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Xử lý theo batch: Điều chỉnh các tham số cấu hình để tăng lượng bản ghi xử lý mỗi đợt poll.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="tech">Async Commit:</Highlight> Use async offset committing to avoid blocking the processing loop.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Async Commit: Sử dụng cơ chế commit offset bất đồng bộ để không chặn vòng lặp xử lý chính.</p>
                </div>
              </ListItem>
            </ul>
          </QuestionBlock>
        </section>

        {/* Section 6: RAG Pipeline — COMPLETELY REBUILT */}
        <section id="s6" className="mb-16 scroll-mt-24">
          <SectionHeader num={6} title="RAG Pipeline Chuẩn ★ — Được cải thiện" sub="Hệ thống AI & RAG — Rebuilt theo feedback phỏng vấn" />

          {/* NEW: RAG Pipeline Diagram */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-10">
            <h3 className="text-lg font-black text-slate-800 mb-2 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              🤖 RAG Pipeline — Flow chuẩn cần thuộc lòng
            </h3>
            <p className="text-xs text-slate-500 mb-6">Khi bị hỏi "Describe your RAG system", trả lời theo đúng flow này. Interviewer đã gợi ý flow này trong buổi phỏng vấn trước.</p>
            
            <div className="bg-slate-950 rounded-2xl p-6 font-mono text-xs overflow-x-auto mb-6">
              <div className="text-purple-400 mb-3">// RAG Pipeline — GLOHOW AI System</div>
              <div className="space-y-2 text-slate-300">
                <div className="text-yellow-400">═══ INGESTION PIPELINE (Offline) ═══</div>
                <div className="pl-4">
                  <div><span className="text-blue-300">DATA SOURCES</span>: emails, PDFs, documents, web pages</div>
                  <div className="pl-8">↓ Extract text</div>
                  <div><span className="text-blue-300">CHUNKING</span>: Split into ~500 token chunks with 50 token overlap</div>
                  <div className="pl-8 text-slate-500">// Overlap prevents losing context at boundaries</div>
                  <div className="pl-8">↓ Embed each chunk</div>
                  <div><span className="text-blue-300">EMBEDDING MODEL</span>: text-embedding-3-small (OpenAI) or local model</div>
                  <div className="pl-8">↓ Store vector + metadata</div>
                  <div><span className="text-blue-300">VECTOR DB</span>: Qdrant (with metadata: source, date, type)</div>
                </div>
                <div className="mt-3 text-yellow-400">═══ RETRIEVAL PIPELINE (Online / Per Query) ═══</div>
                <div className="pl-4">
                  <div><span className="text-green-300">USER QUERY</span>: "Summarize last week's client emails"</div>
                  <div className="pl-8">↓ Embed query</div>
                  <div><span className="text-green-300">HYBRID SEARCH</span>: Vector similarity + BM25 keyword</div>
                  <div className="pl-8 text-slate-500">// Semantic: finds related concepts</div>
                  <div className="pl-8 text-slate-500">// Keyword: ensures exact match for names/IDs</div>
                  <div className="pl-8">↓ Top-K results (K=10)</div>
                  <div><span className="text-green-300">RE-RANKING</span>: Cross-encoder model to reorder by relevance</div>
                  <div className="pl-8">↓ Top 3-5 chunks (filtered)</div>
                  <div><span className="text-green-300">LLM GENERATION</span>: Claude/GPT with system prompt + chunks as context</div>
                  <div className="pl-8 text-slate-500">// Temperature: 0.1 (low, for factual accuracy)</div>
                  <div className="pl-8">↓</div>
                  <div><span className="text-purple-300">RESPONSE</span>: Answer with citations [Source: email_20240115.pdf]</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                <span className="text-xs font-black text-purple-600 uppercase">Why Qdrant?</span>
                <ul className="mt-2 space-y-1 text-xs text-slate-600">
                  <li className="flex gap-2"><span className="text-purple-500">▸</span> Written in Rust → extremely fast</li>
                  <li className="flex gap-2"><span className="text-purple-500">▸</span> Rich metadata filtering (filter by date, type, user)</li>
                  <li className="flex gap-2"><span className="text-purple-500">▸</span> Native hybrid search (vector + sparse)</li>
                  <li className="flex gap-2"><span className="text-purple-500">▸</span> Self-hostable, good Java client</li>
                </ul>
                <p className="text-[10px] text-slate-400 mt-2 italic">🇻🇳 Qdrant: Tốc độ cao (Rust), lọc metadata mạnh, hybrid search native, tự host được.</p>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                <span className="text-xs font-black text-red-600 uppercase">Why NOT Pinecone?</span>
                <ul className="mt-2 space-y-1 text-xs text-slate-600">
                  <li className="flex gap-2"><span className="text-red-500">✗</span> Fully managed = vendor lock-in</li>
                  <li className="flex gap-2"><span className="text-red-500">✗</span> Expensive at scale</li>
                  <li className="flex gap-2"><span className="text-red-500">✗</span> Limited metadata filtering in free tier</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Good choice if: managed infra is priority</li>
                </ul>
                <p className="text-[10px] text-slate-400 mt-2 italic">🇻🇳 Pinecone: Tốt nếu muốn managed, nhưng tốn kém và bị lock-in vendor.</p>
              </div>
            </div>
          </div>

          {/* NEW: RAG Bottlenecks — the key interview question */}
          <QuestionBlock 
            qNum="BOT"
            qEn="What are the bottlenecks and limitations of a RAG system? How do you solve them?"
            qVi="Điểm nghẽn và giới hạn của RAG system là gì? Cách giải quyết? — Câu hỏi Insight được gợi ý trong phỏng vấn"
            isMustKnow
          >
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
                <p className="text-xs font-black text-red-600 uppercase mb-2">Interviewer đã hint câu này:</p>
                <p className="text-sm text-slate-700 italic">"Vector search is not 100% accurate. Too many retrieved documents confuse the LLM." → Họ muốn bạn nói về giải pháp.</p>
              </div>
              <ul className="space-y-4 text-slate-700">
                <ListItem>
                  <div>
                    <p><Highlight type="key">Problem 1 — Low Retrieval Precision:</Highlight> Vector search retrieves semantically similar but not always relevant chunks.</p>
                    <p className="text-sm font-bold text-slate-700 mt-1">✓ Solution: <Highlight type="tech">Hybrid Search</Highlight> (vector + BM25) + <Highlight type="tech">Re-ranking</Highlight> with cross-encoder model.</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Tìm kiếm vector không đủ chính xác. Fix: Kết hợp BM25 + vector search, thêm bước re-ranking.</p>
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <p><Highlight type="key">Problem 2 — Context Window Overflow:</Highlight> Retrieving too many chunks (K=20+) exceeds LLM context and degrades quality.</p>
                    <p className="text-sm font-bold text-slate-700 mt-1">✓ Solution: Keep K=3-5 after re-ranking. Use <Highlight type="tech">map-reduce summarization</Highlight> for large docs.</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Quá nhiều context làm LLM "confused". Fix: Giữ K=3-5 sau re-ranking, dùng map-reduce cho tài liệu dài.</p>
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <p><Highlight type="key">Problem 3 — Hallucinations:</Highlight> LLM generates false information not in retrieved context.</p>
                    <p className="text-sm font-bold text-slate-700 mt-1">✓ Solution: Low temperature (0.1), force citation format, <Highlight type="tech">groundedness check</Highlight> post-generation.</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 LLM "bịa" thông tin. Fix: Temperature thấp (0.1), bắt buộc trích dẫn nguồn, kiểm tra groundedness sau khi generate.</p>
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <p><Highlight type="key">Problem 4 — Chunking Strategy:</Highlight> Wrong chunk size loses context. Too small = fragmented, Too large = noisy.</p>
                    <p className="text-sm font-bold text-slate-700 mt-1">✓ Solution: ~500 tokens with 50-token overlap. Use <Highlight type="tech">semantic chunking</Highlight> for structured docs.</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Chunk sai kích thước làm mất ngữ cảnh. Fix: 500 token với 50 token overlap, dùng semantic chunking cho tài liệu cấu trúc.</p>
                  </div>
                </ListItem>
              </ul>
            </div>
          </QuestionBlock>

          {/* NEW: Summarization Strategy */}
          <QuestionBlock 
            qNum="SUM"
            qEn="How does your summarization feature work exactly?"
            qVi="Tính năng summarization hoạt động chính xác như thế nào? — Câu bị hỏi trong phỏng vấn"
          >
            <div className="space-y-4">
              <div className="bg-slate-950 rounded-2xl p-5 font-mono text-xs">
                <div className="text-purple-400 mb-2">// Summarization Strategy — Map-Reduce Pattern</div>
                <div className="space-y-1 text-slate-300">
                  <div className="text-yellow-400">If document {"<"} 4K tokens:</div>
                  <div className="pl-4">→ Direct summarization (single LLM call)</div>
                  <div className="mt-2 text-yellow-400">If document {">"} 4K tokens (Map-Reduce):</div>
                  <div className="pl-4">Step 1 (MAP):    Split into chunks</div>
                  <div className="pl-4">                 Summarize each chunk independently</div>
                  <div className="pl-4">                 [chunk1_summary, chunk2_summary, ...]</div>
                  <div className="pl-4">Step 2 (REDUCE): Combine all chunk summaries</div>
                  <div className="pl-4">                 Final LLM call to create cohesive summary</div>
                  <div className="pl-4 text-green-400">Result: Scalable to documents of any length</div>
                </div>
              </div>
              <ul className="space-y-3 text-slate-700 mt-2">
                <ListItem>
                  <div>
                    <p>Not just "I call the API" — I design the <Highlight type="key">chunking → parallel map → reduce</Highlight> pipeline.</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Không chỉ "gọi API" — phải thiết kế pipeline chunking → map song song → reduce hợp nhất.</p>
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <p><Highlight type="key">Trade-off:</Highlight> Map-reduce adds latency. For real-time, use streaming response. For batch, accept latency.</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Trade-off: Map-reduce tốn thời gian. Real-time dùng streaming. Batch thì chấp nhận latency.</p>
                  </div>
                </ListItem>
              </ul>
            </div>
          </QuestionBlock>

          <QuestionBlock 
            qNum="EVA"
            qEn="How do you evaluate the quality of a RAG system?"
            qVi="Bạn đánh giá chất lượng hệ thống RAG như thế nào?"
          >
            <ul className="space-y-3 text-slate-700">
              <ListItem>
                <div>
                  <p>I use the <Highlight type="key">RAG Triad</Highlight> metrics: <Highlight type="num">Context Relevance, Groundedness, and Answer Relevance</Highlight>.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Dùng chỉ số RAG Triad: Sự liên quan của ngữ cảnh, tính xác thực (groundedness) và sự liên quan của câu trả lời.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p>Implemented <Highlight type="tech">Ragas</Highlight> or <Highlight type="tech">DeepEval</Highlight> for automated 'LLM-as-a-judge' scoring.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Áp dụng Ragas hoặc DeepEval để tự động hóa việc chấm điểm bằng cách dùng 'LLM-as-a-judge'.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p>Trace <Highlight type="soft">Negative Feedback rate</Highlight> and <Highlight type="num">Latency p95</Highlight> in production.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Theo dõi tỷ lệ phản hồi tiêu cực và độ trễ p95 trong môi trường thực tế.</p>
                </div>
              </ListItem>
            </ul>
          </QuestionBlock>
        </section>

        {/* Section 7: DevOps */}
        <section id="s7" className="mb-16 scroll-mt-24">
          <SectionHeader num={7} title="DevOps, CI/CD & Cloud" sub="Vận hành hệ thống & Đám mây" />
          
          <QuestionBlock 
            qNum="Q15"
            qEn="How do you handle Blue-Green deployments for a high-traffic system?"
            qVi="Cách anh xử lý triển khai Blue-Green cho hệ thống có traffic lớn?"
          >
            <ul className="space-y-3 text-slate-700">
              <ListItem>
                <div>
                  <p><Highlight type="key">Zero Downtime:</Highlight> Keep two identical environments. Route traffic to 'Green' only when health checks pass.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Không gián đoạn: Duy trì hai môi trường song song. Chỉ chuyển traffic sang bản mới khi đã bypass health check.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="action">Database Migration Strategy:</Highlight> Use backward-compatible schemas to avoid breaking the old version.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Chiến lược DB: Sử dụng các thay đổi schema có tính tương thích ngược để không làm hỏng bản cũ đang chạy.</p>
                </div>
              </ListItem>
            </ul>
          </QuestionBlock>
        </section>

        {/* Section 8: Leadership */}
        <section id="s8" className="mb-16 scroll-mt-24">
          <SectionHeader num={8} title="Team Leadership & Mentoring" sub="Lãnh đạo & Đào tạo đội ngũ" />

          <QuestionBlock 
            qNum="Q18"
            qEn="How do you balance being a Technical Leader with hands-on coding?"
            qVi="Cách anh cân bằng giữa vai trò Technical Leader và việc trực tiếp viết code?"
          >
            <ul className="space-y-3 text-slate-700">
              <ListItem>
                <div>
                  <p>Rule of thumb: <Highlight type="num">50–60% leadership</Highlight> and <Highlight type="num">40–50% hands-on</Highlight>.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Quy tắc vàng: 50–60% thời gian cho quản lý/dẫn dắt, 40–50% cho code thực tế.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="action">Hands-on work:</Highlight> I own the <Highlight type="key">hardest or most unclear parts</Highlight>.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Thực chiến: Tôi thường đảm nhận những phần khó nhất hoặc mơ hồ nhất (POC, tối ưu hiệu năng phức tạp).</p>
                </div>
              </ListItem>
            </ul>
          </QuestionBlock>

          <QuestionBlock 
            qNum="LDR"
            qEn="How do you handle a Senior Engineer who is talented but toxic?"
            qVi="Bạn xử lý thế nào với một Senior giỏi kỹ thuật nhưng có thái độ độc hại?"
          >
            <ul className="space-y-3 text-slate-700">
              <ListItem>
                <div>
                  <p><Highlight type="action">Direct 1:1 Feedback:</Highlight> Address impact, not personality. Focus on how it blocks the team.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Feedback 1:1 trực tiếp: Tập trung vào ảnh hưởng thực tế thay vì tính cách cá nhân.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p>Explain that a Senior must be a <Highlight type="action">Force Multiplier</Highlight>.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Giải thích rằng vai trò Senior phải là "Đòn bẩy sức mạnh" cho cả đội ngũ.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="soft">Accountability:</Highlight> Transition off the project if behavior doesn't change.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Trách nhiệm: Chuyển họ khỏi dự án nếu hành vi không thay đổi sau khi đã góp ý.</p>
                </div>
              </ListItem>
            </ul>
          </QuestionBlock>

          <QuestionBlock 
            qNum="Q19"
            qEn="Tell me about a time you had a conflict with a team member."
            qVi="Kể về một lần anh có mâu thuẫn với thành viên trong team."
            isMustKnow
          >
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-800">"Conflict over introducing Camunda at HSC."</p>
              <p className="text-sm text-slate-600">Action: Scheduled a joint <Highlight type="action">benchmark spike</Highlight>. Data showed Camunda saved 3 weeks dev time. Conflict solved by data.</p>
              <p className="text-[11px] text-slate-500 italic border-t border-slate-100 pt-2">
                🇻🇳 Tình huống: Mâu thuẫn khi đưa Camunda vào HSC. Giải pháp: Tôi tổ chức benchmark thực tế. Dữ liệu chứng minh Camunda tiết kiệm 3 tuần phát triển. Mâu thuẫn được giải quyết bằng con số, không phải quyền lực.
              </p>
            </div>
          </QuestionBlock>
        </section>

        {/* Section 9: Behavioral */}
        <section id="s9" className="mb-16 scroll-mt-24">
          <SectionHeader num={9} title="Behavioral & Situational" sub="Câu hỏi tình huống & Hành vi" />
          
          <QuestionBlock 
            qNum="Q20"
            qEn="Tell me about your biggest professional failure and what you learned."
            qVi="Kể về thất bại lớn nhất trong sự nghiệp và bài học anh rút ra được."
          >
            <ul className="space-y-3 text-slate-700">
              <ListItem>
                <div>
                  <p><Highlight type="soft">Situation:</Highlight> Underestimating the database migration risk during a major release at HDS.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Tình huống: Đánh giá thấp rủi ro khi migrate database trong một bản release lớn tại HDS.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="action">Lesson:</Highlight> Always implement a <Highlight type="key">Rollback Plan</Highlight> and dry-run with production-sized data.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Bài học: Luôn phải có kế hoạch Rollback và chạy thử với lượng dữ liệu tương đương môi trường thật.</p>
                </div>
              </ListItem>
            </ul>
          </QuestionBlock>
        </section>

        {/* Section 10: Questions to Interviewer */}
        <section id="s10" className="mb-16 scroll-mt-24">
          <SectionHeader num={10} title="Questions to Interviewer" sub="Câu hỏi dành cho Nhà Tuyển Dụng — Chủ động hỏi lại!" />
          
          <TipBox 
            en="Smart candidates ALWAYS ask questions. Prepare 5–7 so you can pick based on what's already been discussed."
            vi="Ứng viên thông minh LUÔN đặt câu hỏi. Chuẩn bị 5–7 câu để chọn theo diễn biến buổi phỏng vấn."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-black text-[#1F4E79] mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" /> 🎯 Về vị trí / The Role
              </h3>
              <ul className="space-y-4">
                <ListItem>
                  <div>
                    <p>What does <Highlight type="key">success look like</Highlight> in the first 3, 6, and 12 months?</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Thành công trong 3, 6, 12 tháng đầu ở vị trí này trông như thế nào?</p>
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <p>What are the <Highlight type="key">biggest technical challenges</Highlight> the team is facing right now?</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Thách thức kỹ thuật lớn nhất mà team đang gặp hiện tại là gì?</p>
                  </div>
                </ListItem>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-black text-[#1F4E79] mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" /> 👥 Về Đội ngũ / The Team
              </h3>
              <ul className="space-y-4">
                <ListItem>
                  <div>
                    <p>How is the engineering team structure? <Highlight type="key">Ownership & Autonomy</Highlight>?</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Cấu trúc team kỹ thuật như thế nào? Quyền sở hữu và tự chủ của các team ra sao?</p>
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <p>How does the engineering team balance <Highlight type="key">Technical Debt</Highlight> with new features?</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Team cân bằng giữa việc trả nợ kỹ thuật (Tech Debt) và release tính năng mới như thế nào?</p>
                  </div>
                </ListItem>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-black text-[#1F4E79] mb-4 flex items-center gap-2">
                <LineChart className="w-5 h-5" /> 🚀 Case Study & Roadmap
              </h3>
              <ul className="space-y-4">
                <ListItem>
                  <div>
                    <p>Could you share more about the <Highlight type="tech">Scalability Roadmap</Highlight> for the next year?</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Anh/chị có thể chia sẻ thêm về lộ trình mở rộng hệ thống (Scalability) trong năm tới không?</p>
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <p>What is the company's long-term strategy for integrating <Highlight type="tech">AI/GenAI</Highlight> into products?</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Chiến lược dài hạn của công ty trong việc tích hợp AI/GenAI vào sản phẩm là gì?</p>
                  </div>
                </ListItem>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-black text-[#1F4E79] mb-4 flex items-center gap-2">
                <GitBranch className="w-5 h-5" /> 📅 Quy trình / Next Steps
              </h3>
              <ul className="space-y-4">
                <ListItem>
                  <div>
                    <p>What are the <Highlight type="key">next steps</Highlight> in the hiring process?</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Các bước tiếp theo trong quy trình tuyển dụng là gì?</p>
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <p>Is there anything about my background you'd like me to <Highlight type="action">clarify</Highlight>?</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Có điều gì trong hồ sơ của tôi anh/chị muốn tôi làm rõ thêm không?</p>
                  </div>
                </ListItem>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 11: Closing */}
        <section id="s11" className="mb-16 scroll-mt-24">
          <SectionHeader num={11} title="Interview Closing" sub="Kết thúc buổi phỏng vấn — Tạo ấn tượng cuối cùng" />
          
          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm mb-10">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-[#1F4E79]" />
              Closing Statement / Câu kết thúc mẫu
            </h3>
            <div className="space-y-6">
              <div>
                <Label lang="en">The High-Impact Close (EN)</Label>
                <ul className="space-y-3 mt-4 text-slate-700">
                  <ListItem><Highlight type="soft">Thank you for the conversation.</Highlight> I really enjoyed learning about the technical challenges you mentioned today, specifically <Highlight type="key">[mention a detail from the chat]</Highlight>.</ListItem>
                  <ListItem>Based on our discussion, I'm <Highlight type="action">confident my experience</Highlight> in high-scale systems and AI architecture is a strong match for your roadmap.</ListItem>
                  <ListItem><Highlight type="action">I'm very interested in moving forward.</Highlight> Is there anything else I can provide — code samples or technical cases?</ListItem>
                </ul>
              </div>
              <div className="pt-6 border-t border-slate-100">
                <Label lang="vi">Câu kết thúc ấn tượng (VI)</Label>
                <ul className="space-y-2 mt-4 text-slate-600 text-[13px] italic">
                   <li className="flex gap-2"><span>🇻🇳 Cảm ơn anh/chị về buổi trao đổi. Tôi thực sự thấy hứng thú khi nghe về [chi tiết trong buổi phỏng vấn].</span></li>
                   <li className="flex gap-2"><span>🇻🇳 Tôi tự tin rằng kinh nghiệm của mình về hệ thống quy mô lớn và kiến trúc AI rất phù hợp với lộ trình của công ty.</span></li>
                   <li className="flex gap-2"><span>🇻🇳 Tôi rất mong được tiếp tục các bước tiếp theo. Anh/chị có cần tôi cung cấp thêm mẫu code hay case study nào không?</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#1F4E79] text-white p-10 rounded-3xl shadow-xl mt-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Mail className="w-6 h-6 text-blue-300" />
              Follow-up Email (within 24 hours)
            </h3>
            <div className="bg-slate-950/40 p-8 rounded-2xl font-mono text-[13px] leading-relaxed border border-white/10 whitespace-pre-wrap">
              Subject: Thank you – Technical Leader interview – Thai Tieu Loi{"\n\n"}
              Dear [Interviewer Name],{"\n\n"}
              Thank you again for speaking with me today. Our conversation reinforced my interest in joining [Company Name]. I'm particularly excited about [Specific Challenge].{"\n\n"}
              If you need any additional information — I'm happy to provide it.{"\n\n"}
              Best regards,{"\n"}
              Thai Tieu Loi
            </div>
          </div>
        </section>

        {/* Section 12: Final Tips */}
        <div id="s12" className="scroll-mt-24">
          <SectionHeader num={12} title="Final Tips" sub="Lời khuyên tổng kết" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 px-2">
          <TipCard title="Trước phỏng vấn" type="before" icon={<Search className="w-5 h-5" />}>
             <ul className="text-xs space-y-3 text-slate-600">
               <li className="flex gap-2"><span>✓</span> <span>Nghiên cứu kỹ sản phẩm & tech stack.</span></li>
               <li className="flex gap-2"><span>✓</span> <span>Chuẩn bị sẵn 3 câu chuyện <strong className="text-emerald-700">STAR</strong>.</span></li>
               <li className="flex gap-2"><span>✓</span> <span>Luyện nói flow diagram (architecture, RAG, Kafka) thành tiếng.</span></li>
               <li className="flex gap-2"><span>✓</span> <span>Luyện template BLUF cho mọi câu kỹ thuật.</span></li>
             </ul>
          </TipCard>
          <TipCard title="Trong phỏng vấn" type="during" icon={<Zap className="w-5 h-5" />}>
             <ul className="text-xs space-y-3 text-slate-600">
               <li className="flex gap-2"><span>★</span> <span>Nói rõ ràng, không vội vã.</span></li>
               <li className="flex gap-2"><span>★</span> <span>Sử dụng số liệu: <strong className="text-amber-700">10k TPS, 60% reduction</strong>.</span></li>
               <li className="flex gap-2"><span>★</span> <span>Luôn nêu trade-off sau mỗi quyết định kỹ thuật.</span></li>
               <li className="flex gap-2"><span>★</span> <span>Nếu không biết, nói cách bạn sẽ tìm hiểu.</span></li>
             </ul>
          </TipCard>
          <TipCard title="Cần tránh" type="avoid" icon={<ShieldAlert className="w-5 h-5" />}>
             <ul className="text-xs space-y-3 text-slate-600 font-medium">
               <li className="flex gap-2"><span>✗</span> <span>Trả lời không có structure (không BLUF, không STAR).</span></li>
               <li className="flex gap-2"><span>✗</span> <span>Chỉ nói "tôi dùng Kafka" mà không giải thích WHY.</span></li>
               <li className="flex gap-2"><span>✗</span> <span>Nói xấu công ty hoặc đồng nghiệp cũ.</span></li>
               <li className="flex gap-2"><span>✗</span> <span>Nhận vơ công sức không phải của mình.</span></li>
             </ul>
          </TipCard>
        </div>
      </div>

      {/* Closing Banner */}
        <div className="bg-gradient-to-br from-[#F59E0B] via-[#EF4444] to-[#EC4899] text-white p-16 rounded-[40px] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <h2 className="text-4xl font-black mb-4 relative z-10">🎉 Chúc anh Thái Tiểu Lôi phỏng vấn thành công rực rỡ!</h2>
          <p className="text-white text-xl italic relative z-10 opacity-95">You are over-prepared. Just go there and own it! 💪</p>
        </div>
      </div>

      {/* Sidebar TOC - Sticky Column (Desktop Only) */}
      <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 order-2 mt-24">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 max-h-[80vh] overflow-y-auto border-l-4 border-l-indigo-500">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" /> NAVIGATION
          </h3>
          <nav className="space-y-1">
            {[
              { id: 'pre-feedback', label: 'Analysis', icon: <AlertTriangle className="w-3 h-3" /> },
              { id: 'pre-framework', label: 'Framework', icon: <MessageSquare className="w-3 h-3" /> },
              { id: 's1', label: 'Self Intro' },
              { id: 's2', label: 'Java & Micro' },
              { id: 's3', label: 'Architecture' },
              { id: 's4', label: 'Performance' },
              { id: 's5', label: 'Kafka Deep' },
              { id: 's6', label: 'AI & RAG' },
              { id: 's7', label: 'DevOps' },
              { id: 's8', label: 'Leadership' },
              { id: 's9', label: 'Behavioral' },
              { id: 's10', label: 'Q -> Inter' },
              { id: 's11', label: 'Closing' },
              { id: 's12', label: 'Final Tips' }
            ].map((item, idx) => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                className="group flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-slate-50 transition-all text-slate-500 hover:text-indigo-600 border border-transparent hover:border-slate-100"
              >
                <span className="w-5 h-5 bg-slate-50 rounded-lg flex items-center justify-center text-[9px] font-black group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  {idx + 1}
                </span>
                <span className="text-[11px] font-bold truncate">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <button 
              onClick={scrollToTop}
              className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-lg"
            >
              <ChevronUp className="w-3 h-3" /> Top
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* Floating Back to Top */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 w-14 h-14 bg-white text-[#1F4E79] border border-slate-200 rounded-full shadow-2xl flex items-center justify-center hover:-translate-y-2 hover:bg-slate-50 transition-all z-40 group"
      >
        <ChevronUp className="w-7 h-7 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  </div>
  );
}

// Helper Components
function SectionHeader({ num, title, sub }: { num: number, title: string, sub: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-2">
         <div className="w-12 h-12 bg-[#1F4E79] text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-blue-900/20">{num}</div>
         <h2 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h2>
      </div>
      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] ml-16">{sub}</p>
    </div>
  );
}

function QuestionBlock({ qNum, qEn, qVi, isMustKnow = false, children }: { qNum: string, qEn: string, qVi?: string, isMustKnow?: boolean, children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all mb-10 group"
    >
      <div className="bg-[#F8F9FC] p-8 border-l-[6px] border-l-[#1F4E79]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="bg-[#C00000] text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-sm">{qNum}</span>
            {isMustKnow && (
              <span className="bg-[#BF8F00] text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest flex items-center gap-1 shadow-sm">
                <Star className="w-3 h-3 fill-current" /> Must Know
              </span>
            )}
          </div>
        </div>
        <h4 className="text-xl font-black text-slate-800 leading-tight group-hover:text-[#1F4E79] transition-colors">{qEn}</h4>
        {qVi && <p className="text-sm text-slate-500 italic mt-3 font-medium opacity-80 decoration-slate-300">🇻🇳 {qVi}</p>}
      </div>
      <div className="p-10 bg-white">
        {children}
      </div>
    </motion.div>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-4 group/li">
      <span className="text-[#2E75B6] mt-1 font-black group-hover/li:translate-x-1 transition-transform">▸</span>
      <span className="text-slate-700 leading-relaxed font-medium">{children}</span>
    </li>
  );
}

function Highlight({ children, type }: { children: React.ReactNode, type: 'tech' | 'num' | 'action' | 'soft' | 'key' }) {
  const styles = {
    tech: "px-2 py-0.5 bg-[#FFE066] text-[#5C4A00] font-black rounded-md text-[13px] shadow-sm italic",
    num: "px-2 py-0.5 bg-[#B4F8C8] text-[#065F46] font-black rounded-md text-[13px] shadow-sm",
    action: "px-2 py-0.5 bg-[#A0E7E5] text-[#065F46] font-black rounded-md text-[13px] shadow-sm",
    soft: "px-2 py-0.5 bg-[#FBE7C6] text-[#7C2D12] font-black rounded-md text-[13px] shadow-sm",
    key: "border-b-[3px] border-[#2E75B6] font-black text-[#1F4E79] pb-0.5"
  };
  return <span className={styles[type]}>{children}</span>;
}

function Label({ children, lang }: { children: React.ReactNode, lang: 'en' | 'vi' }) {
  return (
    <span className={cn(
      "text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2",
      lang === 'en' ? "text-[#2E75B6]" : "text-emerald-600 opacity-70"
    )}>
      {lang === 'en' ? "🇬🇧" : "🇻🇳"} {children}
    </span>
  );
}

function TipBox({ en, vi }: { en: string, vi: string }) {
  return (
    <div className="mt-10 bg-gradient-to-br from-[#FFF7D6] to-[#FFF2CC] border-2 border-[#BF8F00] rounded-2xl p-8 relative shadow-lg shadow-amber-900/5">
      <div className="absolute -top-5 left-8 px-4 py-1 bg-white border-2 border-[#BF8F00] rounded-xl text-2xl shadow-sm">💡</div>
      <h5 className="text-[10px] font-black text-[#BF8F00] uppercase tracking-[0.2em] mt-3 mb-4">Interview Insight // Strategy</h5>
      <p className="text-[15px] text-amber-950 font-bold mb-2 leading-relaxed">{en}</p>
      <p className="text-[13px] text-amber-800 italic opacity-80">🇻🇳 {vi}</p>
    </div>
  );
}

function TipCard({ title, icon, children, type }: { title: string, icon: React.ReactNode, children: React.ReactNode, type: 'before' | 'during' | 'avoid' }) {
  const colors = {
    before: "border-[#10B981] bg-white",
    during: "border-[#BF8F00] bg-white",
    avoid: "border-[#C00000] bg-white"
  };
  const titleColors = {
    before: "text-[#10B981]",
    during: "text-[#BF8F00]",
    avoid: "text-[#C00000]"
  };
  return (
    <div className={cn("p-8 rounded-[32px] border-t-[6px] shadow-xl hover:-translate-y-2 transition-all duration-300", colors[type])}>
      <div className="flex items-center gap-3 mb-6">
        <div className={cn("p-2 rounded-xl bg-slate-50", titleColors[type])}>{icon}</div>
        <h4 className={cn("font-black text-xs uppercase tracking-widest", titleColors[type])}>{title}</h4>
      </div>
      {children}
    </div>
  );
}