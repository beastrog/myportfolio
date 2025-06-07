# My Portfolio

[![Deploy to GitHub Pages](https://github.com/beastrog/myportfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/beastrog/myportfolio/actions/workflows/deploy.yml)

A modern, responsive portfolio website built with React, TypeScript, and Vite. This project showcases my work, skills, and provides a way for visitors to get in touch with me. The frontend is deployed on GitHub Pages and the backend is deployed on Render.

## Features

- 🚀 Blazing fast performance with Vite
- 🎨 Modern UI with responsive design
- ✉️ Contact form with email functionality
- 🔒 Secure backend with rate limiting and security headers
- 📱 Mobile-friendly layout
- 🌐 SEO optimized

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: CSS Modules, CSS Variables
- **Backend**: Node.js, Express
- **Email**: Resend
- **Build Tools**: Vite, TypeScript
- **Linting/Formatting**: ESLint, Prettier
- **Containerization**: Docker

## Prerequisites

- Node.js 18+ and npm 8+
- Git
- (Optional) Docker and Docker Compose

## Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/your-portfolio.git
cd your-portfolio
```

### Install dependencies

```bash
npm install
```

### Environment Setup

1. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
2. Update the environment variables in `.env` with your configuration.

### Development

Start the development server:

```bash
# Start both frontend and backend
dev:all

# Or start them separately
npm run dev      # Frontend
dev:server       # Backend
```

The application will be available at `http://localhost:8080`.

## Building for Production

### Option 1: Using the build script (Recommended)

```bash
node build.js
```

The production build will be available in the `dist` directory.

### Option 2: Manual Build

```bash
# Install production dependencies
npm ci --only=production

# Build the frontend
npm run build

# Build the server
npm run build:server
```

## Deployment

Detailed deployment instructions are available in [DEPLOYMENT.md](DEPLOYMENT.md).

### Quick Deployment with Docker

1. Build the Docker image:
   ```bash
   docker build -t my-portfolio .
   ```

2. Run the container:
   ```bash
   docker run -p 3001:3001 --env-file .env.production my-portfolio
   ```

## Project Structure

```
.
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── styles/             # Global styles
│   └── utils/              # Utility functions
├── server/                 # Backend server code
│   ├── index.ts            # Server entry point
│   └── routes/             # API routes
├── public/                 # Static files
├── dist/                   # Production build output
├── .env.example            # Example environment variables
├── .env.production         # Production environment variables
├── package.json            # Project configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Email: your.email@example.com
- Website: https://yourwebsite.com
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- GitHub: [@yourusername](https://github.com/yourusername)

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/951abbde-2b87-48bf-9272-3883aa0ed809) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
