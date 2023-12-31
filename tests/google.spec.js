// @ts-check
const { test, expect } = require('@playwright/test');
const assert = require('assert');

test.beforeEach(async ({ page }) => {
    // Külastame Google.com lehte ja veendume, et see on korrektselt laaditud
    await page.goto('https://www.google.ee/?hl=et');
    await expect(page).toHaveTitle(/Google/);
});
async function acceptCookies(page) {
    // create a new todo locator
    await expect(page.getByRole('button', { name: 'Nõustu kõigiga' })).toBeVisible();
    await page.getByRole('button', { name: 'Nõustu kõigiga' }).click();
}

test.describe('Tavalise otsingu sooritamine', () => {
    test('küpsistega nõustudes peaks veebilehe uuesti laadimisel aken mitte ilmuma', async ({ page }) => {
        // Leiame üles "Nõustu kõigiga" nupu ja klõpsame seda
        await acceptCookies(page);
        // Veendume, et küpsiste aken pole enam nähtaval
        await expect(page.getByRole('button', { name: 'Nõustu kõigiga' })).toBeHidden();
        // Laadime lehe uuesti
        await page.getByLabel('Otsi', { exact: true }).press('F5');
        // Veendume, et küpsiste aken pole enam nähtaval
        await expect(page.getByRole('button', { name: 'Nõustu kõigiga' })).toBeHidden();
    });
    test('sisestades mingisuguse märksõna, peaksid ilmuma sellele vastavad otsingutulemused', async ({ page }) => {
        // Külastame Google.com lehte ja veendume, et see on korrektselt laaditud, seejärel nõustume küpsistega klõpsates "Nõustu kõigiga" nuppu
        await acceptCookies(page);
        // Leiame üles otsinguvälja
        await page.getByLabel('Otsi', { exact: true }).click();
        // Sisestame märksõna "Playwright" ja vajutame sisestusklahvi
        await page.getByLabel('Otsi', { exact: true }).fill('Playwright');
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        // Kontrollime, et märksõna oleks veebilehe pealkirjas ja otsinguväljal
        await expect(page).toHaveTitle(/Playwright - Google otsing/);
        await expect(page.getByRole('combobox', { name: 'Otsi' })).toHaveText('Playwright');
    });
    test('klõpsates mingisugusel otsingutulemusel peaksime väljuma Google veebirakendusest', async ({ page }) => {
        // Külastame Google.com lehte ja veendume, et see on korrektselt laaditud, seejärel nõustume küpsistega klõpsates "Nõustu kõigiga" nuppu
        await acceptCookies(page);
        // Leiame üles otsinguvälja
        await page.getByLabel('Otsi', { exact: true }).click();
        // Sisestame märksõna "Playwright" ja vajutame sisestusklahvi
        await page.getByLabel('Otsi', { exact: true }).fill('Playwright');
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        // Kontrollime, et märksõna oleks veebilehe pealkirjas ja otsinguväljal
        await expect(page).toHaveTitle(/Playwright - Google otsing/);
        await expect(page.getByRole('combobox', { name: 'Otsi' })).toHaveText('Playwright');
        // Klõpsame esimesel tulemusel
        await page.waitForTimeout(5000);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(101);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(98);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(97);
        await page.keyboard.press('Tab');
        await page.waitForTimeout(96);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(102);
        await page.waitForTimeout(5000);
        // Veendume, et märksõnaga otsinguvälja poleks veebilehel ja Google poleks mainitud lehe pealkirjas
        await assert.notEqual(await page.title(), /Playwright - Google otsing/);
        await expect(page.getByLabel('Otsi', { exact: true })).not.toBeAttached();
    });
})
test.describe('Pildiotsing', () => {
    test('klõpsates "Pildid" siselingil peaksime jõudma "Google pildid" lehele', async ({ page }) => {
        // Külastame Google.com lehte ja veendume, et see on korrektselt laaditud, seejärel nõustume küpsistega klõpsates "Nõustu kõigiga" nuppu
        await acceptCookies(page);
        // Leiame üles "Pildid" siselingi ja klõpsame seda
        await page.getByLabel('Piltide otsimine (avab uue vahelehe)').click();
        // Veendume, et lehekülje pealkirjas oleks "Google pildid" ja "Otsige pildi järgi" nupp oleks nähtav
        await expect(page).toHaveTitle(/Google pildid/);
        await expect(page.getByLabel('Otsige pildi järgi')).toBeAttached();
    })


    test('sisestades mingisuguse märksõna, peaksid ilmuma sellele vastavad pildid', async ({ page }) => {
        // Külastame Google.com lehte ja veendume, et see on korrektselt laaditud, seejärel nõustume küpsistega klõpsates "Nõustu kõigiga" nuppu
        await acceptCookies(page);
        // Leiame üles "Pildid" siselingi ja klõpsame seda
        await page.getByLabel('Piltide otsimine (avab uue vahelehe)').click();
        // Leiame üles otsinguvälja
        await page.getByLabel('Otsi', { exact: true }).click();
        // Sisestame märksõna "Playwright" ja vajutame sisestusklahvi
        await page.getByLabel('Otsi', { exact: true }).fill('Playwright');
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        // Kontrollime, et lehekülje pealkirjas oleks sisestatud märksõna
        await expect(page).toHaveTitle(/Playwright – Google'i otsing/);
        // Veendume, et leheküljel oleks nähtaval vähemalt 10 pilti
        const images = await page.$$('img');
        await assert.ok(images.length >= 10);
    })
})

test.describe('Otsing filtritega', () => {
    test('sisestades mingi märksõna ning jättes teatud märksõnad välja lisades neile "-" prefiksi, ei tohiks otsingulehele jääda tulemusi, mis sisaldavad välistatud märksõnu', async ({ page }) => {
        // Külastame Google.com lehte ja veendume, et see on korrektselt laaditud, seejärel nõustume küpsistega klõpsates "Nõustu kõigiga" nuppu
        await acceptCookies(page);
        // Leiame üles otsinguvälja
        await page.getByLabel('Otsi', { exact: true }).click();
        // Sisestame märksõnad "windows -os -microsoft" ja vajutame sisestusklahvi
        await page.getByLabel('Otsi', { exact: true }).fill('windows -os -microsoft');
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        // Veendume, et leheküljel ei ole märksõnu "os" ja "microsoft" v.a. pealkirjas ja otsinguväljal
        const osElements = await page.getByText(/os/i)
        const microsoftElements = await page.getByText(/microsoft/i)
        await expect(osElements).toHaveCount(1)
        await expect(microsoftElements).toHaveCount(1)
    })
    test('sisestades märksõnad jutumärkide vahele, peaksid otsingulehel olevad tulemused sisaldama sisestatud tsitaati', async ({ page }) => {
        // Külastame Google.com lehte ja veendume, et see on korrektselt laaditud, seejärel nõustume küpsistega klõpsates "Nõustu kõigiga" nuppu
        await acceptCookies(page);
        // Leiame üles otsinguvälja
        await page.getByLabel('Otsi', { exact: true }).click();
        // Sisestame jutumärkidega "The quick brown fox jumps over the lazy dog." ja vajutame sisestusklahvi
        await page.getByLabel('Otsi', { exact: true }).fill('"The quick brown fox jumps over the lazy dog."');
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        // Kontrollime, et fraas oleks tulemuste lehel lisaks pealkirjale ja otsinguväljale ka tulemuste loetelus
        const foxElements = await page.getByText(/The quick brown fox jumps over the lazy dog./)
        await expect(foxElements).not.toHaveCount(1)
        await expect(foxElements).not.toHaveCount(0)
    })
})