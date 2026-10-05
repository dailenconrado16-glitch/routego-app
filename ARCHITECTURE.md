# Arquitectura de RouteGo

## 1. Descripción general

RouteGo es una aplicación móvil desarrollada con React Native, Expo y TypeScript.

La aplicación utiliza Expo Router para organizar la navegación mediante un sistema de rutas basado en archivos.

El proyecto implementa una navegación combinada utilizando Tabs y Stack. También cuenta con una ruta dinámica para consultar la información de un estudiante y una pantalla presentada como modal.

## 2. Estructura del proyecto

La estructura principal de la aplicación es:

src/
└── app/
    ├── _layout.tsx
    ├── modal.tsx
    │
    ├── (tabs)/
    │   ├── _layout.tsx
    │   ├── index.tsx
    │   └── explore.tsx
    │
    └── student/
        └── [id].tsx

La carpeta app contiene las pantallas y archivos relacionados con la navegación de la aplicación.

Expo Router utiliza los archivos y carpetas para organizar las diferentes rutas de la aplicación.

## 3. Layout principal

El archivo src/app/_layout.tsx define el Stack principal de la aplicación.

Este Stack permite navegar entre las diferentes pantallas de RouteGo.

Actualmente registra:

- (tabs) para las pestañas principales.
- student/[id] para el detalle de un estudiante.
- modal para la ventana de información.

## 4. Navegación mediante Tabs

El archivo src/app/(tabs)/_layout.tsx define las pestañas principales de la aplicación.

Actualmente tenemos dos pestañas:

- Inicio
- Rutas

La estructura es:

Tabs
├── Inicio
└── Rutas

## 5. Pantalla de Inicio

La pantalla de Inicio se encuentra en src/app/(tabs)/index.tsx.

Esta pantalla presenta el nombre de la aplicación RouteGo y permite acceder a diferentes funciones.

Desde Inicio podemos:

- Consultar el detalle de un estudiante.
- Abrir la ventana de información.

Para consultar el estudiante se utiliza la navegación hacia:

/student/ST-202688

## 6. Pantalla de Rutas

La pantalla de Rutas se encuentra en src/app/(tabs)/explore.tsx.

Esta pantalla muestra algunas rutas disponibles:

- Ruta 01 - Riohacha
- Ruta 02 - Maicao
- Ruta 03 - Albania

La pantalla puede ser seleccionada mediante la pestaña "Rutas".

## 7. Ruta dinámica del estudiante

La pantalla src/app/student/[id].tsx representa una ruta dinámica.

El archivo [id].tsx permite recibir diferentes identificadores de estudiantes.

Por ejemplo:

/student/ST-202688

En este caso, el identificador del estudiante es:

ST-202688

El parámetro se obtiene mediante useLocalSearchParams() y posteriormente se muestra en la pantalla.

## 8. Modal

La pantalla src/app/modal.tsx representa una ventana modal de información.

Desde la pantalla de Inicio se puede acceder mediante la ruta:

/modal

El modal contiene información sobre la aplicación y tiene un botón para cerrarlo.

Para regresar a la pantalla anterior se utiliza router.back().

## 9. Flujo de navegación

El flujo principal de RouteGo es:

RouteGo
|
+-- Inicio
|   |
|   +-- Ver estudiante
|   |      |
|   |      +-- student/[id]
|   |             |
|   |             +-- ST-202688
|   |
|   +-- Ver información
|          |
|          +-- Modal
|
+-- Rutas

## 10. Combinación de navegación

La aplicación combina diferentes tipos de navegación.

### Tabs

Se utilizan para las secciones principales:

- Inicio
- Rutas

### Stack

Se utiliza para acceder a pantallas adicionales:

- Detalle del estudiante
- Modal

### Ruta dinámica

Se utiliza student/[id].tsx para mostrar información de diferentes estudiantes mediante un identificador.

## 11. Tecnologías utilizadas

El proyecto utiliza:

- React Native
- Expo
- Expo Router
- TypeScript
- React

## 12. Organización de archivos

La organización principal es:

app/
│
├── _layout.tsx
│
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── explore.tsx
│
├── student/
│   └── [id].tsx
│
└── modal.tsx

Cada archivo tiene una función específica dentro de la aplicación.

_app/_layout.tsx controla la navegación principal.

_(tabs)/_layout.tsx controla las pestañas.

_(tabs)/index.tsx representa la pantalla de Inicio.

_(tabs)/explore.tsx representa la pantalla de Rutas.

_student/[id].tsx representa la ruta dinámica del estudiante.

_modal.tsx representa la ventana modal.

## 13. Conclusión

RouteGo utiliza una arquitectura basada en Expo Router.

La aplicación cuenta con dos pestañas principales: Inicio y Rutas.

Desde Inicio se puede acceder al detalle dinámico de un estudiante y a una ventana modal de información.

La ruta dinámica permite recibir y mostrar el identificador del estudiante.

La combinación de Tabs, Stack, rutas dinámicas y modal permite cumplir con los requisitos principales del Taller Integrador N.º 2.