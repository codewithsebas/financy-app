import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LoaderCircle } from "lucide-react";
import { ErrorState, ModalEditProps } from "@/types/modalEdit";

export function ModalEdit({
    onSave,
    initialId,
    initialName,
    initialRole,
    open,
    setOpen,
    loadingEdit,
    setLoadingEdit
}: ModalEditProps) {
    const [name, setName] = useState(initialName);
    const [role, setRole] = useState(initialRole);
    const [errors, setErrors] = useState<ErrorState>({});

    useEffect(() => {
        if (open) {
            setName(initialName);
            setRole(initialRole);
            setErrors({});
        }
    }, [open, initialName, initialRole]);

    const validateForm = useCallback((): ErrorState => {
        const newErrors: ErrorState = {};
        if (!name) {
            newErrors.name = "El nombre es obligatorio.";
        }
        if (!role) {
            newErrors.role = "El rol es obligatorio.";
        }
        return newErrors;
    }, [name, role]);

    // Funcion para guardar, que incluye la validación
    const handleSave = useCallback(() => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoadingEdit(true);
        onSave(initialId, name, role);
    }, [validateForm, onSave, initialId, name, role, setLoadingEdit]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Editar</DialogTitle>
                    <DialogDescription>Usuario</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1 items-start">
                        <Label htmlFor="name" className="text-right">
                            Nombre
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full"
                            aria-invalid={!!errors.name}
                            aria-describedby="name-error"
                        />
                        {errors.name && <p id="name-error" className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                        <Label htmlFor="role" className="text-right">
                            Rol
                        </Label>
                        <Select onValueChange={(value) => setRole(value)} value={role}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccionar rol" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">Usuario</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.role && <p id="role-error" className="text-red-500 text-sm">{errors.role}</p>}
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSave} className="bg-emerald-500 hover:bg-emerald-600/70">
                        {loadingEdit ? (<LoaderCircle size={20} className="animate-spin" />) : 'Guardar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
