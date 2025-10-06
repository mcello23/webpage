# Marcelo Costa - SDET Portfolio

[![Tests](https://img.shields.io/badge/tests-355%20passing-brightgreen)](/__tests__)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> A modern, responsive portfolio website showcasing software testing expertise, automation frameworks, and professional certifications.

## 🌐 Live Demo

Visit the live portfolio: [Link](https://mcello23.github.io/webpage/index.html)

## ✨ Features

### 🎯 Core Features

- **Responsive Design** - Fully responsive across mobile, tablet, and desktop devices
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Dark Theme** - Eye-friendly dark color scheme with purple gradient accents
- **Fast Performance** - Optimized for quick loading and smooth interactions
- **SEO Optimized** - Proper meta tags and semantic HTML

### 📜 Certificate Gallery

- **Modern Modal System** - Custom-built certificate viewer (replaced Juicebox)
- **Grid & Viewer Modes** - Browse all certificates or view individually
- **Keyboard Navigation** - Navigate with arrow keys, Escape, and Backspace
- **LinkedIn Integration** - Direct links to LinkedIn Learning certificates
- **16 Professional Certifications** - ISTQB, Selenium, Cypress, Python, and more

### 🧪 Testing Frameworks Showcase

- Detailed explanations of testing frameworks and tools
- Code examples with syntax highlighting (Prism.js)
- Visual demonstrations of automation capabilities
- Real-world implementation examples

### 🚀 Side Projects

- Portfolio of automation projects
- GitHub repository links
- Technology stack demonstrations
- Practical application examples

## 📁 Project Structure

```
webpage/
├── index.html              # Main landing page
├── pages/                  # Secondary HTML pages
│   ├── frameworks.html     # Testing frameworks showcase
│   ├── side_proj.html      # Side projects portfolio
│   ├── responsive-tester.html # Responsive design tester
│   └── test-modal.html     # Certificate modal test page
│
├── assets/                 # Images and media files
│   ├── Certificados/       # Certificate images (full-size)
│   └── DSC_9554.jpg        # Profile photo
│
├── css/                    # Stylesheets
│   ├── certificates.css    # Certificate modal styles
│   ├── materialize.css     # Materialize framework
│   ├── navbar.css          # Navigation bar styles
│   ├── prism.css           # Code syntax highlighting
│   └── style.css           # Main stylesheet
│
├── js/                     # JavaScript files
│   ├── certificates.js     # Certificate modal logic
│   ├── init.js             # Materialize initialization
│   ├── materialize.js      # Materialize framework
│   └── prism.js            # Code syntax highlighting
│
├── images/                 # Certificate images (full-size)
│   └── [16 certificate JPGs]
│
├── thumbs/                 # Certificate thumbnails
│   └── [16 thumbnail JPGs]
│
├── favicon/                # Favicon files
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   └── site.webmanifest
│
└── __tests__/              # Jest test suites
    ├── index.test.js
    ├── frameworks.test.js
    ├── side_proj.test.js
    ├── cross-page.test.js
    ├── favicon.test.js
    └── responsive-tester.test.js
```

## 🛠️ Technologies Used

### Frontend

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid and Flexbox
- **JavaScript (ES6+)** - Vanilla JS, no jQuery dependency for modal
- **Materialize CSS** - Responsive framework
- **Font Awesome** - Icon library
- **Google Fonts** - Material Icons
- **Prism.js** - Syntax highlighting for code blocks

### Testing

- **Jest** - JavaScript testing framework
- **JSDOM** - DOM testing environment
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Build & Deploy

- **npm** - Package management
- **GitHub Pages** - Static site hosting
- **Git** - Version control

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mcello23/webpage.git
   cd webpage
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run tests**

   ```bash
   npm test
   ```

4. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   npx http-server . -p 8080
   ```

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

### Run Specific Test Suite

```bash
npm test -- --testPathPattern=index
npm test -- --testPathPattern=frameworks
npm test -- --testPathPattern=side_proj
npm test -- --testPathPattern=cross-page
npm test -- --testPathPattern=favicon
```

### Test Coverage

- **355 Total Tests** - Comprehensive coverage
- **6 Test Suites** - Organized by page/feature
- **100% Passing** - All tests green
- Coverage includes:
  - Page structure and HTML validity
  - Navigation consistency across pages
  - Certificate modal functionality
  - Favicon implementation
  - CSS and JavaScript loading
  - Responsive design features

## 📝 Development

### Project Scripts

```bash
npm test          # Run all tests
npm run lint      # Run ESLint
npm run format    # Run Prettier
```

### Adding Certificates

To add new certificates to the modal:

1. Add full-size image to `/images/`
2. Add thumbnail to `/thumbs/`
3. Update `js/certificates.js`:

```javascript
{
  id: 17,
  title: 'New Certificate Name',
  image: 'images/new-cert.jpg',
  thumb: 'thumbs/new-cert.jpg',
  linkedinUrl: 'https://www.linkedin.com/learning/certificates/YOUR_ID',
  category: 'Testing' // or 'Automation', 'Python', etc.
}
```

### Customization

#### Colors

Edit `css/style.css` and `css/certificates.css`:

- Primary gradient: `#667eea` → `#764ba2`
- Background: `#1e1e1e` → `#2d2d2d`

#### Navigation

Edit navigation links in all HTML files:

```html
<a href="pages/your-page.html" class="nav-btn">
  <i class="material-icons">icon_name</i>Your Page
</a>
```

## 🎨 Features Breakdown

### Certificate Modal

- **No External Dependencies** - Custom-built, no Juicebox
- **Smooth Animations** - CSS transitions and transforms
- **Responsive Grid** - Adapts to screen size
- **Keyboard Accessible** - Full keyboard navigation
- **Touch-Friendly** - Works great on mobile devices

### Navigation

- **Sticky Header** - Navbar stays at top when scrolling
- **Mobile Menu** - Hamburger menu for small screens
- **Active State** - Highlights current page
- **Smooth Scroll** - Smooth scrolling to sections

### Responsive Design

- **Mobile-First** - Built for mobile, enhanced for desktop
- **Breakpoints** -
  - Mobile: < 600px
  - Tablet: 600px - 992px
  - Desktop: > 992px
- **Flexible Layouts** - CSS Grid and Flexbox
- **Responsive Images** - Lazy loading and srcset

## 📊 Performance

### Optimizations

- Minified CSS and JavaScript
- Lazy loading for images
- CSS animations (GPU accelerated)
- Minimal external dependencies
- Optimized image sizes

### Metrics

- Fast page load times
- Smooth 60fps animations
- Responsive across all devices
- SEO-friendly structure

## 🔧 Troubleshooting

### Certificate Modal Not Opening

1. Open browser DevTools (F12)
2. Check Console for errors
3. Verify `window.certificateModal` exists:
   ```javascript
   console.log(window.certificateModal);
   ```
4. Try opening manually:
   ```javascript
   window.certificateModal.open();
   ```

### Images Not Loading

- Check file paths are correct
- Verify images exist in `/images/` and `/thumbs/`
- Check browser console for 404 errors

### Tests Failing

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm test
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Marcelo Costa**

- Portfolio: [Your Website]
- LinkedIn: [linkedin.com/in/marceloc](https://www.linkedin.com/in/marceloc/)
- GitHub: [@mcello23](https://github.com/mcello23)

## 🙏 Acknowledgments

- **Materialize CSS** - Responsive framework
- **Font Awesome** - Icon library
- **Prism.js** - Syntax highlighting
- **Jest** - Testing framework

## 📈 Changelog

### v2.0.0 (October 2025)

- ✅ Replaced Juicebox with custom certificate modal
- ✅ Removed 1.4MB of deprecated code
- ✅ Added keyboard navigation to modal
- ✅ Implemented LinkedIn certificate integration
- ✅ Reorganized project structure
- ✅ Added comprehensive test coverage (355 tests)
- ✅ Created responsive design tester
- ✅ Updated to modern vanilla JavaScript

### v1.0.0 (Initial Release)

- Initial portfolio website
- Basic structure and content
- Juicebox gallery integration

## 🗺️ Roadmap

- [ ] Add dark/light theme toggle
- [ ] Implement blog section
- [ ] Add contact form backend
- [ ] Create admin panel for certificate management
- [ ] Add more automation project showcases
- [ ] Implement i18n for multiple languages

---

**Built with ❤️ by Marcelo Costa | © 2025 All Rights Reserved**
