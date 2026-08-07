/**
 * repl.js — the homepage's live console.
 * Runs whatever the visitor types through a real JS engine (Function
 * constructor, same-origin, no eval of surrounding scope) and mirrors
 * console.log/warn/error into the on-page terminal.
 */
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('replInput');
  const log = document.getElementById('replLog');
  const runBtn = document.getElementById('replRun');
  if (!input || !log) return;

  function printLine(text, cls = '') {
    const line = document.createElement('div');
    line.className = 'output__line ' + cls;
    line.textContent = text;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  }

  function stringify(v) {
    if (typeof v === 'string') return v;
    try { return JSON.stringify(v, null, 0); } catch { return String(v); }
  }

  function run() {
    const src = input.value.trim();
    if (!src) return;
    const echo = document.createElement('div');
    echo.className = 'output__line';
    echo.innerHTML = '<span style="color:var(--amber)">&gt;</span> ' + src.replace(/</g, '&lt;');
    log.appendChild(echo);

    const captured = [];
    const fakeConsole = {
      log: (...a) => captured.push({ t: a.map(stringify).join(' '), e: false }),
      warn: (...a) => captured.push({ t: a.map(stringify).join(' '), e: false }),
      error: (...a) => captured.push({ t: a.map(stringify).join(' '), e: true }),
    };

    try {
      const fn = new Function('console', `"use strict"; return (function(){ ${src} })()`);
      const result = fn(fakeConsole);
      captured.forEach(c => printLine(c.t, c.e ? 'err' : ''));
      if (result !== undefined) printLine('⇒ ' + stringify(result));
      if (!captured.length && result === undefined) printLine('⇒ undefined');
    } catch (err) {
      printLine(err.message, 'err');
    }
    log.scrollTop = log.scrollHeight;
  }

  runBtn?.addEventListener('click', run);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey || !e.shiftKey)) {
      if (e.shiftKey) return; // allow shift+enter for newline
      e.preventDefault();
      run();
    }
  });
});
