/**
 * main.js — small, dependency-free interactive behaviors.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Copy-to-clipboard on every code block
  document.querySelectorAll('.code').forEach(block => {
    const btn = block.querySelector('.code__copy');
    const codeEl = block.querySelector('code');
    if (!btn || !codeEl) return;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(codeEl.innerText);
        const original = btn.textContent;
        btn.textContent = 'copied';
        setTimeout(() => (btn.textContent = original), 1400);
      } catch {
        btn.textContent = 'select + ⌘C';
      }
    });
  });

  // Interview-question / FAQ accordions
  document.querySelectorAll('.qa__q').forEach(q => {
    q.addEventListener('click', () => {
      q.closest('.qa').classList.toggle('is-open');
    });
  });

  // "Expand all" / "Collapse all" controls, if present
  document.querySelectorAll('[data-expand-all]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.qa').forEach(qa => qa.classList.add('is-open'));
    });
  });
  document.querySelectorAll('[data-collapse-all]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.qa').forEach(qa => qa.classList.remove('is-open'));
    });
  });

  // Tag-based filter for interview questions / challenges
  const filterBar = document.getElementById('tagFilter');
  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-tag]');
      if (!btn) return;
      filterBar.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.dataset.tag;
      document.querySelectorAll('[data-tags]').forEach(el => {
        const tags = el.dataset.tags.split(',');
        el.style.display = (tag === 'all' || tags.includes(tag)) ? '' : 'none';
      });
    });
  }
});
