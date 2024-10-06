export interface NavbarProps {
    role: string | undefined; // Puedes ajustar el tipo según tus necesidades
}
export interface NavItemProps {
    href: string;
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    activeNav: boolean
}