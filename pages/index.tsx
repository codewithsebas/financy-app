import { Button } from "@/components/ui/button"; // Component Button of shadcn
import { useUser } from "@auth0/nextjs-auth0/client"; // We import the hook useUser to handle authentication
import { CornerRightUp, Github, Grid2X2, LoaderCircle } from 'lucide-react'; // We use lucide for the icons
import Link from "next/link";

export default function Home() {
  const { user, error, isLoading } = useUser(); // Gets the user, error and load status.

  if (isLoading) return <main className="w-full h-screen flex flex-col gap-3 items-center justify-center">Loading... <LoaderCircle className="animate-spin" /></main>; // We display a loading message if it is loading.
  if (error) return <main className="w-full h-screen flex flex-col gap-3 items-center justify-center">{error.message}</main>; // We display an error message if there is a problem with the session.

  return (
    <main className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      {user ? ( // We check if there is an authenticated user
        <div className="flex flex-col gap-5 border p-5 rounded-xl w-fit shadow-sm">
          <div>
            <h1 className="text-2xl"><b>{user.name}</b></h1>
            <p className="text-colorBlack/50 text-lg">Sistema de gestión de ingresos y egresos</p>
          </div>
          <div className="flex flex-col items-start gap-3">
          <Button variant="secondary" className="py-5 w-full font-medium text-lg border border-colorGrayWhite">
              <Link href="/dashboard" className="w-full flex justify-center items-center gap-3">Dashboard <Grid2X2 size={20} /></Link>
            </Button>
            <Button className="w-full font-medium text-lg py-5">
              <Link href="/api/auth/logout" className="w-full text-center flex justify-center items-center gap-3">Cerrar sesion <CornerRightUp size={20} /></Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 border p-5 rounded-xl w-fit shadow-sm">
          <div>
            <h1 className="text-2xl"><b>Financy App</b></h1>
            <p className="text-colorBlack/50 text-lg">Sistema de gestión de ingresos y egresos</p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <Button className="w-full font-medium text-lg py-5">
              <Link href="/api/auth/login" className="w-full text-center flex justify-center items-center gap-3">Inicia sesion <CornerRightUp size={20} /></Link>
            </Button>

            <Button variant="secondary" className="py-5 w-full font-medium text-lg border border-colorGrayWhite">
              <Link target="_blank" href="https://github.com/codewithsebas/financy-app" className="w-full flex justify-center items-center gap-3">Repositorio <Github size={20} /></Link>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
