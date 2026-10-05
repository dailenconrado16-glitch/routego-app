# GeoCam – Taller Integrador 2

## Semana 6 – Módulos Nativos y Sensores del Dispositivo

**Proyecto:** RouteGo – GeoCam  
**Tecnología:** React Native + Expo + TypeScript  
**Expo SDK:** 57  
**Plataforma de prueba:** Android / Expo Go

---

## 1. Descripción del proyecto

GeoCam es una funcionalidad integrada al proyecto RouteGo, desarrollada durante la Semana 6.

El objetivo principal es utilizar módulos nativos del dispositivo mediante Expo para trabajar con:

- Cámara.
- Ubicación GPS.
- Galería de imágenes.
- Sensores de movimiento.
- Manejo de permisos.
- Fotografías asociadas a coordenadas geográficas.
- Visualización de fotografías ubicadas sobre un mapa.

La aplicación permite tomar fotografías desde la cámara del dispositivo y, cuando el permiso de ubicación está disponible, asociarlas con las coordenadas actuales.

Cuando el usuario no concede el permiso de ubicación, la aplicación mantiene disponible la cámara y permite tomar fotografías sin coordenadas.

---

## 2. Objetivos

### Objetivo general

Implementar una funcionalidad móvil que integre cámara, ubicación, galería y sensores del dispositivo mediante módulos nativos de Expo, aplicando un manejo adecuado de permisos y limpieza de suscripciones.

### Objetivos específicos

- Implementar un Custom Hook para obtener y controlar la ubicación del dispositivo.
- Implementar un Custom Hook para controlar la cámara.
- Implementar un Custom Hook para detectar el movimiento de agitado del dispositivo.
- Solicitar permisos en el contexto de cada funcionalidad.
- Diferenciar los estados de permiso concedido, rechazado y bloqueado.
- Permitir abrir los ajustes del sistema cuando un permiso se encuentra bloqueado.
- Permitir utilizar la cámara aunque el usuario rechace la ubicación.
- Asociar fotografías con coordenadas cuando existe permiso de ubicación.
- Mostrar las fotografías geolocalizadas en un mapa.
- Limpiar correctamente las suscripciones del GPS y del acelerómetro.

---

## 3. Arquitectura del proyecto

La funcionalidad GeoCam se organiza mediante una estructura basada en componentes, hooks, contexto y tipos compartidos.

```text
routego-app/
│
├── src/
│   ├── app/
│   │   └── (tabs)/
│   │       ├── _layout.tsx
│   │       ├── index.tsx
│   │       ├── explore.tsx
│   │       ├── geocam.tsx
│   │       └── mapa.tsx
│   │
│   ├── components/
│   │   └── PermissionPrimer.tsx
│   │
│   ├── context/
│   │   └── GeoPhotosContext.tsx
│   │
│   ├── hooks/
│   │   ├── useCamera.ts
│   │   ├── useGeoLocation.ts
│   │   └── useShake.ts
│   │
│   └── types/
│       └── geo.ts
│
├── AI-LOG.md
├── ARCHITECTURE.md
├── README.md
└── package.json
```

---

## 4. Custom Hook `useGeoLocation`

El archivo:

`src/hooks/useGeoLocation.ts`

contiene el Custom Hook encargado de gestionar la ubicación del dispositivo.

El hook permite:

- Consultar el estado actual del permiso.
- Solicitar el permiso de ubicación.
- Obtener la posición actual.
- Observar cambios de ubicación.
- Abrir los ajustes del sistema.
- Manejar errores mediante estado.

Los estados de permiso utilizados son:

```text
checking
undetermined
granted
denied
blocked
```

El estado `blocked` permite identificar situaciones en las que el sistema ya no permite solicitar nuevamente el permiso y es necesario dirigir al usuario a los ajustes.

La aplicación utiliza las APIs de Expo Location para consultar permisos, solicitar acceso, obtener la ubicación actual y observar cambios de posición.

La suscripción creada mediante `watchPositionAsync` se elimina al desmontar el componente para evitar consumo innecesario de batería y memoria.

---

## 5. Custom Hook `useCamera`

El archivo:

`src/hooks/useCamera.ts`

contiene el Custom Hook encargado de gestionar la cámara.

Se utilizan las APIs actuales de Expo Camera:

- `CameraView`
- `useCameraPermissions()`

El hook controla:

- Permiso de cámara.
- Cámara frontal y trasera.
- Estado de disponibilidad de la cámara.
- Estado de captura.
- Toma de fotografías.
- Apertura de los ajustes del sistema.

También se controla el estado de captura para evitar múltiples fotografías producidas por pulsaciones rápidas.

---

## 6. Custom Hook `useShake`

El archivo:

`src/hooks/useShake.ts`

utiliza el acelerómetro del dispositivo mediante `expo-sensors`.

El hook permite detectar cuando el usuario agita el teléfono.

Para ello se utiliza:

- Verificación de disponibilidad del acelerómetro.
- Intervalo de actualización.
- Umbral de movimiento.
- Tiempo de enfriamiento para evitar múltiples activaciones.
- Limpieza de la suscripción.

Cuando se detecta el movimiento establecido, se ejecuta la acción correspondiente dentro de GeoCam.

---

## 7. Manejo de permisos

El proyecto implementa el manejo de permisos de manera contextual.

La aplicación no solicita todos los permisos inmediatamente al iniciar.

Los permisos se solicitan cuando el usuario accede a la funcionalidad correspondiente.

Los estados considerados son:

```text
checking → undetermined → granted
                         ↓
                       denied
                         ↓
                       blocked
```

Cuando el permiso se encuentra bloqueado, la aplicación utiliza `Linking.openSettings()` para dirigir al usuario a los ajustes del sistema.

---

## 8. Componente `PermissionPrimer`

El archivo:

`src/components/PermissionPrimer.tsx`

se utiliza para presentar al usuario información sobre el permiso requerido.

El componente cambia su comportamiento dependiendo del estado del permiso.

Cuando el permiso puede solicitarse nuevamente muestra:

**Permitir acceso**

Cuando el permiso está bloqueado muestra:

**Abrir Ajustes**

Esto permite que el usuario pueda modificar manualmente el permiso desde la configuración del dispositivo.

---

## 9. GeoCam

La pantalla principal de esta funcionalidad se encuentra en:

`src/app/(tabs)/geocam.tsx`

GeoCam integra:

- Cámara.
- Ubicación.
- Galería.
- Fotografías geolocalizadas.
- Permisos.
- Sensor de movimiento.

La cámara se mantiene funcional aunque la ubicación no esté disponible.

Cuando el usuario concede ubicación, la fotografía puede almacenarse junto con:

- Latitud.
- Longitud.
- Precisión.
- Fecha y hora.

Cuando el usuario rechaza la ubicación, la fotografía puede mantenerse sin coordenadas.

Esto permite una degradación controlada de la funcionalidad sin impedir el uso de la cámara.

---

## 10. Galería

La aplicación también permite trabajar con imágenes seleccionadas desde la galería mediante `expo-image-picker`.

Las fotografías importadas pueden incorporarse al sistema de fotografías de GeoCam.

El proyecto utiliza un modelo de datos común para las fotografías.

---

## 11. Contexto `GeoPhotosContext`

El archivo:

`src/context/GeoPhotosContext.tsx`

permite compartir las fotografías entre las diferentes pantallas de la aplicación.

El contexto proporciona operaciones para:

- Agregar fotografías.
- Eliminar fotografías.
- Eliminar todas las fotografías.

Las modificaciones se realizan de forma inmutable.

---

## 12. Tipos compartidos

El archivo:

`src/types/geo.ts`

contiene los tipos utilizados por la funcionalidad GeoCam.

Entre ellos se encuentra `PermissionState`, que representa los diferentes estados del permiso.

También se utiliza `Coords` para representar:

- `latitude`
- `longitude`
- `accuracy`
- `timestamp`

Las fotografías pueden contener coordenadas o no:

```text
coords: Coords | null
```

Esto permite representar correctamente una fotografía tomada cuando el usuario no concedió la ubicación.

---

## 13. Mapa

La pantalla:

`src/app/(tabs)/mapa.tsx`

permite visualizar las fotografías que tienen información de ubicación.

Para evitar depender de una API Key de Google Maps, la versión implementada utiliza:

- React Native WebView.
- Leaflet.
- OpenStreetMap.

Las fotografías con coordenadas se representan mediante marcadores.

Cada marcador permite consultar la información de ubicación asociada a la fotografía.

---

## 14. Evidencias del manejo de permisos

### 14.1 Permiso concedido

En esta evidencia se debe mostrar que el usuario concedió el permiso de ubicación y que GeoCam puede utilizar la ubicación del dispositivo.

**Captura:**

`docs/5.jpeg`

---

### 14.2 Permiso rechazado

En esta evidencia se debe mostrar el comportamiento de la aplicación cuando el usuario rechaza el permiso de ubicación.

La aplicación debe comunicar que la ubicación no está disponible y la cámara debe continuar funcionando.

**Captura:**

`docs/6.jpeg`

---

### 14.3 Permiso bloqueado

En esta evidencia se debe mostrar el estado en el cual el permiso está bloqueado y la aplicación ofrece la opción:

**Abrir Ajustes**

**Captura:**

`docs/1.jpeg`

---

## 15. Evidencia de cámara funcionando sin ubicación

Una de las pruebas principales consiste en comprobar que rechazar la ubicación no impide utilizar la cámara.

El comportamiento esperado es:

```text
Ubicación rechazada
        ↓
La cámara continúa disponible
        ↓
Se toma la fotografía
        ↓
La fotografía queda sin coordenadas
```

**Captura:**

`docs/2.jpeg`
`docs/3.jpeg`
`docs/4.jpeg`

---

## 16. Limpieza de suscripciones

El proyecto implementa limpieza de las suscripciones utilizadas por los módulos nativos.

### GPS

La suscripción creada mediante `Location.watchPositionAsync()` se elimina mediante `subscription.remove()` cuando el componente deja de utilizarla.

### Acelerómetro

La suscripción del acelerómetro también se elimina cuando el hook deja de estar activo.

Esto evita mantener procesos activos innecesariamente y reduce el consumo de recursos del dispositivo.

---

## 17. Manejo de errores

Los errores relacionados con la ubicación se almacenan en el estado del hook:

```text
error: string | null
```

Esto permite que la interfaz pueda informar al usuario cuando ocurre un problema.

Los hooks principales están desarrollados con TypeScript y se evita el uso de `any`.

---

## 18. Pruebas realizadas

Durante el desarrollo se verificaron las siguientes funcionalidades:

- [x] Navegación mediante Expo Router.
- [x] Pantalla GeoCam.
- [x] Cámara.
- [x] Ubicación GPS.
- [x] Galería.
- [x] Fotografías con coordenadas.
- [x] Visualización de fotografías en mapa.
- [x] OpenStreetMap mediante Leaflet.
- [x] Contexto para fotografías.
- [x] Custom Hook de ubicación.
- [x] Custom Hook de cámara.
- [x] Custom Hook de acelerómetro.
- [x] Limpieza de suscripciones.
- [ ] Evidencia de permiso concedido.
- [ ] Evidencia de permiso rechazado.
- [ ] Evidencia de permiso bloqueado.
- [ ] Evidencia de cámara funcionando sin GPS.

Las evidencias pendientes se completarán después de realizar las respectivas pruebas en el dispositivo.

---

## 19. Registro de uso de Inteligencia Artificial

El proyecto contiene un archivo independiente:

`AI-LOG.md`

ubicado en la raíz del proyecto.

En este archivo se documentan:

- Prompts utilizados.
- Código generado.
- Modificaciones realizadas.
- Correcciones realizadas.
- Errores o alucinaciones detectadas.
- Decisiones tomadas durante la implementación.

---

## 20. Archivos principales de la Semana 6

```text
hooks/useGeoLocation.ts
hooks/useCamera.ts
hooks/useShake.ts
components/PermissionPrimer.tsx
context/GeoPhotosContext.tsx
types/geo.ts
app/(tabs)/geocam.tsx
app/(tabs)/mapa.tsx
AI-LOG.md
README.md
```

---

## 21. Conclusión

La implementación de GeoCam integra diferentes módulos nativos del dispositivo dentro del proyecto RouteGo.

El proyecto permite trabajar con cámara, ubicación, galería y sensores mediante Custom Hooks y componentes reutilizables.

El manejo de permisos considera diferentes estados y permite que la aplicación continúe funcionando de manera controlada cuando un permiso no está disponible.

Además, se implementó la limpieza de las suscripciones utilizadas por el GPS y el acelerómetro, evitando mantener recursos activos después de abandonar las funcionalidades correspondientes.

Finalmente, las fotografías que cuentan con coordenadas pueden visualizarse sobre un mapa utilizando OpenStreetMap y Leaflet mediante WebView.

