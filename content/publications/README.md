# Publications Workflow

Publications are individual HTML pages under `publications/`.

## Add a new publication

1. Duplicate one of the existing publication pages in `publications/`.
2. Update title, date, tags, excerpt, and body copy.
3. Add a metadata record in `js/publications-data.js`.

The main `publications.html` page and related-post widgets render from `js/publications-data.js`, so new entries appear automatically once the dataset is updated.

## Related posts on pillar pages

- `safety.html`, `sustainability.html`, and `ethics.html` each load:
  - `js/publications-data.js`
  - `js/publications-related.js`
- These scripts render the latest two publications for the page's pillar.
