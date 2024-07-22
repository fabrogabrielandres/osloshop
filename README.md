Descripción
Correr en dev
Clonar el repositorio.
Crear una copia del .env.template y renombrarlo a .env y cambiar las variables de entorno.
Instalar dependencias npm install
Levantar la base de datos docker compose up -d
Correr las migraciones de Primsa ```npx prisma migrate dev````
Ejecutar seed npm run seed
Correr el proyecto npm run dev
Correr en prod