const puppeteer = require('puppeteer');

async function visitPage() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  let gaEventsSent = 0;

  page.on('request', (request) => {
    const url = request.url();
    if (
      url.includes('google-analytics.com') ||
      url.includes('/g/collect') ||
      url.includes('/collect')
    ) {
      gaEventsSent++;
      console.log(
        `📊 GA event sent #${gaEventsSent}: ${url.includes('page_view') ? 'page_view' : 'event'}`
      );
    }
  });

  try {
    await page.goto('https://mcello23.github.io/webpage/', {
      waitUntil: 'networkidle2',
    });

    const acceptButton = await page.$('#acceptCookies');
    if (acceptButton) {
      await acceptButton.click();
      console.log('✅ Cookies accepted');
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (gaEventsSent > 0) {
      console.log(`✅ Page visited - ${gaEventsSent} GA event(s) sent`);
    } else {
      console.log('⚠️  Page visited but no GA events detected');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

async function runLoadTest(numVisits = 10, concurrent = 2) {
  console.log(`🚀 Starting load test: ${numVisits} visits, ${concurrent} concurrent\n`);

  const startTime = Date.now();
  let completed = 0;

  // Executar visitas em lotes
  for (let i = 0; i < numVisits; i += concurrent) {
    const batch = [];
    for (let j = 0; j < concurrent && i + j < numVisits; j++) {
      batch.push(
        visitPage().then(() => {
          completed++;
          console.log(`📊 Progress: ${completed}/${numVisits}`);
        })
      );
    }
    await Promise.all(batch);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✅ Test completed!`);
  console.log(`⏱️  Duration: ${duration}s`);
  console.log(`📈 Rate: ${(numVisits / duration).toFixed(2)} visits/second`);
}

runLoadTest(5, 2);
