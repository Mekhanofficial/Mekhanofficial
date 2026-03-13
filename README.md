# Mekhanofficial Portfolio

Modern portfolio website for **Melvin Okievor** built with Next.js, featuring:
- interactive hero section
- project showcase with rich animations
- theme toggle (light/dark)
- contact form with email delivery
- responsive desktop/mobile experience

## Live Profile
- GitHub: https://github.com/Mekhanofficial
- LinkedIn: https://linkedin.com/in/mekhano
- Email: melvinokievor@gmail.com

## Tech Stack
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Next Themes
- Nodemailer

## Project Highlights
- **Hero Section**  
  Dynamic intro animation, sound interaction, stack carousel, and reveal UX.
- **Projects Section**  
  Full-width project blocks with alternating layout, hover effects, tech chips, and live/code links.
- **Contact Flow**  
  Header contact form posts to API route and sends mail via Gmail SMTP (Nodemailer).

## Folder Structure
```text
app/
  layout.tsx
  page.tsx
  api/SendEmail.ts

components/
  layout/
    Header.tsx
    Footer.tsx
    Layout.tsx
  sections/
    Hero.tsx
    Projects.tsx
    projectData/
      index.ts
      types.ts
      ledgerly/project.ts
      coinquest/project.ts
      matchfit/project.ts
      themealsgraffiti/project.ts
      another/project.ts
```

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Create `.env.local`  in the project root:

```env
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_app_password
```

Notes:
- Use a Gmail App Password (not your regular account password).
- `EMAIL_USER` is used as both sender and receiver in current implementation.

### 3. Run development server
```bash
npm run dev
```

Open http://localhost:3000

## Available Scripts
- `npm run dev` - start local dev server (Turbopack)
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - lint code with Next.js ESLint config
- `npm run start:json-server` - optional mock server on port 4000

## Deployment
The project is ready for Vercel deployment:
1. Push to GitHub
2. Import repository in Vercel
3. Add environment variables (`EMAIL_USER`, `EMAIL_PASS`)
4. Deploy

## Contact
For collaborations or freelance work:
- Email: melvinokievor@gmail.com
- LinkedIn: https://linkedin.com/in/mekhano
- GitHub: https://github.com/Mekhanofficial
