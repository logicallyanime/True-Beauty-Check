/* eslint-disable @typescript-eslint/ban-ts-comment */
import puppeteer from 'puppeteer-extra';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
async function getEmbed(url) {
    await page.goto(url);
    // @ts-ignore
    const embedURL = await page.$eval('[class="Standard Server selected"]', element => element.dataset.video);
    return embedURL.match(/(embed\.dramacool\..*id=.*)&title/)[1];
}
export async function getDirLink(epURL) {
    const embed = await getEmbed(epURL);
    await page.setRequestInterception(true);
    const watchdog = page.waitForRequest(req => req.url().includes('.mp4'), { "timeout": 15 });
    await page.goto('http://' + embed);
    await page.waitForSelector('[class="jw-video jw-reset"]');
    await page.evaluate(() => {
        // @ts-ignore
        jwplayer().play();
    });
    const url = (await watchdog).url();
    if (!url)
        return null;
    else
        return url;
}
const baseUrl = 'https://dramacool.so';
const epURL = (epNo) => baseUrl + `/true-beauty-2020-episode-${epNo}.html`;
const ovrURL = baseUrl + '/drama-detail/true-beauty-2020';
async function SubsUp(epNo) {
    await page.goto(ovrURL);
    const subStat = await page.$eval(`a[href="${epURL(epNo)}"] > span`, element => { return element.innerHTML == 'SUB' ? true : false; });
    if (subStat) {
        console.log(`Episode ${epNo} Subbed is up on DramaCool`);
        return true; // ? return html?
    }
    return false;
}
async function GetDCLinks(epNo) {
    // const resp = await getHTML(epURL(epNo));
    const resp = await getHTML(`https://kshows.to/goto.php?url=aHR0cHM6LyAdrefsdsdfwerFrefdsfrersfdsrfer363435349zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3NpbmNlcmUtcG9pbnQtMjkyMjE0L0tZQUVMWEU1NEY2NC8yMmRfMTYwOTUzMTk0MF9lXzIyMDAzOC5tcDQ=`, false);
    let { document } = new JSDOM(resp).window;
    let links = {
        "DirDL": encodeURIComponent(document.querySelector(`li[class="download"] > a`).href),
        "embed": document.querySelector(`li[class="xstreamcdn"]`).dataset.video
    };
    return links;
}
