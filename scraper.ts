import puppeteer from 'puppeteer-extra';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { executablePath } from 'puppeteer';

import {
  getAttendanceScreenshot,
  getEvaluationScreenshot,
} from './utils/getScreenshots';
import login from './utils/login';

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

async function scraper(type: 'attendance' | 'evaluation') {
  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV === 'production' ? true : false,
    args: ['--no-sandbox'],
    executablePath:
      process.env.NODE_ENV === 'production'
        ? executablePath()
        : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });

  console.log('Browser started');

  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto('https://app.utu.ac.in/EngineeringSIS/', {
    waitUntil: 'networkidle0',
  });
  console.log('Page opened');

  await Promise.all([await login(page), await page.waitForNavigation()]);

  if (type === 'attendance') {
    const attImg = await getAttendanceScreenshot(page);
    await browser.close();
    return attImg;
  } else {
    await page.goto(
      'https://app.utu.ac.in/EngineeringSIS/Student/StudentAssessment.aspx'
    );
    const evalImg = await getEvaluationScreenshot(page);
    await browser.close();
    return evalImg;
  }
}

export default scraper;
