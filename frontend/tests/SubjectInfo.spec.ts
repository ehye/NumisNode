import { test, expect } from '@playwright/test'

test('info page like required login', async ({ page }) => {
  await page.goto('/')
  await page.locator('a').filter({ hasText: 'Explore' }).click()
  await expect(page.locator('.chakra-card__body').first()).toBeVisible()
  await page.getByText('Lorem ipsum dolor sit amet,').click();
  await expect(page.getByRole('button', { name: 'Likes' })).toBeVisible();
  await page.getByRole('button', { name: 'Likes' }).click()
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible()
})
