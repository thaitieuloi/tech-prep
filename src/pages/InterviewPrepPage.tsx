import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, FileText, CheckCircle2, Star, AlertCircle, Mail, ChevronUp, Briefcase, Calendar, Cpu, Users, Zap, Search, MessageSquare, ShieldAlert, GitBranch, Terminal, LineChart } from 'lucide-react';
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
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/20">Studio Edition</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">🎯 TECHNICAL LEADER INTERVIEW</h1>
            <p className="text-xl text-slate-100 mb-8 font-medium opacity-90 italic">Bilingual Q&A Preparation Guide · Song ngữ Anh–Việt</p>
            
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

        {/* Legend */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-12 border-l-4 border-l-[#2E75B6]">
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

        {/* Table of Contents */}
        <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100 flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#1F4E79]" />
            📋 Mục lục / Table of Contents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            {[
              "Interview Opening – Self Introduction",
              "Java, Spring Boot & Microservices",
              "System Design & Architecture",
              "Performance Optimization – 10k TPS",
              "Data Engineering – Kafka, ELK",
              "AI & RAG Systems",
              "DevOps, CI/CD & Cloud",
              "Team Leadership & Mentoring",
              "Behavioral & Situational Questions",
              "Candidate's Questions to Interviewer",
              "Interview Closing",
              "Final Tips – Lời khuyên tổng kết"
            ].map((item, idx) => (
              <a 
                key={idx} 
                href={`#s${idx + 1}`}
                className="group flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 hover:text-[#2E75B6]"
              >
                <span className="w-6 h-6 rounded-lg bg-slate-100 group-hover:bg-[#1F4E79] group-hover:text-white flex items-center justify-center text-xs font-bold transition-colors">
                  {idx + 1}
                </span>
                <span className="text-[13px] font-semibold">{item}</span>
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

        {/* Section 3: System Design */}
        <section id="s3" className="mb-16 scroll-mt-24">
          <SectionHeader num={3} title="System Design & Architecture" sub="Thiết kế hệ thống & Kiến trúc" />

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
            qNum="SHD"
            qEn="What is your strategy for Database Sharding?"
            qVi="Chiến lược Database Sharding của bạn là gì?"
          >
            <ul className="space-y-3 text-slate-700">
              <ListItem>
                <div>
                  <p><Highlight type="key">When to shard:</Highlight> When we hit the <Highlight type="num">IOPS limit</Highlight> of a single disk or vertical scaling is too costly.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Khi nào shard: Khi chạm ngưỡng giới hạn IOPS của đĩa đơn hoặc việc nâng cấp phần cứng quá tốn kém.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="key">Strategy:</Highlight> I prefer <Highlight type="action">Application-level sharding</Highlight> using <Highlight type="soft">UserId</Highlight> to avoid cross-shard joins.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Chiến lược: Ưu tiên sharding ở tầng ứng dụng theo UserId để tránh việc join dữ liệu giữa các phân vùng khác nhau.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="key">The cost:</Highlight> You lose <Highlight type="soft">Global referential integrity</Highlight> and reporting becomes complex.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Chi phí: Mất đi tính nhất quán tham chiếu toàn cục và việc làm báo cáo sẽ trở nên rất phức tạp.</p>
                </div>
              </ListItem>
            </ul>
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
                    <p><Highlight type="key">Asynchronous Decoupling:</Highlight> We broke the monolith process into small, atomic tasks. DB writes moved to an <Highlight type="tech">Outbox pattern</Highlight>.</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Tách rời bất đồng bộ: Chia nhỏ quy trình thành các tác vụ nguyên tử. Ghi DB thông qua Outbox pattern.</p>
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <p><Highlight type="tech">Optimistic Locking:</Highlight> We used version-based locking to allow more concurrent reads.</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Optimistic Locking: Sử dụng cơ chế lock theo version để cho phép đọc dữ liệu đồng thời nhiều hơn.</p>
                  </div>
                </ListItem>
                <ListItem>
                  <div>
                    <p><Highlight type="action">Result:</Highlight> Settlement time dropped from <Highlight type="num">800ms</Highlight> to <Highlight type="num">380ms</Highlight> (roughly 52%).</p>
                    <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Kết quả: Thời gian tất toán giảm từ 800ms xuống còn 380ms (khoảng 52%).</p>
                  </div>
                </ListItem>
              </ul>
              <TipBox 
                en="Interviewers love this because it shows you can quantify technical decisions into business ROI."
                vi="Sử dụng số liệu % cụ thể giúp bạn ghi điểm tuyệt đối vì chứng minh được bạn có tư duy tối ưu hóa lợi nhuận (ROI) cho doanh nghiệp."
              />
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

          <QuestionBlock 
            qNum="STR"
            qEn="As an Architecture/Tech Lead, what are your systematic strategies to improve system performance?"
            qVi="Với vai trò là Tech Lead, anh có những chiến lược hệ thống nào để cải thiện hiệu năng?"
            isMustKnow
          >
            <ul className="space-y-4 text-slate-700">
              <ListItem>
                <div>
                  <p><Highlight type="key">Measurement First:</Highlight> Establish <Highlight type="tech">Prometheus/Grafana</Highlight> dashboards and use <Highlight type="tech">JFR/async-profiler</Highlight> to identify bottlenecks. You cannot optimize what you don't measure.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Đo lường trước tiên: Thiết lập dashboard và dùng các công cụ profiling để tìm điểm nghẽn. Không tối ưu dựa trên phỏng đoán.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="key">Database Scaling Strategy:</Highlight> Implement <Highlight type="tech">Read Replicas</Highlight> for query offloading and <Highlight type="tech">Sharding</Highlight> (horizontal partitioning) for massive write volumes.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Chiến lược scale DB: Triển khai Read Replicas để chia tải truy vấn và Sharding (phân vùng dữ liệu) để xử lý lượng ghi khổng lồ.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="key">Advanced Caching:</Highlight> Multi-level caching (L1 In-memory, L2 <Highlight type="tech">Redis</Highlight>) and <Highlight type="soft">Global CDN</Highlight> for static assets and edge-caching.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Cache nâng cao: Áp dụng cache đa tầng và dùng CDN để giảm tải cho server gốc, tăng tốc độ truy cập từ xa.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="key">Architectural Decoupling:</Highlight> Move to <Highlight type="tech">Event-driven</Highlight> (Kafka) for async processing. Use <Highlight type="tech">Virtual Threads</Highlight> (Java 21) or non-blocking IO to maximize resource utilization.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Tách rời kiến trúc: Chuyển sang mô hình hướng sự kiện (Kafka). Sử dụng Virtual Threads hoặc non-blocking IO để tối ưu hóa tài nguyên server.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="key">Infrastructure & Load Balancing:</Highlight> Efficient <Highlight type="num">Load Balancing</Highlight> (L4/L7) and auto-scaling based on CPU/Memory/Traffic thresholds.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Hạ tầng & Load Balancing: Sử dụng cân bằng tải thông minh và tự động mở rộng (Auto-scaling) dựa trên các ngưỡng metric thực tế.</p>
                </div>
              </ListItem>
            </ul>
          </QuestionBlock>
        </section>

        {/* Section 5: Data Engineering */}
        <section id="s5" className="mb-16 scroll-mt-24">
          <SectionHeader num={5} title="Data Engineering – Kafka, ELK" sub="Kỹ thuật dữ liệu – Kafka, ELK" />
          
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

        {/* Section 6: AI & RAG */}
        <section id="s6" className="mb-16 scroll-mt-24">
          <SectionHeader num={6} title="AI & RAG Systems" sub="Hệ thống AI & RAG" />

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

          <QuestionBlock 
            qNum="Q14"
            qEn="Explain your RAG architecture at GLOHOW. Why Qdrant?"
            qVi="Giải thích kiến trúc RAG tại GLOHOW. Tại sao chọn Qdrant?"
            isMustKnow
          >
            <ul className="space-y-3 text-slate-700">
              <ListItem>
                <div>
                  <p><Highlight type="tech">Hybrid Search</Highlight>: combine semantic and keyword search.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Hybrid Search: Kết hợp tìm kiếm theo ngữ nghĩa (semantic) và từ khóa để tối ưu độ chính xác.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="tech">Why Qdrant</Highlight>: Rust-based speed, great metadata filtering.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Tại sao Qdrant: Tốc độ cực nhanh nhờ viết bằng Rust, khả năng lọc metadata mạnh mẽ.</p>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <p><Highlight type="key">Hallucinations</Highlight>: Grounding with citations & low Temperature.</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">🇻🇳 Giảm thiểu ảo giác: Trích dẫn nguồn dữ liệu chính xác và hạ tham số Temperature xuống 0.1.</p>
                </div>
              </ListItem>
            </ul>
          </QuestionBlock>
        </section>

        {/* Section 7: DevOps, CI/CD */}
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
                  <p><Highlight type="soft">Situation:</Highlight> Undestimating the database migration risk during a major release at HDS.</p>
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

        {/* Closing Sections */}
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
                   <li className="flex gap-2"><span>🇻🇳 Tôi tự tin rằng kinh nghiệm của mình về hệ thông quy mô lớn và kiến trúc AI rất phù hợp với lộ trình của công ty.</span></li>
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

        {/* Final Tips Section */}
        <SectionHeader num={12} title="Final Tips" sub="Lời khuyên tổng kết" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 px-2">
          <TipCard title="Trước phỏng vấn" type="before" icon={<Search className="w-5 h-5" />}>
             <ul className="text-xs space-y-3 text-slate-600">
               <li className="flex gap-2"><span>✓</span> <span>Nghiên cứu kỹ sản phẩm & tech stack.</span></li>
               <li className="flex gap-2"><span>✓</span> <span>Chuẩn bị sẵn 3 câu chuyện <strong className="text-emerald-700">STAR</strong>.</span></li>
               <li className="flex gap-2"><span>✓</span> <span>Đọc lại CV và chuẩn bị giải thích mọi chi tiết.</span></li>
             </ul>
          </TipCard>
          <TipCard title="Trong phỏng vấn" type="during" icon={<Zap className="w-5 h-5" />}>
             <ul className="text-xs space-y-3 text-slate-600">
               <li className="flex gap-2"><span>★</span> <span>Nói rõ ràng, không vội vã.</span></li>
               <li className="flex gap-2"><span>★</span> <span>Sử dụng số liệu: <strong className="text-amber-700">10k TPS, 60% reduction</strong>.</span></li>
               <li className="flex gap-3"><span>★</span> <span>Nếu không biết, hãy nói về cách bạn sẽ tìm hiểu.</span></li>
             </ul>
          </TipCard>
          <TipCard title="Cần tránh" type="avoid" icon={<ShieldAlert className="w-5 h-5" />}>
             <ul className="text-xs space-y-3 text-slate-600 font-medium">
               <li className="flex gap-2"><span>✗</span> <span>Nói xấu công ty hoặc đồng nghiệp cũ.</span></li>
               <li className="flex gap-2"><span>✗</span> <span>Nhận vơ công sức không phải của mình.</span></li>
               <li className="flex gap-2"><span>✗</span> <span>Thái độ quá tự tin thiếu cầu thị.</span></li>
             </ul>
          </TipCard>
        </div>

        {/* Closing Banner */}
        <div className="bg-gradient-to-br from-[#F59E0B] via-[#EF4444] to-[#EC4899] text-white p-16 rounded-[40px] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <h2 className="text-4xl font-black mb-4 relative z-10">🎉 Chúc anh Thái Tiểu Lôi phỏng vấn thành công rực rỡ!</h2>
          <p className="text-white text-xl italic relative z-10 opacity-95">You are over-prepared. Just go there and own it! 💪</p>
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
