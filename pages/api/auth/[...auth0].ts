import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
    login: handleLogin({
        returnTo: "/dashboard",
    }),
    signup: handleLogin({
        authorizationParams: {
            screen_hint: "signup"
        },
    returnTo: "/dashboard",
    }),
});