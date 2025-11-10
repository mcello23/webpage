#!/usr/bin/env node

/**
 * Certificate Image Downloader
 * Downloads certificate images from various sources and creates thumbnails
 * Sources: LinkedIn CDN, Udemy S3, Skilljar, GitHub
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Certificate data with direct image URLs
const certificates = [
  {
    id: 34,
    title: 'Introduction to SQL',
    url: 'https://media.licdn.com/dms/image/v2/D4D2DAQG7goWVwCAQ7g/profile-treasury-document-images_1280/B4DZpvJka7HwAU-/1/1762801372233?e=1763596800&v=beta&t=q_uPb3apP9RX0leDxZ8zIQkZqRWHCzi3zxXwrNaY-bc',
    filename: 'introduction-to-sql.jpg',
  },
  {
    id: 35,
    title: 'Agentic AI for Developers',
    url: 'https://media.licdn.com/dms/image/v2/D4D2DAQFkro5pUIoZhg/profile-treasury-document-images_1280/B4DZofmEm1HYAY-/1/1761466666919?e=1763596800&v=beta&t=8hki_qGadBFzkI9YKaITJIeSIMoZArUKOEgrlvIldKo',
    filename: 'agentic-ai-for-developers.jpg',
  },
];

// Directories (now in utils/certificates, so go up 2 levels)
const IMAGES_DIR = path.join(__dirname, '..', '..', 'images');
const THUMBS_DIR = path.join(__dirname, '..', '..', 'images/thumbs');

// Ensure directories exist
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}
if (!fs.existsSync(THUMBS_DIR)) {
  fs.mkdirSync(THUMBS_DIR, { recursive: true });
}

/**
 * Download file from URL
 */
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        console.log(`  ↪️  Redirecting to: ${response.headers.location}`);
        downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${url} (Status: ${response.statusCode})`));
        return;
      }

      const file = fs.createWriteStream(destPath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    });

    request.on('error', (err) => {
      reject(err);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Create thumbnail using ImageMagick (convert command)
 */
function createThumbnail(sourcePath, thumbPath) {
  try {
    // Check if ImageMagick is installed
    try {
      execSync('which convert', { stdio: 'ignore' });
    } catch {
      console.log('  ⚠️  ImageMagick not installed, skipping thumbnail creation');
      console.log('     Install with: sudo apt-get install imagemagick (Ubuntu/Debian)');
      return false;
    }

    // Create thumbnail with 300px width, maintaining aspect ratio
    execSync(`convert "${sourcePath}" -resize 300x "${thumbPath}"`, {
      stdio: 'ignore',
    });
    console.log(`  ✓ Thumbnail created: ${path.basename(thumbPath)}`);
    return true;
  } catch (error) {
    console.log(`  ⚠️  Thumbnail creation failed: ${error.message}`);
    return false;
  }
}

/**
 * Download all certificates
 */
async function downloadAll() {
  console.log('📥 Starting certificate download...\n');

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const cert of certificates) {
    const imagePath = path.join(IMAGES_DIR, cert.filename);
    const thumbPath = path.join(THUMBS_DIR, cert.filename);

    console.log(`[${cert.id}/34] ${cert.title}`);

    // Skip if image already exists
    if (fs.existsSync(imagePath)) {
      console.log(`  ⏭️  Already exists: ${cert.filename}`);
      skipped++;

      // Create thumbnail if missing
      if (!fs.existsSync(thumbPath)) {
        createThumbnail(imagePath, thumbPath);
      }

      continue;
    }

    // Handle Skilljar certificates differently (they are verification pages, not direct images)
    if (cert.isSkilljar) {
      console.log(`  ⚠️  Skilljar verification page - manual download required`);
      console.log(`     Visit: ${cert.url}`);
      console.log(`     Download certificate and save as: ${cert.filename}\n`);
      failed++;
      continue;
    }

    try {
      console.log(`  ⬇️  Downloading from: ${new URL(cert.url).hostname}`);
      await downloadFile(cert.url, imagePath);
      console.log(`  ✓ Downloaded: ${cert.filename}`);

      // Create thumbnail
      createThumbnail(imagePath, thumbPath);

      downloaded++;
    } catch (error) {
      console.log(`  ❌ Failed: ${error.message}`);
      failed++;
    }

    console.log('');
  }

  console.log('━'.repeat(60));
  console.log('📊 Download Summary:');
  console.log(`   ✓ Downloaded: ${downloaded}`);
  console.log(`   ⏭️  Skipped (already exists): ${skipped}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log('━'.repeat(60));

  if (failed > 0) {
    console.log('\n⚠️  Some downloads failed. Please check the errors above.');
    console.log('   Skilljar certificates require manual download from their verification pages.');
  }

  console.log('\n✅ Download process completed!');
  console.log(`   Images saved to: ${IMAGES_DIR}`);
  console.log(`   Thumbnails saved to: ${THUMBS_DIR}`);
}

// Run the download
downloadAll().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
