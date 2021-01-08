import {axios, JSDOM, fileIO, RealDebLinker, CronJob, CronTime, consoler, rl, isOnline } from './require';
//const { getCherryData, makeRequest, getLineConfig, logError, CheckPost } = require("./cherry-data-handler");
const VIKI_API_URL = "https://api.viki.io/v4/containers/37374c/episodes.json?token=undefined&direction=asc&with_upcoming=true&sort=number&blocked=true&page=1&per_page=20&watch_schedule=1&app=100000a";
import { VIKI_API } from './interface';

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

// eslint-disable-next-line prefer-const
let subsAvail = false;

async function getTrueData(curEp = 1) {
    const request = await axios.get(VIKI_API_URL);
    const json: VIKI_API[] = await request.data.response;
    // const json = require('./test.json').response;
    let subs = false;
    const episode: VIKI_API = json[curEp - 1];

    if ( !isEmpty( episode.subtitle_completions ) ) {
        subs = episode.subtitle_completions.en == 100 ? true : false;
    }

    const poster = isEmpty(episode.images) ? null : episode.images.poster.url;

    const beauty = {              // TODO: Add error catching for missing things
        "epNo": episode.number,
        "subComplete": subs,
        "poster": poster,
        "nextJob": episode.number != 16 ? new Date(json[ curEp+1 ].viki_air_time * 1000) : null
    };

    return beauty;
}




console.log("hello");

// let links; 

// if(await SubsUp(epNo)){
//     //function call to retrieve links
//     links = await GetDCLinks(epNo);

//     //send Links 
// }

