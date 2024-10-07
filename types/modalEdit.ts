export interface ModalEditProps {
    onSave: (id: number, name: string, role: string) => void;
    initialId: number;
    initialName: string;
    initialRole: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    loadingEdit: boolean;
    setLoadingEdit: (loadingEdit: boolean) => void;
} // Props para el modal Crear

export interface ErrorState {
    name?: string;
    role?: string;
} // Tipos de errores