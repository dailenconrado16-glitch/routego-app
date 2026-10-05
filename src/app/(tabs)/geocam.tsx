import {
  useCallback,
  useState,
} from 'react';

import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { CameraView } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import { useCamera } from '@/hooks/useCamera';
import { useGeoLocation } from '@/hooks/useGeoLocation';
import { useShake } from '@/hooks/useShake';

import { PermissionPrimer } from '@/components/PermissionPrimer';

import {
  useGeoPhotos,
} from '@/context/GeoPhotosContext';

import type { GeoPhoto } from '@/types/geo';

export default function GeoCamScreen() {
  const cam = useCamera();

  const geo =
    useGeoLocation({
      watch: true,
    });

  const {
    photos,
    addPhoto,
    clearAll,
  } = useGeoPhotos();

  const [shakeAvailable, setShakeAvailable] =
    useState<boolean | null>(null);

  const handleShake = useCallback(() => {
    if (photos.length === 0) {
      return;
    }

    Alert.alert(
      'Borrar fotografías',
      '¿Deseas eliminar todas las fotografías de GeoCam?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Borrar todo',
          style: 'destructive',
          onPress: clearAll,
        },
      ]
    );
  }, [photos.length, clearAll]);

  const shake = useShake(
    handleShake,
    {
      threshold: 2.2,
      cooldownMs: 1000,
    }
  );

  if (
    cam.permissionState ===
    'checking'
  ) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          Comprobando permisos...
        </Text>
      </View>
    );
  }

  if (
    cam.permissionState !==
    'granted'
  ) {
    return (
      <PermissionPrimer
        title="GeoCam necesita tu cámara"
        description="La cámara se utilizará únicamente cuando decidas tomar una fotografía."
        state={cam.permissionState}
        onRequest={
          cam.requestPermission
        }
        onOpenSettings={
          cam.openSettings
        }
      />
    );
  }

  const handleCapture =
    async () => {
      const photo =
        await cam.takePhoto();

      if (!photo) {
        return;
      }

      const coords =
        geo.permission ===
        'granted'
          ? geo.coords ??
            (await geo.getCurrent())
          : null;

      const newPhoto: GeoPhoto = {
        id: String(Date.now()),
        uri: photo.uri,
        coords,
        source: 'camera',
        createdAt: Date.now(),
      };

      addPhoto(newPhoto);
    };

  const handleGallery =
    async () => {
      const result =
        await ImagePicker.launchImageLibraryAsync(
          {
            mediaTypes: ['images'],
            quality: 0.7,
          }
        );

      if (result.canceled) {
        return;
      }

      const asset =
        result.assets[0];

      if (!asset) {
        return;
      }

      const coords =
        geo.permission ===
        'granted'
          ? geo.coords ??
            (await geo.getCurrent())
          : null;

      addPhoto({
        id: String(Date.now()),
        uri: asset.uri,
        coords,
        source: 'gallery',
        createdAt: Date.now(),
      });
    };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cam.cameraRef}
        style={StyleSheet.absoluteFill}
        facing={cam.facing}
        onCameraReady={
          cam.onCameraReady
        }
      />

      {geo.permission !==
        'granted' &&
        geo.permission !==
          'checking' && (
          <Pressable
            onPress={
              geo.permission ===
              'blocked'
                ? geo.openSettings
                : geo.requestPermission
            }
            style={styles.locationBanner}
          >
            <Text style={styles.bannerText}>
              Activa la ubicación
              para etiquetar tus
              fotos
            </Text>
          </Pressable>
        )}

      {geo.coords && (
        <View
          style={styles.coordinates}
        >
          <Text
            style={styles.coordinateText}
          >
            {geo.coords.latitude.toFixed(
              5
            )}
            ,{' '}
            {geo.coords.longitude.toFixed(
              5
            )}
          </Text>

          <Text
            style={styles.accuracy}
          >
            ±
            {Math.round(
              geo.coords.accuracy ??
                0
            )}{' '}
            m
          </Text>
        </View>
      )}

      <View style={styles.topInfo}>
        <Text style={styles.title}>
          GeoCam
        </Text>

        <Text style={styles.counter}>
          Fotos: {photos.length}
        </Text>

        {shake.isAvailable !==
          null && (
          <Text style={styles.sensor}>
            Sensor:{' '}
            {shake.isAvailable
              ? 'activo'
              : 'no disponible'}
          </Text>
        )}
      </View>

      <View
        style={styles.controls}
      >
        {photos.length > 0 ? (
          <Image
            source={{
              uri: photos[0].uri,
            }}
            style={styles.thumbnail}
          />
        ) : (
          <View
            style={styles.emptyThumbnail}
          />
        )}

        <Pressable
          onPress={
            handleCapture
          }
          disabled={
            cam.isCapturing
          }
          style={styles.captureButton}
        >
          <View
            style={[
              styles.captureInner,
              cam.isCapturing &&
                styles.captureDisabled,
            ]}
          />
        </Pressable>

        <Pressable
          onPress={
            cam.toggleFacing
          }
          style={styles.smallButton}
        >
          <Text
            style={styles.icon}
          >
            ↻
          </Text>
        </Pressable>
      </View>

      <View
        style={styles.bottomButtons}
      >
        <Pressable
          onPress={
            handleGallery
          }
          style={styles.actionButton}
        >
          <Text
            style={styles.actionText}
          >
            Galería
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            geo.permission ===
            'blocked'
              ? geo.openSettings()
              : geo.requestPermission()
          }
          style={styles.actionButton}
        >
          <Text
            style={styles.actionText}
          >
            GPS
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },

  loadingText: {
    color: '#fff',
    fontSize: 17,
  },

  topInfo: {
    position: 'absolute',
    top: 55,
    left: 20,
    right: 20,
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },

  counter: {
    color: '#fff',
    marginTop: 5,
    fontSize: 15,
  },

  sensor: {
    color: '#8fffc7',
    marginTop: 3,
  },

  coordinates: {
    position: 'absolute',
    top: 135,
    left: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },

  coordinateText: {
    color: '#8fffc7',
    fontSize: 13,
  },

  accuracy: {
    color: '#ddd',
    fontSize: 12,
    marginTop: 3,
  },

  locationBanner: {
    position: 'absolute',
    top: 130,
    left: 20,
    right: 20,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#facc15',
  },

  bannerText: {
    textAlign: 'center',
    fontWeight: '600',
  },

  controls: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  thumbnail: {
    width: 58,
    height: 58,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },

  emptyThumbnail: {
    width: 58,
    height: 58,
  },

  captureButton: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  captureInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#fff',
  },

  captureDisabled: {
    backgroundColor: '#888',
  },

  smallButton: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: '#fff',
    fontSize: 38,
  },

  bottomButtons: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },

  actionText: {
    fontWeight: 'bold',
  },
});