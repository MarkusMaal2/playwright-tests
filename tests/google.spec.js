// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    // Külastame Google.com lehte ja veendume, et see on korrektselt laaditud
    await page.goto('https://www.google.ee/?hl=et');
    await expect(page).toHaveTitle(/Google/);
});



test.describe('Tavalise otsingu sooritamine', () => {

    test('küpsistega nõustudes peaks veebilehe uuesti laadimisel aken mitte ilmuma', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'Nõustu kõigiga' })).toBeVisible();
        await page.getByRole('button', { name: 'Nõustu kõigiga' }).click();
        await expect(page.getByRole('button', { name: 'Nõustu kõigiga' })).toBeHidden();
        await page.getByLabel('Otsi', { exact: true }).press('F5');
        await expect(page.getByRole('button', { name: 'Nõustu kõigiga' })).toBeHidden();
    });
})