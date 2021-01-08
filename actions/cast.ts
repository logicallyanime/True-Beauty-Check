import { getDirLink} from '../videoEmbed'
import ChromecastAPI, { Device } from 'chromecast-api'
import { debugInit} from '../require';

const debug = debugInit("Webhook:Chromecast");
 
const client = new ChromecastAPI();

export async function Chromecast(epNo : string):Promise<void>{
    const MediaURL = await getDirLink(epNo);

    debug("Seaching for Devices")
    client.on('device', function (device:Device) {
        debug("Playing on %s", device.friendlyName);
        device.play(MediaURL, function (err) {
            if (!err) debug("Playing on %s", device.friendlyName);
            else debug(err);
        })
    })
}