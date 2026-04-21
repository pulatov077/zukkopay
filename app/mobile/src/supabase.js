import { createClient } from '@supabase/supabase-js'

// Vite-da .env o'zgaruvchilari "import.meta.env" orqali olinadi
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Xavfsizlik uchun: Agar kalitlar yuklanmasa, xato xabarini ko'rsatamiz
if (!supabaseUrl || !supabaseKey) {
  console.error("Xatolik: .env faylidan Supabase kalitlari o'qilmadi! Fayl nomini va VITE_ prefiksini tekshiring.")
}

export const supabase = createClient(supabaseUrl, supabaseKey)