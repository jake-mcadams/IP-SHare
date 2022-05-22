"use strict";
const searchValue = document.getElementById("search");
const searchForm = document.getElementById("search_form");
let resIP = document.getElementById("ip_result");
let resLocation = document.getElementById("location_result");
let resTZ = document.getElementById("timezone_result");
let resISP = document.getElementById("ISP_result");
// Get IP address co-ordinates
const getCordinates = () => {
    const myHeaders = new Headers({
        "Content-Type": "application/json",
    });
    const myRequest = new Request("http://localhost:3000/apiLookup", {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
    });
    return fetch(myRequest, {
        body: JSON.stringify({
            search: searchValue.value,
        }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
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
const generateMap = (x = 0, y = 0, z = 1) => {
    //generate default map
    const map = L.map("map", { zoomControl: false }).setView([x, y], z);
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(map);
    // let marker = L.marker([x, y]).addTo(map);
    return {
        updateLocation: (x, y, z) => {
            let marker = L.marker([x, y]).addTo(map);
            map.setView([x, y], z);
            if (typeof marker == "undefined") {
                let marker = L.marker([x, y]).addTo(map);
            }
            console.log(`${x} and ${y}`);
            marker.setLatLng([x, y]);
        },
    };
};
//On error reset and dispaly error
const returnedErrorReset = (errType) => {
    const errIPLKUP = "Unable to find Location Please try again...";
    const errDNSLKUP = "Invalid Domain Name";
    const emptySearch = "No search parameter provdied...";
    switch (errType) {
        case "ipErr":
            searchValue.setAttribute("placeholder", errIPLKUP);
            break;
        case "dnsErr":
            searchValue.setAttribute("placeholder", errDNSLKUP);
            break;
        case "empty":
            searchValue.setAttribute("placeholder", emptySearch);
            break;
    }
    searchValue.value = "";
    searchValue.classList.add("returned_error");
};
//Update results
const updateResults = (dto) => {
    resIP.innerText = dto.ip;
    dto.region != null
        ? (resLocation.innerText = dto.region)
        : (resLocation.innerText = "Not found.");
    dto.timezone != null
        ? (resTZ.innerText = dto.timezone)
        : (resTZ.innerText = "Not found.");
    dto.organization_name != null
        ? (resISP.innerText = dto.organization_name)
        : (resISP.innerText = "Not found");
};
//switch case for return data
const returnCase = (resObj) => {
    console.log(`line 102: Entering Return case`);
    console.log(`${Object.values(resObj)}`);
    // let expErr:string;
    if (resObj.latitude === "nil" || resObj.longitude === "nil") {
        console.log(resObj.latitude);
        returnedErrorReset("ipErr");
    }
    if (resObj.Error_Code == 2) {
        console.log(`line 108: ${Object.keys(resObj)}`);
        console.log(resObj.Error_Code);
        returnedErrorReset("dnsErr");
    }
    myMap.updateLocation(resObj.latitude, resObj.longitude, 15);
    updateResults(resObj);
};
//Generating default view
let myMap = generateMap();
// Search form submit and lookup call
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getCordinates().then((data) => {
        console.log(`line 132: what we get back from api ${Object.keys(data)}`);
        returnCase(data);
    });
    //listen for input to remove error class
    searchValue.addEventListener("input", (e) => {
        searchValue.classList.remove("returned_error");
    });
});
