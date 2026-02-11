# 安心照护 · 家政服务匹配平台

基于 Next.js + Tailwind CSS + Lucide React 的护理需求发布与匹配平台。

## 技术栈

- **Next.js 15**（App Router）
- **Tailwind CSS** 样式
- **Lucide React** 图标
- **TypeScript**

## 功能概览

| 模块     | 路径        | 说明 |
|----------|-------------|------|
| 首页     | `/`         | 护理需求列表（性别年龄、与发布者关系、照护描述、薪资、时间、地点） |
| 发布需求 | `/publish`  | 雇主发布需求的表单页 |
| 登录/注册 | `/auth`     | 预留 Clerk 接口（邮箱、手机验证） |
| 支付     | `/payment`  | 预留支付宝/微信支付校验 UI 模块 |

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

## 项目结构

```
├── app/
│   ├── layout.tsx      # 根布局与导航
│   ├── page.tsx        # 首页（需求列表）
│   ├── publish/        # 发布需求页
│   ├── auth/           # 登录/注册预留页
│   └── payment/        # 支付预留页
├── components/
│   ├── Header.tsx      # 顶部导航
│   ├── CareDemandCard.tsx  # 需求卡片
│   └── PaymentModule.tsx   # 支付方式预留组件
├── lib/
│   └── mock-data.ts    # 模拟需求数据
├── types/
│   └── care.ts         # 护理需求类型定义
└── tailwind.config.ts
```

## 后续接入建议

1. **Clerk**：在 `/auth` 引入 `@clerk/nextjs` 的 `SignIn` / `SignUp`，配置邮箱与手机验证。
2. **支付**：在 `PaymentModule` 中接入支付宝/微信支付 SDK，实现下单与验签流程。
3. **数据**：将 `mockCareDemands` 替换为 API 或数据库（如 Prisma + 数据库）。
