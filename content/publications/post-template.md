# Publication Template

Use this template when adding a new publication to `js/publications-data.js`.

## 1) Copy this object into `window.VCASSE_PUBLICATIONS`

```js
{
  slug: 'short-kebab-case-slug',
  title: 'Clear publication title',
  pillar: 'safety', // or 'sustainability' | 'ethics'
  tags: ['Tag One', 'Tag Two', 'Tag Three'],
  date: 'YYYY-MM-DD',
  author: 'Team or Author Name',
  readingTime: '6 min read',
  excerpt: 'One-sentence summary shown on cards and previews.',
  featured: false, // set true for homepage feature candidates
  content: `
    <p>Paragraph 1...</p>
    <p>Paragraph 2...</p>
    <p>Paragraph 3...</p>
  `
}
```

## 2) Publishing checklist

- Keep `slug` unique.
- Keep `pillar` exactly one of: `safety`, `sustainability`, `ethics`.
- Use 2-5 tags.
- Ensure `date` is valid ISO format (`YYYY-MM-DD`).
- Keep excerpt under ~170 characters for cleaner cards.

## 3) Where it appears

- `publications.html` (full listing + filters)
- `publication-post.html?slug=<slug>` (full article page)
- `index.html` blog section (one featured post per pillar)
