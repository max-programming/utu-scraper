import { Page } from 'puppeteer';
import { uploadImage } from './uploader';

export async function getAttendanceScreenshot(page: Page) {
  const attendanceSelector = '#ctl00_MainContent_divAttendance';
  await page.waitForSelector(attendanceSelector);
  const attendanceDiv = await page.$(attendanceSelector);
  const attendanceImage = await attendanceDiv?.screenshot();
  return await uploadImage(attendanceImage!);
}

export async function getEvaluationScreenshot(page: Page) {
  const evaluationSelector = '#ctl00_MainContent_UpdatePanel1';
  await page.waitForSelector(evaluationSelector);
  const evaluationDiv = await page.$(evaluationSelector);
  const evaluationImage = await evaluationDiv?.screenshot();
  return await uploadImage(evaluationImage!);
}
