import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { GeoPhoto } from '@/types/geo';

interface GeoPhotosContextValue {
  photos: GeoPhoto[];
  addPhoto: (photo: GeoPhoto) => void;
  removePhoto: (id: string) => void;
  clearAll: () => void;
}

const GeoPhotosContext =
  createContext<
    GeoPhotosContextValue | undefined
  >(undefined);

export function GeoPhotosProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [photos, setPhotos] =
    useState<GeoPhoto[]>([]);

  const addPhoto = useCallback(
    (photo: GeoPhoto) => {
      setPhotos((current) => [
        photo,
        ...current,
      ]);
    },
    []
  );

  const removePhoto = useCallback(
    (id: string) => {
      setPhotos((current) =>
        current.filter(
          (photo) => photo.id !== id
        )
      );
    },
    []
  );

  const clearAll = useCallback(() => {
    setPhotos([]);
  }, []);

  const value = useMemo(
    () => ({
      photos,
      addPhoto,
      removePhoto,
      clearAll,
    }),
    [
      photos,
      addPhoto,
      removePhoto,
      clearAll,
    ]
  );

  return (
    <GeoPhotosContext.Provider value={value}>
      {children}
    </GeoPhotosContext.Provider>
  );
}

export function useGeoPhotos() {
  const context =
    useContext(GeoPhotosContext);

  if (!context) {
    throw new Error(
      'useGeoPhotos debe utilizarse dentro de GeoPhotosProvider'
    );
  }

  return context;
}