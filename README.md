# Sonie E — Premium Cloud DevOps Portfolio

This is a modern, premium, glassmorphic, and fully responsive personal portfolio website designed for **Sonie E** — a Cloud DevOps Engineer with 6+ years of experience. Built with semantic HTML5, clean vanilla CSS3, and modern ES6+ JavaScript, it requires no build steps and is immediately hostable on any static web hosting provider (such as GitHub Pages or Netlify).

## Features

- **Responsive Layout**: Fluid designs catering to Large Desktop, Laptop, Tablet, and Mobile viewport breakpoints.
- **Dark & Light Modes**: Seamless theme toggler with persistent settings using the browser's local storage database.
- **Dynamic Typing Effect**: Cycles through professional roles on the Hero landing screen.
- **Scroll Reveal Animations**: Smooth entry effects driven by performance-friendly Intersection Observer APIs.
- **Interactive Project Showcase**: Dynamic filtering of case studies by technology group and detailed popup modals with architecture details, key features, and challenges solved.
- **Observed Counters & Progress Bars**: Stats and skill meters that animate dynamically as they are scrolled into view.
- **Responsive Timelines**: Experience and education logs formatted into alternating or left-aligned node trees depending on screen widths.
- **Integrated Contact Form**: Uses Formspree for immediate serverless email collection with a local `mailto:` fallback.
- **Search Engine Optimized**: Out-of-the-box SEO titles, meta descriptions, Open Graph protocols, canonical tags, and JSON-LD structured Person schema metadata.

---

## File and Folder Structure

```
My Portfolio/
├── index.html                  # Core HTML structure and resume data
├── style.css                   # Custom CSS variables, components, and animations
├── script.js                   # Interactivity, sliders, modals, and observers
├── README.md                   # Setup, editing, and deployment documentation
├── assets/
│   ├── images/
│   │   ├── profile/
│   │   │   └── profile-placeholder.png   # Profile photo (500x500px recommended)
│   │   ├── certifications/
│   │   │   └── cert-badge-placeholder.png # Badges displayed next to credentials
│   │   ├── github/
│   │   │   └── contribution-graph-placeholder.png # Contribution history snapshot
│   │   ├── backgrounds/
│   │   │   └── hero-bg.png               # Abstract network/grid background banner
│   │   └── projects/
│   │       ├── project-1/
│   │       │   ├── screenshot-placeholder.png   # Dashboard/UI view
│   │       │   └── architecture-placeholder.png # EKS/Workflow diagram
│   │       └── ...
│   └── resume/
│       └── Resume.pdf          # Downloadable PDF resume (user-provided)
```

---

## Getting Started

### 1. View Locally
You can preview the website instantly by opening `index.html` in any web browser, or by serving it from a local development environment.
- Using VS Code: Right-click `index.html` and choose **Open with Live Server**.
- Using Node.js:
  ```bash
  npx serve ./
  ```

### 2. Update Content

#### A. Basic Info & Resume Download
- Open `index.html` and search for the comment `<!-- EDIT: ... -->` to modify usernames, social URLs, or text labels.
- Replace `assets/resume/Resume.pdf` with your actual PDF resume. Keep the filename as `Resume.pdf` or update the download path in the Hero section anchor:
  ```html
  <a href="assets/resume/Resume.pdf" download="Sonie_E_Resume.pdf" class="btn btn-primary">
  ```

#### B. Profile & Project Images
- Replace the placeholder files under `assets/images/` with your actual image files. Recommended configurations:
  - **Profile Avatar**: `assets/images/profile/profile-placeholder.png` — 500×500px crop.
  - **Hero Banner**: `assets/images/backgrounds/hero-bg.png` — 1920×1080px abstract or dark mesh.
  - **Project Views**: `assets/images/projects/project-N/screenshot-placeholder.png` — 800×500px dashboard/UI grab.
  - **Architecture Details**: `assets/images/projects/project-N/architecture-placeholder.png` — 800×500px topology layout.

#### C. Configure the Contact Form
1. Go to [Formspree](https://formspree.io/) and create a free account.
2. Create a new form target (e.g., "DevOps Portfolio Form") and copy the unique Form ID.
3. Open `index.html`, search for `formspree.io`, and replace `YOUR_FORM_ID` with your Form ID:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" id="contact-form">
   ```
4. Save the file. When users submit the form, inputs will write straight to your email. If not configured, the website automatically falls back to opening a pre-filled `mailto:` trigger in the user's default mail application.

---

## Modifying Sections (Adding New Items)

The codebase is highly modular. Clear HTML comments outline where blocks begin and end.

### How to Add a New Project
1. Open `index.html` and find `<!-- PROJECTS SECTION START -->`.
2. Duplicate any existing project card `<div class="glass-card project-card" ...>` block and place it before the `<!-- ADD NEW PROJECT CARD HERE -->` marker.
3. Modify:
   - `data-category`: Space-separated filter tags (e.g., `devops aws monitoring`).
   - Image source tags.
   - Text values inside headers and tags.
   - The `<div class="project-details-payload" style="display: none;">` sub-block. The modal uses this payload to dynamically fill out information when a user clicks the card. Fill in descriptive values inside the `data-*` spans (client name, features, challenges).

---

## Customizing Design & Themes

You can customize the styling of the website directly via `style.css` without digging through deep layouts.

### Adjusting Colors (CSS Variables)
To change the color scheme, open `style.css` and edit the variable tokens under `:root` (for Dark Mode) and `[data-theme="light"]` (for Light Mode).
For example, to swap the primary Indigo accent to a Teal palette:
```css
:root {
  --accent-primary: #0ea5e9; /* Light blue/teal */
  --accent-secondary: #0d9488; /* Teal */
  --accent-gradient: linear-gradient(135deg, #0ea5e9, #0d9488, #2dd4bf);
}
```

---

## Deployment

The portfolio is structured for static hosting. The easiest target is **GitHub Pages**:

1. Create a new repository on GitHub (e.g., `portfolio`).
2. Initialize Git, stage all files, commit them, and link your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/your-username/portfolio.git
   git push -u origin main
   ```
3. Go to the repository settings page on GitHub.
4. Click on **Pages** in the left sidebar menu.
5. In the **Build and deployment** section, select **Deploy from a branch** under Source, select the `main` branch, and click **Save**.
6. Within a minute, your portfolio will be live at `https://your-username.github.io/portfolio/`!

---

## License

This project is open-source and free to use under the [MIT License](LICENSE). Customize it to your heart's content!
