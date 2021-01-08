import { getDirLink} from '../videoEmbed'
import { debugInit, arp, MAC_ADDRESS, axios } from '../require';
const debug = debugInit("Webhook:Kodi");
import { execSync } from 'child_process';

async function Kodi(epNo : string){
    const MediaURL = getDirLink(epNo);

        debug("Grabbing ip address from Stored MAC.")
    const ip = await arp.toIP('7C-D5-66-D7-3C-8F');
        debug("Success IP address = %s",ip);

    //kodi remote ;;
    execSync(`./adb.sh ${ip}`);

    const data = JSON.stringify([{"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"file":"https://storage.googleapis.com/peppy-castle-292215/DE2J2KNVK8O/22d_1610052956_e_221352.mp4"}},"id":7}]);

    axios.post(`http://${ip}:8080/jsonrpc?Player.Open`, data);
}
