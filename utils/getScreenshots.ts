import { Page } from 'puppeteer';

export async function getAttendanceScreenshot(page: Page) {
  const attendanceSelector = '#ctl00_MainContent_divAttendance';
  await page.waitForSelector(attendanceSelector);
  const attendanceDiv = await page.$(attendanceSelector);
  await attendanceDiv?.screenshot({ path: './attendance.png' });
  console.log('Attendance Screenshot saved');
}

export async function getEvaluationScreenshot(page: Page) {
  const evaluationSelector = '#ctl00_MainContent_UpdatePanel1';
  await page.waitForSelector(evaluationSelector);
  const evaluationDiv = await page.$(evaluationSelector);
  await evaluationDiv?.screenshot({ path: './evaluation.png' });
  console.log('Evaluation Screenshot saved');
}
