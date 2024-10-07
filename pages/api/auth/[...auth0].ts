import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

// Configuramos el inicio de sesion para redirigir al usuario directamente al dashboard
export default handleAuth({
    login: handleLogin({
        returnTo: "/dashboard",
    })
});