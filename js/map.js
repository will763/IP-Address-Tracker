
const apiKey = 'at_VMHIVTX3lzmUBkqvnMJkmRxOOcCIL';

  const mymap = L.map('mapid',{zoomControl:false});
  mymap.setMinZoom(1)


       L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
   maxZoom: 18,
   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
       'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
   id: 'mapbox/streets-v11',
   tileSize: 512,
   zoomOffset: -1
}).addTo(mymap);

const greenIcon = L.icon({
    iconUrl: 'js/icon-location.svg',

    iconSize:     [38, 50], 
    iconAnchor:   [22, 94],
    popupAnchor:  [-3, -76] 
});

document.addEventListener("DOMContentLoaded", async () => {
    await fetch('https://api64.ipify.org?format=json')
     .then(data => data.json())
     .then(async (data) => {
     const ipDom = data.ip;
      await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipDom}`)
      .then(data => data.json())
      .then(data => {
         const {lat,lng} = data.location;
         mymap.setView([lat,lng],13)
         L.marker([lat, lng], {icon: greenIcon}).addTo(mymap);
       })
   })
 });
       