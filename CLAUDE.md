# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Venkata Koundinya Pullela featuring an animated particle network background with mouse-tracking interactions. Built with Next.js 16 + TypeScript + Tailwind CSS 4.

## Development Commands

```bash
# Start dev server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Architecture

### Particle Background System

**Universal Background Animation** (`app/components/ParticleBackground.tsx`):
- Fixed canvas covering entire page across all sections
- 100 particles that move randomly and connect when within 150px of each other
- Mouse interaction with red lines (proximity-based opacity)
- Uses `requestAnimationFrame` for smooth 60fps rendering
- Auto-resizes on window resize events
- Imported in `app/layout.tsx` for global coverage

Key animation parameters:
- `particleCount`: 100
- `connectionDistance`: 150px
- Blue particles (rgba(100, 149, 237, 0.5))
- Red mouse connections (rgba(220, 38, 38, opacity))

### Page Sections

#### 1. Landing/Hero Section
- Fullscreen hero with centered text
- Role text cycling through 5 titles with fade transitions (300ms fade, 3s interval)
- Social links (LinkedIn, GitHub, Resume) - icon buttons with hover effects
- "View my work" CTA button linking to #about
- All content has `z-10` to appear above particle background

#### 2. About Section
- **ABOUT** label in red uppercase
- Main heading: "AI systems engineer with a data foundation."
- Two-column text layout describing background and approach
- **STRENGTHS** subsection with 3 cards:
  - LLM Product Engineering
  - Retrieval & Evaluation
  - Applied ML & Analytics
- Cards have gray-800 background with hover:border-red-500 effect

#### 3. Education Section
- **EDUCATION** label in red uppercase
- Main heading: "Academic Foundation."
- Two education cards (Carnegie Mellon, RV College)
- Format: University name → "Degree: Master's/Bachelor's" → Full program name
- Includes location and date range on right side

#### 4. Experience Section
- **EXPERIENCE** label in red uppercase
- Main heading: "Professional Journey."
- Vertical timeline with center line (gray-700)
- Timeline dots (red-500, 4px with border-gray-900)
- Alternating left/right layout on desktop
- Dates in green-400 (like reference design)
- 3 positions: Virtual Gold, Sandstorm, O9 Solutions
- Each card has job title, company (red-500), location, and bullet points

### Design System

**Typography:**
- Font: JetBrains Mono (Google Font)
- Section labels: text-base, uppercase, tracking-widest, red-500
- Main headings: text-5xl md:text-6xl, font-bold, white
- Subheadings: text-2xl, font-bold, white
- Body text: text-lg md:text-xl, gray-300/gray-400
- Dates/metadata: text-lg, gray-400

**Colors:**
- Background: gray-900 (via particle canvas), sections are bg-transparent
- Text: white (headings), gray-300 (body), gray-400 (metadata)
- Accent: red-500 (labels, highlights, hover states)
- Timeline dates: green-400
- Cards: gray-800 with border-gray-700, hover:border-red-500

**Spacing:**
- Sections: py-20 px-6, max-w-7xl mx-auto
- Section label to heading: mb-8 → mb-20
- Between elements: mb-8 to mb-24 depending on hierarchy
- Card padding: p-8 to p-10

**Components:**
- All cards use: `bg-gray-800 border border-gray-700 hover:border-red-500 transition-all duration-300`
- Bullet points use: red-500 "▸" character
- All sections have `relative z-10` to appear above particle background

### Styling

- **Font**: JetBrains Mono (Google Font) for coding aesthetic
- **Color Scheme**: Dark gray background, white/gray text, red accent (#DC2626), green dates (#4ade80)
- **Layout**: Single-page scroll with multiple sections
- No component library, minimal dependencies

## File Structure

```
app/
├── components/
│   └── ParticleBackground.tsx  # Global particle animation component
├── page.tsx                     # Main page with all sections
├── layout.tsx                   # Root layout with font + ParticleBackground
└── globals.css                  # Global Tailwind styles
```

## Important Notes

- Uses Next.js 16 App Router (check `/node_modules/next/dist/docs/` for API changes)
- Tailwind CSS 4 with PostCSS plugin
- No ESLint configured
- ParticleBackground is client component (`'use client'`)
- All sections use `bg-transparent` to show particle background through them
- All content sections have `relative z-10` to appear above particles
