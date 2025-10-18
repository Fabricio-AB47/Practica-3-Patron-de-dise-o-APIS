# Practica 2 - Backend (Express) + Frontend (Angular)

Pasos rápidos para desarrollo en Windows (PowerShell):

1) Instalar dependencias (desde la raíz):

```powershell
npm install
cd frontend
npm install
```

2) Iniciar backend (desde la raíz):

```powershell
# modo desarrollo con reinicio automático
npm run dev
# o modo producción
# npm start
```

3) Iniciar frontend (otra terminal):

```powershell
cd frontend
npm start       # ng serve -> http://localhost:4200
# o en puerto alternativo si 4200 está en uso
npm run start:alt  # ng serve --port 4201 -> http://localhost:4201
```

4) Variables de entorno útiles:
- `MONGODB_URI` para indicar la URI de MongoDB si no está en localhost.
- `PORT` para cambiar el puerto del backend.

5) Endpoints:
- `GET /health` -> salud del servidor
- `GET/POST/PUT/DELETE /api/empleados` -> API de empleados

Notas:
- `backend/app.js` permite CORS desde `http://localhost:4200` y `http://localhost:4201` durante desarrollo.
- Si vas a desplegar, revisa la configuración de CORS y las variables de entorno.

MongoDB Compass and seed
-------------------------

1. Si usas MongoDB local, abre MongoDB Compass y conéctate a:

	mongodb://127.0.0.1:27017

	o usa la URI completa del fichero `.env`/`.env.example`.

2. Para poblar la base de datos de ejemplo ejecuta desde la raíz:

```powershell
node backend/seed.js
```

Esto vaciará la colección `empleados` y añadirá tres documentos de ejemplo (Ana, Luis, María).

3. En MongoDB Compass navega a la base `usuarios_db` -> colección `empleados` para ver/editar/eliminar documentos.
