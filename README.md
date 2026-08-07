# javascript.ai

A practical, deep-dive JavaScript reference — open source, dependency-free, and built to be forked.

**[Live demo →](./index.html)** (open `index.html` locally, or deploy to GitHub Pages — see below)

## What this is

Most JavaScript references either explain the spec (MDN — excellent, but reference-dense) or teach syntax without depth (most tutorial sites). `javascript.ai` tries to sit in between: every lesson pairs a practical explanation with runnable code, closes with the exact interview questions that get asked about that topic, and links out to the primary sources (MDN, ECMA-262) rather than duplicating them.

- **13 in-depth lessons** — fundamentals through internals (closures, prototypes, the event loop), async, ESM vs CommonJS, the modern ecosystem (TypeScript, frameworks, runtimes, build tools), and the DOM.
- **60+ interview questions** — categorized and filterable, including "predict the output" gotchas.
- **10 solved coding challenges** — debounce, throttle, curry, deep clone, a custom `EventEmitter`, a hand-rolled `Promise.all`, and more.
- **4 projects** — a live todo app, a live debounce/throttle lab, and full guided walkthroughs for building your own Promise and a minimal virtual DOM.

No build step. No framework. No dependencies. Plain HTML, CSS, and JavaScript that runs by opening a file in a browser.

## Project structure

```
javascript.ai/
├── index.html                     # Homepage — hero, live console, curriculum grid
├── interview-questions.html       # 60+ Q&A, filterable by category
├── projects.html                  # 4 projects (2 live demos, 2 guided builds)
├── css/
│   └── style.css                  # The entire design system: tokens, layout, components
├── js/
│   ├── site-data.js                # ⭐ Single source of truth for nav + search — edit this to add a page
│   ├── include.js                  # Renders the topbar/sidebar from site-data.js on every page
│   ├── main.js                     # Copy-code buttons, Q&A accordions, tag filters
│   └── repl.js                     # The homepage's live, sandboxed JS console
└── pages/
    ├── fundamentals/               # Variables, functions/closures, objects/arrays
    ├── advanced/                   # this, prototypes/OOP, event loop
    ├── async/                      # Promises & async/await
    ├── modules/                    # ESM vs CommonJS, modern JS & ecosystem
    ├── dom/                        # DOM & events
    └── practice/                   # Coding challenges
```

## Adding a new lesson

1. Create the HTML file under the right `pages/<category>/` folder. Copy the `<head>`/shell markup from any existing lesson page (topbar mount, sidebar mount, `content__inner` wrapper) and write your content inside `.content__inner`.
2. Set `window.SITE_ROOT` near the bottom of the file to the correct relative path back to the repo root (`../../` for anything two folders deep, `./` for root-level pages).
3. Add one entry to the relevant group in `js/site-data.js`:
   ```js
   { title: 'Your Lesson Title', href: 'pages/category/your-file.html', desc: 'One-line description.' }
   ```
   That's it — it now appears in the sidebar, the search box, and the homepage curriculum grid automatically.
4. Reuse the existing CSS components: `.code` for code blocks (with the copy button built in), `.callout` / `.callout.tip` / `.callout.warn` for asides, `.qa` for interview-question accordions, `.grid` + `.card` for link grids.

## Design system

The visual language leans into the subject: an ink-and-amber palette (nodding to JavaScript's own yellow without literally using it), JetBrains Mono for headings/code/nav to keep the "this is a programming reference" feel, and a signature `console.log()`-styled eyebrow label used consistently as a structural device. The homepage's live console isn't decorative — it's a real, sandboxed JS evaluator (`js/repl.js`) that runs whatever you type.

## Running locally

No build step required:

```bash
# Any static file server works, e.g.:
npx serve .
# or
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this repo to GitHub as `javascript.ai`.
2. Go to **Settings → Pages**.
3. Under "Build and deployment," select **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Your site will be live at `https://joemrnice.github.io/javascript.ai/`.

## Contributing

This is meant to be a living, community-maintained reference. Ideas for pull requests:
- New lessons (generators/iterators, `Proxy`/`Reflect`, `Intl`, Web Components, testing, performance profiling, security fundamentals).
- More coding challenges or a fifth project.
- Corrections — if a claim is wrong or a spec detail is stale, open an issue.

## License

MIT — see [LICENSE](./LICENSE). Not affiliated with MDN or Mozilla; built to complement, not replace, the primary documentation.
