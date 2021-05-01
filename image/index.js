const fs = require("fs");
const path = require("path");
const core = require("puppeteer-core");
const ejs = require("ejs");

const font = fs
  .readFileSync(path.join(__dirname, "Poppins-Regular.ttf"))
  .toString("base64");
var browser;
var executablePath = "/usr/bin/chromium";

fs.access(executablePath, (err) => {
  if (err) executablePath = "/usr/bin/google-chrome";
});

const getBrowser = async () => {
  if (typeof browser !== "undefined") return browser;
  browser = await core.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: executablePath,
    headless: true,
  });
  return browser;
};

const getHtml = async (type, data) => {
  return await ejs.renderFile(path.join(__dirname, `${type}.ejs`), {
    ...data,
    font,
  });
};

module.exports.createImage = async (type, data) => {
  const page = await (await getBrowser()).newPage();
  page.setViewport({ width: 1280, height: 960 });
  page.setContent(await getHtml(type, data));
  const screenshot = await page.screenshot();
  page.close();
  return screenshot;
};
