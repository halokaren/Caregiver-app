"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Banknote,
  FileText,
  Star,
  Award,
  AlertTriangle,
  X,
  User,
} from "lucide-react";
import { RatingDialog } from "@/components/RatingDialog";

// ---------- 模拟数据常量 ----------

const mockUsers = [
  { id: "u1", name: "张女士", patientRating: 4.2 },
  { id: "u2", name: "李先生", patientRating: 3.2 },
  { id: "u3", name: "王先生", patientRating: 4.8 },
  { id: "u4", name: "刘女士", patientRating: 3.0 },
] as const;

const mockDemands = [
  {
    id: "d1",
    location: "北京市朝阳区望京",
    salary: 6500,
    description: "老人行动不便，需协助日常起居、服药提醒、简单康复训练。有轻度认知障碍，需耐心沟通。",
    patientCurrentRating: 4.2,
    publisherName: "张女士",
  },
  {
    id: "d2",
    location: "上海市浦东新区陆家嘴",
    salary: 8000,
    description: "术后康复期，需协助翻身、如厕、饮食。希望护理员有护理或康复相关经验。",
    patientCurrentRating: 3.2,
    publisherName: "李先生",
  },
  {
    id: "d3",
    location: "广州市天河区",
    salary: 5500,
    description: "高龄老人，生活基本能自理，主要需要陪伴、做饭、打扫及就医陪同。",
    patientCurrentRating: 4.8,
    publisherName: "王先生",
  },
  {
    id: "d4",
    location: "深圳市南山区",
    salary: 7200,
    description: "失能老人，需全日照护、鼻饲、压疮护理。要求有医护背景或多年经验。",
    patientCurrentRating: 3.0,
    publisherName: "刘女士",
  },
] as const;

const mockCaregivers = [
  { id: "c1", name: "陈阿姨", rating: 4.9 },
  { id: "c2", name: "赵师傅", rating: 4.3 },
  { id: "c3", name: "孙护士", rating: 4.95 },
  { id: "c4", name: "周阿姨", rating: 4.5 },
  { id: "c5", name: "吴师傅", rating: 4.82 },
] as const;

const LOW_RATING_THRESHOLD = 3.5;
const GOLD_BADGE_THRESHOLD = 4.8;
const PAY_BUMP_PERCENT = 20;

// ---------- 首页 ----------

export default function HomePage() {
  const router = useRouter();
  const [searchLocation, setSearchLocation] = useState("");
  const [searchService, setSearchService] = useState("");
  const [showPublishWarning, setShowPublishWarning] = useState(false);
  const [suggestedSalary, setSuggestedSalary] = useState<number | null>(null);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [ratingTarget, setRatingTarget] = useState<{
    type: "demand" | "caregiver";
    id: string;
    name: string;
  } | null>(null);
  const [ratings, setRatings] = useState<Record<string, { stars: number; comment: string }>>({});

  // 照护者列表：评分 > 4.8 的加「金牌服务」并置顶
  const sortedCaregivers = useMemo(() => {
    const list = [...mockCaregivers];
    return list.sort((a, b) => {
      const aGold = a.rating >= GOLD_BADGE_THRESHOLD ? 1 : 0;
      const bGold = b.rating >= GOLD_BADGE_THRESHOLD ? 1 : 0;
      if (bGold !== aGold) return bGold - aGold;
      return b.rating - a.rating;
    });
  }, []);

  const handlePublishClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // 模拟：用当前选中的用户（这里用第一个低分用户）检测患者评分
    const currentUser = mockUsers[1];
    if (currentUser.patientRating < LOW_RATING_THRESHOLD) {
      const baseSalary = 6000;
      const suggested = Math.round(baseSalary * (1 + PAY_BUMP_PERCENT / 100));
      setSuggestedSalary(suggested);
      setShowPublishWarning(true);
    } else {
      router.push("/publish");
    }
  };

  const handleRate = (stars: number, comment: string) => {
    if (!ratingTarget) return;
    setRatings((prev) => ({
      ...prev,
      [ratingTarget.id]: { stars, comment },
    }));
    setRatingTarget(null);
  };

  const openRatingDialog = (type: "demand" | "caregiver", id: string, name: string) => {
    setRatingTarget({ type, id, name });
    setRatingDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section：巨大搜索框 */}
      <section className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <h1 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            找到合适的照护服务
          </h1>
          <p className="mt-2 text-center text-slate-600">
            按地点或服务类型搜索，快速匹配专业看护
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
              <MapPin className="h-5 w-5 shrink-0 text-slate-400" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="搜索地点（如：北京朝阳）"
                className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 outline-none"
              />
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
              <Search className="h-5 w-5 shrink-0 text-slate-400" />
              <input
                type="text"
                value={searchService}
                onChange={(e) => setSearchService(e.target.value)}
                placeholder="搜索服务（如：康复、陪护）"
                className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 outline-none"
              />
            </div>
            <button
              type="button"
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              搜索
            </button>
          </div>
        </div>
      </section>

      {/* Card Grid：4 个需求卡片 */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">热门需求</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mockDemands.map((demand) => {
            const saved = ratings[demand.id];
            const displayRating = saved?.stars ?? demand.patientCurrentRating;
            return (
              <div
                key={demand.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-sm text-slate-600">
                    <MapPin className="h-3.5 w-3.5" />
                    {demand.location}
                  </span>
                  <span className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-slate-900">{displayRating.toFixed(1)}</span>
                  </span>
                </div>
                <p className="text-lg font-semibold text-blue-600">
                  ¥{demand.salary.toLocaleString()}/月
                </p>
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">{demand.description}</p>
                <p className="mt-2 text-xs text-slate-400">发布者：{demand.publisherName}</p>
                <button
                  type="button"
                  onClick={() => openRatingDialog("demand", demand.id, demand.location)}
                  className="mt-4 w-full rounded-xl border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  评价该需求
                </button>
              </div>
            );
          })}
        </div>

        {/* 发布需求入口（触发患者权重检测） */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handlePublishClick}
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            发布需求
          </button>
        </div>
      </section>

      {/* 照护者列表：金牌置顶 */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 border-t border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-6">推荐照护者</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {sortedCaregivers.map((c) => {
            const saved = ratings[c.id];
            const displayRating = saved?.stars ?? c.rating;
            const isGold = c.rating >= GOLD_BADGE_THRESHOLD;
            return (
              <div
                key={c.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-slate-400" />
                  <span className="font-medium text-slate-900">{c.name}</span>
                  {isGold && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                      <Award className="h-3 w-3" />
                      金牌服务
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-slate-900">{displayRating.toFixed(1)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => openRatingDialog("caregiver", c.id, c.name)}
                  className="mt-3 w-full rounded-xl border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  评价
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 发布需求警告弹窗：患者评分 < 3.5 时建议提高 20% 报酬 */}
      {showPublishWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setShowPublishWarning(false)}
            aria-hidden
          />
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-amber-100 p-2">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900">建议提高报酬</h3>
                <p className="mt-2 text-sm text-slate-600">
                  当前患者评分较低（&lt; 3.5），可能影响照护者接单意愿。建议将报酬提高约 20%，以提升匹配成功率。
                </p>
                {suggestedSalary != null && (
                  <p className="mt-3 text-sm font-medium text-blue-600">
                    建议薪资：约 ¥{suggestedSalary.toLocaleString()}/月
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowPublishWarning(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
                aria-label="关闭"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowPublishWarning(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 font-medium text-slate-600 hover:bg-slate-50"
              >
                暂不发布
              </button>
              <Link
                href="/publish"
                onClick={() => setShowPublishWarning(false)}
                className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700"
              >
                仍要发布
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 评价对话框 */}
      <RatingDialog
        title={ratingTarget ? `评价：${ratingTarget.name}` : "评价"}
        isOpen={ratingDialogOpen && ratingTarget !== null}
        onClose={() => {
          setRatingDialogOpen(false);
          setRatingTarget(null);
        }}
        onRate={handleRate}
      />
    </div>
  );
}
