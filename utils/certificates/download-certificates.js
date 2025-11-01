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
    id: 1,
    title: 'AWS DynamoDB Deep Dive',
    url: 'https://media.licdn.com/dms/image/v2/D4D22AQFke1XPPO939g/feedshare-shrink_1280/feedshare-shrink_1280/0/1747638565531?e=1762992000&v=beta&t=m7p6sOJIzV6qHYLj58pZRokX-cNtCzOdH7JYqPjdAQ4',
    filename: 'aws-dynamodb.jpg',
  },
  {
    id: 2,
    title: 'Docker Essential Training',
    url: 'https://media.licdn.com/dms/image/v2/D4D22AQF6xEiMw4hDKQ/feedshare-shrink_1280/feedshare-shrink_1280/0/1746778774524?e=1762992000&v=beta&t=3KqNVdQINZRq2zONQ_V-cqKVnKJdp_5M3gfBaDo0G5I',
    filename: 'docker.jpg',
  },
  {
    id: 3,
    title: 'Cypress v13 Automation Testing for Absolute Beginners',
    url: 'https://udemy-certificate.s3.amazonaws.com/image/UC-39fc4bb5-3720-47d1-b884-e53ee0a1f936.jpg',
    filename: 'UC-39fc4bb5-3720-47d1-b884-e53ee0a1f936.jpg',
  },
  {
    id: 4,
    title: 'Appium -Selenium for Mobile Automation Testing',
    url: 'https://udemy-certificate.s3.amazonaws.com/image/UC-12a0727f-82b2-4108-ad97-8947707d1bat.jpg',
    filename: 'UC-12a0727f-82b2-4108-ad97-8947707d1bat.jpg',
  },
  {
    id: 5,
    title: 'Continuous Delivery & DevOps',
    url: 'https://udemy-certificate.s3.amazonaws.com/image/UC-88588b80-4852-423b-9f93-039ae5f2cc5e.jpg',
    filename: 'UC-88588b80-4852-423b-9f93-039ae5f2cc5e.jpg',
  },
  {
    id: 6,
    title: 'Cybersecurity Awareness: Phishing',
    url: 'https://verify.skilljar.com/c/z7jso2cmtnu9',
    filename: 'cybersecurity.jpg',
    isSkilljar: true, // Special handling needed
  },
  {
    id: 7,
    title: 'Leading Innovation on the Board',
    url: 'https://verify.skilljar.com/c/mgugnrex6iot',
    filename: 'board.jpg',
    isSkilljar: true, // Special handling needed
  },
  {
    id: 8,
    title: 'Best Practices in Test Automation with Cypress',
    url: 'https://udemy-certificate.s3.amazonaws.com/image/UC-54a76f1a-f88a-4604-8ff2-8c79769b7508.jpg',
    filename: 'UC-54a76f1a-f88a-4604-8ff2-8c79769b7508.jpg',
  },
  {
    id: 9,
    title: 'E2E Tests With Cypress',
    url: 'https://udemy-certificate.s3.amazonaws.com/image/UC-142d6308-80ac-4a93-9a4b-36dd743fbd72.jpg',
    filename: 'UC-142d6308-80ac-4a93-9a4b-36dd743fbd72.jpg',
  },
  {
    id: 10,
    title: 'Playwright Automation',
    url: 'https://udemy-certificate.s3.amazonaws.com/image/UC-85215a99-00cb-493a-b171-15a7faf9a381.jpg',
    filename: 'UC-85215a99-00cb-493a-b171-15a7faf9a381.jpg',
  },
  {
    id: 11,
    title: 'GraphQL Essential Training',
    url: 'https://media.licdn.com/dms/image/v2/D4D22AQH6xNoDHDyveg/feedshare-shrink_1280/feedshare-shrink_1280/0/1715963048627?e=1762992000&v=beta&t=JtMizTcORSSrhMFHJiFpKaQYdLESEoB_G92Ti5Bg4jE',
    filename: 'graphql.jpg',
  },
  {
    id: 12,
    title: 'End-to-End JavaScript Testing with Cypress.io',
    url: 'https://media.licdn.com/dms/image/v2/D4D22AQGo5-jtfcasJg/feedshare-shrink_1280/feedshare-shrink_1280/0/1709584528369?e=1762992000&v=beta&t=tFQLRceyjxLunTazsJJ1S5UX5Wi9bZ_dIT4P9ncqHqk',
    filename: 'cypress-linkedin.jpg',
  },
  {
    id: 13,
    title: 'API Testing Foundations',
    url: 'https://media.licdn.com/dms/image/v2/D4D22AQGvNJw23IEkSw/feedshare-shrink_1280/feedshare-shrink_1280/0/1708879918613?e=1762992000&v=beta&t=sPpjkqtkKqSxl5rH2pRkN_uf5W0a7MKLJwQ3OPIjR5E',
    filename: 'api-testing.jpg',
  },
  {
    id: 14,
    title: 'Gherkin Language - The Master Guide',
    url: 'https://udemy-certificate.s3.amazonaws.com/image/UC-67a4c481-8909-4c08-8517-23921c6bd2e9.jpg',
    filename: 'UC-67a4c481-8909-4c08-8517-23921c6bd2e9.jpg',
  },
  {
    id: 15,
    title: 'Learning Selenium',
    url: 'https://media.licdn.com/dms/image/v2/D4D22AQEzjqAqERjQ2g/feedshare-shrink_1280/feedshare-shrink_1280/0/1708448875122?e=1762992000&v=beta&t=VhYTrETd6ByPVJ5OwnQ10-TcgrT0vnI6Ti1ROyXjFVQ',
    filename: 'selenium-linkedin.jpg',
  },
  {
    id: 16,
    title: 'Test Automation Foundations',
    url: 'https://media.licdn.com/dms/image/v2/D4D22AQGCYbHrcmJPUg/feedshare-shrink_1280/feedshare-shrink_1280/0/1708504114586?e=1762992000&v=beta&t=hbewuGkudA1p-D2rMfDb1FNeRm89CkxxeS3m33eXl-o',
    filename: 'test-automation.jpg',
  },
  {
    id: 17,
    title: 'Working with Difficult People',
    url: 'https://media.licdn.com/dms/image/v2/D4D22AQHTc7dRbOs-Og/feedshare-shrink_1280/feedshare-shrink_1280/0/1708538967766?e=1762992000&v=beta&t=DuzR2HYTirHBHSVsLEDeEARFVWIpJVeiYBjDOtFTy8c',
    filename: 'difficult-people.jpg',
  },
];

// Directories (now in utils/certificates, so go up 2 levels)
const IMAGES_DIR = path.join(__dirname, '..', '..', 'images');
const THUMBS_DIR = path.join(__dirname, '..', '..', 'thumbs');

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
