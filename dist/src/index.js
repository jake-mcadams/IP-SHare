"use strict";
let searchValue = document.getElementById("search");
const searchForm = document.getElementById("search_form");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(getCordinates())
});
// Get IP address co-ordinates
// const getCordinates = () => {
//   const myHeaders = new Headers({
//     "Content-Type": "application/json",
//   });
//   let testURL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_oAlnCfwFErXLt8X82dbK9K5XKSTk4&ipAddress${searchValue.value}`;
//   const myRequest = new Request(testURL, {
//     method: "GET",
//     mode: "cors",
//     cache: "default",
//   });
//   fetch(myRequest)
//     .then((response)=>{
//       if(!response.ok) {
//         throw new Error("Network response was not ok")
//       }
//       return response.json();
//     })
//     .then((data)=>{
//       // let ipLat: number = data['location']['lat']
//       // console.log(data['location']['lat'])
//       // console.log(data['location']['lng'])
//       // let ipLng: number = data['location']['lng']
//       let wantedData: {ip: number, location:any, isp: number} = {
//         ip: data["ip"],
//         location: data["location"],
//         isp: data["isp"]
//       }
//       console.log(wantedData);
//     })
// };
let myLocation = {
    ip: '73.106.192.3',
    isp: "Comcast",
    location: "Acworth" + "GA" + "30101",
    timezone: '-04:00',
    lat: 34.06635,
    lng: -84.67837
};
const map = L.map("map").setView([myLocation.lat, myLocation.lng], 15);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
// creating map layer
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);
const marker = L.marker([myLocation.lat, myLocation.lng]).addTo(map);
