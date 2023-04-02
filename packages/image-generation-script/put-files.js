import process from 'process'
import minimist from 'minimist'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import axios from 'axios';
import download from 'download';
import { nanoid } from 'nanoid'
import * as dotenv from 'dotenv'
import * as Pinata from '@pinata/sdk';
import dataNft from './nft.json' assert {type: 'json'};

import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";

async function main () {
  dotenv.config()

//   const weather = {
//     1 : "clear sky",
//     2: "Light clouds",
//     3: "cloudy",
//     4: "cloudy",
//     5: "cloudy",
//     6: "rain",
//     7: "snow",
//     8: "rain",
//     9: "snow",
//     10: "rain",
//     11: "fog",
//     12: "fog",
//     13: "rain",
//     14: "thunderstorm",
//     15: "rain",
//     16: "sandstorm"
// }  

//   let date_ob = new Date();
//   const dayTime = date_ob.getHours() > 6 && date_ob.getHours() < 20 ? " by day" : " by night";

//   const weatherdata = await axios.get('https://api.meteomatics.com/' + date_ob.toISOString() + '/weather_symbol_1h:idx/-22.912853606173396,-43.17995910299403/json',
//     {
//       auth: {
//         username: "ita_ant_niodossantosdiniz",
//         password: "nJmQ0HEz41"
//       }
//     }
//   );

//   let code = weatherdata.data.data[0].coordinates[0].dates[0].value;
//   let strcode = code.toString();
//   if(strcode.length > 1)
//     strcode = strcode.slice(1);

//   let intcode = parseInt(strcode);

//   const { data } = await axios.post('https://api.openai.com/v1/images/generations', 
//   {
//     "prompt": "arcos da lapa with " + weather[intcode] + dayTime,
//     "n": 1,
//     "size": "512x512" 
//   }, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + process.env.DALLE_KEY
//     }
//   });
  

//   const token = process.env.WEB3_KEY;
//   const storage = new Web3Storage({ token })

//   let filename = nanoid() + '.jpg';
//   await download(data.data[0].url, 'temp', {'filename' : filename});
//   const pathFiles = await getFilesFromPath('temp/' + filename);
//   const cid = await storage.put(pathFiles);
  // const ipfsImageFile = cid + "/" + filename;
  const ipfsImageFile = "bafybeihagsgvw7qufxqgz2cz3ftckuzt42wax2n2dwp7p2ato2ieqc7oga/DWL8dLv27EFtiw9XnynBF.jpg"

const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = newKitFromWeb3(web3)
// console.log(dataNft)

await kit.connection.addAccount('0x914783966d5ff7fb7a5d07b9bd3a1f00bfb540ce42dc9decbdf4c8f619f2196a');
let balance = await kit.connection.getBalance('0x149E945188B7229Ed0C0df7F8125Fff45b6B0c9a');
const contract = new kit.web3.eth.Contract(dataNft.abi, "0x7B1a503BCd4Dc6cb874Bf3b3a83cCd16C3607e64")

// let response = contract.methods.mint('0x149E945188B7229Ed0C0df7F8125Fff45b6B0c9a', ipfsImageFile).call({from: '0x149E945188B7229Ed0C0df7F8125Fff45b6B0c9a'})
// response.then(e => console.log(e));

let response = await contract.methods.nextTokenId().call();
console.log(response);


}

main()
