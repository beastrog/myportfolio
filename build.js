import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, rmSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting production build...');

// Clean previous builds
console.log('🧹 Cleaning previous builds...');
const distPath = join(__dirname, 'dist');
const distServerPath = join(distPath, 'server');

// Clean up previous build
if (existsSync(distPath)) {
  rmSync(distPath, { recursive: true, force: true });
}

// Create necessary directories
mkdirSync(distPath, { recursive: true });
mkdirSync(distServerPath, { recursive: true });

// Install production dependencies
console.log('📦 Installing production dependencies...');
process.env.HUSKY = '0';
runCommand('npm ci --omit=dev');

// Build frontend
console.log('🔨 Building frontend...');
runCommand('npm run build');

// Build server
console.log('⚙️  Building server...');
runCommand('npm run build:server');

// Copy server files to dist
console.log('📦 Copying server files...');
const serverFiles = [
  'server/index.js',
  'server/tsconfig.json'
];

serverFiles.forEach(file => {
  const source = join(__dirname, file);
  const dest = join(distPath, file);
  
  // Ensure destination directory exists
  const destDir = dirname(dest);
  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }
  
  if (existsSync(source)) {
    copyFileSync(source, dest);
  }
});

// Copy package.json with production settings
console.log('📄 Creating production package.json...');
const pkg = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf-8'));

const { devDependencies, scripts, ...prodPkg } = pkg;
prodPkg.scripts = {
  start: 'node server/index.js',
  postinstall: 'npm run build:server',
};

// Only include production dependencies
prodPkg.dependencies = pkg.dependencies;

// Write production package.json
writeFileSync(
  join(distPath, 'package.json'),
  JSON.stringify(prodPkg, null, 2)
);

// Copy environment files
const envFiles = ['.env', '.env.production'];
envFiles.forEach(envFile => {
  const source = join(__dirname, envFile);
  if (existsSync(source)) {
    console.log(`📄 Copying ${envFile}...`);
    copyFileSync(source, join(distPath, envFile));
  }
});

// Create start scripts
console.log('🚀 Creating start scripts...');

// Windows batch file
writeFileSync(
  join(distPath, 'start.bat'),
  '@echo off\r\nnpm install --omit=dev\r\nnode server/index.js',
  { encoding: 'utf8' }
);

// Unix shell script
writeFileSync(
  join(distPath, 'start.sh'),
  '#!/bin/sh\nnpm install --omit=dev\nnode server/index.js',
  { mode: 0o755 }
);

// Create a simple README for the dist folder
writeFileSync(
  join(distPath, 'README.md'),
  `# Production Build

This directory contains the production build of the application.

## Quick Start

### Windows
\`\`\`bash
start.bat
\`\`\`

### Unix/Linux/macOS
\`\`\`bash
chmod +x start.sh
./start.sh
\`\`\`

## Environment Variables

Make sure to set up the following environment variables:

- \`NODE_ENV\`: Set to \`production\`
- \`PORT\`: Port to run the server on
- \`VITE_API_BASE_URL\`: Base URL for API requests
- \`RESEND_API_KEY\`: API key for Resend email service
- \`EMAIL_FROM\`: Sender email address
- \`EMAIL_TO\`: Recipient email address
`,
  'utf8'
);

console.log('\n✅ Build completed successfully!');
console.log('📦 Your production build is ready in the dist/ directory');
console.log('🚀 Start your application with:');
console.log('   cd dist');
console.log('   npm install --omit=dev');
console.log('   node server/index.js\n');

function runCommand(command) {
  console.log(`   $ ${command}`);
  try {
    execSync(command, { stdio: 'inherit', shell: true });
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    process.exit(1);
  }
}
