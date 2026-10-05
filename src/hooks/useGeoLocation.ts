import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';

import type {
  Coords,
  PermissionState,
} from '@/types/geo';

interface Options {
  watch?: boolean;
}

interface GeoLocationState {
  permission: PermissionState;
  coords: Coords | null;
  error: string | null;
}

function mapPermission(
  res: Location.LocationPermissionResponse
): PermissionState {
  if (res.granted) {
    return 'granted';
  }

  if (res.status === 'undetermined') {
    return 'undetermined';
  }

  if (!res.canAskAgain) {
    return 'blocked';
  }

  return 'denied';
}

function toCoords(
  loc: Location.LocationObject
): Coords {
  return {
    latitude: loc.coords.latitude,
    longitude: loc.coords.longitude,
    accuracy: loc.coords.accuracy,
    timestamp: loc.timestamp,
  };
}

export function useGeoLocation(
  { watch = false }: Options = {}
) {
  const [state, setState] =
    useState<GeoLocationState>({
      permission: 'checking',
      coords: null,
      error: null,
    });

  useEffect(() => {
    let cancelled = false;

    Location.getForegroundPermissionsAsync()
      .then((res) => {
        if (!cancelled) {
          setState((current) => ({
            ...current,
            permission: mapPermission(res),
          }));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState((current) => ({
            ...current,
            permission: 'denied',
            error: 'No fue posible comprobar el permiso de ubicación.',
          }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const requestPermission =
    useCallback(async (): Promise<boolean> => {
      try {
        const current =
          await Location.getForegroundPermissionsAsync();

        const currentState = mapPermission(current);

        if (currentState === 'blocked') {
          setState((previous) => ({
            ...previous,
            permission: 'blocked',
          }));

          return false;
        }

        const res =
          await Location.requestForegroundPermissionsAsync();

        const permission = mapPermission(res);

        setState((previous) => ({
          ...previous,
          permission,
          error:
            permission === 'denied'
              ? 'El permiso de ubicación fue rechazado.'
              : null,
        }));

        return res.granted;
      } catch (error) {
        setState((previous) => ({
          ...previous,
          error:
            error instanceof Error
              ? error.message
              : 'No fue posible solicitar el permiso.',
        }));

        return false;
      }
    }, []);

  const getCurrent =
    useCallback(async (): Promise<Coords | null> => {
      try {
        const permission =
          await Location.getForegroundPermissionsAsync();

        const permissionState = mapPermission(permission);

        if (permissionState !== 'granted') {
          setState((current) => ({
            ...current,
            permission: permissionState,
            error:
              permissionState === 'blocked'
                ? 'El permiso de ubicación está bloqueado. Abre los Ajustes para habilitarlo.'
                : 'El permiso de ubicación no está concedido.',
          }));

          return null;
        }

        const loc =
          await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });

        const coords = toCoords(loc);

        setState((current) => ({
          ...current,
          coords,
          error: null,
        }));

        return coords;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'No se pudo obtener la ubicación.';

        setState((current) => ({
          ...current,
          error: message,
        }));

        return null;
      }
    }, []);

  useEffect(() => {
    if (!watch || state.permission !== 'granted') {
      return;
    }

    let cancelled = false;
    let subscription:
      | Location.LocationSubscription
      | null = null;

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 10,
      },
      (loc) => {
        if (cancelled) {
          return;
        }

        setState((current) => ({
          ...current,
          coords: toCoords(loc),
          error: null,
        }));
      }
    )
      .then((sub) => {
        if (cancelled) {
          sub.remove();
        } else {
          subscription = sub;
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState((current) => ({
            ...current,
            error:
              error instanceof Error
                ? error.message
                : 'Error de GPS.',
          }));
        }
      });

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, [watch, state.permission]);

  const openSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  return {
    ...state,
    requestPermission,
    getCurrent,
    openSettings,
  };
}