import React, { useEffect, useRef } from "react"
import L from 'leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import GreeceJson from '../assets/greece.json'
const markerSizes = {
  s: {
    size: [15, 15],
    anchor: [15 / 2, 15 / 2],
    class: 's'
  },
  m: {
    size: [30, 30],
    anchor: [30 / 2, 30 / 2],
    class: 'm'
  },
  l: {
    size: [45, 45],
    anchor: [45 / 2, 45 / 2],
    class: 'l'
  },
  xl: {
    size: [60, 60],
    anchor: [60 / 2, 60 / 2],
    class: 'lx'
  }
};

const Map = ({ markers, update = true }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    const bounds = L.latLngBounds(L.latLng(29.82018104273, 12.0833711692), L.latLng(45.3355662229, 35.3743867942));
    mapRef.current = L.map('map', {
      center: bounds.getCenter(),
      zoom: 8,
      maxZoom: 11,
      minZoom: 7,
      maxBounds: bounds,
      zoomControl: false
    });
    L.geoJson(GreeceJson, {
        clickable: true,
        style: {
          color: "#e0e6ee",
          stroke: false,
          fill: true,
          fillColor: '#e0e6ee',
          fillOpacity: 1
        }
      }).addTo(mapRef.current);

      const lg = new L.FeatureGroup();

      markers.map(m => {
        var size = markerSizes.s;
        if (m.count === 1) {
          size = markerSizes.s;
        } else if (m.count < 10) {
          size = markerSizes.m;
        } else {
          size = markerSizes.l;
        }
        if (m.lat && m.lon) {
        let marker = L.marker([m.lat, m.lon], {
          title: m.location,
          zIndexOffset: m.count,
          icon:	L.divIcon({
            className: 'custom-div-icon',
              html: `<div class="marker-pin marker-pin-${size.class}"><span>${m.count}</span></div>`,
              iconSize: size.size,
              iconAnchor: size.anchor
            })
        }).bindPopup(`
        <div>
          <div class="covid-popup-title">
          ${m.location}
          </div>
          <div class="covid-popup-content">
            <div><div>Σύνολο</div> <div>${m.count} ${m.count > 1 ? 'κρούσματα' : 'κρούσμα'}</div></div>
            <div><div>Θάνατοι</div> <div>${m.dead}</div></div>
            <div><div>Επανήλθαν</div> <div>${m.recovered}</div></div>
          </div>
        </div>
        `, {
          closeButton: false,
          offset: [0, -size.anchor[0]]
        }).addTo(mapRef.current);
        lg.addLayer(marker);
      }
        return m;
      });

      lg.addTo(mapRef.current);
      mapRef.current.fitBounds(lg.getBounds());
  }, [markers]);

  useEffect(() => {
    mapRef.current.invalidateSize();
  }, [update])
  return <div id="map" />;
}

export default Map
