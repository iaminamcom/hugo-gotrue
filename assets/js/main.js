const $ = (el) => document.querySelector(el)
const loader = $('.loader');

function addMarkers(array) {
  const markers = L.markerClusterGroup();

  for (let i = 0; i < array.length; i++) {
    const a = array[i];
    const marker = L.marker(new L.LatLng(a.coords[1], a.coords[0]), { title: a.name });
    marker.bindPopup("<img src='" + a.img + "?tr=w-156' width='100%' style='min-height:3rem;background:#eee'/><div><b>" + a.name + "</b></div>", { minWidth: 200 });
    markers.addLayer(marker);
  }

  return markers
}

function runAfterAthorization(token) {
  const center = L.latLng(51.505, -0.09);
  const zoom = 12;
  const tiles = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    { maxZoom: 17, minZoom: zoom, attribution: "© OpenStreetMap" }
  );
  const map = L.map("map", { center, zoom, layers: [tiles] });
  map.on("moveend", getMarkers);
  map.on('movestart', () => { $('.leaflet-left .leaflet-control').append(loader); loader.hidden = false })

  async function getMarkers(e) {
    const bounds = e.target.getBounds();
    const NE = bounds._northEast, SW = bounds._southWest
    const url = `/.netlify/functions/data/?NE=${NE.lng},${NE.lat}&SW=${SW.lng},${SW.lat}`

    try {
      const response = await fetch(url, { headers: { authorization: `Bearer ${token.access_token}` } })
      const data = await response.json()
      if (!data.auth) { throw 'Authorization not working! Login again.' }
      console.log(data);
      const formattedData = data.data.map((e, i) => { return { coords: e.location.geometry.coordinates, id: e._id, index: i, img: e.images[0], name: e.Name } })

      const addressPoints = [[-0.09, 51.505], [-0.09, 51.505], [-0.091, 51.505]];
      const markers = addMarkers(formattedData)
      loader.hidden = true
      map.addLayer(markers);
    } catch (error) {
      console.log(error)
      alert('Error occured while retrive data.\nCheck log for details.')
    }
  }
}

const currentUser = netlifyIdentity.currentUser()
if (currentUser) runAfterAthorization(currentUser.token)
else netlifyIdentity.on('login', (user) => runAfterAthorization(user.token));
