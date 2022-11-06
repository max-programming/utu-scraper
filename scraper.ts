import puppeteer from 'puppeteer-extra';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import {
  getAttendanceScreenshot,
  getEvaluationScreenshot,
} from './utils/getScreenshots';
import login from './utils/login';

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

async function scraper() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });

  console.log('Browser started');

  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto('https://app.utu.ac.in/EngineeringSIS/', {
    waitUntil: 'networkidle0',
  });
  console.log('Page opened');

  await login(page);
  const attImg = await getAttendanceScreenshot(page);

  await page.click('#ctl00_mnuItems > ul > li:nth-child(3) > a');

  const evalImg = await getEvaluationScreenshot(page);

  await browser.close();
  return { attImg, evalImg };
}

export default scraper;
