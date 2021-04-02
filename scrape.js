const puppeteer = require('puppeteer');
const products = require('./products');
const urls = require('./urls');
const {
  getKomplettProductData,
  getNetOnNetData,
  getInetData,
  getWebbhallenData,
} = products;

const goToPage = async (page, url) =>
  await page.goto(url, { waitUntil: 'networkidle2' });

const evaluatePage = async (page, company) => {
  switch (company) {
    case 'komplett':
      return await getKomplettProductData(page);
    case 'webbhallen':
      return await getWebbhallenData(page);
    case 'netonnet':
      return await getNetOnNetData(page);
    case 'inet':
      return await getInetData(page);
    default:
      console.log('Should not end up here');
      return;
  }
};

const scrape = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  let result = {};
  for (const company in urls) {
    for (const productUrl of urls[company]) {
      await goToPage(page, productUrl);
      const productData = await evaluatePage(page, company);
      const product = { ...productData, productUrl };
      result = {
        ...result,
        [company]: [...(result[company] || []), product],
      };
    }
  }
  console.log(result);
  browser.close();
  return result;
};

module.exports = {
  scrape,
};
