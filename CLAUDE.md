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

### Core Animation System

The landing page (`app/page.tsx`) implements a custom canvas-based particle animation:

- **Particle Network**: 100 particles that move randomly and connect when within 150px of each other
- **Mouse Interaction**: Particles connect to cursor with red lines (proximity-based opacity)
- **Animation Loop**: Uses `requestAnimationFrame` for smooth 60fps rendering
- **Responsive**: Canvas auto-resizes on window resize events

Key animation parameters in `app/page.tsx`:
- `particleCount`: 100
- `connectionDistance`: 150px
- Blue particles (rgba(100, 149, 237, 0.5))
- Red mouse connections (rgba(220, 38, 38, opacity))

### Text Cycling Animation

Role text cycles through 5 titles with fade transitions:
- Fade out (300ms) → change text → fade in (300ms)
- 3-second interval between changes
- Fully centered layout (entire sentence cycles for consistent alignment)

### Styling

- **Font**: JetBrains Mono (Google Font) for coding aesthetic
- **Color Scheme**: Dark gray background (#111827), white text, red accent (#DC2626)
- **Layout**: Single-page with centered fullscreen hero section
- No component library, minimal dependencies

## File Structure

```
app/
├── page.tsx        # Main landing page with canvas animation
├── layout.tsx      # Root layout with JetBrains Mono font
└── globals.css     # Global Tailwind styles
```

## Important Notes

- Uses Next.js 16 App Router (check `/node_modules/next/dist/docs/` for API changes)
- Tailwind CSS 4 with PostCSS plugin
- No ESLint configured
- Client component required for canvas/animation (`'use client'`)
