var ul = '';
var added = false;
var reg = 'Loading';

fetch('https://route.cpxdev.tk/api/checkregion', {method: 'POST'})
.then(response => response.json())
  .then(data => {
    if (data["url"] !== "") {
      fetch(data["url"] + '/home/status')
      .then(response => response)
      .then(() => {
        added = true
        ul = data["url"];
        reg = data.zone
      }).catch(() => {
        added = true
        ul = data.alter["url"];
        reg = data.alter.zone
      });   
    }
  }).catch(() => {
    added = true
    ul = '';
    reg = 'Unknown Region'
  });



function Flowup() {
    return {
        ul: ul,
        nme: reg
    }
}

export default Flowup;