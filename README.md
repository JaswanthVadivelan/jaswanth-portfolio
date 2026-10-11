# Jaswanth V. — Personal Portfolio Website

A modern, production-grade personal developer portfolio built with **Angular 22**, **Tailwind CSS 4**, and **SCSS**.

---

## 🌟 Overview

- **Name:** Jaswanth V.
- **Title:** Full-stack Software Developer
- **Location:** Chennai, Tamil Nadu, India
- **Company:** ProdXP.ai
- **Domain Focus:** Manufacturing Execution Systems (MES), Full-stack Web Applications, Django REST, Angular, PostgreSQL, AWS, Functional Testing, AI & Robotics.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v20+ (v24.x recommended)
- **npm**: v10+

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Run Dev Server
```bash
npm start
```
Open **`http://localhost:4200/`** in your browser. The app will automatically reload if you change any source files.

---

## 📦 Production Build

To build the production bundle:
```bash
npm run build
```
The compiled output is placed in the `dist/jaswanth-portfolio/browser` directory.

To build with a relative base-href (ready for GitHub Pages or static hosting):
```bash
npm run build:gh-pages
```

---

## 📄 Adding Your Resume PDF

1. Place your official resume PDF in:
   ```
   public/assets/documents/Jaswanth_V_Resume.pdf
   ```
2. When this file exists, the website's **Download Resume** button automatically enables direct downloading.

---

## 🌐 Publishing to GitHub Pages (When Ready)

When you are ready to publish the website live to the internet:

1. **Create a Public Repository on GitHub**:
   - Go to [GitHub New Repository](https://github.com/new) on your account (`JaswanthVadivelan`).
   - Name it `portfolio-me` (or `jaswanthvadivelan.github.io`).

2. **Initialize Git and Push**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial production portfolio"
   git branch -M main
   git remote add origin https://github.com/JaswanthVadivelan/portfolio-me.git
   git push -u origin main
   ```

3. **Enable GitHub Pages in Repository Settings**:
   - In your repository on GitHub, navigate to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
   - The included workflow in `.github/workflows/deploy.yml` will automatically build and publish your portfolio at:
     👉 `https://jaswanthvadivelan.github.io/portfolio-me/`

---

## 🏗️ Project Architecture

```
portfolio-me/
├── .github/workflows/deploy.yml     # Automated GitHub Pages CI/CD
├── public/
│   ├── assets/
│   │   ├── images/                  # Authentic portrait & visual assets
│   │   └── documents/               # Resume PDF placement location
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── core/models/             # Strict TypeScript data models
│   │   ├── core/services/           # Scroll-spy & viewport services
│   │   ├── data/                    # Single source of truth for all content
│   │   ├── features/                # Semantic feature sections:
│   │   │   ├── hero/                # Hero + portrait + 3D card tilt
│   │   │   ├── about/               # About narrative & pillars
│   │   │   ├── skills/              # 6 categorized skill domains
│   │   │   ├── experience/          # ProdXP.ai, SMTP Groups, Monolith timeline
│   │   │   ├── projects/            # MES, AI Robotic Arm, Shogun Run
│   │   │   ├── architecture/        # Conceptual 5-stage MES workflow
│   │   │   ├── achievements/        # 5 verified honors & distinctions
│   │   │   ├── education/           # B.Tech (8.5 CGPA), HSC, SSLC
│   │   │   ├── resume/              # Resume download & LinkedIn connection
│   │   │   └── contact/             # LinkedIn & GitHub direct contact
│   │   ├── layout/                  # Navbar & Footer
│   │   └── app.ts                   # Root standalone component
│   ├── styles.scss                  # Tailwind CSS 4 & design tokens
│   └── index.html                   # SEO & Open Graph meta tags
└── README.md
```

