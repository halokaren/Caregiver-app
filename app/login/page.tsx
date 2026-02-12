"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Stethoscope, Phone } from "lucide-react";
import { supabase } from "@/lib/supabase";

type LoginMode = "email" | "phone";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<LoginMode>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError("请输入手机号");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        phone: phone.trim().startsWith("+") ? phone.trim() : `+86${phone.trim()}`,
      });
      if (otpError) {
        setError(otpError.message);
        setLoading(false);
        return;
      }
      setOtpSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "发送验证码失败");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("请输入验证码");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        phone: phone.trim().startsWith("+") ? phone.trim() : `+86${phone.trim()}`,
        token: otp.trim(),
        type: "sms",
      });
      if (verifyError) {
        setError(verifyError.message);
        setLoading(false);
        return;
      }
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "验证失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-blue-50 p-3">
              <Stethoscope className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-center text-xl font-bold text-slate-900">登录安心照护</h1>
          <p className="mt-1 text-center text-sm text-slate-600">
            使用邮箱或手机号登录
          </p>

          {/* 登录方式切换 */}
          <div className="mt-6 flex rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => { setMode("email"); setError(null); setOtpSent(false); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "email" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              <Mail className="h-4 w-4" />
              邮箱登录
            </button>
            <button
              type="button"
              onClick={() => { setMode("phone"); setError(null); setOtpSent(false); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "phone" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              <Phone className="h-4 w-4" />
              手机号登录
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {mode === "email" ? (
            <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">邮箱</label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                  <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 outline-none"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">密码</label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                  <Lock className="h-4 w-4 text-slate-400 shrink-0" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 outline-none"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-60 transition-colors"
              >
                {loading ? "登录中…" : "登录"}
              </button>
            </form>
          ) : (
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">手机号</label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                  <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="13800138000"
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 outline-none"
                    disabled={otpSent}
                  />
                </div>
              </div>
              {!otpSent ? (
                <form onSubmit={handleSendOtp}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-60 transition-colors"
                  >
                    {loading ? "发送中…" : "获取验证码"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">验证码</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="请输入6位验证码"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      maxLength={6}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-60 transition-colors"
                  >
                    {loading ? "验证中…" : "验证并登录"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full text-sm text-slate-500 hover:text-slate-700"
                  >
                    更换手机号
                  </button>
                </form>
              )}
            </div>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">
            还没有账号？ Supabase 后台可开启「邮箱注册」或「手机验证码」登录。
          </p>
        </div>

        <p className="mt-6 text-center">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            返回首页
          </Link>
        </p>
      </div>
    </div>
  );
}
