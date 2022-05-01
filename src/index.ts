const searchValue = document.getElementById("#search") as HTMLInputElement;

let ipLocation: {lon: number, lat: number, zoom:number} ={
  lon: 40.7484,
  lat: 73.9857,
  zoom: 5
}

const map = L.map("map").setView([40.7484, -73.9857], 15);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// creating map layer
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

const marker = L.marker([40.7484, -73.9857]).addTo(map)
