import { userId, password } from '../credentials.json';
import { Page } from 'puppeteer';

export default async function login(page: Page) {
  await page.evaluate(
    ({ userId, password }) => {
      const userIdEl = document.getElementById('txtUserId') as HTMLInputElement;
      const passwordEl = document.getElementById(
        'txtPassword'
      ) as HTMLInputElement;
      const btnSignIn = document.getElementById(
        'btnSignIn'
      ) as HTMLButtonElement;

      userIdEl.value = userId;
      passwordEl.value = password;

      btnSignIn.click();
    },
    { userId, password }
  );
}
