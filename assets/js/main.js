const center = L.latLng(51.505, -0.09);
const zoom = 15;

const tiles = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  { maxZoom: 17, minZoom: zoom, attribution: "© OpenStreetMap" }
);
const map = L.map("map", { center, zoom, layers: [tiles] });
const markers = L.markerClusterGroup();

const addressPoints = [[-0.09, 51.505], [-0.09, 51.505], [-0.091, 51.505]];

for (let i = 0; i < addressPoints.length; i++) {
  const a = addressPoints[i];
  const marker = L.marker(new L.LatLng(a[1], a[0]), { title: "title" });
  marker.bindPopup("title");
  markers.addLayer(marker);
}

map.addLayer(markers);
map.on("moveend", addMarkers);

function addMarkers(e) {
  const { _northEast, _southWest } = e.target.getBounds();
  console.log(_northEast, _southWest);
}
// db.data.find({"location.geometry": { $geoWithin: { $box: [[-0.08836805820465088, 51.50545363381515], [-0.09179592132568361, 51.5044953223804]]} }})
