const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

describe('Otimizações de performance', () => {
  const htmlPath = path.join(__dirname, '../index.html');
  let $;

  beforeAll(() => {
    const html = fs.readFileSync(htmlPath, 'utf8');
    $ = cheerio.load(html);
  });

  it('deve ter preconnect para cdnjs.cloudflare.com', () => {
    const preconnect = $('link[rel="preconnect"][href="https://cdnjs.cloudflare.com"]');
    expect(preconnect.length).toBeGreaterThan(0);
  });

  it('deve ter fetchpriority="high" na imagem principal', () => {
    const img = $('img[fetchpriority="high"]');
    expect(img.length).toBeGreaterThan(0);
  });

  it('deve usar font-display: swap nas fontes', () => {
    const css = fs.readFileSync(path.join(__dirname, '../css/materialize.css'), 'utf8');
    expect(css).toMatch(/font-display:\s*swap/);
  });

  it('deve usar imagem WebP otimizada', () => {
    const img = $('img[src*="DSC_9554-optimized.webp"]');
    expect(img.length).toBeGreaterThan(0);
  });

  it('deve ter cache headers configurados', () => {
    const headersPath = path.join(__dirname, '../_headers');
    expect(fs.existsSync(headersPath)).toBe(true);
    const headers = fs.readFileSync(headersPath, 'utf8');
    expect(headers).toMatch(/max-age=31536000/);
  });

  it('deve carregar CSS não crítico de forma não bloqueante', () => {
    const links = $('link[rel="stylesheet"][media="print"][onload]');
    expect(links.length).toBeGreaterThan(0);
  });
});
