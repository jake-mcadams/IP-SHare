"use strict";
// import { marker } from "leaflet";
// import * as L from "leaflet";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const getBrowserLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let coordinates = {
                newLat: `${position.coords.latitude}`,
                newLng: `${position.coords.longitude}`,
            };
            resolve(coordinates);
        }, (error) => reject(error), { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
    });
};
// creating map layer
// const generateMap = (x: number = 0, y: number = 0, z: number = 1): any => {
const generateMap = (x = 0, y = 0, z = 1) => {
    //generate default map
    const map = L.map("map").setView([0, 0], 1);
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(map);
    const marker = L.marker([myLocation.lat, myLocation.lng]).addTo(map);
    // };
    return {
        updateLocation: (x, y, z) => {
            map.setView([x, y], z);
            marker.setLatLng([x, y]);
        },
    };
};
//Generating default view
let myMap = generateMap();
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // getBrowserLocation().then((res:any)=>{
    //   console.log(`${res.newLat}, ${res.newLng}`)
    //   myMap.updateLocation(res.newLat, res.newLng, 8)
    // })
    const testing = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield getBrowserLocation();
        console.log('waiting for response');
        console.log(`got response: ${response}`);
        myMap.updateLocation(response.newLat, response.newLng, 8);
        console.log('updated map');
    });
    testing();
    // myMap.updateLocation(34.06635, -84.67837, 15);
});
