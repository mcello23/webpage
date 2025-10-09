# Certificate Utilities

This folder contains utility tools for managing certificates displayed on the webpage.

## 📁 Files

### 1. `certificate-helper.html`

Interactive browser-based tool for managing certificate data.

**Features:**

- Add/edit LinkedIn credential URLs for each certificate
- Generate updated `certificates.js` code with all 33 certificates
- Visual interface showing certificate status

**Usage:**

1. Open in browser: `utils/certificates/certificate-helper.html`
2. Enter LinkedIn URLs for each certificate
3. Click "Generate Updated certificates.js"
4. Copy generated code and paste into `/js/certificates.js`

### 2. `download-certificates.js`

Node.js script to automatically download certificate images from various sources.

**Features:**

- Downloads from LinkedIn CDN, Udemy S3, and other sources
- Creates thumbnails automatically (with ImageMagick)
- Skips already downloaded files
- Handles redirects and timeouts

**Usage:**

```bash
cd utils/certificates
node download-certificates.js
```

**Prerequisites:**

- Node.js installed
- ImageMagick installed: `sudo apt-get install imagemagick`

### 3. `create-thumbnails.sh`

Bash script to batch create thumbnails for all certificate images.

**Features:**

- Creates 300px width thumbnails
- Maintains aspect ratio
- Skips existing thumbnails
- Shows summary of created/skipped files

**Usage:**

```bash
cd utils/certificates
chmod +x create-thumbnails.sh
./create-thumbnails.sh
```

**Prerequisites:**

- ImageMagick installed: `sudo apt-get install imagemagick`

### 4. `view-certificates.html`

Preview page to view all 33 certificates in a grid layout.

**Features:**

- Visual grid display of all certificates
- Shows certificate ID, title, category
- Indicates if images are missing
- Displays file paths

**Usage:**

1. Open in browser: `utils/certificates/view-certificates.html`
2. Review all certificates visually
3. Check for any missing images

## 📊 Certificate Data

Currently managing **33 certificates** with:

- ✅ 33 images in `/images`
- ✅ 33 thumbnails in `/thumbs`
- ✅ All LinkedIn credential URLs configured
- ✅ Multiple sources: LinkedIn CDN, Udemy S3, Skilljar

## 🧪 Testing

Comprehensive test suite validates all certificate data:

```bash
npm test -- certificates.test.js
```

**Test Coverage:**

- ✅ Certificate count (33)
- ✅ Data structure validation
- ✅ File existence checks (images/thumbs)
- ✅ LinkedIn URL validation
- ✅ Category validation
- ✅ Path consistency
- ✅ Data integrity

## 📝 Categories

Valid certificate categories:

- Security
- Professional Development
- Automation
- Cloud
- DevOps
- Development
- Testing
- Soft Skills
- Methodology
- Web Development
- API Testing
- Programming
- Development Tools

## 🔧 Maintenance

### Adding New Certificates

1. Download image to `/images` folder
2. Create thumbnail in `/thumbs` folder (use `create-thumbnails.sh`)
3. Open `certificate-helper.html` and add new certificate entry
4. Generate new code and update `/js/certificates.js`
5. Run tests: `npm test -- certificates.test.js`

### Updating LinkedIn URLs

1. Open `certificate-helper.html` in browser
2. Update URLs in input fields
3. Click "Generate Updated certificates.js"
4. Copy generated code to `/js/certificates.js`

## 🌐 Image Sources

- **LinkedIn CDN**: `https://media.licdn.com/dms/image/...`
- **Udemy S3**: `https://udemy-certificate.s3.amazonaws.com/...`
- **Skilljar**: `https://verify.skilljar.com/c/...`
- **GitHub**: `https://github.com/mcello23/webpage/...`

## ⚠️ Important Notes

- All paths in moved files are adjusted to work from `utils/certificates/` location
- `download-certificates.js` uses relative paths (`../../images`, `../../thumbs`)
- `view-certificates.html` uses relative paths (`../../images/...`)
- `create-thumbnails.sh` uses absolute paths (no changes needed)
- Certificate modal in main site uses paths relative to page location

## 📦 Dependencies

- **ImageMagick**: Required for thumbnail generation

  ```bash
  sudo apt-get install imagemagick
  ```

- **Node.js**: Required for download script
  ```bash
  node --version  # Should be v12 or higher
  ```

## ✅ Current Status

**All 33 certificates ready:**

- ✅ Images downloaded and verified
- ✅ Thumbnails generated and verified
- ✅ LinkedIn URLs configured
- ✅ Tests passing (31/31)
- ✅ Production code updated (`/js/certificates.js`)
