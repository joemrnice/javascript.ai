/**
 * site-data.js
 * Single source of truth for navigation + search index.
 * Add a new lesson? Add one object here and it appears in the
 * sidebar, the search box, and the category grids automatically.
 */
window.SITE_NAV = [
  {
    label: 'Fundamentals',
    items: [
      { title: 'Variables & Data Types', href: 'pages/fundamentals/variables-types.html', desc: 'var/let/const, primitives vs. objects, type coercion, typeof quirks.' },
      { title: 'Functions, Scope & Closures', href: 'pages/fundamentals/functions-closures.html', desc: 'Declarations vs expressions, arrow functions, lexical scope, closures.' },
      { title: 'Objects & Arrays', href: 'pages/fundamentals/objects-arrays.html', desc: 'Object model, destructuring, spread/rest, array methods that matter.' },
    ]
  },
  {
    label: 'Core mechanics',
    items: [
      { title: 'The this Keyword', href: 'pages/advanced/this-keyword.html', desc: 'How this is bound at call-time — and where it breaks.' },
      { title: 'Prototypes & OOP', href: 'pages/advanced/prototypes-oop.html', desc: 'Prototype chain, classes, inheritance, composition.' },
      { title: 'Execution Context & Event Loop', href: 'pages/advanced/event-loop.html', desc: 'Call stack, Web APIs, microtasks vs macrotasks, rendering.' },
    ]
  },
  {
    label: 'Async JavaScript',
    items: [
      { title: 'Promises & async/await', href: 'pages/async/promises-async-await.html', desc: 'Callback hell to promises to async/await, error handling, concurrency.' },
    ]
  },
  {
    label: 'Modules & Ecosystem',
    items: [
      { title: 'ESM vs CommonJS', href: 'pages/modules/esm-vs-commonjs.html', desc: 'import/export, dynamic import, interop, bundlers.' },
      { title: 'Modern JS & The Ecosystem', href: 'pages/modules/modern-js-ecosystem.html', desc: 'ES2015–ES2024 features, TypeScript, frameworks, runtimes, tooling.' },
    ]
  },
  {
    label: 'Browser',
    items: [
      { title: 'DOM & Events', href: 'pages/dom/dom-events.html', desc: 'Selecting, updating, delegation, custom events, performance.' },
    ]
  },
  {
    label: 'Interview Prep',
    items: [
      { title: 'Interview Questions', href: 'interview-questions.html', desc: '60+ questions across every topic, with real answers.' },
      { title: 'Coding Challenges', href: 'pages/practice/coding-challenges.html', desc: 'debounce, curry, deep clone, EventEmitter, Promise.all, and more — solved.' },
    ]
  },
  {
    label: 'Build',
    items: [
      { title: 'Projects', href: 'projects.html', desc: 'Four practical builds, from a todo app to a mini virtual DOM.' },
    ]
  },
];

// Flat index for search
window.SITE_SEARCH_INDEX = window.SITE_NAV.flatMap(group =>
  group.items.map(item => ({ ...item, group: group.label }))
);
