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

const getHtml = async (template, data) => {
    return await ejs.renderFile(path.join(__dirname, `${template}.ejs`), {
        ...data,
        font,
    });
};

async function generatePhoto(template, data) {
    const browser = await newBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 960 });
    await page.setContent(await getHtml(template, data));
    const screenshot = await page.screenshot();
    await browser.close();
    return screenshot;
}

exports.generatePhoto = generatePhoto;
