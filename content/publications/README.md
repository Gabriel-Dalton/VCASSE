# Publications Workflow

Publications are individual HTML pages under `publications/`.

## Add a new publication

1. Duplicate one of the existing publication pages in `publications/`.
2. Update title, date, tags, excerpt, and body copy.
3. Add a card to `publications.html` pointing to the new page.
4. Add a metadata record in `js/publications-data.js` so related-post widgets can include it.

## Related posts on pillar pages

- `research-safety.html`, `sustainability.html`, and `research-ethics.html` each load:
  - `js/publications-data.js`
  - `js/publications-related.js`
- These scripts render the latest two publications for the page's pillar.
