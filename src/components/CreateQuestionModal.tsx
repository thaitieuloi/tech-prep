import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wand2, Loader2, Save, Eye, Edit3 } from 'lucide-react';
import { Category, Question } from '../data';
import { generateQuestion } from '../services/geminiService';
import { cn } from '../lib/utils';
import { QuestionCard } from './QuestionCard';

interface CreateQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSave: (question: Omit<Question, 'id'>) => Promise<void>;
}

export function CreateQuestionModal({ isOpen, onClose, categories, onSave }: CreateQuestionModalProps) {
  const [category, setCategory] = useState<Category>(categories[0] || 'Frontend');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [previewLanguage, setPreviewLanguage] = useState<'vi' | 'en' | 'ja'>('vi');
  
  const [generatedData, setGeneratedData] = useState<Partial<Question> | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const data = await generateQuestion(category, prompt);
      setGeneratedData({
        ...data,
        category,
      });
      setViewMode('edit');
    } catch (error) {
      console.error("Failed to generate question:", error);
      alert("Có lỗi xảy ra khi tạo câu hỏi bằng AI. Vui lòng thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedData || !generatedData.question || !generatedData.answer) return;
    
    setIsSaving(true);
    try {
      await onSave({
        category: generatedData.category as Category,
        question: generatedData.question,
        answer: generatedData.answer,
        translations: generatedData.translations,
        imageUrl: generatedData.imageUrl,
        difficulty: generatedData.difficulty as 'Easy' | 'Medium' | 'Hard' || 'Medium',
        tags: generatedData.tags || [],
        likes: 0
      });
      
      // Reset and close
      setGeneratedData(null);
      setPrompt('');
      onClose();
    } catch (error) {
      console.error("Failed to save question:", error);
      alert("Có lỗi xảy ra khi lưu câu hỏi.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-indigo-600" />
            Tạo bài viết / Câu hỏi mới bằng AI
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {!generatedData ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Chủ đề (Topic)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gợi ý mô tả (Prompt) - Không bắt buộc
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ví dụ: Tạo một câu hỏi khó về cách hoạt động của Event Loop trong Node.js..."
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors min-h-[120px] resize-y"
                />
                <p className="mt-2 text-sm text-slate-500">
                  Nếu để trống, AI sẽ tự động chọn một chủ đề ngẫu nhiên và quan trọng trong danh mục đã chọn.
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Đang tạo nội dung...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Tạo bằng AI
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex border-b border-slate-200 mb-4">
                <button
                  onClick={() => setViewMode('edit')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                    viewMode === 'edit' ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"
                  )}
                >
                  <Edit3 className="w-4 h-4" />
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => setViewMode('preview')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                    viewMode === 'preview' ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"
                  )}
                >
                  <Eye className="w-4 h-4" />
                  Xem trước
                </button>
              </div>

              {viewMode === 'edit' ? (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Câu hỏi / Tiêu đề</label>
                    <input
                      type="text"
                      value={generatedData.question || ''}
                      onChange={(e) => setGeneratedData({ ...generatedData, question: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-900"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Độ khó</label>
                      <select
                        value={generatedData.difficulty || 'Medium'}
                        onChange={(e) => setGeneratedData({ ...generatedData, difficulty: e.target.value as any })}
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Tags (cách nhau bằng dấu phẩy)</label>
                      <input
                        type="text"
                        value={generatedData.tags?.join(', ') || ''}
                        onChange={(e) => setGeneratedData({ ...generatedData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Câu trả lời (Markdown)</label>
                    <textarea
                      value={generatedData.answer || ''}
                      onChange={(e) => setGeneratedData({ ...generatedData, answer: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-h-[300px] font-mono text-sm"
                    />
                  </div>
                </div>
              ) : (
                <div className="pt-2 space-y-4">
                  <div className="flex justify-end">
                    <select
                      value={previewLanguage}
                      onChange={(e) => setPreviewLanguage(e.target.value as any)}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    >
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>
                  <QuestionCard 
                    language={previewLanguage}
                    question={{
                      id: 'preview-id',
                      category: generatedData.category as Category,
                      question: generatedData.question || '',
                      answer: generatedData.answer || '',
                      translations: generatedData.translations,
                      imageUrl: generatedData.imageUrl,
                      difficulty: (generatedData.difficulty as any) || 'Medium',
                      tags: generatedData.tags || [],
                      likes: 0
                    }} 
                    onImageGenerated={(url) => setGeneratedData({ ...generatedData, imageUrl: url })}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {generatedData && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
            <button
              onClick={() => setGeneratedData(null)}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Tạo lại
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg font-medium transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Lưu bài viết
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
