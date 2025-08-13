# CodeBloodedMama Portfolio — Next.js 14 + Tailwind + Framer Motion

## Install
```bash
npm install
npm run dev
```

## Update content
- `content/da.json`, `content/en.json`
- `content/projects.json` (images in `/public/projects/`)
- Blog posts: `content/blog/*.md`
- Hero image: `/public/hero-fullbody.jpg`
- PDF: `/public/Elisabeth_Lennert_CV.pdf`

## Checklists
**New Project**
1. Add object to `content/projects.json`
2. Add image to `/public/projects/<slug>.jpg`
3. (Optional) Add markdown `/content/projects/<slug>.md`
4. Test locally → push → deploy

**New Blog Post**
1. Create `content/blog/<slug>.md` with frontmatter
2. (Optional) Add hero image in `/public/blog/`
3. Test → push → deploy
