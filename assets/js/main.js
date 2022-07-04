async function request(t, url) {
  const response = await fetch(url, { headers: { authorization: `Bearer ${t.access_token}` } })
  return await response.json()
}

function runAfterAthorization(token) {
  const center = L.latLng(51.505, -0.09);
  const zoom = 15;
  const tiles = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    { maxZoom: 17, minZoom: zoom, attribution: "© OpenStreetMap" }
  );
  const map = L.map("map", { center, zoom, layers: [tiles] });
  const markers = L.markerClusterGroup();
  map.on("moveend", addMarkers);

  const addressPoints = [[-0.09, 51.505], [-0.09, 51.505], [-0.091, 51.505]];

  for (let i = 0; i < addressPoints.length; i++) {
    const a = addressPoints[i];
    const marker = L.marker(new L.LatLng(a[1], a[0]), { title: "title" });
    marker.bindPopup("title");
    markers.addLayer(marker);
  }
  map.addLayer(markers);

  async function addMarkers(e) {
    const bounds = e.target.getBounds();
    const NE = bounds._northEast, SW = bounds._southWest
    const url = `/.netlify/functions/data/?NE=${NE.lng},${NE.lat}&SW=${SW.lng},${SW.lat}`
    const data = await request(token, url)
    console.log(data);
  }

}

const currentUser = netlifyIdentity.currentUser()
if (currentUser) {
  runAfterAthorization(currentUser.token)
} else {
  netlifyIdentity.on('login', (user) => runAfterAthorization(user.token));
}

// db.data.find({"location.geometry": { $geoWithin: { $box: [[-0.08836805820465088, 51.50545363381515], [-0.09179592132568361, 51.5044953223804]]} }})