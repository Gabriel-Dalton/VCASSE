# Publications Workflow

Publications are individual HTML pages under `publications/`.

## Two publishing modes

### 1) Full publication (policy briefs, explainers)

1. Duplicate one of the existing publication pages in `publications/`.
2. Update title, date, tags, excerpt, and body copy.
3. Add a metadata record in `js/publications-data.js` with `type: "publication"` and a `url` to the HTML page.
4. The `publications.html` page will auto-render it under the right pillar.

### 2) Rapid briefing (latest AI news, policy updates)

1. Add one metadata record in `js/publications-data.js` with:
   - `type: "news"`
   - `title`, `date`, `pillar`, `excerpt`
   - optional `source` and `externalUrl`
2. Publish. It appears automatically in the **AI news and policy updates** section.

## Data model reference (`js/publications-data.js`)

```js
{
  type: 'publication' | 'news',
  title: 'string',
  pillar: 'safety' | 'sustainability' | 'ethics',
  tags: ['Tag 1', 'Tag 2'],
  date: 'YYYY-MM-DD',
  excerpt: 'string',
  readingTime: '7 min read', // publication only
  url: 'publications/my-page.html', // publication only
  source: 'VCASSE Desk Briefing', // news optional
  externalUrl: 'https://...', // news optional
}
```

## Related posts on pillar pages

- `safety.html`, `sustainability.html`, and `ethics.html` each load:
  - `js/publications-data.js`
  - `js/publications-related.js`
- These scripts render the latest two full publications for the page's pillar (`type: "publication"`).
