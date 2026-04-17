import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Settings, Save, Loader2 } from 'lucide-react';
import { Category } from '../data';
import { cn } from '../lib/utils';

export interface SchedulerConfig {
  topic: Category | 'Random';
  articleCount: number;
  publishTime: string; // HH:mm format
}

interface SchedulerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSave: (config: SchedulerConfig) => Promise<void>;
  initialConfig?: SchedulerConfig;
}

export function SchedulerSettingsModal({ isOpen, onClose, categories, onSave, initialConfig }: SchedulerSettingsModalProps) {
  const [config, setConfig] = useState<SchedulerConfig>({
    topic: 'Random',
    articleCount: 1,
    publishTime: '06:00',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialConfig) {
      setConfig(initialConfig);
    }
  }, [initialConfig, isOpen]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(config);
      onClose();
    } catch (error) {
      console.error("Failed to save scheduler config:", error);
      alert("Có lỗi xảy ra khi lưu cấu hình.");
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
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-600" />
            Cấu hình Scheduler Tự động
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-indigo-50 text-indigo-800 p-4 rounded-xl text-sm mb-2">
            <p className="font-medium flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4" />
              Lịch trình hoạt động
            </p>
            <p>Scheduler sẽ tự động chạy vào lúc <strong>05:00 sáng</strong> mỗi ngày để thu thập dữ liệu và tạo bài viết theo cấu hình bên dưới.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Cách chọn bài viết (Topic)
            </label>
            <select
              value={config.topic}
              onChange={(e) => setConfig({ ...config, topic: e.target.value as Category | 'Random' })}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="Random">Ngẫu nhiên (Random)</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Số lượng bài viết cần tạo
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={config.articleCount}
              onChange={(e) => setConfig({ ...config, articleCount: parseInt(e.target.value) || 1 })}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Thời gian Public bài viết
            </label>
            <input
              type="time"
              value={config.publishTime}
              onChange={(e) => setConfig({ ...config, publishTime: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg font-medium transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Lưu cấu hình
          </button>
        </div>
      </motion.div>
    </div>
  );
}
