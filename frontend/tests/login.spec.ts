import { test, expect } from '@playwright/test'
import { loginWith } from './helper'

test('login fails with wrong password', async ({ page }) => {
  await page.goto('/')
  await loginWith(page, '1', '1')
  await expect(page.getByText('wrong credentials')).toBeVisible()
})
