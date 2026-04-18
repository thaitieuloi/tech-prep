import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { QuestionCard } from './components/QuestionCard';
import { CreateQuestionModal } from './components/CreateQuestionModal';
import { SchedulerSettingsModal, SchedulerConfig } from './components/SchedulerSettingsModal';
import { categories as localCategories, questions as localQuestions1, Category, Question, Language } from './data';
import { questions2 as localQuestions2 } from './data2';
import { questions3 as localQuestions3 } from './data3';
import { questions4 as localQuestions4 } from './data4';
import { questions5 as localQuestions5 } from './data5';
import { premiumQuestions } from './data_premium';
import { Search, Database as DbIcon, AlertCircle, Loader2, UploadCloud, ChevronLeft, ChevronRight, Award, Plus, Globe, Settings, Sparkles } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { supabase } from './lib/supabase';
import { slugify } from './lib/utils';
import { generateQuestion, semanticSearch } from './services/geminiService';

// Put premium questions first so user sees the quality immediately
const localQuestions = [...premiumQuestions, ...localQuestions1, ...localQuestions2, ...localQuestions3, ...localQuestions4, ...localQuestions5];

export default function App() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<Category[]>(localCategories);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'supabase' | 'local'>('local');
  const [dbError, setDbError] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSchedulerModalOpen, setIsSchedulerModalOpen] = useState(false);
  const [schedulerConfig, setSchedulerConfig] = useState<SchedulerConfig>({
    topic: 'Random',
    articleCount: 1,
    publishTime: '06:00'
  });
  const [language, setLanguage] = useState<Language>('vi');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiSearchResults, setAiSearchResults] = useState<string[] | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortBy, setSortBy] = useState<'default' | 'likes'>('default');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleLike = async (id: string) => {
    // Update local state first for optimistic UI
    setQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, likes: (q.likes || 0) + 1 } : q
    ));

    if (dataSource === 'supabase') {
      try {
        const question = questions.find(q => q.id === id);
        if (question) {
          const { error } = await supabase.from('questions').update({ likes: (question.likes || 0) + 1 }).eq('id', id);
          if (error) {
            console.error("Supabase update error:", error);
          }
        }
      } catch (e) {
        console.error("Failed to update likes in Supabase", e);
      }
    }
  };

  // Sync selectedCategory with URL
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setSelectedCategory('All');
    } else if (path.startsWith('/topic/')) {
      const slug = path.replace('/topic/', '');
      const matchedCategory = categories.find(c => slugify(c) === slug);
      if (matchedCategory) {
        setSelectedCategory(matchedCategory);
      } else {
        setSelectedCategory('All');
      }
    }
  }, [location.pathname, categories]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
    setAiSearchResults(null);
  }, [selectedCategory, searchQuery]);

  const handleAiSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsAiSearching(true);
    try {
      const lightweightQuestions = questions.map(q => ({
        id: q.id,
        question: q.question,
        tags: q.tags
      }));
      const relevantIds = await semanticSearch(searchQuery, lightweightQuestions);
      setAiSearchResults(relevantIds);
    } catch (e) {
      console.error("AI Search failed", e);
      alert("Tìm kiếm AI thất bại. Vui lòng thử lại sau.");
    } finally {
      setIsAiSearching(false);
    }
  };

  async function fetchQuestions() {
    setIsLoading(true);
    setDbError(null);
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        // Fallback to created_at if updated_at doesn't exist yet
        if (error.code === '42703') { // undefined_column
          const fallback = await supabase
            .from('questions')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (fallback.error) throw fallback.error;
          return processData(fallback.data);
        }
        throw error;
      }
      
      processData(data);

      function processData(data: any[]) {
        const savedImages = JSON.parse(localStorage.getItem('generatedImages') || '{}');
        if (data && data.length > 0) {
          const formattedData: Question[] = data.map(q => ({
            id: q.id.toString(),
            category: q.category as Category,
            question: q.question,
            answer: q.answer,
            translations: q.translations,
            imageUrl: savedImages[q.id] || q.image_url || q.imageUrl,
            difficulty: q.difficulty,
            tags: q.tags || [],
            likes: q.likes || 0,
            publishAt: q.publish_at || q.created_at
          }));
          setQuestions(formattedData);
          
          const uniqueCategories = Array.from(new Set(formattedData.map(q => q.category)));
          setCategories(uniqueCategories.length > 0 ? uniqueCategories : localCategories);
          setDataSource('supabase');
        } else {
          const savedQuestions = JSON.parse(localStorage.getItem('localQuestions') || '[]');
          const allLocalQuestions = [...savedQuestions, ...localQuestions];
          const localWithImages = allLocalQuestions.map(q => ({
            ...q,
            imageUrl: savedImages[q.id] || q.imageUrl
          }));
          setQuestions(localWithImages);
          setDataSource('local');
          setDbError('Bảng "questions" trên Supabase đang trống.');
        }
      }
    } catch (err: any) {
      console.error("Supabase fetch error:", err);
      const savedImages = JSON.parse(localStorage.getItem('generatedImages') || '{}');
      const savedQuestions = JSON.parse(localStorage.getItem('localQuestions') || '[]');
      const allLocalQuestions = [...savedQuestions, ...localQuestions];
      const localWithImages = allLocalQuestions.map(q => ({
        ...q,
        imageUrl: savedImages[q.id] || q.imageUrl
      }));
      setQuestions(localWithImages);
      setDataSource('local');
      
      if (err.code === '42P01') {
        setDbError('Bảng "questions" chưa được tạo trên Supabase.');
      } else {
        setDbError(err.message || 'Không thể kết nối đến Supabase.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageGenerated = async (id: string, imageUrl: string) => {
    // Update local state
    setQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, imageUrl } : q
    ));

    // Update Supabase if connected
    if (dataSource === 'supabase') {
      try {
        const { error } = await supabase.from('questions').update({ image_url: imageUrl }).eq('id', id);
        if (error) {
          console.error("Supabase update image error:", error);
          alert("Không thể lưu ảnh vào Supabase: " + error.message);
          // Fallback to local storage if Supabase fails
          const savedImages = JSON.parse(localStorage.getItem('generatedImages') || '{}');
          savedImages[id] = imageUrl;
          localStorage.setItem('generatedImages', JSON.stringify(savedImages));
        }
      } catch (e) {
        console.error("Failed to update image in Supabase", e);
        // Fallback to local storage if Supabase fails
        const savedImages = JSON.parse(localStorage.getItem('generatedImages') || '{}');
        savedImages[id] = imageUrl;
        localStorage.setItem('generatedImages', JSON.stringify(savedImages));
      }
    } else {
      // Fallback to local storage
      const savedImages = JSON.parse(localStorage.getItem('generatedImages') || '{}');
      savedImages[id] = imageUrl;
      localStorage.setItem('generatedImages', JSON.stringify(savedImages));
    }
  };

  const handleSaveNewQuestion = async (newQuestionData: Omit<Question, 'id'>) => {
    const newId = `ai_generated_${Date.now()}`;
    const newQuestion: Question = {
      ...newQuestionData,
      id: newId,
      publishAt: new Date().toISOString()
    };

    // Update local state immediately
    setQuestions(prev => [newQuestion, ...prev]);

    // Save image to localStorage if it exists (for both local and supabase fallback)
    if (newQuestion.imageUrl) {
      const savedImages = JSON.parse(localStorage.getItem('generatedImages') || '{}');
      savedImages[newId] = newQuestion.imageUrl;
      localStorage.setItem('generatedImages', JSON.stringify(savedImages));
    }

    // Save to Supabase if connected
    if (dataSource === 'supabase') {
      try {
        const { error } = await supabase.from('questions').insert({
          id: newQuestion.id,
          category: newQuestion.category,
          question: newQuestion.question,
          answer: newQuestion.answer,
          translations: newQuestion.translations,
          image_url: newQuestion.imageUrl,
          difficulty: newQuestion.difficulty,
          tags: newQuestion.tags,
          likes: newQuestion.likes,
          publish_at: newQuestion.publishAt
        });

        if (error) {
          console.error("Supabase insert error:", error);
          if (error.message.includes('row-level security policy')) {
             alert("Lỗi phân quyền (RLS) trên Supabase. Bạn cần chạy SQL để cấp quyền INSERT cho bảng 'questions'.");
          } else {
             alert("Có lỗi khi lưu vào Supabase: " + error.message);
          }
        }
      } catch (e) {
        console.error("Failed to save new question to Supabase", e);
      }
    } else {
      // Fallback to local storage
      const savedQuestions = JSON.parse(localStorage.getItem('localQuestions') || '[]');
      savedQuestions.unshift(newQuestion);
      localStorage.setItem('localQuestions', JSON.stringify(savedQuestions));
    }
  };

  const handleSaveSchedulerConfig = async (config: SchedulerConfig) => {
    setSchedulerConfig(config);
    
    if (dataSource === 'supabase') {
      try {
        const { error } = await supabase.from('settings').upsert({ 
          id: 'scheduler_config', 
          value: config,
          updated_at: new Date().toISOString()
        });
        if (error) {
          console.error("Failed to save settings to Supabase:", error);
          if (error.code === '42P01') {
             alert("Bảng 'settings' chưa được tạo trên Supabase. Vui lòng chạy SQL để tạo bảng.");
          }
        }
      } catch (e) {
        console.error("Error saving settings", e);
      }
    } else {
      localStorage.setItem('schedulerConfig', JSON.stringify(config));
    }
  };

  // Load config on mount
  useEffect(() => {
    async function loadSettings() {
      let currentConfig = schedulerConfig;
      if (dataSource === 'supabase') {
        try {
          const { data, error } = await supabase
            .from('settings')
            .select('value')
            .eq('id', 'scheduler_config')
            .single();
            
          if (data && data.value) {
            setSchedulerConfig(data.value);
            currentConfig = data.value;
          }
        } catch (e) {
          console.error("Failed to load settings from Supabase", e);
        }
      } else {
        // Fallback to local storage
        const saved = localStorage.getItem('schedulerConfig');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setSchedulerConfig(parsed);
            currentConfig = parsed;
          } catch (e) {}
        }
      }
      
      // Run pseudo-scheduler check
      checkAndRunScheduler(currentConfig);
    }
    
    loadSettings();
  }, [dataSource]);

  async function checkAndRunScheduler(config: SchedulerConfig) {
    try {
      const today = new Date().toISOString().split('T')[0];
      let lastRun = localStorage.getItem('lastSchedulerRun');
      
      if (dataSource === 'supabase') {
        try {
          const { data } = await supabase.from('settings').select('value').eq('id', 'last_scheduler_run').single();
          if (data && data.value) {
            lastRun = data.value;
          }
        } catch (e) {
          // Ignore if table doesn't exist or row not found
        }
      }

      if (lastRun === today) {
        return; // Already ran today
      }

      // Check if current time is past publishTime
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      
      const [publishHours, publishMinutes] = config.publishTime.split(':').map(Number);
      
      if (currentHours > publishHours || (currentHours === publishHours && currentMinutes >= publishMinutes)) {
        console.log("Running pseudo-scheduler...");
        
        // Mark as run for today immediately to prevent double runs
        localStorage.setItem('lastSchedulerRun', today);
        if (dataSource === 'supabase') {
          await supabase.from('settings').upsert({ id: 'last_scheduler_run', value: today, updated_at: new Date().toISOString() });
        }

        // Generate articles
        for (let i = 0; i < config.articleCount; i++) {
          const targetCategory = config.topic === 'Random' 
            ? categories[Math.floor(Math.random() * categories.length)] 
            : config.topic;
            
          try {
            const newQ = await generateQuestion(targetCategory);
            // newQ might not have all required fields, but handleSaveNewQuestion expects Omit<Question, 'id'>
            // The generateQuestion returns Partial<Question>, so we need to ensure it has the basics
            if (newQ.question && newQ.answer) {
              await handleSaveNewQuestion({
                category: targetCategory as Category,
                question: newQ.question,
                answer: newQ.answer,
                translations: newQ.translations,
                difficulty: newQ.difficulty || 'Medium',
                tags: newQ.tags || [],
                likes: 0
              });
            }
          } catch (genErr) {
            console.error("Error generating scheduled question:", genErr);
          }
        }
        
        console.log("Pseudo-scheduler finished.");
      }
    } catch (error) {
      console.error("Scheduler check error:", error);
    }
  }

  async function seedDataToSupabase() {
    setIsSeeding(true);
    try {
      const seedData = localQuestions.map(q => ({
        id: q.id,
        category: q.category,
        question: q.question,
        answer: q.answer,
        translations: q.translations,
        image_url: q.imageUrl,
        difficulty: q.difficulty,
        tags: q.tags,
        likes: q.likes || 0
      }));
      
      const { error } = await supabase.from('questions').upsert(seedData, { onConflict: 'id', ignoreDuplicates: true });
      
      if (error) throw error;
      
      alert('Đồng bộ dữ liệu mẫu lên Supabase thành công!');
      fetchQuestions();
    } catch (err: any) {
      console.error("Seed error:", err);
      alert('Lỗi khi đồng bộ dữ liệu: ' + (err.message || 'Vui lòng kiểm tra RLS (Row Level Security) trên Supabase.'));
    } finally {
      setIsSeeding(false);
    }
  }

  const filteredQuestions = questions.filter(q => {
    if (aiSearchResults !== null) {
      return aiSearchResults.includes(q.id);
    }
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (aiSearchResults !== null) {
      // Preserve AI search relevance order
      return aiSearchResults.indexOf(a.id) - aiSearchResults.indexOf(b.id);
    }
    if (sortBy === 'likes') {
      return (b.likes || 0) - (a.likes || 0);
    }
    return 0; // default order
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedQuestions.length / itemsPerPage);
  const paginatedQuestions = sortedQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        categories={categories} 
        selectedCategory={selectedCategory} 
      />
      
      <main className="flex-1 max-w-5xl mx-auto w-full flex flex-col">
        <div className="p-8 md:p-12 flex-1">
          
          {/* Supabase Status Banner */}
          <div className={`mb-8 p-4 rounded-xl border flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4 ${dataSource === 'supabase' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
            <div className="flex items-center gap-3">
              <DbIcon className={`w-5 h-5 ${dataSource === 'supabase' ? 'text-emerald-600' : 'text-amber-600'}`} />
              <div>
                <p className="font-medium">
                  {dataSource === 'supabase' ? 'Đang kết nối với Supabase' : `Đang sử dụng dữ liệu mẫu (Local - ${localQuestions.length} câu)`}
                </p>
                {dbError && <p className="text-sm mt-1 opacity-80">{dbError}</p>}
              </div>
            </div>
            
            {dataSource === 'local' && (
              <button 
                onClick={seedDataToSupabase}
                disabled={isSeeding}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-300 rounded-lg text-sm font-medium text-amber-700 hover:bg-amber-100 transition-colors disabled:opacity-50"
              >
                {isSeeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                Đồng bộ dữ liệu mẫu lên Supabase
              </button>
            )}
          </div>

          <header className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <h1 className="text-3xl font-bold text-slate-900">
                {selectedCategory === 'All' ? 'Tất cả câu hỏi' : selectedCategory}
              </h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSchedulerModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl transition-colors shadow-sm"
                >
                  <Settings className="w-5 h-5" />
                  Cấu hình Scheduler
                </button>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm"
                >
                  <Plus className="w-5 h-5" />
                  Thêm câu hỏi AI
                </button>
              </div>
            </div>
            <p className="text-slate-500">
              Khám phá và ôn tập các câu hỏi phỏng vấn kỹ thuật chất lượng cao.
            </p>
            
            <div className="mt-8 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="relative w-full lg:max-w-xl flex-1 flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-shadow"
                    placeholder="Tìm kiếm câu hỏi, từ khóa, công nghệ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAiSearch();
                      }
                    }}
                  />
                </div>
                <button
                  onClick={handleAiSearch}
                  disabled={isAiSearching || !searchQuery.trim()}
                  className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  title="Tìm kiếm thông minh bằng AI (NLU)"
                >
                  {isAiSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  <span className="hidden sm:inline">AI Search</span>
                </button>
              </div>
              
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
                <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm h-[48px] flex-1 sm:flex-none">
                  <Globe className="w-4 h-4 text-slate-400 ml-3 flex-shrink-0" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="bg-transparent border-none text-sm font-medium text-slate-700 focus:ring-0 py-0 pl-2 pr-8 cursor-pointer h-full w-full outline-none"
                  >
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                    <option value="ja">日本語</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm h-[48px] flex-1 sm:flex-none overflow-hidden">
                  <button
                    onClick={() => setSortBy('default')}
                    className={`px-4 h-full flex items-center justify-center text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex-1 sm:flex-none ${sortBy === 'default' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    Mặc định
                  </button>
                  <button
                    onClick={() => setSortBy('likes')}
                    className={`px-4 h-full flex items-center justify-center text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex-1 sm:flex-none ${sortBy === 'likes' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    Nhiều Like nhất
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div className="space-y-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
                <p>Đang tải dữ liệu...</p>
              </div>
            ) : paginatedQuestions.length > 0 ? (
              <>
                <AnimatePresence mode="popLayout">
                  {paginatedQuestions.map(question => (
                    <QuestionCard 
                      key={question.id} 
                      question={question} 
                      language={language}
                      searchQuery={searchQuery}
                      onLike={() => handleLike(question.id)} 
                      onImageGenerated={(url) => handleImageGenerated(question.id, url)}
                    />
                  ))}
                </AnimatePresence>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10 pt-8 border-t border-slate-200">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page 
                              ? 'bg-indigo-600 text-white' 
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">Không tìm thấy kết quả</h3>
                <p className="text-slate-500">Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <CreateQuestionModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        categories={categories}
        onSave={handleSaveNewQuestion}
      />
      
      <SchedulerSettingsModal
        isOpen={isSchedulerModalOpen}
        onClose={() => setIsSchedulerModalOpen(false)}
        categories={categories}
        onSave={handleSaveSchedulerConfig}
        initialConfig={schedulerConfig}
      />
    </div>
  );
}
