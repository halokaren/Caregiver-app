import { createClient } from '@supabase/supabase-js'

// 必须使用 NEXT_PUBLIC_ 前缀才能在浏览器端读取
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// 日志：便于在控制台确认环境变量是否读取成功
if (typeof window !== 'undefined') {
  console.log('Supabase连接信息:', supabaseUrl || '(未配置)')
}

// 单例：全站共用同一个连接
export const supabase = createClient(supabaseUrl, supabaseAnonKey)