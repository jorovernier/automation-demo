const {By, Builder, Browser, until} = require('selenium-webdriver')

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
        // let movie = 'Detective Pikachu'

        await driver.sleep(1000)
        // You can find some elements multiple ways.
        // By id:
        await driver.findElement(By.id('add-movie-input')).sendKeys('Detective Pikachu') // you can use the movie variable here

        // By css with name attribute:
        // await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('Detective Pikachu') // you can use the movie variable here

        await driver.sleep(1000)
        await driver.findElement(By.css('button[type="submit"]')).click()
        // You can also do this with xpath
        // await driver.findElement(By.xpath('//button[@type="submit"]')).click()

        await driver.sleep(1000)
        const addedMovie = await driver.wait(until.elementLocated(By.xpath('//label[@for="movie-0"]')), 3000)
        // You can also so this with css
        // const addedMovie = await driver.wait(until.elementLocated(By.css('label[for="movie-0"]')), 3000)

        expect(await addedMovie.getText()).toBe('Detective Pikachu') // you can use the movie variable here
    })
})