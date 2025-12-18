#!/usr/bin/env node
/**
 * Prepare clean build directory for Cloudflare Pages deployment
 * Copies only production files, excluding node_modules, cache, and dev files
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = 'dist';
const ROOT_DIR = process.cwd();

// Files and directories to include in production build
const INCLUDE_PATTERNS = [
  'index.html',
  'robots.txt',
  'test-data.js',
  '_headers',
  'css/',
  'js/',
  'images/',
  'pages/',
  'favicon/',
];

// Clean build directory
console.log('🧹 Cleaning build directory...');
if (fs.existsSync(BUILD_DIR)) {
  fs.rmSync(BUILD_DIR, { recursive: true, force: true });
}
fs.mkdirSync(BUILD_DIR, { recursive: true });

// Copy function
function copyRecursive(src, dest) {
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy production files
console.log('📦 Copying production files...');
let fileCount = 0;

for (const pattern of INCLUDE_PATTERNS) {
  const srcPath = path.join(ROOT_DIR, pattern);
  const destPath = path.join(ROOT_DIR, BUILD_DIR, pattern);

  if (fs.existsSync(srcPath)) {
    console.log(`  ✓ ${pattern}`);
    copyRecursive(srcPath, destPath);
    fileCount++;
  } else {
    console.log(`  ⚠ ${pattern} not found (skipping)`);
  }
}

// Get directory size
function getDirSize(dirPath) {
  let size = 0;
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(dirPath, file.name);
    if (file.isDirectory()) {
      size += getDirSize(filePath);
    } else {
      size += fs.statSync(filePath).size;
    }
  }
  return size;
}

const buildSize = getDirSize(path.join(ROOT_DIR, BUILD_DIR));
const buildSizeMB = (buildSize / (1024 * 1024)).toFixed(2);

console.log('');
console.log('✅ Build preparation complete!');
console.log(`📊 Build directory: ${BUILD_DIR}/`);
console.log(`📏 Total size: ${buildSizeMB} MB`);
console.log(`📁 Copied ${fileCount} items`);

if (buildSize > 25 * 1024 * 1024) {
  console.error('');
  console.error('❌ ERROR: Build exceeds Cloudflare Pages 25MB limit!');
  process.exit(1);
}
