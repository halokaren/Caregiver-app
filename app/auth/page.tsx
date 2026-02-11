"use client";

import { Mail, Smartphone, Heart } from "lucide-react";
import Link from "next/link";

/**
 * 身份验证预留页
 * 后续可接入 Clerk：
 * - 邮箱登录/注册与验证
 * - 手机号登录/注册与验证
 * - 使用 @clerk/nextjs 的 SignIn / SignUp 组件
 */
export default function AuthPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-primary-50 p-4">
            <Heart className="h-10 w-10 text-primary-600" />
          </div>
        </div>
        <h1 className="text-center text-xl font-bold text-slate-900">
          登录 / 注册
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          预留 Clerk 接口：支持邮箱与手机验证
        </p>

        <div className="mt-8 space-y-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            disabled
          >
            <Mail className="h-5 w-5 text-slate-400" />
            邮箱登录 / 注册（预留）
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            disabled
          >
            <Smartphone className="h-5 w-5 text-slate-400" />
            手机号登录 / 注册（预留）
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          接入 Clerk 后，将在此处渲染{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-slate-600">
            SignIn / SignUp
          </code>{" "}
          组件，并配置邮箱、手机验证策略。
        </p>
      </div>

      <p className="mt-6 text-center">
        <Link href="/" className="text-primary-600 hover:underline text-sm">
          返回首页
        </Link>
      </p>
    </div>
  );
}
