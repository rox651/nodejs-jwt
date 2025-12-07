# Supermarket Simulation API (Node.js + JWT)

Este proyecto es una implementación de la simulación de cobro de supermercado (Caso de Estudio - Actividad 2) adaptada con los requerimientos de seguridad y autenticación (Node.js, JWT, Postgres).

## Tecnologías

- **Runtime**: Node.js / Bun
- **Framework**: Express
- **Base de Datos**: PostgreSQL
- **ORM**: Drizzle ORM
- **Autenticación**: JWT (JsonWebToken)
- **Lenguaje**: TypeScript

## Requerimientos

1.  Node.js (v18+) o Bun.
2.  PostgreSQL corriendo localmente o en la nube.

## Configuración

1.  Instalar dependencias:
    ```bash
    bun install
    ```

2.  Configurar variables de entorno:
    Crea un archivo `.env` basado en `.env.example`:
    ```env
    DATABASE_URL=postgres://usuario:password@localhost:5432/nombre_base_datos
    JWT_SECRET=tu_secreto_seguro
    PORT=3000
    ```
    Para JWT_SECRET ejecuta:
    ```node -e "console.log(require('crypto').randomBytes(32).toString('hex'))```

3.  Configurar la Base de Datos (Migraciones):
    ```bash
    bun run db:generate  # Generar archivos de migración
    bun run db:push      # Aplicar cambios a la DB
    ```

## Ejecución

- **Desarrollo**:
    ```bash
    bun run dev
    ```
- **Producción**:
    ```bash
    bun run build
    bun run start
    ```

## Guía de Pruebas de Endpoints 

Puedes probar la API usando `curl` en tu terminal. Sigue estos pasos en orden. Asegúrate de que tu servidor esté corriendo (`bun run dev`).

### 1. Restaurar Base de Datos (Opcional - Limpiar todo)
Este comando borrará todos los datos y recreará las tablas. Útil para iniciar pruebas limpias.
```bash
bun run db:reset
```

### 2. Registrar un Administrador
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@test.com",
    "password": "123",
    "role": "admin"
  }'
```

### 3. Iniciar Sesión (Login)
Este comando te devolverá un **Token JWT**. Cópialo para usarlo en los siguientes pasos.
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "123"
  }'
```

### 4. Crear Productos (Requiere Token)
Reemplaza `TU_TOKEN_AQUI` con el token obtenido.

```export TOKEN="TU_TOKEN_AQUI"```

# Crear Manzana ($100)
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{ "name": "Manzana", "price": 100 }'

# Crear Leche ($150)
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{ "name": "Leche", "price": 150 }'
```

### 5. Ejecutar Simulación
Usa el mismo token. Asumiendo que los productos creados tienen IDs 1 y 2.
```bash
curl -X POST http://localhost:3000/api/simulation \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "clients": [
      { "name": "Cliente A", "productIds": [1, 2] },
      { "name": "Cliente B", "productIds": [1, 1, 2] }
    ]
  }'
```

## Endpoints Principales

### Autenticación
- `POST /api/auth/register`: Registrar usuario (Admin o Docente).
- `POST /api/auth/login`: Iniciar sesión (Retorna Token JWT).

### Productos (Rol: Admin)
- `POST /api/products`: Crear nuevo producto.
- `GET /api/products`: Listar productos (Acceso: Admin, Docente).

### Simulación (Rol: Admin, Docente)
- `POST /api/simulation`: Ejecutar simulación de cobro.
    - Body:
      ```json
      {
        "clients": [
          { "name": "Cliente 1", "productIds": [1, 2] }
        ]
      }
      ```
