# Aniruddha Dey - Portfolio

[![Deploy to GitHub Pages](https://github.com/beastrog/myportfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/beastrog/myportfolio/actions/workflows/deploy.yml)

A modern, responsive portfolio website showcasing my skills, projects, and experience. Built with React, TypeScript, and Vite for optimal performance.

## 🚀 Features

- ⚡ Blazing fast performance with Vite
- 🎨 Modern UI with smooth animations
- 📱 Fully responsive design
- 📝 Interactive resume section
- 🌐 SEO optimized

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Form Handling**: React Hook Form
- **State Management**: React Query
- **Deployment**: GitHub Pages

## 🏃‍♂️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/beastrog/myportfolio.git
   cd myportfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌟 Highlights

- **Performance Optimized**: Built with Vite for fast development and production builds
- **Modern UI**: Clean, accessible, and responsive design
- **Interactive Elements**: Smooth animations and transitions
- **Developer Experience**: TypeScript for type safety and better code quality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

- **Website**: [aniruddhadey.in](https://aniruddhadey.in)
- **GitHub**: [@beastrog](https://github.com/beastrog)

---

Made with ❤️ by Aniruddha Dey

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

- Email: deyaniruddha_goat@yahoo.com
- Website: https://aniruddhadey.in
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
