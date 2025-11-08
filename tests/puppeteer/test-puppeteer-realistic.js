const puppeteer = require('puppeteer');

async function visitPageRealistically() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
    ],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );
  await page.setViewport({ width: 1920, height: 1080 });

  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
    Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
    Object.defineProperty(navigator, 'languages', { get: () => ['pt-BR', 'pt', 'en-US', 'en'] });
  });

  let gaEventsSent = 0;

  page.on('request', (request) => {
    const url = request.url();
    if (
      url.includes('google-analytics.com') ||
      url.includes('/g/collect') ||
      url.includes('/collect')
    ) {
      gaEventsSent++;
      const isPageView = url.includes('page_view') || url.includes('en=page_view');
      console.log(`📊 GA event #${gaEventsSent}: ${isPageView ? 'PAGE_VIEW' : 'OTHER'}`);
    }
  });

  try {
    console.log('🌐 Navigating to site...');
    await page.goto('https://mcello23.github.io/webpage/', {
      waitUntil: 'networkidle0',
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const acceptButton = await page.$('#acceptCookies');
    if (acceptButton) {
      console.log('🍪 Accepting cookies...');
      await acceptButton.click();
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    console.log('📜 Simulating scroll...');
    await page.evaluate(() => {
      window.scrollBy(0, 300);
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await page.evaluate(() => {
      window.scrollBy(0, 400);
    });
    await new Promise((resolve) => setTimeout(resolve, 1500));

    await page.mouse.move(500, 300);
    await new Promise((resolve) => setTimeout(resolve, 500));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (gaEventsSent > 0) {
      console.log(`✅ Visit completed - ${gaEventsSent} event(s) sent to GA\n`);
    } else {
      console.log('⚠️  No GA events detected\n');
    }

    return gaEventsSent;
  } catch (error) {
    console.error('❌ Error:', error.message);
    return 0;
  } finally {
    await browser.close();
  }
}

async function runRealisticTest(numVisits = 3) {
  console.log(`🚀 REALISTIC TRAFFIC TEST`);
  console.log(`📊 Total visits: ${numVisits}`);
  console.log(`⏱️  Interval between visits: 2-5 seconds (random)\n`);
  console.log(`💡 TIP: Open Google Analytics > Reports > Real-time NOW!\n`);
  console.log('─'.repeat(60));

  const startTime = Date.now();
  let totalEvents = 0;

  for (let i = 0; i < numVisits; i++) {
    console.log(`\n[Visit ${i + 1}/${numVisits}]`);
    const events = await visitPageRealistically();
    totalEvents += events;

    if (i < numVisits - 1) {
      const waitTime = 2000 + Math.random() * 3000;
      console.log(`⏳ Waiting ${(waitTime / 1000).toFixed(1)}s until next visit...`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n' + '─'.repeat(60));
  console.log(`\n✅ TEST COMPLETED!`);
  console.log(`⏱️  Total duration: ${duration}s`);
  console.log(`📊 Total GA events sent: ${totalEvents}`);
  console.log(`📈 Average: ${(totalEvents / numVisits).toFixed(1)} events per visit`);
  console.log(`\n💡 Check Google Analytics > Real-time now!`);
  console.log(`   https://analytics.google.com/\n`);
}

runRealisticTest(5);
