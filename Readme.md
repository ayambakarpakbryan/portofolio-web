Matthew Nazim Umar Syarif — Portfolio

A dark-mode, animation-heavy personal portfolio website built with plain HTML, CSS, and JavaScript (no framework, no build step). Inspired by the visual language of Apple, Linear, and Vercel: glassmorphism, subtle gradients, and motion that responds to scroll and cursor.

Live sections: Hero · About · Skills · Projects · Certifications · Experience · Testimonials · Contact

Features
Custom cursor with magnetic buttons and hover states (desktop only)
Animated page loader, scroll-reveal transitions, and a scroll progress bar
Draggable / swipeable project carousel with arrow navigation and a screenshot lightbox
Click-to-expand case study modals for each project
Skill bars, stat counters, and tilt-on-hover cards, all animated on scroll
Working download links for resume and certificates (PDF)
A "Now Playing" widget with real audio playback (play/pause, looping, volume control)
Fully responsive, down to small mobile screens
Tech Stack
HTML5 — semantic structure, no templating engine
CSS3 — custom properties (design tokens), Grid/Flexbox, CSS animations
Vanilla JavaScript — no dependencies, no bundler required
Project Structure
matthew-portfolio/
├── index.html              # All page markup and content
├── style.css                # All styling, animations, and responsive rules
├── script.js                 # All interactivity (carousel, modal, cursor, audio, etc.)
├── README.md
└── assets/
    ├── matthew.jpeg          # Hero profile photo
    ├── album-art.png         # "Now Playing" cover art
    ├── now-playing.mp3       # "Now Playing" audio track
    ├── CV_Matthew_Nazim.pdf  # Downloadable resume
    ├── cert-data-analyst.pdf # Certificate: Data Analyst Bootcamp (Karirnex)
    ├── cert-excel.pdf        # Certificate: Microsoft Excel Bootcamp (Karirnex)
    ├── icon-github.png       # Footer social icon
    └── icon-linkedin.png     # Footer social icon
Running Locally


Drag the whole matthew-portfolio folder into Netlify Drop or a similar static host (Vercel, GitHub Pages, Cloudflare Pages) no configuration needed.

Customizing
Content all text lives directly in index.html.
Project case studies & lightbox screenshots — edit the data and shots objects near the top of script.js.
Colors / spacing / fonts edit the CSS custom properties in the :root block at the top of style.css.
Replacing an asset swap the file in assets/ with the same filename, or update the src/href reference in index.html / script.js.
Author

Matthew Nazim Umar Syarif Information Systems student at President University · Data Analyst & Backend Developer GitHub · LinkedIn
