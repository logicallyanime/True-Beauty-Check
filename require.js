import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });
const { DEBRID_TOKEN, LINE_TOKEN } = process.env;
import { JSDOM } from "jsdom";
import axios from "axios";
import * as express from 'express';
import * as fileIO from 'fs';
import * as RealDebridClient from 'node-real-debrid';
const RealDebLinker = RealDebridClient(DEBRID_TOKEN);
import { CronJob, CronTime } from 'cron';
import * as events from 'events';
const consoler = new events.EventEmitter();
import * as readline from 'readline';
import * as isOnline from 'is-online';
import * as localtunnel from 'localtunnel';
if (typeof localStorage === "undefined" || localStorage === null) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const LocalStorage = require('node-localstorage');
    localStorage = new LocalStorage('./scratch');
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
export { JSDOM, axios, fileIO, RealDebLinker, CronJob, CronTime, consoler, rl, isOnline, LINE_TOKEN, express, localtunnel };
