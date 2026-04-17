import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://upuycerzqdmhdrrmgvfz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_s7xtBMMd7IWxwEm46kiCKQ_xtt0xo38';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: (url, init) => fetch(url, init),
  },
});
