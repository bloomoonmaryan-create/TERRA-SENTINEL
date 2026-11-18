const USGS_API =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

async function getEarthquakes() {
  const response = await fetch(USGS_API);

  if (!response.ok) {
    throw new Error("USGS data unavailable");
  }

  const data = await response.json();

  return (data.features || []).map((event) => {
    const properties = event.properties;
    const coordinates = event.geometry.coordinates;

    return {
      id: event.id,
      magnitude: properties.mag,
      place: properties.place,
      time: properties.time,
      depth: coordinates[2],
      latitude: coordinates[1],
      longitude: coordinates[0],
      url: properties.url
    };
  });
}

if (typeof module !== "undefined") {
  module.exports = { getEarthquakes };
}
