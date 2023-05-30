const {Builder, Browser, By, until} = require('selenium-webdriver')

let driver;

beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build()
});

afterEach(async () => {
    await driver.quit()
})

test("Test the Movies App", async () => {
    await driver.get("http://localhost:3000/")
    await driver.sleep(2000)

    await driver.findElement(By.name('movieTitle')).sendKeys("Detective Pikachu")
    await driver.sleep(2000)

    await driver.findElement(By.css('button[type="submit"]')).click()
    await driver.sleep(2000)

    const addedMovie = await driver.wait(until.elementLocated(By.css('label[for="movie-0"]')), 1000)

    expect(await addedMovie.getText()).toBe("Detective Pikachu")
})