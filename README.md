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

- [ ] Contact icon selector 
- [x] Dynamically populate resume with externally-hosted JSON
- [ ] Side-by-side resume editor with JSON export
- [ ] Dynamically populate site metadata (title, description, favicon, etc)
- [x] Theming. Schema will need to be compatible with all themes.
- [ ] Multiple themes, theme selection function.
- [ ] Background customization.
- [ ] import existing JSON to update editor state
- [x] build/dev script that copies per-theme css files to dist folder
