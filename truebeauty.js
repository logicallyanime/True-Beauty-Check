import { axios, JSDOM } from './require';
//const { getCherryData, makeRequest, getLineConfig, logError, CheckPost } = require("./cherry-data-handler");
const VIKI_API_URL = "https://api.viki.io/v4/containers/37374c/episodes.json?token=undefined&direction=asc&with_upcoming=true&sort=number&blocked=true&page=1&per_page=20&watch_schedule=1&app=100000a";
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
// eslint-disable-next-line prefer-const
let subsAvail = false;
async function getTrueData(curEp = 1) {
    const request = await axios.default.get(VIKI_API_URL);
    const json = await request.data.response;
    // const json = require('./test.json').response;
    let subs = false;
    const episode = json[curEp - 1];
    if (!isEmpty(episode.subtitle_completions)) {
        subs = episode.subtitle_completions.en == 100 ? true : false;
    }
    const poster = isEmpty(episode.images) ? null : episode.images.poster.url;
    const beauty = {
        "epNo": episode.number,
        "subComplete": subs,
        "poster": poster,
        "nextJob": episode.number != 16 ? new Date(json[curEp + 1].viki_air_time * 1000) : null
    };
    return beauty;
}
async function getHTML(url, DCUrl = true) {
    const options = {
        url: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    // eslint-disable-next-line prefer-const
    let request = await rp(options);
    return request;
}
// ? puppeteer might be a better option...
const baseUrl = 'https://dramacool.so';
const epURL = (epNo) => baseUrl + `/true-beauty-2020-episode-${epNo}.html`;
const ovrURL = baseUrl + '/drama-detail/true-beauty-2020';
async function SubsUp(epNo) {
    const resp = await getHTML(ovrURL);
    let { document } = new JSDOM(resp).window;
    let subStat = document.querySelector(`a[href="${epURL(epNo)}"] > span`).innerHTML;
    if (subStat == 'SUB') {
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
GetDCLinks(7);
console.log("hello");
// let links; 
// if(await SubsUp(epNo)){
//     //function call to retrieve links
//     links = await GetDCLinks(epNo);
//     //send Links 
// }
