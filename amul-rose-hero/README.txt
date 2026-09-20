Nandini Badam Milk - Interactive 3D Scroll Hero
A tribute to KMF (Karnataka Milk Federation) Nandini's iconic Flavoured Badam Milk.

Open index.html in any modern browser, or upload the folder to any static host (Vercel, Netlify, GitHub Pages).

Features:
1. Procedural 3D Bottle Assembly & Saffron Milk Swirls on scroll.
2. Kashmiri Kesar (Saffron Threads) & Crunchy Almond Flakes (Badam Slivers) particle physics.
3. Interactive Bottle Tap: Tap/Click the chilled bottle for a dynamic badam milk splash and almond crumb burst.
4. Synthesized Audio (Web Audio API): Chilled glass clink and splash sounds.
5. Scrollytelling Progress Rail: Quick navigation between key heritage moments.
6. Bilingual KMF Nandini Branding (Kannada & English).
7. Nutritional Value Modal & Heritage of Karnataka Showcase.
8. Theme Toggle (Warm Saffron / Midnight Royal) & Sound Toggle.

Using your own pre-rendered video frames:
1. Export your 3D video to JPGs inside frames/ :
   ffmpeg -i nandini_badam.mp4 -vf fps=30 frames/frame_%04d.jpg
2. In index.html, set SEQUENCE = { enabled: true, count: <number of frames>, ... }
The canvas then plays your frames on scroll while keeping particles, splash, and tags active.
