import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Target, FileText, CheckCircle2, Star, AlertCircle, Mail, 
  ChevronUp, Briefcase, Calendar, Cpu, Users, Zap, Search, MessageSquare, 
  ShieldAlert, GitBranch, Terminal, LineChart, AlertTriangle, Brain, 
  Network, Database, Layers 
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import * as supplementalData from '../data/interviewPrep';

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

        {/* Post-Interview Feedback Analysis */}
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

        {/* Navigation / TOC Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative">
          {/* Sidebar TOC */}
          <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 order-2">
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 overflow-y-auto max-h-[80vh] border-l-4 border-l-indigo-500">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-500" /> NAVIGATION
              </h3>
              <nav className="space-y-1">
                {[
                  { id: 'pre-feedback', label: 'Analysis' },
                  { id: 's1', label: 'Self Introduction' },
                  { id: 's2', label: 'Java & Micro' },
                  { id: 's3', label: 'Architecture' },
                  { id: 's4', label: 'Performance' },
                  { id: 's5', label: 'Kafka Deep Dive' },
                  { id: 's5b', label: 'Kafka AutoScale' },
                  { id: 's6', label: 'RAG Pipeline' },
                  { id: 's14', label: 'Real Replay' },
                  { id: 's15', label: 'Company Specific' },
                  { id: 's4plus', label: 'Performance Strategy' },
                  { id: 's16', label: 'Candidate Questions' }
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
                  className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all"
                >
                  <ChevronUp className="w-3 h-3" /> Top
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 order-1">
            {/* Legend / Key Info */}
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <span className="text-[11px] font-bold text-slate-600 tracking-tight">MUST KNOW — Đã bị hỏi trong thực tế</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span className="text-[11px] font-bold text-slate-600 tracking-tight">DEEP DIVE — Kiến trúc chi tiết</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-[11px] font-bold text-slate-600 tracking-tight">BLUF — Trả lời nhanh 20s</span>
              </div>
            </div>

            <section id="s1" className="mb-16 scroll-mt-24">
              <SectionHeader num={1} title="Interview Opening" sub="Self Introduction" />
              <QuestionBlock qNum="OP" qEn="Tell me about yourself?" qVi="Giới thiệu bản thân?">
                <Label lang="en" />
                <p className="text-slate-700 leading-relaxed mb-6">
                  "I am a <Highlight type="tech">Technical Leader</Highlight> with 10+ years of experience in 
                  <Highlight type="tech">Java Ecosystem</Highlight> and <Highlight type="tech">High-Throughput Systems</Highlight>. 
                  My core expertise lies in building mission-critical financial systems (at HSC) and 
                  integrating AI/LLM solutions (at GLOHOW). I define myself as 40% hands-on executor and 60% system architect/leader."
                </p>
                <Label lang="vi" />
                <p className="text-slate-500 text-[13px] italic leading-relaxed">
                  "Tôi là một Technical Leader với hơn 10 năm kinh nghiệm trong hệ sinh thái Java và các hệ thống throughput cao. 
                  Sở trường của tôi là xây dựng các hệ thống tài chính quan trọng (tại HSC) và tích hợp các giải pháp AI/LLM (tại GLOHOW). 
                  Tôi định vị mình là 40% hands-on và 60% kiến trúc/lãnh đạo."
                </p>
              </QuestionBlock>
            </section>

            {/* S5B Kafka AutoScaling */}
            <section id="s5b" className="mb-16 scroll-mt-24">
              <SectionHeader num="5.2" title={supplementalData.kafkaAutoscalingQA.sectionTitle} sub={supplementalData.kafkaAutoscalingQA.sectionSub} />
              {supplementalData.kafkaAutoscalingQA.questions.map((q, i) => (
                <QuestionBlock key={i} qNum={q.qNum} qEn={q.qEn} qVi={q.qVi} isMustKnow={q.isMustKnow}>
                  <div className="space-y-6">
                    <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-emerald-600" />
                        <span className="text-[11px] font-black uppercase text-emerald-700">BLUF Solution</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800 mb-2">{q.answerBLUF.answer}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{q.answerBLUF.why}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.deepDive.layers.map((layer, j) => (
                        <div key={j} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                          <h5 className="text-[11px] font-black text-indigo-600 uppercase mb-3">{layer.layer}</h5>
                          <p className="text-xs font-bold text-slate-800 mb-2">{layer.description}</p>
                          <pre className="text-[10px] bg-slate-900 text-slate-300 p-3 rounded-lg overflow-x-auto font-mono mb-3">
                            {layer.detail}
                          </pre>
                          <p className="text-[10px] text-slate-500 italic">🇻🇳 {layer.viNote}</p>
                        </div>
                      ))}
                    </div>

                    <TipBox 
                      en="Interview Hook: Mention 'Pre-provisioning headroom' to show you design for scaling, not just respond to it."
                      vi="Mẹo Interview: Nhắc đến việc 'Pre-provisioning headroom' để thể hiện bạn thiết kế cho việc scale, chứ không chỉ bị động đối phó."
                    />
                  </div>
                </QuestionBlock>
              ))}
            </section>

            {/* S6B RAG Pipeline */}
            <section id="s6b" className="mb-16 scroll-mt-24">
              <SectionHeader num="6.2" title={supplementalData.ragPipelineWalkthroughQA.sectionTitle} sub={supplementalData.ragPipelineWalkthroughQA.sectionSub} />
              {supplementalData.ragPipelineWalkthroughQA.questions.map((q, i) => (
                <QuestionBlock key={i} qNum={q.qNum} qEn={q.qEn} qVi={q.qVi} isMustKnow={q.isMustKnow}>
                  <div className="space-y-12">
                    {q.phases.map((phase, pIdx) => (
                      <div key={pIdx} className="relative">
                        <div className="flex items-center gap-3 mb-6">
                           <div className={cn("px-4 py-1 rounded-lg text-xs font-black uppercase tracking-widest text-white shadow-sm", 
                             phase.color === 'blue' ? 'bg-blue-600' : phase.color === 'green' ? 'bg-emerald-600' : 'bg-purple-600'
                           )}>
                             {phase.phase}
                           </div>
                           <div className="flex-1 h-px bg-slate-200"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                           {phase.steps.map((step, sIdx) => (
                             <div key={sIdx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                <div className={cn("absolute top-0 left-0 w-1 h-full", 
                                  phase.color === 'blue' ? 'bg-blue-200' : phase.color === 'green' ? 'bg-emerald-200' : 'bg-purple-200'
                                )}></div>
                                <h6 className="font-black text-slate-800 mb-3 flex items-center gap-2">
                                   <div className={cn("w-2 h-2 rounded-full", 
                                     phase.color === 'blue' ? 'bg-blue-500' : phase.color === 'green' ? 'bg-emerald-500' : 'bg-purple-500'
                                   )}></div>
                                   {step.step}
                                </h6>
                                <pre className="text-xs bg-slate-50 p-4 rounded-xl text-slate-700 whitespace-pre-wrap font-sans mb-4 border border-slate-100">
                                   {step.detail}
                                </pre>
                                <div className="flex items-center gap-2 text-[10px] text-slate-400 italic mb-4">
                                   <span>🇻🇳 {step.viNote}</span>
                                </div>
                                {step.tradeoff && (
                                  <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                                    <p className="text-[10px] font-black text-indigo-700 uppercase mb-1">Trade-off / Why this?</p>
                                    <p className="text-[11px] text-indigo-900">{step.tradeoff}</p>
                                  </div>
                                )}
                             </div>
                           ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </QuestionBlock>
              ))}
            </section>

            {/* S14 Real Interview Replay */}
            <section id="s14" className="mb-16 scroll-mt-24">
              <SectionHeader num="14" title={supplementalData.realInterviewReplayQA.sectionTitle} sub={supplementalData.realInterviewReplayQA.sectionSub} />
              {supplementalData.realInterviewReplayQA.questions.map((q, i) => (
                <QuestionBlock key={i} qNum={q.qNum} qEn={q.qEn} qVi={q.qVi} isMustKnow={q.isMustKnow}>
                  <div className="space-y-6">
                    <div className="bg-slate-900 rounded-3xl p-8 text-slate-300 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Terminal className="w-24 h-24" />
                      </div>
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        <span className="ml-2 text-[10px] font-black text-slate-500 tracking-[0.2em]">PERFECT ANSWER TEMPLATE</span>
                      </div>
                      <pre className="text-sm font-sans whitespace-pre-wrap leading-relaxed text-slate-200">
                        {q.perfectAnswer}
                      </pre>
                      <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                        <p className="text-xs text-slate-500 italic">🇻🇳 {q.viAnswer}</p>
                        <div className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-[10px] font-black border border-green-800">
                          FOLLOWS STAR/BLUF
                        </div>
                      </div>
                    </div>
                  </div>
                </QuestionBlock>
              ))}
            </section>

            {/* S15 Company Specific */}
            <section id="s15" className="mb-16 scroll-mt-24">
              <SectionHeader num="15" title={supplementalData.companySpecificQA.sectionTitle} sub={supplementalData.companySpecificQA.sectionSub} />
              <div className="bg-indigo-600 rounded-3xl p-8 text-white mb-10 shadow-xl shadow-indigo-100 flex flex-col md:flex-row gap-8 items-center">
                <div className="shrink-0">
                  <Briefcase className="w-16 h-16 opacity-30" />
                </div>
                <div>
                   <h4 className="text-xl font-black mb-2 tracking-tight">Understanding Product Context</h4>
                   <p className="text-sm text-indigo-100 leading-relaxed mb-4">{supplementalData.companySpecificQA.productContext.description}</p>
                   <div className="flex flex-wrap gap-2">
                     {supplementalData.companySpecificQA.productContext.techChallenges.map((c, idx) => (
                       <span key={idx} className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold border border-white/20">{c}</span>
                     ))}
                   </div>
                </div>
              </div>

              {supplementalData.companySpecificQA.questions.map((q, i) => (
                <QuestionBlock key={i} qNum={q.qNum} qEn={q.qEn} qVi={q.qVi} isMustKnow={q.isMustKnow}>
                   <div className="space-y-6">
                    <pre className="text-sm bg-white border border-slate-200 p-8 rounded-3xl text-slate-700 whitespace-pre-wrap font-sans leading-relaxed shadow-sm">
                       {q.perfectAnswer}
                    </pre>
                    <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 text-xs text-indigo-700">
                       <strong>Vi:</strong> {q.viAnswer}
                    </div>
                   </div>
                </QuestionBlock>
              ))}
            </section>

            {/* S4PLUS Tech Lead Performance */}
            <section id="s4plus" className="mb-16 scroll-mt-24">
              <SectionHeader num="4.2" title={supplementalData.techLeadPerformanceQA.sectionTitle} sub={supplementalData.techLeadPerformanceQA.sectionSub} />
              {supplementalData.techLeadPerformanceQA.questions.map((q, i) => (
                <QuestionBlock key={i} qNum={q.qNum} qEn={q.qEn} qVi={q.qVi} isMustKnow={q.isMustKnow}>
                   <div className="space-y-6">
                    <div className="p-6 bg-slate-900 rounded-3xl text-slate-300">
                      <pre className="text-sm font-sans whitespace-pre-wrap leading-relaxed text-slate-200">
                        {q.perfectAnswer}
                      </pre>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 text-xs text-indigo-700">
                       <p className="font-bold mb-2">Tóm tắt tiếng Việt:</p>
                       <pre className="whitespace-pre-wrap font-sans">{q.viAnswer}</pre>
                    </div>
                   </div>
                </QuestionBlock>
              ))}
            </section>

            {/* S16 Candidate Questions */}
            <section id="s16" className="mb-16 scroll-mt-24">
              <SectionHeader num="16" title={supplementalData.candidateQuestionsQA.sectionTitle} sub={supplementalData.candidateQuestionsQA.sectionSub} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supplementalData.candidateQuestionsQA.questions.map((q, i) => (
                  <div key={i} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="w-4 h-4 text-indigo-500" />
                      <span className="text-[10px] font-black text-slate-400">{q.qNum}</span>
                    </div>
                    <h5 className="text-sm font-bold text-slate-800 mb-2">{q.qEn}</h5>
                    <p className="text-xs text-slate-500 italic mb-4">🇻🇳 {q.qVi}</p>
                    <div className="pt-4 border-t border-slate-50 text-[10px] text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {q.note}
                    </div>
                  </div>
                ))}
              </div>
            </section>
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
  );
}

// --- HELPER COMPONENTS ---

function SectionHeader({ num, title, sub }: { num: number | string, title: string, sub: string }) {
  return (
    <div className="mb-8 pl-4 border-l-4 border-l-indigo-500">
      <div className="flex items-center gap-3">
        <span className="text-4xl font-black text-indigo-100 shrink-0">0{num}</span>
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
          <p className="text-sm text-slate-500 font-medium">{sub}</p>
        </div>
      </div>
    </div>
  );
}

function QuestionBlock({ qNum, qEn, qVi, isMustKnow, children }: { qNum: string, qEn: string, qVi: string, isMustKnow?: boolean, children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      className={cn(
        "bg-white rounded-3xl p-8 mb-6 border-2 transition-all shadow-sm",
        isMustKnow ? "border-amber-200 shadow-amber-50" : "border-slate-100"
      )}
    >
      <div className="flex items-start gap-4 mb-6">
        <span className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shrink-0 shadow-sm",
          isMustKnow ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-400"
        )}>
          {qNum}
        </span>
        <div>
          <h4 className="text-base font-bold text-slate-800 leading-tight mb-2">{qEn}</h4>
          <p className="text-xs text-slate-500 italic font-medium">🇻🇳 {qVi}</p>
        </div>
      </div>
      <div className="pl-0 md:pl-14">
        {children}
      </div>
    </motion.div>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 group">
      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1 transition-transform group-hover:scale-125" />
      <div className="text-[13px] leading-relaxed">{children}</div>
    </li>
  );
}

function Highlight({ children, type = 'key' }: { children: React.ReactNode, type?: 'key' | 'tech' | 'num' | 'action' | 'soft' }) {
  const styles = {
    key: "bg-blue-50 text-blue-700 border-blue-100 px-1.5 py-0.5 rounded font-bold",
    tech: "bg-indigo-50 text-indigo-700 border-indigo-100 px-1.5 py-0.5 rounded font-bold",
    num: "bg-emerald-50 text-emerald-700 border-emerald-100 px-1.5 py-0.5 rounded font-bold",
    action: "bg-purple-50 text-purple-700 border-purple-100 px-1.5 py-0.5 rounded font-bold",
    soft: "bg-amber-50 text-amber-700 border-amber-100 px-1.5 py-0.5 rounded font-bold font-sans",
  };
  return <span className={cn("inline-block border text-[11px] align-middle", styles[type])}>{children}</span>;
}

function TipBox({ en, vi }: { en: string, vi: string }) {
  return (
    <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4">
      <AlertCircle className="w-6 h-6 text-indigo-500 shrink-0" />
      <div>
        <p className="text-[13px] font-bold text-slate-800">{en}</p>
        <p className="text-[11px] text-slate-500 mt-2 italic">🇻🇳 {vi}</p>
      </div>
    </div>
  );
}

function Label({ lang, children }: { lang: 'en' | 'vi', children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{lang}</span>
      <div className="h-px flex-1 bg-slate-100"></div>
      {children}
    </div>
  );
}
