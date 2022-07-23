var ul = '';
var added = false;
var reg = 'Loading';

// fetch('https://ipapi.co/json/')
//   .then(response => response.json())
//   .then(data => {
//     switch(data.continent_code) {
//       case "AS": case "OC": {
//         ul = 'https://cpxapiweb2.azurewebsites.net'
//         reg = 'AS'
//         break;
//       }
//       case "AF": case "EU": {
//         ul = 'https://cpxapiweb.azurewebsites.net'
//         reg = 'EU'
//         break;
//       }
//       default: {
//         ul = 'https://apiweb.cpxdev.tk'
//         reg = 'US'
//         break;
//       }
//     }
// });

ul = 'https://apiweb.cpxdev.tk'
reg = 'Worldwide'

function Flowup() {
      return {
             ul: ul,
             nme: reg
         }
}

export default Flowup;
