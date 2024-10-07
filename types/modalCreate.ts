export interface ModalCreateProps {
    onSave: (amount: string, concept: string, date: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    loadingEdit: boolean;
    setLoadingEdit: (loadingEdit: boolean) => void;
  } // Props para el modal Crear

  export interface ErrorState {
    amount?: string;
    concept?: string;
    date?: string;
  } // Tipos de errores