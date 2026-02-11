"use client";

import type { CareDemand } from "@/types/care";
import {
  MapPin,
  Clock,
  Banknote,
  User,
  Stethoscope,
  Calendar,
} from "lucide-react";

const genderLabel: Record<CareDemand["gender"], string> = {
  male: "男",
  female: "女",
  other: "其他",
};

export function CareDemandCard({ demand }: { demand: CareDemand }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-200">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 text-sm font-medium text-primary-700">
            <User className="h-3.5 w-3.5" />
            {genderLabel[demand.gender]} · {demand.age} 岁
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-sm text-slate-600">
            {demand.relationship}
          </span>
          {demand.publisherName && (
            <span className="text-sm text-slate-500">
              发布者：{demand.publisherName}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-amber-600">
          <Stethoscope className="h-4 w-4 shrink-0" />
          <p className="text-slate-700 leading-relaxed line-clamp-3">
            {demand.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-1.5">
            <Banknote className="h-4 w-4 text-primary-500" />
            <strong className="text-slate-900 font-semibold">
              ¥{demand.salary.toLocaleString()}
            </strong>
            <span>/月</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-slate-400" />
            {demand.schedule}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-slate-400" />
            {demand.location}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar className="h-3.5 w-3.5" />
          发布于 {demand.publishedAt}
        </div>
      </div>
    </article>
  );
}
