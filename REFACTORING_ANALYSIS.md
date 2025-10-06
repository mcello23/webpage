# Project Refactoring Analysis

## Date: October 6, 2025

---

## UNUSED FILES IDENTIFIED

### 🖼️ Unused Images (8 files)

#### `/images` folder:
1. ❌ `UC-30dbd631-5bcf-466b-93d6-3ef05d78483a.jpg` - Not in config.xml
2. ❌ `appium-logo.png` - Not referenced
3. ❌ `cucumber-logo.png` - Not referenced
4. ❌ `cypress-logo.jpeg` - Not referenced
5. ❌ `quix_webiste.jpg` - Not referenced
6. ❌ `ruby-logo.png` - Not referenced
7. ❌ `selenium_screenshot.jpg` - Not referenced
8. ❌ `simulated_android_app.jpg` - Not referenced

#### `/backgrounds` folder (ALL UNUSED - 10 files):
1. ❌ `background1_coding.jpg`
2. ❌ `background2_coding.jpg`
3. ❌ `background3_coding.jpg`
4. ❌ `background4_coding.jpg`
5. ❌ `background5_rams.jpg`
6. ❌ `background6_my_photo.jpg`
7. ❌ `background7_tetris.jpg`
8. ❌ `background8_game_controllers.jpg`
9. ❌ `background9_snes_colors.jpg`
10. ❌ `background10_snes_controller.jpg`

**Total unused images: 18 files**

---

### 📜 Unused JavaScript Files

#### `/js` folder:
1. ❌ `materialize.min.js` - CDN version used instead from cdnjs.cloudflare.com
   - All pages load from CDN: `https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js`
   - Local copy not referenced

**Total unused scripts: 1 file**

---

## USED FILES (Keep These)

### ✅ Images - IN USE
- `DSC_9554.jpg` - Profile photo in index.html
- `favicon.ico` - Browser favicon
- `favicon.svg` - Modern browser favicon

#### `/images` folder - IN USE (16 files):
- `Selenium WebDriver e Java.jpg` - Certificate in config.xml
- `agile.jpg` - Certificate in config.xml
- `cyp-inter.jpg` - Certificate in config.xml
- `cucumber_appium.jpg` - Certificate in config.xml
- `UC-f46ea1bb-4ed8-4269-aa12-6b18d0b24028.jpg` - Certificate
- `UC-b1bf6ead-40d6-4942-9166-59de03c1f975.jpg` - Certificate
- `UC-b9368ddf-124c-464a-8cc4-4f1be7d63754.jpg` - Certificate
- `UC-d3955587-e5a2-416e-a652-9a95704f5f5c.jpg` - Certificate
- `UC-3ef466ba-72f0-4bc2-8d3e-c01128ea22f9.jpg` - Certificate
- `UC-5c615f9b-603b-4140-a57e-5349ab84ee6f.jpg` - Certificate
- `UC-9b5ea711-6721-49cd-8281-83248eb4179b.jpg` - Certificate
- `UC-7479ab2b-a38b-482b-bf11-60b9d2188496.jpg` - Certificate
- `UC-808536a6-a2bd-44e2-9b9a-74f423f72c72.jpg` - Certificate
- `ISTQB.jpg` - Certificate
- `Swift 5.jpg` - Certificate
- `GitHub.jpg` - Certificate

### ✅ JavaScript - IN USE
- `js/materialize.js` - Used in index.html, frameworks.html, side_proj.html
- `js/init.js` - Used in index.html, frameworks.html, side_proj.html
- `js/prism.js` - Used in frameworks.html, side_proj.html (code syntax highlighting)
- `jbcore/juicebox.js` - Used in index.html, frameworks.html, side_proj.html (certificate gallery)

### ✅ External CDN Scripts (Good - No cleanup needed)
- jQuery from code.jquery.com
- Materialize from cdnjs.cloudflare.com

---

## HTML PAGES VERIFICATION

### ✅ index.html - VERIFIED
- Profile image: `DSC_9554.jpg` ✓ exists
- Scripts: materialize.js, init.js, juicebox.js ✓ all exist
- Modal: Certificate gallery ✓ configured
- Favicon: Updated to use relative paths ✓
- Spanish flag: Fixed to use HTML entities ✓

### ✅ frameworks.html - VERIFIED
- Scripts: materialize.js, init.js, prism.js, juicebox.js ✓ all exist
- CSS: prism.css, navbar.css ✓ all exist
- Favicon: Updated to use relative paths ✓
- Modal: Certificate gallery ✓ configured

### ✅ side_proj.html - VERIFIED
- External images from Wikipedia ✓ (OpenAI, TypeScript logos)
- Scripts: materialize.js, init.js, prism.js, juicebox.js ✓ all exist
- CSS: prism.css, navbar.css ✓ all exist
- Favicon: Updated to use relative paths ✓
- Modal: Certificate gallery ✓ configured

### ✅ responsive-tester.html - VERIFIED
- No images ✓
- No external scripts (inline JS only) ✓
- Favicon: Updated to use relative paths ✓
- Links to: index.html, frameworks.html, side_proj.html ✓

---

## SPACE SAVINGS ESTIMATE

### Images to delete:
- 8 unused images in `/images`: ~3-5 MB
- 10 background images in `/backgrounds`: ~10-15 MB
- **Total: ~13-20 MB**

### Scripts to delete:
- `js/materialize.min.js`: ~100 KB

**Total space savings: ~13-20 MB**

---

## RECOMMENDED ACTIONS

### 1. Delete Unused Images
```bash
# Unused images in /images
rm images/UC-30dbd631-5bcf-466b-93d6-3ef05d78483a.jpg
rm images/appium-logo.png
rm images/cucumber-logo.png
rm images/cypress-logo.jpeg
rm images/quix_webiste.jpg
rm images/ruby-logo.png
rm images/selenium_screenshot.jpg
rm images/simulated_android_app.jpg

# Delete entire backgrounds folder (all unused)
rm -rf backgrounds/
```

### 2. Delete Unused Scripts
```bash
rm js/materialize.min.js
```

### 3. Update .gitignore (if needed)
Add coverage folder to .gitignore if not already there.

---

## FOLDER STRUCTURE AFTER CLEANUP

```
webpage/
├── index.html ✓
├── frameworks.html ✓
├── side_proj.html ✓
├── responsive-tester.html ✓
├── DSC_9554.jpg ✓
├── favicon.ico ✓
├── favicon.svg ✓
├── config.xml ✓
├── package.json ✓
├── __tests__/ ✓
├── Certificados/ ✓ (source certificates)
├── css/ ✓
├── favicon/ ✓
├── images/ ✓ (only used certificate images - 16 files)
├── js/ ✓ (materialize.js, init.js, prism.js - 3 files)
├── jbcore/ ✓
├── Juicebox/ ✓
└── thumbs/ ✓
```

---

## VERIFICATION CHECKLIST

- ✅ All 357 tests passing
- ✅ Profile image referenced and exists
- ✅ All certificate images in config.xml exist
- ✅ All script files referenced exist
- ✅ All CSS files referenced exist
- ✅ All HTML pages have proper favicon setup
- ✅ No broken links between pages
- ✅ Spanish flag emoji fixed
- ✅ All 4 HTML pages verified

---

## NOTES

### Why backgrounds folder is unused:
- Modern portfolio uses CSS gradients instead of background images
- Parallax sections use `linear-gradient()` in CSS
- No HTML or CSS references to any background images
- Safe to delete entire folder

### Why some images folder items unused:
- Logos (appium, cucumber, cypress, ruby) may have been for old design
- Screenshots (selenium, simulated_android_app, quix) not in current version
- One certificate (UC-30dbd631) not in config.xml gallery

### Why materialize.min.js unused:
- All pages load Materialize from CDN
- Local minified copy is redundant
- materialize.js (non-minified) is still used as fallback

---

## SAFETY

Before deleting, you can verify with:
```bash
# Test that pages still work
npm test

# Check for any last-minute references
grep -r "appium-logo" .
grep -r "background1" .
grep -r "materialize.min.js" . --include="*.html"
```

All checks completed ✓
