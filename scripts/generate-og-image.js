// This script generates a simple OpenGraph image for your portfolio
// Run it using: node scripts/generate-og-image.js

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const WIDTH = 1200;
const HEIGHT = 630;
const OUTPUT_PATH = path.join(__dirname, '../public/og-image.jpg');

const generateOGImage = async () => {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, '#0ea5e9');
  gradient.addColorStop(1, '#3b82f6');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Add text
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Title
  ctx.font = 'bold 60px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Aniruddha Dey', WIDTH / 2, HEIGHT / 2 - 40);
  
  // Subtitle
  ctx.font = '32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Software Engineer & AI Enthusiast', WIDTH / 2, HEIGHT / 2 + 40);
  
  // Bottom right URL
  ctx.font = '20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('aniruddhadey.dev', WIDTH - 150, HEIGHT - 30);

  // Save to file
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
  fs.writeFileSync(OUTPUT_PATH, buffer);
  
  console.log(`✅ Generated OpenGraph image at ${OUTPUT_PATH}`);
};

generateOGImage().catch(console.error);
