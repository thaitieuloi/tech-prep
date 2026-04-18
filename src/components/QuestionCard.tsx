import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import mermaid from 'mermaid';
import { Question, Language } from '../data';
import { cn } from '../lib/utils';
import { ChevronDown, ChevronUp, Tag, Award, ThumbsUp, Image as ImageIcon, Loader2, CalendarClock } from 'lucide-react';
import { generateImageForAnswer } from '../services/geminiService';
import { supabase } from '../lib/supabase';

interface QuestionCardProps {
  question: Question;
  language?: Language;
  searchQuery?: string;
  onLike?: () => void;
  onImageGenerated?: (url: string) => void;
}

const difficultyColors = {
  Easy: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
  Hard: 'bg-rose-100 text-rose-700 border-rose-200',
};

function base64ToBlob(base64: string, mimeType: string) {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

mermaid.initialize({ startOnLoad: false, theme: 'default' });

const Mermaid = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ref.current && chart) {
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      mermaid.render(id, chart).then((result) => {
        if (ref.current) ref.current.innerHTML = result.svg;
      }).catch(e => {
        console.error("Mermaid render error", e);
      });
    }
  }, [chart]);
  
  return <div ref={ref} className="flex justify-center my-6 overflow-x-auto" />;
};

export function QuestionCard({ question, language = 'vi', searchQuery = '', onLike, onImageGenerated }: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const isPremium = question.id.includes('premium');

  const displayQuestion = question.translations?.[language]?.question || question.question;
  const displayAnswer = question.translations?.[language]?.answer || question.answer;

  const handleGenerateImage = async () => {
    if (!onImageGenerated) return;
    setIsGeneratingImage(true);
    try {
      const base64Image = await generateImageForAnswer(displayAnswer);
      
      try {
        // Convert to Blob
        const blob = base64ToBlob(base64Image, 'image/jpeg');
        
        // Upload to Supabase Storage
        const fileName = `images/question_${question.id}_${Date.now()}.jpg`;
        const { data, error } = await supabase.storage
          .from('resources')
          .upload(fileName, blob, {
            contentType: 'image/jpeg',
            upsert: true
          });
          
        if (error) {
          throw error;
        }
        
        // Pass the path back
        onImageGenerated(data.path);
      } catch (uploadError: any) {
        console.warn("Lỗi upload Supabase, chuyển sang dùng ảnh base64 cục bộ:", uploadError);
        // Fallback to base64
        onImageGenerated(base64Image);
      }
    } catch (error: any) {
      console.error("Failed to generate image:", error);
      alert("Có lỗi xảy ra khi tạo ảnh. Vui lòng kiểm tra API Key hoặc thử lại sau.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const getDisplayImageUrl = (url?: string) => {
    if (!url) return undefined;
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    return supabase.storage.from('resources').getPublicUrl(url).data.publicUrl;
  };

  const displayUrl = getDisplayImageUrl(question.imageUrl);

  const formatPublishTime = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }).format(date);
    } catch (e) {
      return '';
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "bg-white rounded-2xl border transition-all duration-300 overflow-hidden",
        isExpanded ? "border-indigo-200 shadow-lg shadow-indigo-100/50" : "border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300",
        isPremium && !isExpanded ? "border-indigo-300 shadow-indigo-100/50" : ""
      )}
    >
      <div className="w-full flex items-start justify-between gap-4 p-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 text-left focus:outline-none"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn(
                "px-2.5 py-1 text-xs font-semibold rounded-full border",
                difficultyColors[question.difficulty]
              )}>
                {question.difficulty}
              </span>
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                {question.category}
              </span>
              {isPremium && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Senior Level
                </span>
              )}
              {question.publishAt && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200 flex items-center gap-1">
                  <CalendarClock className="w-3 h-3" />
                  {formatPublishTime(question.publishAt)}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-slate-900 leading-snug">
              {displayQuestion}
            </h3>
            
            {!isExpanded && (
              <div className="flex items-center gap-2 text-slate-500">
                <Tag className="w-4 h-4" />
                <span className="text-sm">{question.tags.join(', ')}</span>
              </div>
            )}
          </div>
        </button>
        
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike?.();
            }}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-600 transition-colors"
          >
            <div className="p-2 rounded-full bg-slate-50 hover:bg-indigo-50 transition-colors">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">{question.likes || 0}</span>
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "p-2 rounded-full transition-colors duration-200",
              isExpanded ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
            )}
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-slate-100">
              {question.imageUrl && !question.imageUrl.includes('placehold.co') ? (
                <div className="mb-6 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img 
                    src={displayUrl} 
                    alt="Illustration" 
                    className="w-full h-auto max-h-[400px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="mb-6 flex flex-col gap-4">
                  {question.imageUrl && question.imageUrl.includes('placehold.co') && (
                    <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img 
                        src={displayUrl} 
                        alt="Placeholder Illustration" 
                        className="w-full h-auto max-h-[400px] object-cover opacity-50 grayscale"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="flex justify-end">
                    <button
                      onClick={handleGenerateImage}
                      disabled={isGeneratingImage}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGeneratingImage ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Đang tạo ảnh...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-4 h-4" />
                          Tạo ảnh minh họa bằng AI
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
              
              <div className="prose prose-slate prose-indigo max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[
                    rehypeRaw,
                    () => {
                      return (tree: any) => {
                        if (!searchQuery || !searchQuery.trim()) return;
                        
                        const escapedQuery = searchQuery.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        const regex = new RegExp(`(${escapedQuery})`, 'gi');

                        const traverse = (node: any, parent: any, index: number): number | void => {
                          if (node.type === 'text') {
                            if (!parent || parent.tagName === 'code' || parent.tagName === 'script' || parent.tagName === 'style' || parent.tagName === 'mark') return;
                            
                            const text = node.value;
                            if (regex.test(text)) {
                              const parts = text.split(regex);
                              const newNodes = parts.map((part: string) => {
                                if (part.toLowerCase() === searchQuery.trim().toLowerCase()) {
                                  return {
                                    type: 'element',
                                    tagName: 'mark',
                                    properties: { className: ['bg-yellow-200', 'text-slate-900', 'rounded-sm', 'px-1'] },
                                    children: [{ type: 'text', value: part }]
                                  };
                                }
                                return { type: 'text', value: part };
                              }).filter((n: any) => n.value !== '' || n.type !== 'text');
                              
                              if (newNodes.length > 0) {
                                parent.children.splice(index, 1, ...newNodes);
                                return index + newNodes.length;
                              }
                            }
                          } else if (node.children && Array.isArray(node.children)) {
                            for (let i = 0; i < node.children.length; i++) {
                              const nextIndex = traverse(node.children[i], node, i);
                              if (typeof nextIndex === 'number') {
                                i = nextIndex - 1;
                              }
                            }
                          }
                        };
                        
                        traverse(tree, null, 0);
                      };
                    }
                  ]}
                  components={{
                    code({node, inline, className, children, ...props}: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      if (!inline && match && match[1] === 'mermaid') {
                        return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                      }
                      return <code className={className} {...props}>{children}</code>;
                    }
                  }}
                >
                  {displayAnswer}
                </ReactMarkdown>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-slate-400" />
                {question.tags.map(tag => (
                  <span key={tag} className="text-sm text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
