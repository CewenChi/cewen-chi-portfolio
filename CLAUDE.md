# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### CSS Build & Watch
```bash
# Build CSS once
npm run build:css

# Watch CSS changes for development
npm run dev
# or
npm run watch:css
```

The CSS build process:
1. Runs @dhiwise/component-tagger
2. Processes Tailwind CSS from `css/tailwind.css` to `css/main.css`

## Architecture Overview

### Project Structure
This is a portfolio website built with HTML and Tailwind CSS. The site uses a multi-page architecture with a main landing page and separate detail pages.

### Styling Approach
- **Primary CSS**: The main `index.html` uses inline CSS for custom styling with a minimalist design approach
- **Tailwind CSS**: Available for utility classes, configured in `tailwind.config.js` with custom theme extensions including:
  - Custom color palette (primary, secondary, accent, surface, success, warning, error)
  - Fluid typography sizes
  - Custom font families (Source Sans Pro, Inter, IBM Plex Sans, JetBrains Mono)
  - Custom animations (fade-in, slide-up)
  - Math pattern background image

### Page Organization
- **Main Page**: `index.html` - Contains all primary sections (about, competitions, career timeline, nature gallery, contact)
- **Detail Pages** in `pages/`:
  - Competition details: `amex.html`, `homecredit.html`, `competition_detail_page.html`
  - Section pages: `about_page.html`, `career_timeline_page.html`, `contact_page.html`, `home_page.html`
  - Utility: `loading_page.html`

### Navigation
Fixed navigation bar at the top with anchor links to different sections within the main page. The nav uses smooth scrolling to sections identified by IDs.

### Key Design Elements
- Fixed navigation with subtle shadow
- Horizontal scrolling career timeline
- Clickable competition entries that navigate to detail pages
- Responsive design with mobile-specific adjustments
- Minimalist aesthetic with blue accent colors (#0056b3)