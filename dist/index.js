"use strict";
// import { marker } from "leaflet";
// import * as L from "leaflet";
let searchValue = document.getElementById("search");
const searchForm = document.getElementById("search_form");
let browserRDO;
let myLocation = {
    ip: "73.106.192.3",
    isp: "Comcast",
    location: "Acworth" + "GA" + "30101",
    timezone: "-04:00",
    lat: 34.06635,
    lng: -84.67837,
};
// Get IP address co-ordinates
const getCordinates = () => {
    let rdo_ip;
    const myHeaders = new Headers({
        "Content-Type": "application/json",
    });
    let testURL = `http://localhost:3000/dbTest`;
    const myRequest = new Request("http://localhost:3000/dbTest", {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
    });
    fetch(myRequest, {
        body: JSON.stringify({
            ip: searchValue.value,
        }),
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
        .then((data) => {
        console.log(data);
    });
};
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let rdoLat;
    let rdoLng;
    // console.log(getCordinates());
    getCordinates();
    navigator.geolocation.getCurrentPosition(getBrowserLocation);
    updateLocation(34.06635, -84.67837, 15);
    console.log(browserRDO);
});
const getBrowserLocation = (position) => {
    // console.log(position.coords.latitude)
    // console.log(position.coords.longitude)
    console.log(position.coords);
    browserRDO = position.coords;
    return browserRDO;
};
// creating map layer
// const generateMap = (x: number = 0, y: number = 0, z: number = 1): any => {
const map = L.map("map").setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);
const marker = L.marker([myLocation.lat, myLocation.lng]).addTo(map);
// };
const updateLocation = (x, y, z) => {
    map.setView([x, y], z);
    marker.setLatLng([x, y]);
};
//Generating default view
// generateMap();
