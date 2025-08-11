const { test, expect } = require('@playwright/test');

test('button has correct text', async ({ page }) => {
  await page.setContent('<button>Play</button>');
  await expect(page.locator('button')).toHaveText('Play');
});
