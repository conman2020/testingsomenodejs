const fs = require('fs');
const process= require('process');
const axios = require('axios');


function cat (firstString,secondString){
fs.readFile(firstString, 'utf8', (err,data) => {
  
    if(err){
        console.log(`ERROR reading file ${data}`);
        process.exit(1);
    }else {
    console.log( data);
    newPath(data, secondString)}
});
}

function newPath(resp,secondInput){
    if(secondInput){
        fs.writeFile(secondInput,resp,'utf8', function(err){
            if (err){
                console.error(`Couldn't write ${resp}: ${err}`);
                process.exit(1);
            }
        });
    }else {
        console.log(resp);
    }
}



//     fs.writeFile(out, text, 'utf8', function(err) {
//         if (err) {
//           console.error(`Couldn't write ${out}: ${err}`);
//           process.exit(1);
//         }
//       });
//     } else {
//       console.log(text);c
//     }

// }

async function webCat(url,secondString) {
    try {
      let resp = await axios.get(url);
      console.log(resp);
      newPath(resp.data,secondString)
    } catch (err) {
      console.error(`Error fetching ${path}: ${err}`);
      process.exit(1);
    }
  }


let firstString ; 
let secondString;

if(process.argv[2]=== '--out'){
    firstString =process.argv[3];
    secondString= process.argv[4];
}else {
    firstString=process.argv[2]

}
if (secondString.slice(0, 4) === 'http') {
    webCat(secondString,firstString);
  } else {
    cat(secondString, firstString);
  }