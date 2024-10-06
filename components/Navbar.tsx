import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChartNoAxesCombined, ChevronRight, Grid2X2, LogOut, UserCog } from 'lucide-react';
import { NavbarProps, NavItemProps } from '@/types/navbar';

const NavItem: React.FC<NavItemProps> = ({ href, label, icon, isActive, activeNav }) => (
    <li className={`rounded-lg w-full flex items-center justify-start gap-2 duration-150 ${isActive ? 'bg-slate-50' : 'bg-white hover:bg-slate-100'}`}>
        <Link href={href} className={`w-full flex items-center justify-between ${activeNav ? ' py-2 px-3  duration-300' : 'py-2 px-2 ps-2.5  duration-300'}`}>
            <div className={`flex items-center ${activeNav ? 'gap-2' : 'gap-0'}`}>
                <span className={`${!activeNav && 'py-0.5'}`}>
                    {icon}
                </span>
                <span className='truncate'>{activeNav && label}</span>
            </div>
            {isActive && activeNav && <ChevronRight size={20} />}
        </Link>
    </li>
);

const Navbar:  React.FC<NavbarProps>  = ({ role }) => {
    const pathname = usePathname();
    const [activeNav, setActiveNav] = useState(true);

    return (
        <nav className={` p-5 flex flex-col justify-between border-r relative ${activeNav ? 'w-80 min-w-80 duration-300 ease' : 'w-20 min-w-20 duration-300 ease'} `}>
            <button onClick={() => setActiveNav(!activeNav)} className={`absolute bg-slate-50 rounded-full p-1 border duration-1000 -right-3 top-8 ${activeNav ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronRight size={15} />
            </button>
            <div className="flex flex-col gap-5 overflow-hidden">
                <div className="flex gap-3 items-center border-b pb-5">
                    <div className="min-w-10 min-h-10 max-h-10 mb-1 flex items-center justify-center text-white bg-emerald-500 rounded-md font-bold">F</div>
                    {activeNav && <div className='truncate'>
                        <h4 className="font-semibold">Financy App</h4>
                        <p className="font-light text-sm">Ingresos y egresos</p>
                    </div>}
                </div>

                <ul className="flex flex-col gap-2">
                    <NavItem
                        href="/dashboard"
                        label="Gestión principal"
                        icon={<Grid2X2 size={20} />}
                        isActive={pathname === '/dashboard'}
                        activeNav={activeNav}
                    />

                    {role === 'admin' && (
                        <>
                            <NavItem
                                href="/users"
                                label="Gestión de Usuarios"
                                icon={<UserCog size={20} />}
                                isActive={pathname === '/users'}
                                activeNav={activeNav}
                            />
                            <NavItem
                                href="/reports"
                                label="Reportes"
                                icon={<ChartNoAxesCombined size={20} />}
                                isActive={pathname === '/reports'}
                                activeNav={activeNav}
                            />
                        </>
                    )}
                </ul>
            </div>

            <li className="w-full flex items-center gap-2 duration-150  border-t pt-5">
                <Link href="/api/auth/logout" className="w-full flex items-center py-2 px-3 hover:bg-slate-50 rounded-md  justify-between">
                    <div className="flex items-center gap-2">
                        <LogOut size={20} />
                        {activeNav && 'Salir'}
                    </div>
                    <ChevronRight size={20} />
                </Link>
            </li>
        </nav>
    );
};

export default Navbar;
