/* eslint-disable @typescript-eslint/ban-ts-comment */
import { debugInit } from './require';
import puppeteer from 'puppeteer-extra';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
const debug = debugInit("videoEmbed");
const puppet = debug.extend('Puppeteer');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();


async function getEmbed(url : string) : Promise<string>{
    puppet("Navigating to URL: %s", url);
    await page.goto(url);
    // @ts-ignore
    const embedURL : string = await page.$eval('[class="Standard Server selected"]', element => element.dataset.video);
    puppet("Embed URL captured! : %s", embedURL);
    return embedURL.match(/(embed\.dramacool\..*id=.*)&title/)[1];
}

export async function getDirLink(epNo : string ) : Promise<string | null>{
    const embed = await getEmbed( epURL( Number.parseInt(epNo) ) );

    await page.setRequestInterception(true);
    
    puppet("Watchdog started, begin searching for Direct URL...")
    const watchdog = page.waitForRequest(req => req.url().includes('.mp4'), {"timeout": 15});
    await page.goto('http://' + embed);
    puppet("Navigating to URL: %s", embed);
    puppet("Waiting for page load")
    await page.waitForSelector('[class="jw-video jw-reset"]');
    puppet("Playing video")
    await page.evaluate(() => {
        // @ts-ignore
        jwplayer().play()
        setTimeout( ()=> jwplayer().pause(), 500)
    });

    puppet("Waiting for url...")
    const url = (await watchdog).url();

    if (!url){
        puppet("Oop something fucked up...")
        return null;
    }
    else {
        puppet("Url found! : %s", url)
        return url;
    }
}

const baseUrl = 'https://dramacool.so';

const epURL = (epNo: number|string) => baseUrl + `/true-beauty-2020-episode-${epNo}.html`;

const ovrURL = baseUrl + '/drama-detail/true-beauty-2020';

async function SubsUp(epNo : number) : Promise<boolean>{
    debug("Checking if Subtitles are availble on dramacool...")

    await page.goto(ovrURL);

    const subStat = await page.$eval(`a[href="${epURL(epNo)}"] > span`, element => { return element.innerHTML == 'SUB' ? true : false; })

    if (subStat) {
        console.log(`Subtitles are availble on DramaCool.`);
        console.log(`Episode ${epNo} Subbed is up on DramaCool`);
        return true; // ? return html?
    }
    console.log(`Subtitles are NOT availble on DramaCool.`);
    return false;
}

