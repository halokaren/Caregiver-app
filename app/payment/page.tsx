import Link from "next/link";
import { PaymentModule } from "@/components/PaymentModule";

/**
 * 支付预留页：展示支付宝/微信支付校验 UI 模块
 */
export default function PaymentPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          支付校验
        </h1>
        <p className="mt-1 text-slate-600">
          预留支付宝 / 微信支付校验模块，后续接入 SDK 后在此完成支付与验签
        </p>
      </div>

      <PaymentModule />

      <p className="mt-6 text-center">
        <Link href="/" className="text-primary-600 hover:underline text-sm">
          返回首页
        </Link>
      </p>
    </div>
  );
}
