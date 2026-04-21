# Portfolio Website

A modern, animated portfolio website built with Next.js 16, TypeScript, and Tailwind CSS 4, featuring an interactive particle network background and smooth scrolling animations.

🌐 **Live Site**: [Koundinya Pullela Website](https://koundinya-pullela.vercel.app)

## 🚀 Features

- **Animated Particle Network Background**: Custom canvas-based particle system with mouse interaction and red connection lines
- **Smooth Scroll Navigation**: Seamless navigation between sections with smooth scrolling
- **Responsive Timeline**: Interactive experience timeline with scroll-based animations and color transitions
- **Infinite Scrolling Skills**: Auto-scrolling technology tags in alternating directions
- **Modern Design**: Clean, minimalist design with JetBrains Mono font and dark theme
- **Fully Responsive**: Optimized for all screen sizes

## 🛠️ Built With

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React](https://react.dev/)** - UI component library
- **Canvas API** - For particle network animations
- **CSS Animations** - For smooth transitions and scrolling effects

## 📦 Installation

1. Clone the repository:
```bash
git clone git@github.com:Koundinya9/Portfolio-Website.git
cd Portfolio-Website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
app/
├── components/
│   └── ParticleBackground.tsx  # Global particle animation component
├── page.tsx                     # Main page with all sections
├── layout.tsx                   # Root layout with font + ParticleBackground
└── globals.css                  # Global styles and animations
```

## 🎨 Sections

1. **Landing/Hero** - Animated text cycling through roles with social links
2. **About** - Background, expertise, and key strengths
3. **Education** - Academic credentials and degrees
4. **Experience** - Professional journey with interactive timeline
5. **Projects** - Featured projects with descriptions
6. **Skills** - Technologies with infinite scrolling animation
7. **Contact** - Get in touch section with email link

## 🎯 Key Technical Highlights

### Particle Background System
- 100 particles moving randomly across the screen
- Particles connect when within 150px of each other (blue lines)
- Mouse cursor connects to nearby particles (red lines)
- Fully responsive with window resize handling
- Fixed position covering entire page across all sections

### Timeline Animation
- Scroll-based progress bar that fills with red
- Dates change color when timeline crosses them
- Smooth transitions using `requestAnimationFrame`
- Alternating left/right layout on desktop

### Infinite Scrolling Skills
- 3 rows of technology tags
- Rows scroll in alternating directions (left→right, right→left)
- CSS keyframe animations for seamless infinite loops
- Different speeds for visual variety

## 🚀 Deployment

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## 📝 Customization

- **Colors**: Update in `app/globals.css` and throughout components (red-500, gray-800, etc.)
- **Font**: Change in `app/layout.tsx` (currently JetBrains Mono)
- **Particle Settings**: Adjust in `app/components/ParticleBackground.tsx`:
  - `particleCount`: Number of particles (default: 100)
  - `connectionDistance`: Connection threshold (default: 150px)
- **Content**: Update sections in `app/page.tsx`

---

Built with ❤️ using Next.js and TypeScript
