let searchValue = document.getElementById("search") as HTMLInputElement;
const searchForm = document.getElementById("search_form") as HTMLFormElement;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(getCordinates())
  getCordinates();
  
});

// Get IP address co-ordinates

const getCordinates = () => {
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
    })
  })
    .then((response)=>{
      if(!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json();
    })
    .then((data)=>{

    for (let key of Object.keys(data)){
      console.log(Object.values(data[key]))
    }

    })
};


  let myLocation: {ip: string, isp: string, location: string, timezone: string, lat:number, lng: number} ={
    ip: '73.106.192.3',
    isp: "Comcast",
    location: "Acworth" + "GA" + "30101",
    timezone: '-04:00',
    lat: 34.06635,
    lng: -84.67837
  }




const map = L.map("map").setView([myLocation.lat, myLocation.lng], 15);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// creating map layer
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

const marker = L.marker([myLocation.lat, myLocation.lng]).addTo(map);


