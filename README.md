# 🏪 Ally360 POS API

<p align="center">
  <img src="https://develop--ally360.netlify.app/logo/logo-fondo-oscuro.svg" width="200" alt="Ally360 Logo" />
</p>

<p align="center">
  Sistema de Punto de Venta (POS) desarrollado con NestJS, TypeScript y PostgreSQL
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/NestJS-9.4+-E0234E?style=flat&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-4.9+-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-15+-336791?style=flat&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-enabled-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker" />
</p>

## 📋 Tabla de Contenidos

- [🏗️ Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [🚀 Instalación y Configuración](#-instalación-y-configuración)
- [🐳 Docker](#-docker)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔧 Módulos Principales](#-módulos-principales)
- [📊 Base de Datos](#-base-de-datos)
- [📧 Sistema de Correos](#-sistema-de-correos)
- [🔐 Autenticación](#-autenticación)
- [🌐 API Endpoints](#-api-endpoints)
- [⚙️ Variables de Entorno](#️-variables-de-entorno)
- [🧪 Testing](#-testing)
- [📦 Despliegue](#-despliegue)
- [🤝 Contribución](#-contribución)

## 🏗️ Arquitectura del Proyecto

El proyecto está construido siguiendo los principios de **Arquitectura Hexagonal** y **Domain-Driven Design (DDD)** con NestJS como framework principal.

### Tecnologías Principales

- **Backend Framework**: NestJS 9.4+
- **Lenguaje**: TypeScript 4.9+
- **Base de Datos**: PostgreSQL 15+
- **ORM**: TypeORM con Transacciones
- **Autenticación**: JWT + Passport
- **Validación**: Class Validator & Class Transformer
- **Migraciones**: Slonik Migrator
- **Correo Electrónico**: Nodemailer + Handlebars
- **Documentación**: Swagger/OpenAPI
- **Contenedores**: Docker & Docker Compose

### Patrones de Diseño Implementados

- **Repository Pattern**: Para abstracción de datos
- **Service Layer Pattern**: Lógica de negocio
- **Event-Driven Architecture**: Para comunicación entre módulos
- **Dependency Injection**: IoC Container de NestJS
- **Factory Pattern**: Configuración de servicios

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- PostgreSQL 15+
- Docker & Docker Compose (opcional)
- Git

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd pos-app-api
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Servidor
PORT=3000
NODE_ENV=development

# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=ally360_pos

# JWT
SECRET=your_super_secret_jwt_key
TOKEN_EXPIRE_IN=1d

# SMTP Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@ally360.com

# Conexión PostgreSQL (alternativa)
POSTGRES_CONNECTION_STRING=postgresql://user:password@localhost:5432/database
```

### 4. Ejecutar Migraciones

```bash
# Ejecutar migraciones
npm run migrate:up
```

### 5. Iniciar el Servidor

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run start:prod
```

## 🐳 Docker

El proyecto incluye configuración completa de Docker para desarrollo y producción.

### Desarrollo con Docker

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f ally_api

# Detener servicios
docker-compose down
```

### Servicios Docker

- **ally_api**: Servidor NestJS (Puerto 3000)
- **ally_postgres**: Base de datos PostgreSQL (Puerto 5432)
- **storage**: MinIO para almacenamiento de archivos (Puerto 9000)

## 📁 Estructura del Proyecto

```
pos-app-api/
├── 📂 src/                          # Código fuente principal
│   ├── 📂 modules/                  # Módulos de la aplicación
│   │   ├── 📂 auth/                # Autenticación y autorización
│   │   ├── 📂 user/                # Gestión de usuarios
│   │   ├── 📂 company/             # Gestión de empresas
│   │   ├── 📂 warehouse/           # Gestión de almacenes/PDV
│   │   ├── 📂 products/            # Gestión de productos
│   │   ├── 📂 stock/               # Control de inventario
│   │   ├── 📂 invoices/            # Facturación
│   │   ├── 📂 mail/                # Sistema de correos
│   │   └── 📂 location/            # Gestión de ubicaciones
│   ├── 📂 common/                   # Código compartido
│   │   ├── 📂 entities/            # Entidades de base de datos
│   │   ├── 📂 dtos/                # Data Transfer Objects
│   │   ├── 📂 repositories/        # Repositorios
│   │   ├── 📂 constants/           # Constantes
│   │   └── 📂 exceptions/          # Excepciones personalizadas
│   ├── 📂 infrastructure/           # Adaptadores e infraestructura
│   │   ├── 📂 adapters/            # Adaptadores externos
│   │   ├── 📂 decorators/          # Decoradores personalizados
│   │   ├── 📂 guard/               # Guards de seguridad
│   │   ├── 📂 interceptors/        # Interceptores
│   │   └── 📂 shared/              # Módulos compartidos
│   ├── 📂 config/                   # Configuración de la aplicación
│   │   ├── 📂 envs/                # Configuración por entorno
│   │   ├── configuration.ts         # Configuración principal
│   │   └── config.interface.ts      # Interfaces de configuración
│   ├── app.module.ts                # Módulo principal de la aplicación
│   └── main.ts                      # Punto de entrada
├── 📂 database/                     # Migraciones y seeds
│   ├── 📂 migrations/              # Scripts de migración SQL
│   └── migrate.ts                   # Configuración de migraciones
├── 📂 public/                       # Archivos estáticos
├── 📂 data-fake/                    # Datos de prueba
├── docker-compose.yml               # Configuración Docker desarrollo
├── docker-compose.production.yml    # Configuración Docker producción
├── Dockerfile                       # Imagen Docker
└── package.json                     # Dependencias y scripts
```

## 🔧 Módulos Principales

### 🔐 AuthModule
Maneja la autenticación y autorización de usuarios.

**Características:**
- Registro e inicio de sesión con JWT
- Verificación de email
- Recuperación de contraseña
- Estrategias de autenticación con Passport

**Endpoints principales:**
- `POST /api/v1/auth/register` - Registro de usuarios
- `POST /api/v1/auth/login` - Inicio de sesión
- `POST /api/v1/auth/verify` - Verificación de email
- `POST /api/v1/auth/forgot-password` - Recuperar contraseña

### 👥 UserModule
Gestión de usuarios y perfiles.

**Características:**
- CRUD de usuarios
- Gestión de perfiles
- Roles y permisos

### 🏢 CompanyModule
Gestión de empresas y configuración.

**Características:**
- Registro de empresas
- Configuración fiscal
- Multi-tenancy

### 🏪 WarehouseModule
Gestión de puntos de venta y almacenes.

**Características:**
- CRUD de almacenes/PDV
- Configuración por ubicación
- Gestión de direcciones

### 📦 ProductsModule
Gestión del catálogo de productos.

**Características:**
- CRUD de productos
- Categorías y marcas
- Códigos de barras
- Imágenes de productos

### 📊 StockModule
Control de inventario y stock.

**Características:**
- Gestión de stock por almacén
- Alertas de stock mínimo
- Movimientos de inventario

### 🧾 InvoicesModule
Sistema de facturación.

**Características:**
- Creación de facturas
- Gestión de clientes
- Reportes de ventas

### 📧 MailModule
Sistema avanzado de correos electrónicos.

**Características:**
- Templates con Handlebars
- Partials reutilizables
- Helpers personalizados
- Envío asíncrono con eventos

## 📊 Base de Datos

### Entidades Principales

#### 🏢 Company
```typescript
- id: UUID (PK)
- name: string
- nit: string (Unique)
- address: string
- phoneNumber: string
- website: string
- quantityEmployees: string
- economicActivity: string
- userId: number (FK)
```

#### 👤 User
```typescript
- id: number (PK, Identity)
- authId: UUID (Unique)
- email: string (Unique)
- password: string (Hashed)
- verified: boolean
- verifyToken: string
- resetToken: string
```

#### 📦 Product
```typescript
- id: UUID (PK)
- name: string
- description: string
- barCode: string
- images: string[]
- typeProduct: ProductType (ENUM)
- taxesOption: number
- sku: string
- companyId: UUID (FK)
- categoryId: UUID (FK)
- brandId: UUID (FK)
```

#### 🏪 Warehouse
```typescript
- id: UUID (PK)
- name: string
- description: string
- address: string (Unique)
- phoneNumber: string
- main: boolean
- companyId: UUID (FK)
- locationId: UUID (FK)
```

#### 📊 Stock
```typescript
- id: UUID (PK)
- quantity: number
- minQuantity: number
- productId: UUID (FK)
- warehouseId: UUID (FK)
```

### Relaciones

- **Company** → **User** (Many-to-One)
- **Company** → **Warehouse** (One-to-Many)
- **Company** → **Product** (One-to-Many)
- **Warehouse** → **Stock** (One-to-Many)
- **Product** → **Stock** (One-to-Many)
- **Product** → **Category** (Many-to-One)
- **Product** → **Brand** (Many-to-One)

### Migraciones

```bash
# Ejecutar migraciones
npm run migrate:up

# Ver estado de migraciones
npm run migrate:status

# Rollback (si está disponible)
npm run migrate:down
```

## 📧 Sistema de Correos

### Características Avanzadas

- **Templates Handlebars**: Sistema robusto de plantillas
- **Partials Reutilizables**: Componentes de email reutilizables
- **Helpers Personalizados**: Funciones utilitarias en templates
- **Configuración Modular**: Fácil mantenimiento y escalabilidad

### Templates Disponibles

#### 🎉 Registro Exitoso
- **Archivo**: `auth/register-success.hbs`
- **Uso**: Bienvenida a nuevos usuarios
- **Variables**: `email`

#### ✅ Verificación de Email  
- **Archivo**: `auth/verify-email.hbs`
- **Uso**: Verificación de cuenta
- **Variables**: `name`, `activationLink`

#### 🔐 Recuperación de Contraseña
- **Archivo**: `auth/reset-password.hbs`  
- **Uso**: Reset de contraseña
- **Variables**: `name`, `resetLink`

### Helpers Disponibles

```handlebars
{{currentYear}}              <!-- Año actual -->
{{formatDate date}}          <!-- Formateo de fechas -->
{{formatCurrency amount}}    <!-- Formateo de moneda -->
{{#ifEquals arg1 arg2}}      <!-- Comparación condicional -->
```

### Partials

- **header.hbs**: Encabezado con logo y título
- **footer.hbs**: Pie de página con enlaces
- **head.hbs**: Estilos CSS y metadatos

### Configuración SMTP

```typescript
{
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@gmail.com',
    pass: 'app-password'
  }
}
```

### Endpoints de Testing

```http
POST /api/v1/mail/test/welcome          # Correo sin partials
POST /api/v1/mail/test/welcome-partials # Correo con partials
POST /api/v1/mail/test/verify          # Correo de verificación
```

## 🔐 Autenticación

### Estrategia JWT

```typescript
{
  secret: 'your-secret-key',
  expiresIn: '1d',
  algorithm: 'HS256'
}
```

### Guards Implementados

- **JwtAuthGuard**: Protección con JWT
- **RolesGuard**: Control de roles
- **CompanyGuard**: Multi-tenancy

### Middleware

- **AuthInterceptor**: Inyección automática de usuario
- **ExceptionInterceptor**: Manejo global de errores

## 🌐 API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### Autenticación
```http
POST   /auth/register           # Registro
POST   /auth/login              # Inicio de sesión  
POST   /auth/verify             # Verificar email
POST   /auth/forgot-password    # Recuperar contraseña
POST   /auth/reset-password     # Resetear contraseña
```

### Usuarios
```http
GET    /users                   # Listar usuarios
GET    /users/:id               # Obtener usuario
PUT    /users/:id               # Actualizar usuario
DELETE /users/:id               # Eliminar usuario
```

### Empresas
```http
GET    /companies               # Listar empresas
POST   /companies               # Crear empresa
GET    /companies/:id           # Obtener empresa
PUT    /companies/:id           # Actualizar empresa
DELETE /companies/:id           # Eliminar empresa
```

### Productos
```http
GET    /products                # Listar productos
POST   /products                # Crear producto
GET    /products/:id            # Obtener producto
PUT    /products/:id            # Actualizar producto
DELETE /products/:id            # Eliminar producto
```

### Almacenes
```http
GET    /warehouses              # Listar almacenes
POST   /warehouses              # Crear almacén
GET    /warehouses/:id          # Obtener almacén
PUT    /warehouses/:id          # Actualizar almacén
DELETE /warehouses/:id          # Eliminar almacén
```

## ⚙️ Variables de Entorno

### Desarrollo (.env)
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=ally360_pos

SECRET=your-jwt-secret
TOKEN_EXPIRE_IN=1d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@domain.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@ally360.com
```

### Producción
```env
NODE_ENV=production
POSTGRES_CONNECTION_STRING=postgresql://user:pass@host:port/db
# ... otras variables
```

## 🧪 Testing

### Scripts Disponibles

```bash
# Tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Tests de integración
npm run test:e2e

# Coverage report
npm run test:cov

# Debug tests
npm run test:debug
```

### Estructura de Tests
```
test/
├── unit/           # Tests unitarios
├── integration/    # Tests de integración
└── e2e/           # Tests end-to-end
```

## 📦 Despliegue

### Docker Production

```bash
# Build imagen de producción
docker build -t ally360-api .

# Ejecutar en producción
docker-compose -f docker-compose.production.yml up -d
```

### Variables de Producción

```bash
export NODE_ENV=production
export POSTGRES_CONNECTION_STRING="postgresql://..."
export SECRET="production-secret"
# ... otras variables
```

### Health Check

```http
GET /health         # Estado de la aplicación
GET /api/v1/health  # Estado de la API
```

## 🤝 Contribución

### Convenciones de Código

- **ESLint**: Linting automático
- **Prettier**: Formateo de código
- **Conventional Commits**: Formato de commits
- **TypeScript**: Tipado estricto

### Comandos de Desarrollo

```bash
# Linting
npm run lint

# Formateo
npm run format

# Build
npm run build

# Modo desarrollo
npm run start:dev
```

---

## 📄 Licencia

Este proyecto está bajo la licencia **UNLICENSED** - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🆘 Soporte

Para soporte o preguntas sobre el proyecto:

- 📧 **Email**: support@ally360.co
- 📱 **Documentación**: [docs.ally360.co](https://docs.ally360.co)

---

<p align="center">
  Desarrollado con ❤️ por el equipo de <strong>Ally360</strong>
</p>