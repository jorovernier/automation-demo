const {Builder, Browser, By, until} = require('selenium-webdriver')

let driver;

beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build()
});

afterEach(async () => {
    await driver.quit()
})

describe('Test the Movies App', () => {
    test('can add a movie', async () => {
        await driver.get('http://localhost:3000/')

        // You can pass in the movie name dynamically by making a variable.
        // let searchKey = 'Detective Pikachu'

        await driver.sleep(2000)

        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('Detective Pikachu')
        // await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys(searchKey)

        await driver.sleep(2000)

        await driver.findElement(By.css('button[type="submit"]')).click()

        await driver.sleep(2000)

        const addedMovie = await driver.wait(until.elementLocated(By.css('#movies-list li label')), 1000)
        // You can also select the label by the "for" attribute.
        // const addedMovie = await driver.wait(until.elementLocated(By.css('label[for="movie-0"]')), 1000)

        expect(await addedMovie.getText()).toBe('Detective Pikachu')
        // expect(await addedMovie.getText()).toBe(searchKey)
    })
})