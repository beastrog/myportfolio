# Portfolio Project

A modern, full-stack portfolio web application built with **Vite** (React + TypeScript) for the frontend and **Express** for the backend, designed for seamless deployment on **Vercel**.

---

## Features
- ⚡️ Fast, modern React frontend (Vite, TypeScript, TailwindCSS)
- 🔒 Secure, robust Express backend (API, email, CORS, etc.)
- 📧 Contact form with email sending (Resend API)
- 🌐 SEO, analytics, and beautiful UI
- ☁️ One-click deploy to Vercel

---

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd myportfolio
```

### 2. Install dependencies
```bash
npm install
cd server && npm install
```

### 3. Set up environment variables
Create a `.env` file in both `myportfolio/` and `myportfolio/server/` as needed. Example for backend:
```env
NODE_ENV=development
PORT=3001
EMAIL_FROM=your@email.com
EMAIL_TO=your@email.com
RESEND_API_KEY=your_resend_api_key
CORS_ORIGINS=http://localhost:3000,http://localhost:8080,http://localhost:5173,https://yourdomain.com
```

### 4. Run in development
- **Frontend:**
  ```bash
  npm run dev
  ```
- **Backend:**
  ```bash
  cd server
  npm run dev
  ```
- Or run both:
  ```bash
  npm run dev:all
  ```

The app will be available at `http://localhost:5173` (frontend) and `http://localhost:3001` (backend).

---

## Building for Production

```bash
npm run build
cd server && npm run build
```

- Frontend output: `myportfolio/dist/`
- Backend output: `myportfolio/server/dist/`

---

## Deploying to Vercel

1. **Push your code to GitHub/GitLab.**
2. **Connect your repo to Vercel** (https://vercel.com/import).
3. Vercel will auto-detect the build and output settings from `vercel.json`:
   - Build command: `npm run vercel-build`
   - Output directory: `dist`
   - API routes: `/api/*` handled by Express backend
4. **Set environment variables** in the Vercel dashboard (same as `.env`).
5. **Deploy!**

---

## Project Structure

```
myportfolio/
├── src/                # Frontend source code (React, TS)
├── public/             # Static assets
├── dist/               # Frontend build output
├── server/             # Backend (Express, API, email)
│   ├── src/
│   └── dist/
├── .env                # Frontend env vars (optional)
├── package.json        # Frontend config/scripts
├── vercel.json         # Vercel deployment config
└── README.md
```

---

## Environment Variables
- `NODE_ENV` - `development` or `production`
- `PORT` - Backend port (default: 3001)
- `EMAIL_FROM` - Sender email for contact form
- `EMAIL_TO` - Recipient email for contact form
- `RESEND_API_KEY` - API key for Resend email service
- `CORS_ORIGINS` - Comma-separated list of allowed origins

---

## Troubleshooting
- **Blank page or JS MIME errors?**
  - Make sure `dist/` is NOT ignored in `.vercelignore`.
  - Ensure `vercel.json` has `outputDirectory: "dist"`.
  - Check Vercel build logs for errors.
- **CORS errors?**
  - Ensure `CORS_ORIGINS` is set correctly in your backend `.env`.
  - Restart the backend after changing `.env`.
- **Email not sending?**
  - Check `RESEND_API_KEY` and email addresses in `.env`.

---

## Contributing
1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push and open a pull request

---

## License
MIT
