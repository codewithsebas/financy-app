"use client";
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { Frown, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const DashboardLayout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    const router = useRouter();
    const { user, error, isLoading } = useUser();
    const { roles } = useAuth();
    const role = roles?.[0]?.name;

    // Redirigimos a la pantalla de login si no existe usuario autenticado
    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/');
        }
    }, [user, isLoading, router]);


    // Se muestra pantalla de carga, al momento de iniciar
    if (isLoading) {
        return (
            <main className="w-full h-screen flex flex-col gap-5 items-center justify-center text-xl">
                Cargando... <LoaderCircle size={20} className="animate-spin" />
            </main>
        );
    }

    // Se muestra pantalla de error si ocurre algun error con el inicio de sesion
    if (error) return (
        <main className="w-full h-screen flex flex-col gap-3 items-center justify-center">
            {error.message} <Frown size={20} />
        </main>
    );

     // Se evita error de undefined, y se redirige 
    if (!user) {
        return null;
    }

    return (
        <div className="w-full h-screen flex">
            {/* Navbar de navegacion */}
            <Navbar role={role} />
            {/* Barra de bienvenida y usuario autenticado */}
            <main className='w-full p-5'>
                <aside className='flex items-center gap-3 border-b p-2 pt-0 pb-4 w-full'>
                    <div className='w-10 h-10 flex items-center justify-center bg-black rounded-sm text-white'>
                        <Image src={user?.picture || '/path-to-default-image.jpg'} alt='Picture' className='rounded-sm' width={1000} height={1000} />
                    </div>
                    <div className='flex flex-col'>
                        <h4 className="font-semibold text-lg">{user?.name}</h4>
                        <p className="font-light text-sm">Bienvenido de vuelta</p>
                    </div>
                </aside>
                {/* Diferente informacion dependiendo de la pantalla en la que este */}
                <div className='my-5 flex flex-col gap-5'>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
