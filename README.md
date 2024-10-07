
# Income/Expense System (Next.js 14)

Financy-App is a booking system developed with Next.js 14, using Supabase, GraphQL, and Axios for API management. It allows users with an admin role to register, log in, manage their Expenses and Income, add new Expense and Income entries, manage users (edit the user's role), and download a report of their transactions. For users with the standard User role, it allows them to view the management of their income and expenses.

## Prerequisites

- Node.js (versión 14 o superior)
- Npm y/o yarn (Node Package Manager)
-  Axios

## Getting Started

### 1. Clone the repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/codewithsebas/reservation-system-frontend.git
cd reservation-system-frontend
```

### 2. Instala las dependencias:


```
npm install
```

### 3. Variables de entorno:

Crea un archivo .env.local en la raíz de tu proyecto y configura tus variables de entorno:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Reemplaza http://localhost:8080 con la URL de tu API backend.


### 4. Inicia el servidor de desarrollo:

`npm run dev`

La aplicación se ejecutará en http://localhost:3000.

### 4. Compilación para producción (opcional):

`
npm run build
`


### 5. Tecnologias
```
- Nextjs
- Ant Design
- Dayjs
- Tailwindcss
