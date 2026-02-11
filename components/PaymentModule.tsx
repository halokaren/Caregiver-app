"use client";

import { CreditCard, Smartphone } from "lucide-react";

/**
 * 支付校验 UI 预留模块
 * 后续可接入：支付宝 SDK / 微信支付 SDK，在此展示支付方式选择与校验流程
 */
export function PaymentModule() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        支付方式（预留）
      </h3>
      <p className="text-sm text-slate-600 mb-6">
        此处预留支付宝 / 微信支付校验 UI，接入 SDK 后可在此完成下单与验签。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="flex items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 py-4 text-slate-500 hover:border-primary-200 hover:text-primary-600 transition-colors"
          disabled
        >
          <CreditCard className="h-6 w-6" />
          支付宝（预留）
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 py-4 text-slate-500 hover:border-primary-200 hover:text-primary-600 transition-colors"
          disabled
        >
          <Smartphone className="h-6 w-6" />
          微信支付（预留）
        </button>
      </div>
    </div>
  );
}
