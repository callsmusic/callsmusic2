const fs = require("fs");
const path = require("path");
const core = require("puppeteer");
const ejs = require("ejs");

const font = fs
    .readFileSync(path.join(__dirname, "Poppins-Regular.ttf"))
    .toString("base64");

const newBrowser = async () => {
    return (browser = await core.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: true,
    }));
};

const getHtml = async (type, data) => {
    return await ejs.renderFile(path.join(__dirname, `${type}.ejs`), {
        ...data,
        font,
    });
};

module.exports.createImage = async (type, data) => {
    const browser = await newBrowser();
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 960 });
    page.setContent(await getHtml(type, data));
    const screenshot = await page.screenshot();
    await browser.close();
    return screenshot;
};
