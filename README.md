<div align="center">

# 🏯 Hotel Miyabi — Manual de Instalación, Pruebas y Catálogo de Rutas

**Plataforma web transaccional Ryokan con Arquitectura desacoplada: Spring Boot 3 REST API & Angular 18 SPA**

![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Java](https://img.shields.io/badge/Java-17%2B-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-4.x-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

</div>

---

## 📋 Tabla de Contenidos

1. [📖 Descripción General](#-descripción-general)
2. [🏗️ Arquitectura del Sistema](#️-arquitectura-del-sistema)
3. [📦 Requisitos Previos](#-requisitos-previos)
4. [🚀 Instalación y Configuración Paso a Paso](#-instalación-y-configuración-paso-a-paso)
   - [Paso 1: Base de Datos MySQL](#paso-1-base-de-datos-mysql)
   - [Paso 2: Servidor Backend Spring Boot](#paso-2-servidor-backend-spring-boot)
   - [Paso 3: Servidor Frontend Angular 18](#paso-3-servidor-frontend-angular-18)
5. [🔑 Credenciales de Prueba por Rol](#-credenciales-de-prueba-por-rol)
6. [🗺️ Catálogo Completo de Rutas & URLs Disponibles](#️-catálogo-completo-de-rutas--urls-disponibles)
   - [🌐 Portal Público (Huésped / Cliente)](#-portal-público-huésped--cliente)
   - [🔒 Back-Office Administrativo (Personal / Admin)](#-back-office-administrativo-personal--admin)
   - [⚡ Endpoints API REST (Spring Boot)](#-endpoints-api-rest-spring-boot)
7. [🧪 Guía de Pruebas y Validación](#-guía-de-pruebas-y-validación)

---

## 📖 Descripción General

**Hotel Miyabi** es una solución integral para la digitalización y gestión de un ryokan (hotel boutique de lujo de concepto japonés). Permite la consulta del catálogo de instalaciones y experiencias, la reserva en línea de suites con cálculo automático de tarifas y consumos, e incluye un **Panel Back-Office Administrativo** completo para control de inventario, analítica operacional y gestión de personal.

---

## 🏗️ Arquitectura del Sistema

El proyecto cuenta con una arquitectura moderna de dos capas totalmente independientes:
- **Backend**: Spring Boot 3 (Java 17) operando como **API RESTful** con Hibernate/JPA y seguridad CORS habilitada.
- **Frontend**: **Angular 18 SPA (Single Page Application)** renderizado en el navegador (`http://localhost:4200`) conservando al 100% la estética minimalista tradicional japonesa (*Wabi-Sabi Luxury*) mediante variables SCSS y Chart.js.
- **Base de Datos & Esquema ER**: MySQL 8.0 / MariaDB. Consulta la documentación y diagramas Mermaid en [`docs/diagrams/er_diagram.md`](docs/diagrams/er_diagram.md) y abre el visor interactivo en [`docs/diagrams/viewer.html`](docs/diagrams/viewer.html).


---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:
- **Java JDK 17** o superior
- **Node.js v18.x** o **v20.x** y **npm**
- **Angular CLI v18**: `npm install -g @angular/cli`
- **MySQL Server 8.0** o **MariaDB**
- **Git**

---

## 🚀 Instalación y Configuración Paso a Paso

### Paso 1: Base de Datos MySQL

1. Inicia sesión en tu servidor MySQL / MariaDB local.
2. Ejecuta el script SQL completo ubicado en el repositorio:
   ```bash
   # Ubicación del script SQL:
   src/main/resources/scripts/query.sql
   ```
3. Puedes importarlo desde la consola de MySQL:
   ```sql
   SOURCE src/main/resources/scripts/query.sql;
   ```
   *(Este script crea la base de datos `DB_Miyabi` e inserta todas las tablas, habitaciones, tarifas y usuarios iniciales de prueba).*

---

### Paso 2: Servidor Backend Spring Boot

1. Verifica la conexión a la base de datos en [`src/main/resources/application.properties`](file:///home/kaos/Repos/Miyabi/src/main/resources/application.properties):
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/DB_Miyabi?useSSL=false&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=1234
   ```
2. Compila e inicia el servidor Spring Boot ejecutando el wrapper de Maven desde la raíz del proyecto:
   ```bash
   ./mvnw spring-boot:run
   ```
3. El backend REST estará corriendo en: `http://localhost:8080`

---

### Paso 3: Servidor Frontend Angular 18

1. Navega a la carpeta `frontend/`:
   ```bash
   cd frontend
   ```
2. Instala las dependencias de Node.js (incluye Angular 18, RxJS y Chart.js):
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo de Angular:
   ```bash
   ng serve
   # O alternativamente:
   npm start
   ```
4. Abre tu navegador e ingresa a: **`http://localhost:4200`**

---

## 🔑 Credenciales de Prueba por Rol

El sistema cuenta con usuarios pre-cargados para probar cada uno de los roles operativos:

| Rol | Email / Usuario | Contraseña | Nombre Completo | Permisos y Alcance |
|---|---|---|---|---|
| **👑 Administrator** | `onur@hotel.com` | `1234` | Rodrigo Dalmagro López | Control total del sistema: Dashboard analítico, CRUD de Habitaciones, CRUD de Tarifas/Suites, CRUD de Personal y Reportes. |
| **👑 Administrator** | `frod@hotel.com` | `1234` | Daniel Montaner Miller | Acceso total administrativo de respaldo. |
| **🛎️ Receptionist** | `potter@hotel.com` | `1234` | Christine Chi Miller | Atención de caja/recepción, recepción de reservas, check-in, check-out y consulta de reportes. |
| **🛎️ Receptionist** | `bonkar@hotel.com` | `1234` | Malkolm Rench Lindberg | Personal de atención al cliente en turno tarde. |
| **👤 Client / Huésped** | `kingg@gmail.com` | `1234` | Francisco Aravena Toledo | Acceso a navegación pública, creación de reservas transaccionales y consulta de su panel "Mis Reservas". |
| **👤 Client / Huésped** | `spike@gmail.com` | `1234` | Rodrigo Lombardi Da Silva | Huésped registrado con historial activo. |

---

## 🗺️ Catálogo Completo de Rutas & URLs Disponibles

### 🌐 Portal Público (Huésped / Cliente)
Acceso disponible para cualquier visitante y usuarios autenticados como Huésped:

| URL Angular | Descripción de la Vista |
|---|---|
| [`http://localhost:4200/`](http://localhost:4200/) | **Inicio (Home Ryokan)** — Presentación conceptual, hero interactivo, filosofía Wabi-sabi y acceso a experiencias. |
| [`http://localhost:4200/rooms`](http://localhost:4200/rooms) | **Suites & Villas Privadas** — Catálogo comercial de tipos de habitación con fotos, amenidades y precios por noche. |
| [`http://localhost:4200/facilities`](http://localhost:4200/facilities) | **Instalaciones** — Galería y descripción de arquitectura, jardines y espacios zen. |
| [`http://localhost:4200/cuisine`](http://localhost:4200/cuisine) | **Gastronomía Kaiseki** — Alta cocina tradicional japonesa y carta del restaurante. |
| [`http://localhost:4200/spa`](http://localhost:4200/spa) | **Onsen & Spa Entei** — Experiencias de baño en termas naturales y tratamientos termales. |
| [`http://localhost:4200/amenities`](http://localhost:4200/amenities) | **Amenidades de Yakushiyama** — Servicios adicionales del Ryokan. |
| [`http://localhost:4200/experiences`](http://localhost:4200/experiences) | **Experiencias Privadas** — Ceremonia del té, meditaciones y tours guiados. |
| [`http://localhost:4200/stay-offers`](http://localhost:4200/stay-offers) | **Ofertas de Estancia** — Paquetes promocionales y promociones estacionales. |
| [`http://localhost:4200/location`](http://localhost:4200/location) | **Ubicación & Contacto** — Mapa interactivo y detalles de llegada. |
| [`http://localhost:4200/reservation`](http://localhost:4200/reservation) | **Proceso de Reserva (Booking Engine)** — Carrito de selección de fechas, habitación, datos de huésped y pago simulado. |
| [`http://localhost:4200/my-reservations`](http://localhost:4200/my-reservations) | **Panel "Mis Reservas"** *(Protegida por `authGuard`)* — Historial personal de reservas del cliente autenticado. |

---

### 🔒 Back-Office Administrativo (Personal / Admin)
Rutas exclusivas del personal de hotel *(Protegidas por `adminGuard`)*:

| URL Angular | Módulo / Función | Permisos CRUD Disponibles |
|---|---|---|
| [`http://localhost:4200/admin/dashboard`](http://localhost:4200/admin/dashboard) | **Dashboard Operativo** | Vista general con KPIs de ingresos, 2 gráficos analíticos en tiempo real (Chart.js) y movimientos recientes. |
| [`http://localhost:4200/admin/rooms`](http://localhost:4200/admin/rooms) | **Inventario de Habitaciones** | **CRUD Completo**: Crear nuevas habitaciones (`+ Nueva Habitación`), editar número/piso/estado, eliminar habitaciones y filtro en tiempo real. |
| [`http://localhost:4200/admin/room-types`](http://localhost:4200/admin/room-types) | **Tarifas & Suites** | **CRUD Completo**: Crear nuevas categorías/tarifas (`+ Nuevo Tipo`), editar precios base/fotos/capacidades y eliminar categorías. |
| [`http://localhost:4200/admin/users`](http://localhost:4200/admin/users) | **Personal & Accesos** | **CRUD Completo**: Crear personal (`+ Nuevo Personal`), cambiar contraseña/datos, asignar roles (`Administrator`/`Receptionist`) y dar de baja. |
| [`http://localhost:4200/admin/reports`](http://localhost:4200/admin/reports) | **Reportes & Analítica** | Filtrado dinámico por estado de reserva, rango de fechas y paginación interactiva. |

---

### ⚡ Endpoints API REST (Spring Boot)

El backend responde en la ruta base `http://localhost:8080/api`:

- **Autenticación & Sesión**:
  - `POST /api/auth/login` — Autenticación unificada de Huéspedes (`Guest`) y Personal (`User`).
  - `POST /api/auth/logout` — Cierre de sesión y limpieza de contexto.
  - `GET /api/auth/me` — Retorna el usuario autenticado actual.
- **Habitaciones & Tarifas**:
  - `GET /api/rooms` | `POST /api/rooms` | `PUT /api/rooms/{id}` | `DELETE /api/rooms/{id}`
  - `GET /api/room-types` | `POST /api/room-types` | `PUT /api/room-types/{id}` | `DELETE /api/room-types/{id}`
- **Reservas**:
  - `GET /api/reservations` | `POST /api/reservations` | `PUT /api/reservations/{id}`
  - `GET /api/reservations/code/{code}` | `GET /api/reservations/guest/{guestId}`
- **Usuarios Internos / Personal**:
  - `GET /api/users` | `POST /api/users` | `PUT /api/users/{id}` | `DELETE /api/users/{id}`

---

## 🧪 Guía de Pruebas y Validación

### Flujo de Prueba 1: Proceso de Reserva de Cliente
1. Ingresa a `http://localhost:4200/` y haz clic en **"Reservar Suite"** o ve a `http://localhost:4200/reservation`.
2. Selecciona fecha de entrada, fecha de salida y la suite deseada.
3. Completa los datos del huésped y confirma la reserva.
4. Inicia sesión con `kingg@gmail.com` / `1234` y verifica que tu nueva reserva aparezca en `http://localhost:4200/my-reservations`.

### Flujo de Prueba 2: Administración y Mantenimiento CRUD
1. Haz clic en **"Iniciar Sesión"** en el navbar e ingresa con `onur@hotel.com` / `1234`.
2. El sistema te redirigirá al **Dashboard Admin** (`http://localhost:4200/admin/dashboard`) donde verás los 4 KPIs e indicadores visuales de Chart.js.
3. Haz clic en **"Habitaciones"** (`/admin/rooms`), presiona **"+ Nueva Habitación"**, crea la habitación `901` y verifica su aparición en la lista. Pruebe a editarla o eliminarla.
4. Haz clic en **"Tarifas & Suites"** (`/admin/room-types`), presiona **"+ Nuevo Tipo de Habitación"** y agrega una nueva categoría.
5. Haz clic en **"Personal"** (`/admin/users`) para consultar y gestionar el personal del ryokan.
6. Haz clic en **"VER PORTAL WEB"** para retornar a la vista pública.