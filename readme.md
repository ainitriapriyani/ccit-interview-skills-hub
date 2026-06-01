# CCIT Interview Skills Hub

A premium educational website built for a university Professional Ethics and Career Preparation course. It provides structured learning materials on job interview skills for students entering the workforce.

## Overview

The site covers five core topics:
1. The Importance of Interviewing Skills
2. The Importance of Job Interviews
3. Types of Job Interviews
4. Stages in an Interview
5. Strengths and Weaknesses When Facing an Interview

## Key Features

- Sticky navbar with dropdown menu for Learning Materials sections
- Dark mode toggle (persists via localStorage)
- Search functionality across all learning topics
- Smooth scroll reveal animations
- Sidebar navigation with reading progress indicator
- Interactive hover cards (glassmorphism style)
- Floating hero illustration with animated cards
- Animated stat counters
- Back-to-top button
- Fully responsive mobile layout
- Professional footer

## Technology

- **HTML5** — semantic structure across 4 pages
- **CSS3** — custom properties, grid, flexbox, glassmorphism, animations
- **JavaScript (vanilla)** — dark mode, search, scroll animations, counters

No frameworks, build tools, or dependencies required.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home — hero, topic overview, stats, CTA |
| `about.html` | About — mission, values, learning objectives |
| `team.html` | Team — member profiles, project process |
| `learning-materials.html` | All 5 learning modules with sidebar nav |

## Running Locally

Open any HTML file directly in a browser — no server required. For best results with Google Fonts loading, serve over HTTP:

```bash
# Python
python3 -m http.server 8080
# then open http://localhost:8080
```

## Design

- Color palette: Navy (#0a1628), Royal Blue (#2563eb), Gold (#f59e0b), White
- Typography: Playfair Display (headings) + DM Sans (body) + DM Mono (labels/code)
- Style: Professional academic with glassmorphism cards, subtle animations
