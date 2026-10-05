# Registro de Auditoría de IA (AI-LOG)

**Estudiante:** Daillent Conrado - Gustavo Cruz 
**Semana:** 6  
**Proyecto:** GeoCam – Taller Integrador 2

## 1. Prompts utilizados

- Solicitud de ayuda para implementar una aplicación GeoCam con React Native, Expo y TypeScript.
- Solicitud de implementación de Custom Hooks para cámara, ubicación y sensor de movimiento.
- Solicitud de integración de cámara, GPS, galería, mapa y detección de movimiento.

## 2. Código generado vs. código modificado

La IA ayudó a generar una primera estructura de Custom Hooks para trabajar con los módulos nativos de Expo.

Posteriormente se revisó y adaptó el código para utilizar las APIs actuales del proyecto y para cumplir los requisitos de la guía de Semana 6.

Se implementaron:

- useGeoLocation
- useCamera
- useShake
- GeoPhotosContext
- PermissionPrimer

## 3. Correcciones realizadas

Se verificó que la cámara utilizara:

CameraView + useCameraPermissions()

También se implementó el manejo de permisos:

- checking
- undetermined
- granted
- denied
- blocked

Cuando un permiso queda bloqueado se utiliza la opción de abrir los Ajustes del sistema.

## 4. Manejo de suscripciones

El seguimiento de ubicación y el acelerómetro utilizan funciones de limpieza.

Las suscripciones se eliminan cuando el componente se desmonta para evitar consumo innecesario de batería y memoria.

## 5. Alucinaciones o errores detectados

Durante el desarrollo se tuvo especial cuidado con las APIs de Expo porque pueden cambiar entre versiones del SDK.

Se evitó utilizar APIs antiguas como:

Camera.requestCameraPermissionsAsync()

y se utilizó:

CameraView + useCameraPermissions()

También se evitó utilizar paquetes antiguos de permisos.

## 6. Funcionalidades implementadas

- Cámara.
- Permiso de cámara.
- Ubicación GPS.
- Permiso de ubicación.
- Importación desde galería.
- Contexto global de fotografías.
- Mapa.
- Marcadores para fotografías con ubicación.
- Lista de fotografías sin ubicación.
- Sensor de acelerómetro.
- Eliminación de fotografías mediante agitado del teléfono.

## 7. Degradación con elegancia

Si el usuario no concede permiso de ubicación, la cámara continúa funcionando.

En ese caso la fotografía se guarda con:

coords: null

De esta manera la aplicación continúa siendo funcional aunque no exista información de ubicación.

## 8. Estado final

GeoCam se desarrolla sobre el repositorio del Taller Integrador 2 y utiliza la arquitectura de navegación existente de RouteGo.