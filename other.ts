import arp from '@network-utils/arp-lookup'
(async() =>{
const e = await arp.toIP('7C-D5-66-D7-3C-8F');
console.log(e)
})();