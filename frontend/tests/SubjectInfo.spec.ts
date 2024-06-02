import { test, expect } from '@playwright/test'

test('info page like required login', async ({ page }) => {
  await page.goto('/')
  await page.locator('a').filter({ hasText: 'Explore' }).click()
  await page.getByRole('link', { name: 'Cents - Victoria' }).click()
  await page.getByRole('button', { name: 'Likes' }).click()
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
})
