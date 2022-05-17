// import L from "leaflet";
// import { getCordinates } from "./modules/Apifetch";

let searchValue = document.getElementById("search") as HTMLInputElement;
const searchForm = document.getElementById("search_form") as HTMLFormElement;

let myLocation: {
  ip: string;
  isp: string;
  location: string;
  timezone: string;
  lat: number;
  lng: number;
} = {
  ip: "73.106.192.3",
  isp: "Comcast",
  location: "Acworth" + "GA" + "30101",
  timezone: "-04:00",
  lat: 34.06635,
  lng: -84.67837,
};

// Get IP address co-ordinates

const getCordinates = (): any => {
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
      ip: searchValue.value,
    }),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  // .then((data)=>{
  //   return data
  // })
};

const getBrowserLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let coordinates = {
          newLat: `${position.coords.latitude}`,
          newLng: `${position.coords.longitude}`,
        };
        resolve(coordinates);
      },
      (error) => reject(error),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  });
};

// creating map layer

// const generateMap = (x: number = 0, y: number = 0, z: number = 1): any => {
const generateMap = (x: number = 0, y: number = 0, z: number = 1) => {
  //generate default map
  const map = L.map("map").setView([0, 0], 1);

  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(map);

  const marker = L.marker([myLocation.lat, myLocation.lng]).addTo(map);

  // };

  return {
    updateLocation: (x: number, y: number, z: number) => {
      map.setView([x, y], z);
      marker.setLatLng([x, y]);
    },
  };
};

//Generating default view
let myMap = generateMap();

// Search form submit and lookup call
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getCordinates().then((data:any)=>{
    console.log(data)
    // myMap.updateLocation(data.newLat, data.newLng, 8);
  })
  // const browserUpdate = async () => {
  //   const response: any = await getBrowserLocation();
  //   console.log(response)
  //   // myMap.updateLocation(response.newLat, response.newLng, 8);
  // };
  // browserUpdate();
  const findCoordinates = async () => {
    const result = await getCordinates();
  };
  findCoordinates();
});
