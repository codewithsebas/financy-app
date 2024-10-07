# Financy App - Sistema de Ingresos/Gastos (Next.js 14)

Financy-App es un sistema de ingresos/gastos desarrollado con Next.js 14, utilizando Supabase, GraphQL y Axios para la gestión de APIs. Permite a los usuarios con rol de administrador registrarse, iniciar sesión, gestionar sus gastos e ingresos, añadir nuevas entradas de gastos e ingresos, gestionar usuarios (editar el rol del usuario) y descargar un informe de sus transacciones. Para los usuarios con el rol estándar de Usuario, les permite ver la gestión de sus ingresos y gastos.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm o Yarn (gestor de paquetes de Node)
- Prisma (para la gestión de la base de datos)

## Empezando

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/codewithsebas/financy-app.git
cd financy-app

npm install

yarn install
```

## Crear un nuevo proyecto en Supabase
Una vez que hayas iniciado sesión, sigue estos pasos para crear un nuevo proyecto:

- Haz clic en "Nuevo proyecto" en tu tablero de control.
- Asigna un nombre a tu proyecto y elige una contraseña para la base de datos. Asegúrate de recordar esta contraseña, ya que la necesitarás más adelante.
- Haz clic en "Crear proyecto".

## Obtener las credenciales de conexión
Después de que tu proyecto esté creado, sigue estos pasos para obtener las credenciales:

- En el panel de tu proyecto, ve a la sección "Configuración" (Settings) en el menú de la izquierda
- Haz clic en "API"
- Aquí encontrarás tu URL de la base de datos y las credenciales de conexión (incluyendo el nombre de usuario y la contraseña que estableciste al crear el proyecto).


## Variables de Entorno:

Crea un archivo .env.local en la raíz de tu proyecto y configura las siguientes variables de entorno:

```bash
AUTH0_SECRET=
AUTH0_BASE_URL="http://localhost:3000"
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
NEXT_PUBLIC_MGMT_API_ACCESS_TOKEN=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_PASSWORD=
DATABASE_URL=
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/api"
NEXT_PUBLIC_API_URL="/api/graphql"
```


## Inicializar Prisma

Inicializa Prisma en tu proyecto:

```bash
npx prisma init
```
Esto creará un directorio llamado prisma en la raíz de tu proyecto, junto con un archivo .env y un archivo schema.prisma.

## Configurar la Base de Datos

En el archivo .env, configura tu URL de conexión a la base de datos. Supabase:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```
Asegúrate de reemplazar USER, PASSWORD, HOST, PORT y DATABASE con tus credenciales de Supabase.

## Definir el Esquema de Prisma

En prisma/schema.prisma, define los modelos que necesites. Por ejemplo:

```bash
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int         @id @default(autoincrement())
  name      String
  email     String      @unique
  phone     String?
  role      String
  movements Movements[]
}

model Movements {
  id      Int      @id @default(autoincrement())
  concept String
  amount  Float
  date    DateTime
  userId  Int?
  user    User?    @relation(fields: [userId], references: [id])
}
```

## Migrar la Base de Datos

Si has definido tus modelos, ejecuta la migración para crear las tablas en tu base de datos:

```bash
npx prisma migrate dev --name init
```

## Generar el Cliente de Prisma

Genera el cliente de Prisma para que puedas usarlo en tu código:

```bash
npx prisma generate
```

## Guardar usuarios y movimientos rápidamente

```bash
node scripts/create.js
```


## Iniciar el servidor de desarrollo:

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm run dev
```

o, para Yarn:
```bash
yarn dev
```

La aplicación se ejecutará en http://localhost:3000.

## Construir para producción (opcional):

Si deseas construir la aplicación para producción, ejecuta:

```bash
npm run build
```

o, para Yarn:

```bash
yarn build
```

## Ejecutar pruebas:

Si deseas ejecutar pruebas usando Jest, utiliza el siguiente comando:

```bash
npm run test
```
o 
```bash
yarn test
```

## Tecnologías

- Next.js
- Supabase
- Apollo Client (graphql)
- Axios
- Tailwind CSS
- Shadcn
- date-fns

# Despliegue en Vercel

- Crear una cuenta en Vercel
Si no tienes una cuenta en Vercel, ve a vercel.com y crea una cuenta gratuita. Puedes registrarte utilizando tu cuenta de GitHub, Google o tu dirección de correo electrónico.

- Conecta tu cuenta de GitHub a Vercel
Una vez que hayas iniciado sesión en Vercel:

- Crea un equipo, al momento de crear da click en Añadir nuevo -> proyecto 


- Importar tu proyecto desde GitHub
Después de conectar tu cuenta de GitHub:

- En el dashboard de Vercel, haz clic en "New Project" (Nuevo Proyecto).
Vercel mostrará una lista de tus repositorios de GitHub. Busca y selecciona el repositorio de tu proyecto Financy-App.
Haz clic en "Import" (Importar) para continuar.


- Configurar las opciones del proyecto
Vercel te llevará a una página de configuración del proyecto:

- Configuración del Framework: Asegúrate de que el framework correcto esté seleccionado (Next.js, en este caso).

- Variables de Entorno: Aquí puedes configurar las variables de entorno necesarias para tu aplicación. Usa el mismo contenido que agregaste a tu archivo .env.local:

- Haz clic en "Add" (Agregar) para cada variable de entorno que necesites, e ingresa el nombre y el valor correspondiente.
Configuración del Dominio: Si tienes un dominio personalizado que deseas usar, puedes configurarlo aquí. Si no, Vercel asignará un dominio temporal.

- Desplegar el proyecto
Una vez que hayas configurado todas las opciones, haz clic en "Deploy" (Desplegar).
Vercel comenzará a construir y desplegar tu aplicación. Esto puede tardar unos momentos.
- Acceder a tu aplicación desplegada
Después de que el proceso de despliegue se complete, serás redirigido a la página de tu proyecto en Vercel. Aquí encontrarás la URL de tu aplicación desplegada, que generalmente tendrá el formato https://nombre-del-proyecto.vercel.app.

- Verificar el despliegue
Haz clic en la URL para abrir tu aplicación en el navegador y verifica que todo funcione correctamente. Si hay algún problema, puedes revisar los logs de construcción y despliegue en la sección de "Deployments" en el dashboard de Vercel.