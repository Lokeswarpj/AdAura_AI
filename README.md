# 🌌 AdAura AI — Unified Ad Analytics & Optimization

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**AdAura AI** is a production-ready, ultra-premium AI-powered advertising analytics and optimization dashboard. Designed for high-performance marketing teams, AdAura AI integrates directly with **Meta Ads Manager** and **Google Ads REST APIs** to aggregate multi-channel campaigns, targetings, and creative assets into a single unified workspace. Featuring real-time audit engines, predictive hook rate indicators, and context-aware chat assistants, AdAura AI eliminates ad spend waste and scales high-performing ad sets effortlessly.

---

## ✨ Features Spotlight

### 📊 1. Unified Multichannel Dashboard
*   **True Aggregated Metrics:** Real-time calculation of **Total Spend**, **Avg. ROAS**, **CTR (Click-Through Rate)**, **CPC (Cost Per Click)**, **CPM**, and **Total Conversions** across all linked ad channels.
*   **Dynamic Visualizations:** Interactive custom line and bar charts using `recharts` to map performance metrics against custom historical time frames.
*   **Linked Accounts Guardrails:** Clear, beautiful warning overlays and integration status prompts to seamlessly link or sync Meta and Google Ads tokens.

### 🎯 2. Campaign Management & Live Audits
*   **Unified Campaign Table:** View aggregated active, paused, or learning campaigns with platform-specific badges.
*   **On-the-Fly Campaign Budgets:** Instantly audit, modify budgets, or toggle campaign statuses right from the interactive drawer workspace.
*   **AI Performance Index:** A proprietary mathematical heuristic scoring ad sets from `35` to `98` based on conversions, CTR thresholds, and ROAS performance.

### 👥 3. Deep-Dive Ad Sets & Targeting
*   **Granular Demographics:** Examine audience details including gender, age distributions, and active device targeting.
*   **Geographical Footprint:** High-fidelity breakdowns of target regions and states mapping highest-performing regions to lower CPC values.
*   **Spend Distributions:** Direct charts visualizing budget efficiency across ad set criteria.

### 🖼️ 4. Creative Hook Audits
*   **AI-Powered Ad Copy Auditing:** Evaluates the efficacy of visual creative types (Static, Carousel, Short Video).
*   **Hook Rate Analysis:** Measures the exact drop-off points of video hooks to optimize visual attention.
*   **Actionable Copy Writing Guidelines:** Recommends changes to primary headlines, descriptions, and call-to-actions (CTAs).

### 💬 5. Context-Aware AI Assistant & Chat
*   **Direct Query Engine:** Interact with a ChatGPT-style conversational assistant trained specifically on your campaigns' database.
*   **Actionable Prompts:** Generate immediate copywriting ideas, bid recommendations, and budget reallocation scripts based on live metrics.

### 📝 6. Interactive Reports Generator
*   **Custom Layouts & Metrics:** Choose which metrics to include, filter by platform, and generate professional tabular reports.
*   **Multi-Format Export:** Export your aggregated reports to print-ready PDF or raw CSV formats instantly.
*   **Scheduled Delivery:** Automate reports sending to stakeholders via customizable schedules.

---

## 🛠️ Technological Stack

*   **Framework:** [Next.js 16.2 (App Router)](https://nextjs.org) with full server/client separation.
*   **Runtime Logic:** [React 19](https://react.dev) with strict type safety using [TypeScript](https://www.typescriptlang.org).
*   **Styling System:** Vanilla CSS augmented by [Tailwind CSS v4](https://tailwindcss.com) utilizing CSS-variables and fluid fluid layouts.
*   **Animations:** [Framer Motion 12](https://www.framer.com/motion/) for fluid page transitions, layout morphing, and interactive micro-animations.
*   **Charts & Graphs:** [Recharts 3.8](https://recharts.org) styled dynamically to fit a custom premium dark dashboard.
*   **Component Architecture:** [Base UI](https://base-ui.com) & [shadcn/ui](https://ui.shadcn.com) primitives paired with [Lucide React](https://lucide.dev) iconography.

---

## 📂 Architecture & Repository Layout

The project uses the Next.js App Router convention structured for scalability:

```text
ai_analyzer/
├── public/                 # Static assets, branding, and icons
├── src/
│   ├── app/                # Next.js App Router Page modules
│   │   ├── ad-sets/        # Ad Sets targeting, sizing, and demographics
│   │   ├── ads/            # Individual Ad creatives list and statuses
│   │   ├── ai-chat/        # Interactive conversational AI Assistant
│   │   ├── ai-insights/    # Generated reports, audits, and performance suggestions
│   │   ├── api/            # API endpoints integrating with Meta and Google Ads Graph
│   │   ├── campaigns/      # Main campaign manager, budget settings, and drawer audits
│   │   ├── creatives/      # Creative asset audits, copywriting, and hook analytics
│   │   ├── reports/        # Custom PDF and CSV report builders
│   │   ├── settings/       # Ad Account sync configurations & developer options
│   │   ├── globals.css     # Global stylesheets and Tailwind CSS v4 directives
│   │   ├── layout.tsx      # Root app shell, background mesh, and layout wrapper
│   │   └── page.tsx        # Dashboard landing page
│   ├── components/         # Reusable UI React components
│   │   ├── auth/           # User authentication elements
│   │   ├── dashboard/      # Custom charts, KPI cards, tables, and modal triggers
│   │   ├── layout/         # Sidebar navigation, header bars, and responsive menus
│   │   └── ui/             # Core visual design primitives (drawers, tables, inputs, etc.)
│   ├── hooks/              # Custom React state hooks (useAuth, useIntegration, etc.)
│   └── lib/                # Modular utilities and ad API aggregation routines
│       ├── ad-services.ts  # Standardized Meta Graph & Google Ads API aggregations
│       └── utils.ts        # Helper classes for UI styling and class blending
├── tsconfig.json           # Strictly typed TypeScript configuration
├── next.config.ts          # Next.js compiler settings
└── package.json            # Active package dependencies and scripts
```

---

## 🚀 Getting Started & Local Setup

Follow these commands to clone, install dependencies, and run the project locally.

### 1. Prerequisites
Ensure you have **Node.js (v18.x or above)** and **npm** installed on your system.

### 2. Install Dependencies
Run the following command in your terminal to fetch and compile all required packages:
```bash
npm install
```

### 3. Run Development Server
Spin up the fast, hot-reloading development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application.

### 4. Build for Production
To build a fully optimized production package, execute:
```bash
npm run build
```
Start the compiled production bundle with:
```bash
npm run start
```

---

## 🔌 Integration Guides

AdAura AI allows you to connect your production ad accounts to pull live, granular data.

### Meta Ads Integration
1.  Navigate to **Settings** or click **Connect Account** on the dashboard.
2.  Provide a valid **Meta Graph API Access Token** (generated via Meta for Developers dashboard under your App settings with `ads_read` and `read_insights` permissions).
3.  Enter your 15-digit **Ad Account ID** (found in your Meta Business Suite or URL parameter `act_xxxxxxxxxxxxxxx`).
4.  Click **Link Meta Account**.

### Google Ads Integration
1.  Navigate to **Settings** and input your **10-Digit Google Ads Customer ID** (format: `XXX-XXX-XXXX`).
2.  Provide a valid **Google Developer Token** (registered in your Google Ads API Center).
3.  Input an active **Google OAuth Access Token** with authorized access to the Google Ads API endpoints.
4.  Click **Link Google Ads**.

---

## 🎨 Premium Visual Aesthetics

AdAura AI is built with a highly immersive, futuristic dark interface:
*   **Dynamic Neon Mesh Backgrounds:** High-performance, hardware-accelerated animated gradient meshes using OkLCH colors that shift subtly to minimize eye strain.
*   **Virtual Tech-Grid Scanlines:** Retro-modern scanning grid lines that fade into the viewport for a deep, professional coding feel.
*   **Glow Indicators:** Responsive text shadow and border glow systems reflecting different optimization states (e.g. green for high-efficiency, violet/pink for standard layouts, and amber warnings for empty configurations).

---

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
