import { test, expect } from '@playwright/test'
import { loginWith } from './helper'

test('login fails with wrong password', async ({ page }) => {
  await page.goto('/')
  loginWith(page, '1', '1')
  await expect(page.getByText('wrong credentials')).toBeVisible()
  await expect(page.locator('form')).toContainText('wrong credentials')
})

test.describe('login success', () => {
  test('show user name', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Lorem ipsum' })).toBeVisible()
    await expect(page.getByRole('heading')).toContainText('Lorem ipsum')
    loginWith(page, 'admin', 'secret')
    await expect(page.getByRole('heading')).toContainText('Lorem ipsum')
    await expect(page.getByRole('link', { name: 'Hi! Admin' })).toBeVisible()
  })
})
