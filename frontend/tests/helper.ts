const loginWith = async (page, username, password) => {
  await page.getByRole('link', { name: 'Log in' }).click()
  await page.locator('form div').filter({ hasText: 'username' }).getByRole('textbox').fill(username)
  await page.locator('input[type="password"]').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

export { loginWith }
