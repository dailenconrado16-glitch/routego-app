import { Tabs } from 'expo-router';

import { GeoPhotosProvider } from '@/context/GeoPhotosContext';

export default function TabsLayout() {
  return (
    <GeoPhotosProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
            tabBarLabel: 'Inicio',
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            title: 'Rutas',
            tabBarLabel: 'Rutas',
          }}
        />

        <Tabs.Screen
          name="geocam"
          options={{
            title: 'GeoCam',
            tabBarLabel: 'GeoCam',
          }}
        />

        <Tabs.Screen
          name="mapa"
          options={{
            title: 'Mapa',
            tabBarLabel: 'Mapa',
          }}
        />
      </Tabs>
    </GeoPhotosProvider>
  );
}