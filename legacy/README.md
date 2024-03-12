# cv-gen - a simple résumé builder & microsite

Will be expanded further soon.

## Getting started

### Start development instance for display app

```
npm install
npm run start
```

### Developing builder app

```
cd builder-app
npm install
npm run dev
```

### Building

This will build both the display and builder app. Builder app is statically-built with SSG.

```
npm run build
```

## Self-hosting

To be expanded.

## To-do

- [ ] Combine viewer app and builder app into one unified Svelte app.
- [ ] Contact icon selector
- [x] Dynamically populate resume with externally-hosted JSON
- [x] Side-by-side resume editor with JSON export
- [ ] Dynamically populate site metadata (title, description, favicon, etc)
- [x] Themeing on viewer microsite. Schema will need to be compatible with all themes.
- [ ] Themeing on Builder
- [ ] Multiple themes, theme selection function.
- [ ] Background customization.
- [x] import existing JSON to update editor state
- [x] build/dev script that copies per-theme css files to dist folder
