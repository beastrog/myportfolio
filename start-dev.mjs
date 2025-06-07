import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Start frontend
console.log('Starting frontend...');
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, FORCE_COLOR: '1' }
});

// Start backend
console.log('Starting backend...');
const backend = spawn('node', ['--import', 'tsx', 'server/index.ts'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true,
  env: { 
    ...process.env, 
    PORT: '3001',
    NODE_ENV: 'development',
    FORCE_COLOR: '1' 
  }
});

// Handle process exit
const handleExit = (signal) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  
  if (frontend) {
    console.log('Shutting down frontend...');
    frontend.kill();
  }
  
  if (backend) {
    console.log('Shutting down backend...');
    backend.kill();
  }
  
  process.exit(0);
};

// Listen for termination signals
process.on('SIGTERM', () => handleExit('SIGTERM'));
process.on('SIGINT', () => handleExit('SIGINT'));

// Log errors
frontend.on('error', (err) => {
  console.error('Frontend error:', err);
});

backend.on('error', (err) => {
  console.error('Backend error:', err);
});

// Log exit codes
frontend.on('close', (code) => {
  console.log(`Frontend process exited with code ${code}`);
  if (code !== 0) {
    process.exit(1);
  }
});

backend.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
  if (code !== 0) {
    process.exit(1);
  }
});
