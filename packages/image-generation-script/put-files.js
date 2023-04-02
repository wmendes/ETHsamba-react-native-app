import process from 'process'
import minimist from 'minimist'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import axios from 'axios';
import download from 'download';
import { nanoid } from 'nanoid'
import * as dotenv from 'dotenv'

import pinata from '@pinata/sdk'
const pinataObj = new pinataSDK('de79075c9aa850920020', '4d00ae7c1b1faec14f8981f1ad3e8f4a06a426cad19f4e165dda45dcf0e4a58a');


async function main () {
  dotenv.config()

  const weather = {
    1 : "clear sky",
    2: "Light clouds",
    3: "cloudy",
    4: "cloudy",
    5: "cloudy",
    6: "rain",
    7: "snow",
    8: "rain",
    9: "snow",
    10: "rain",
    11: "fog",
    12: "fog",
    13: "rain",
    14: "thunderstorm",
    15: "rain",
    16: "sandstorm"
}  

  let date_ob = new Date();
  console.log(date_ob.toISOString());
  const weatherdata = await axios.get('https://api.meteomatics.com/' + date_ob.toISOString() + '/weather_symbol_1h:idx/-22.912853606173396,-43.17995910299403/json',
    {
      auth: {
        username: "ita_ant_niodossantosdiniz",
        password: "nJmQ0HEz41"
      }
    }
  );

  let code = weatherdata.data.data[0].coordinates[0].dates[0].value;
  let strcode = code.toString();
  if(strcode.length > 1)
    strcode = strcode.slice(1);

  let intcode = parseInt(strcode);

  const { data } = await axios.post('https://api.openai.com/v1/images/generations', 
  {
    "prompt": "arcos da lapa with " + weather[intcode],
    "n": 1,
    "size": "512x512" 
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.DALLE_KEY
    }
  });

  let filename = nanoid() + '.jpg';
  await download(data.data[0].url, 'temp', {'filename' : filename});
  const readableStreamForFile = fs.createReadStream(filename);
  
  pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    //handle results here
    console.log(result);
  }).catch((err) => {
      //handle error here
      console.log(err);
  });


  // const token = process.env.WEB3_KEY;

  // const storage = new Web3Storage({ token })
  // const files = []

}

main()
