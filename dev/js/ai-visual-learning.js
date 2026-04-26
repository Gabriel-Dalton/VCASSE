(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initFootnoteHighlight();
    document.querySelectorAll('.ai-visualization').forEach((el) => {
      const type = el.getAttribute('data-viz');
      if (type === 'llm') drawTokenFlow(el);
      if (type === 'nn') drawNeuralNet(el);
      if (type === 'cnn') drawCnnGrid(el);
      if (type === 'attention') drawAttention(el);
      if (type === 'embeddings') drawEmbeddings(el);
      if (type === 'safety') drawSafetyGauge(el);
    });
  });

  function initFootnoteHighlight() {
    document.querySelectorAll('.footnote-ref').forEach((ref) => {
      ref.addEventListener('click', () => {
        const id = ref.getAttribute('href');
        if (!id) return;
        requestAnimationFrame(() => {
          const target = document.querySelector(id);
          if (!target) return;
          target.classList.add('footnote-hit');
          setTimeout(() => target.classList.remove('footnote-hit'), 1200);
        });
      });
    });
  }

  function dot(parent, x, y, cls = 'ai-viz-dot') {
    const n = document.createElement('span');
    n.className = cls;
    n.style.left = `${x}%`;
    n.style.top = `${y}%`;
    parent.appendChild(n);
    return n;
  }

  function line(parent, x, y, width, deg) {
    const n = document.createElement('span');
    n.className = 'ai-viz-line';
    n.style.left = `${x}%`;
    n.style.top = `${y}%`;
    n.style.width = `${width}%`;
    n.style.transform = `rotate(${deg}deg)`;
    parent.appendChild(n);
  }

  function pulse(el, delay = 0) {
    let active = false;
    setInterval(() => {
      active = !active;
      el.style.transform = active ? 'scale(1.4)' : 'scale(1)';
      el.style.opacity = active ? '1' : '0.7';
    }, 900 + delay);
  }

  function drawTokenFlow(el) {
    const dots = [dot(el, 8, 40), dot(el, 27, 40), dot(el, 46, 40), dot(el, 65, 40), dot(el, 84, 40)];
    dots.slice(0, -1).forEach((d, i) => line(el, 11 + i * 19, 45, 18, 0));
    dots.forEach((d, i) => pulse(d, i * 70));
  }

  function drawNeuralNet(el) {
    const left = [20, 40, 60, 80].map((y) => dot(el, 12, y));
    const mid = [25, 50, 75].map((y) => dot(el, 48, y));
    const right = [35, 65].map((y) => dot(el, 82, y));
    left.forEach((l) => mid.forEach((m) => line(el, 15, parseFloat(l.style.top) + 3, 34, (parseFloat(m.style.top) - parseFloat(l.style.top)) * 0.35)));
    mid.forEach((m) => right.forEach((r) => line(el, 51, parseFloat(m.style.top) + 3, 29, (parseFloat(r.style.top) - parseFloat(m.style.top)) * 0.45)));
    [...left, ...mid, ...right].forEach((d, i) => pulse(d, i * 50));
  }

  function drawCnnGrid(el) {
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const b = document.createElement('span');
        b.style.position = 'absolute';
        b.style.left = `${12 + c * 11}%`;
        b.style.top = `${18 + r * 13}%`;
        b.style.width = '9%';
        b.style.height = '10%';
        b.style.background = `rgba(13,79,139,${0.12 + ((r + c) % 4) * 0.12})`;
        b.style.borderRadius = '2px';
        el.appendChild(b);
      }
    }
    const filter = document.createElement('span');
    filter.style.position = 'absolute';
    filter.style.left = '12%';
    filter.style.top = '18%';
    filter.style.width = '31%';
    filter.style.height = '34%';
    filter.style.border = '2px solid var(--primary-light)';
    filter.style.borderRadius = '6px';
    el.appendChild(filter);

    let x = 12;
    setInterval(() => {
      x = x > 56 ? 12 : x + 11;
      filter.style.left = `${x}%`;
    }, 700);
  }

  function drawAttention(el) {
    const base = [12, 28, 44, 60, 76].map((x) => dot(el, x, 70));
    base.forEach((d, i) => {
      const l = document.createElement('span');
      l.className = 'ai-viz-line';
      l.style.left = '44%';
      l.style.top = '35%';
      l.style.width = `${18 + i * 4}%`;
      l.style.transform = `rotate(${-35 + i * 18}deg)`;
      l.style.opacity = `${0.2 + i * 0.13}`;
      el.appendChild(l);
    });
    dot(el, 46, 30);
    base.forEach((d, i) => pulse(d, i * 60));
  }

  function drawEmbeddings(el) {
    for (let i = 0; i < 18; i++) {
      const d = dot(el, 8 + Math.random() * 84, 12 + Math.random() * 74);
      d.style.background = i < 9 ? '#0d4f8b' : '#1f8a6b';
      d.style.width = '10px';
      d.style.height = '10px';
    }
  }

  function drawSafetyGauge(el) {
    const bars = ['Bias', 'Safety', 'Energy'].map((_, i) => {
      const wrap = document.createElement('div');
      wrap.style.position = 'absolute';
      wrap.style.left = `${12 + i * 28}%`;
      wrap.style.bottom = '14%';
      wrap.style.width = '18%';
      wrap.style.height = '60%';
      wrap.style.border = '1px solid rgba(13,79,139,0.2)';
      wrap.style.borderRadius = '8px';
      const fill = document.createElement('span');
      fill.style.position = 'absolute';
      fill.style.left = '0';
      fill.style.bottom = '0';
      fill.style.width = '100%';
      fill.style.height = '35%';
      fill.style.background = i === 2 ? '#8a4a8a' : '#0d4f8b';
      fill.style.opacity = '0.75';
      wrap.appendChild(fill);
      el.appendChild(wrap);
      return fill;
    });

    let tick = 0;
    setInterval(() => {
      tick += 1;
      bars.forEach((bar, i) => {
        const height = 28 + ((tick * (i + 1) * 7) % 48);
        bar.style.height = `${height}%`;
      });
    }, 650);
  }
})();
