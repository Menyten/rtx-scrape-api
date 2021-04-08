const puppeteer = require('puppeteer');
const pLimit = require('p-limit');
const products = require('./products');
const urls = require('./urls');
const setUpUtilitiesInEvaluate = require('./utils');
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
    case 'webhallen':
      return await getWebbhallenData(page);
    case 'netonnet':
      return await getNetOnNetData(page);
    case 'inet':
      return await getInetData(page);
    default:
      console.log('Scraping function not added for this company!');
      return;
  }
};

const limit = pLimit(5);

const categoriseDataByCompany = (products) =>
  products.reduce((acc, currentProduct) => {
    const { productUrl } = currentProduct;
    const company = productUrl.split('.')[1];
    return { ...acc, [company]: [...(acc[company] || []), currentProduct] };
  }, {});

const startScrapingPage = (browser, productUrl) => async () => {
  const page = await browser.newPage();
  const company = productUrl.split('.')[1];
  await goToPage(page, productUrl);
  await setUpUtilitiesInEvaluate(page);
  const pageData = await evaluatePage(page, company);
  await page.close();
  return { ...pageData, productUrl };
};

const scrape = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const data = await Promise.all(
    urls.map((url) => limit(startScrapingPage(browser, url)))
  );
  const result = categoriseDataByCompany(data);
  await browser.close(result);
  console.log(result);
  return result;
};

module.exports = {
  scrape,
};
