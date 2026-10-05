import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { useGeoPhotos } from '@/context/GeoPhotosContext';

export default function MapaScreen() {
  const { photos } = useGeoPhotos();

  const photosWithLocation = photos.filter(
    (photo) => photo.coords !== null
  );

  const firstLocation = photosWithLocation[0]?.coords;

  const latitude = firstLocation?.latitude ?? 11.5444;
  const longitude = firstLocation?.longitude ?? -72.9072;

  const markers = photosWithLocation
    .map((photo) => {
      if (!photo.coords) return '';

      return `
        L.marker([${photo.coords.latitude}, ${photo.coords.longitude}])
          .addTo(map)
          .bindPopup(
            "<b>📷 Fotografía tomada aquí</b><br><br>" +
            "📍 Latitud: ${photo.coords.latitude.toFixed(6)}<br>" +
            "📍 Longitud: ${photo.coords.longitude.toFixed(6)}"
          );
      `;
    })
    .join('\n');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />

        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

        <style>
          html, body, #map {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>

      <body>
        <div id="map"></div>

        <script>
          const map = L.map('map').setView(
            [${latitude}, ${longitude}],
            15
          );

          L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
              maxZoom: 19,
              attribution: '&copy; OpenStreetMap contributors'
            }
          ).addTo(map);

          ${markers}
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Mapa de fotografías</Text>

      <Text style={styles.subtitle}>
        {photosWithLocation.length > 0
          ? `${photosWithLocation.length} fotografía(s) con ubicación`
          : 'Aún no hay fotografías con ubicación'}
      </Text>

      <View style={styles.mapContainer}>
        <WebView
          originWhitelist={['*']}
          source={{ html }}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          style={styles.map}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>
          📸 Fotografías ubicadas
        </Text>

        {photosWithLocation.length === 0 ? (
          <Text style={styles.empty}>
            Toma una fotografía desde GeoCam después de obtener
            tu ubicación.
          </Text>
        ) : (
          photosWithLocation.map((photo, index) => (
            <View key={photo.id} style={styles.photoInfo}>
              <Text style={styles.photoTitle}>
                Fotografía {index + 1}
              </Text>

              <Text style={styles.coordinates}>
                📍 Latitud:{' '}
                {photo.coords!.latitude.toFixed(6)}
              </Text>

              <Text style={styles.coordinates}>
                📍 Longitud:{' '}
                {photo.coords!.longitude.toFixed(6)}
              </Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 10,
  },

  mapContainer: {
    flex: 1,
    minHeight: 350,
    overflow: 'hidden',
  },

  map: {
    flex: 1,
  },

  info: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },

  empty: {
    color: '#666',
    lineHeight: 20,
  },

  photoInfo: {
    marginBottom: 8,
  },

  photoTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },

  coordinates: {
    fontSize: 13,
    color: '#555',
  },
});