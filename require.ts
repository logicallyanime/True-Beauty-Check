import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

import { JSDOM } from "jsdom";
import axios from "axios";
import * as express from 'express'
import * as fileIO from 'fs';
import * as RealDebridClient from 'node-real-debrid';
import { CronJob, CronTime } from 'cron';
import * as events from 'events';
import * as readline from 'readline';
import * as isOnline from 'is-online';
import * as localtunnel from 'localtunnel';
import * as Debug from 'debug'
import arp from '@network-utils/arp-lookup';
export const debug = Debug('TrueBeauty');
const { DEBRID_TOKEN, LINE_TOKEN, MAC_ADDRESS } = process.env;
const RealDebLinker = RealDebridClient(DEBRID_TOKEN);
const consoler = new events.EventEmitter();
if (typeof localStorage === "undefined" || localStorage === null) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const LocalStorage = require('node-localstorage');
  localStorage = new LocalStorage('./scratch');
}

export function debugInit(namespace:string) : debug.Debugger {
  return debug.extend(namespace)
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

export { JSDOM, axios, fileIO, RealDebLinker, CronJob, CronTime, consoler, 
          rl, isOnline, LINE_TOKEN, express, localtunnel, arp, MAC_ADDRESS};