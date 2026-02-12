"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CareDemandForm } from "@/types/care";
import { FileText } from "lucide-react";
import { supabase, supabaseUrl } from "@/lib/supabase";

const initialForm: CareDemandForm & { title: string } = {
  title: "",
  gender: "female",
  age: 0,
  relationship: "",
  description: "",
  salary: 0,
  schedule: "",
  location: "",
};

export default function PublishPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (
    field: keyof (CareDemandForm & { title: string }),
    value: string | number
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      console.log("Supabase连接信息:", supabaseUrl || "(未配置)");
      const { error: insertError } = await supabase.from("demands").insert({
        title: form.title.trim(),
        description: form.description.trim(),
        salary: Number(form.salary),
        location: form.location.trim(),
        publisher_name: form.relationship.trim() || null,
      });

      if (insertError) {
        const msg = insertError.message;
        setError(msg);
        window.alert(msg);
        setSubmitting(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "发布失败，请重试";
      setError(msg);
      window.alert(msg);
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl flex items-center gap-2">
          <FileText className="h-8 w-8 text-blue-600" />
          发布护理需求
        </h1>
        <p className="mt-1 text-slate-600">
          填写被照顾者信息与照护要求，方便护理人员与您联系
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              需求标题
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="例如：望京老人日间照护"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                被照顾者性别
              </label>
              <select
                value={form.gender}
                onChange={(e) =>
                  update("gender", e.target.value as CareDemandForm["gender"])
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                required
              >
                <option value="female">女</option>
                <option value="male">男</option>
                <option value="other">其他</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                被照顾者年龄
              </label>
              <input
                type="number"
                min={1}
                max={120}
                value={form.age || ""}
                onChange={(e) => update("age", Number(e.target.value) || 0)}
                placeholder="例如 75"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              与您的关系
            </label>
            <input
              type="text"
              value={form.relationship}
              onChange={(e) => update("relationship", e.target.value)}
              placeholder="例如：母亲、父亲、祖父（将显示为发布者）"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              疾病或照护需求描述
            </label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="请描述健康状况、日常需要协助的内容、特殊注意事项等"
              rows={4}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-y"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                期望薪资（元/月）
              </label>
              <input
                type="number"
                min={0}
                value={form.salary || ""}
                onChange={(e) => update("salary", Number(e.target.value) || 0)}
                placeholder="例如 6000"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                工作时间
              </label>
              <input
                type="text"
                value={form.schedule}
                onChange={(e) => update("schedule", e.target.value)}
                placeholder="例如：周一至周五 8:00-18:00"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              工作地点
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="例如：北京市朝阳区望京"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
              required
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-60 transition-colors"
          >
            {submitting ? "提交中…" : "发布需求"}
          </button>
        </div>
      </form>
    </div>
  );
}
