 const form = document.getElementById("mainForm");
 const textInput = document.getElementById("textInput")
 const ip = document.getElementById("ipAddress");
 const locatio = document.getElementById("location");
 const timezone = document.getElementById("timezone");
 const isp = document.getElementById("isp");

 document.addEventListener("DOMContentLoaded", async () => {
    await fetch('https://api64.ipify.org?format=json')
     .then(data => data.json())
     .then(async (data) => {
      const ipDom = data.ip;
      await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipDom}`)
      .then(data => data.json())
      .then(data => {
         ip.innerHTML = data.ip;
         locatio.innerHTML = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
         timezone.innerHTML = data.location.timezone;
         isp.innerHTML = data.isp;
       })
   })
 })

 form.addEventListener("submit", async event =>{
  event.preventDefault()
  const domain = await textInput.value;
  const ipDom = await textInput.value;
  await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipDom}&domain=${domain}`)
   .then(data => data.json())
   .then(data => {
     if(data.ip !== undefined)
     ip.innerHTML= data.ip;
     locatio.innerHTML = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
     timezone.innerHTML = data.location.timezone;
     isp.innerHTML = data.isp; 
     textInput.value = "";
     const {lat,lng} = data.location;
     mymap.setView([lat,lng],12)
     L.marker([lat, lng], {icon: greenIcon}).addTo(mymap);
   })
   .catch( () => { 
    alert("invalid ip or domain, please try again");
   });
 });

textInput.addEventListener("mouseover", () => {
  textInput.value = ip.innerHTML +"  ";
})