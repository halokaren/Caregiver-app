"use client";

import { Star, X } from "lucide-react";
import { useState } from "react";

interface RatingDialogProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onRate: (stars: number, comment: string) => void;
}

export function RatingDialog({
  title,
  isOpen,
  onClose,
  onRate,
}: RatingDialogProps) {
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const displayStars = hoverStars || stars;

  const handleSubmit = () => {
    onRate(stars, comment);
    setStars(0);
    setHoverStars(0);
    setComment("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="关闭"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-center gap-1 py-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className="p-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              onMouseEnter={() => setHoverStars(n)}
              onMouseLeave={() => setHoverStars(0)}
              onClick={() => setStars(n)}
              aria-label={`${n} 星`}
            >
              <Star
                className={`h-10 w-10 ${
                  n <= displayStars
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-200"
                }`}
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-slate-500 mb-4">
          {displayStars ? `${displayStars} 星` : "点击选择评分"}
        </p>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="写下您的评价（选填）"
          rows={3}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-none"
        />

        <div className="mt-5 flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            提交评价
          </button>
        </div>
      </div>
    </div>
  );
}
