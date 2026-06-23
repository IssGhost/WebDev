# LaunchLine Websites — Template Showcase

A Railway-ready React/Vite sales site for showcasing three website options:

- Beginner
- Intermediate
- Pro

This is built to act as the main sales page when pitching websites to businesses.

## Fixed Railway blocked-host issue

This project includes `vite.config.js` with:

```js
preview.allowedHosts = [
  "webdev-production-e888.up.railway.app",
  ".up.railway.app",
  ".railway.app"
]
```

## Local run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Railway

Railway should use `railway.toml` automatically.

```txt
Build Command: npm run build
Start Command: npm start
```

## Customize

Primary files:

```txt
src/main.jsx
src/styles.css
```

Update:
- Brand name
- Contact email
- Package prices
- Portfolio links
- Screenshots/examples
