<div align="center">

<img width="1200" height="475" alt="Business Card Studio Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

#  Business Card Studio Pro
### Precision 3D Business Card Generator • Handcrafted with Apple Design Principles

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Apple HIG](https://img.shields.io/badge/Apple_Design-Liquid_Glass_2025-000000?style=for-the-badge&logo=apple&logoColor=white)](https://developer.apple.com/design/human-interface-guidelines)
[![Perpetual Year Engine](https://img.shields.io/badge/Perpetual_Year-2026_Auto--Sync-0071E3?style=for-the-badge&logo=googlecalendar&logoColor=white)](#-perpetual-auto-updating-year-logic)

<p align="center">
  <b>A state-of-the-art interactive business card creator engineered with fluid 3D mouse tilt physics, true dual-sided card flipping, tactile Web Audio haptics, Apple Liquid Glass materials, and perpetual auto-updating calendar synchronization.</b>
</p>

[**Live Demo**](https://github.com/Rahul08319/Business-Card-Generator) • [**Features**](#-features-at-a-glance) • [**Apple Design System**](#-apple-design-system--materials) • [**Auto-Update Engine**](#-perpetual-auto-updating-year-logic) • [**Quickstart**](#-quickstart)

---

</div>

## ✦ Highlights

```
┌────────────────────────────────────────────────────────────────────────┐
│   CARD STUDIO PRO                           [ ISSUED 2026 • VALID 2029 ] │
│  ┌──────────┐                                                          │
│  │ ▣▣ CHIP  │   ALEXANDER WRIGHT                                       │
│  │ ▣▣ EMV   │   Lead Product Architect                                 │
│  └──────────┘   Apple Design Labs                                      │
│                                                        ┌─────────────┐ │
│  ☎ +1 (408) 996-1010                                  │  QR CODE    │ │
│  ✉ a.wright@designlabs.io                             │  CONTACT    │ │
│  🌐 www.designlabs.io                                  └─────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
 [ 3D PERSPECTIVE TILT • DUAL-SIDED FLIP • 300 DPI PRINT • LIQUID GLASS ]
```

---

## 🍱 Bento Grid: Core Capabilities

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🕹️ Interactive 3D Perspective Tilt</h3>
      <p>Tracks cursor coordinates relative to the card's center in real-time, executing continuous spring physics tilt with dynamic specular light glare that glides naturally across the surface.</p>
    </td>
    <td width="50%" valign="top">
      <h3>🔄 True Dual-Sided 3D Card Architecture</h3>
      <p>Simulates real physical business cards with front and back faces. Features back-face magnetic stripe, tap-to-connect NFC waves, social handle routing, and holographic verification.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>💎 2025 Liquid Glass & Tactile Finishes</h3>
      <p>Authentic Cupertino materials: <b>Frosted Acrylic Glass</b> with refractive edge lighting, <b>Brushed Titanium</b>, <b>Matte Silk</b>, <b>High-Gloss Mirror</b>, and <b>Holographic Sheen</b>.</p>
    </td>
    <td width="50%" valign="top">
      <h3>⏳ Perpetual Auto-Updating Year Engine</h3>
      <p>Calculates active calendar year and future validity intervals (<code>${year} – ${year + 3}</code>) dynamically. Includes a scheduled GitHub Actions workflow for zero-touch annual maintenance.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🎛️ 1-Click Curated Apple Presets</h3>
      <p>Instant professional themes: <i>Apple Titanium</i>, <i>Midnight Gold</i>, <i>Frosted Acrylic</i>, <i>Starlight Pearl</i>, <i>Emerald Executive</i>, and <i>Sunset Chroma</i>.</p>
    </td>
    <td width="50%" valign="top">
      <h3>🖨️ Multi-Format Print & Digital Export</h3>
      <p>Ultra-high-definition exports at <b>300 DPI</b> (Print), <b>150 DPI</b> (HD), <b>96 DPI</b> (Web), alongside two-sided vector PDF, scalable SVG, and direct-to-clipboard image copying.</p>
    </td>
  </tr>
</table>

---

## 🎨 Apple Design System & Materials

This project strictly adheres to Apple's **Human Interface Guidelines (HIG)**:

| HIG Principle | Implementation |
| :--- | :--- |
| **Clarity** | System typographic hierarchy with SF Pro Display, Plus Jakarta Sans, and Playfair Display; precise contrast ratios and optical tracking. |
| **Deference** | Unobtrusive frosted navigation bar (`backdrop-blur-2xl`) that recedes to let the physical card lead. |
| **Depth** | Layered materials (`backdrop-filter: blur() saturate()`), continuous squircle corners (`rounded-[22px]`), and dynamic drop shadows. |
| **Spring Motion** | Interruptible spring physics curves (`cubic-bezier(0.16, 1, 0.3, 1)`) and tactile press states (`active:scale-95`). |
| **Zero-Latency Haptics** | Synthesized mechanical audio clicks powered by the browser's Web Audio API with zero external audio assets. |

---

## 🔄 Perpetual Auto-Updating Year Logic

The application features a built-in calendar engine located in [`utils/yearManager.ts`](utils/yearManager.ts):

1. **Dynamic Runtime Evaluation:** Automatically derives the current calendar year via `new Date().getFullYear()`.
2. **Card Validity Window:** Computes the validity span dynamically:
   $$\text{Valid Span} = [\text{Current Year}, \text{Current Year} + 3]$$
3. **Automated GitHub Actions Maintenance:** A scheduled workflow ([`.github/workflows/auto-year-update.yml`](.github/workflows/auto-year-update.yml)) triggers annually on **January 1st at 00:00 UTC** (`0 0 1 1 *`), validating build artifacts, refreshing badge metadata, and ensuring zero code decay.

---

## ⚡ Quickstart

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/Rahul08319/Business-Card-Generator.git
cd Business-Card-Generator
```

### 2. Install dependencies
```bash
npm install
```

### 3. (Optional) Configure Gemini AI
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
> *Note: If no API key is provided, the smart harmonic palette generator will seamlessly provide curated aesthetic color themes offline.*

### 4. Start the development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

---

## 🛠️ Tech Stack & Architecture

- **UI Core:** [React 19](https://react.dev/) + [TypeScript 5.8](https://www.typescriptlang.org/)
- **Build Bundler:** [Vite 6.2](https://vitejs.dev/)
- **Design Tokens:** [Tailwind CSS 3.4](https://tailwindcss.com/) with Apple-spec extensions
- **AI Engine:** Google GenAI SDK (`@google/genai`) with Gemini 2.5 Flash
- **Rasterization & PDF:** `html2canvas` + `jspdf`
- **Vector Rendering:** `dom-to-image-more`
- **Dynamic QR Generator:** `qrcode`

---

## 📄 License & Attribution

Distributed under the **MIT License**. Created by [Rahul Kumar (Rahul08319)](https://github.com/Rahul08319).

<div align="center">
  <sub>Handcrafted with precision • Synchronized for 2026 & Beyond </sub>
</div>
