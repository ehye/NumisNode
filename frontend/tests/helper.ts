import { expect, Page } from '@playwright/test'

const loginWith = async (page: Page, username: string, password: string) => {
  await page.getByLabel('avatar').click();
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible()
  await page.getByRole('button', { name: 'Log in' }).click();
}

export { loginWith }
