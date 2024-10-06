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
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { LoaderCircle } from "lucide-react";
import { ModalEditProps } from "@/types/modalEdit";

export function ModalEdit({ onSave, initialId, initialName, initialRole, open, setOpen, loadingEdit, setLoadingEdit }: ModalEditProps) {
    const [name, setName] = useState(initialName);
    const [role, setRole] = useState(initialRole);

    useEffect(() => {
        if (open) {
            setName(initialName);
            setRole(initialRole);
        }
    }, [open, initialName, initialRole]);

    const handleSave = () => {
        setLoadingEdit(true)
        onSave(initialId, name, role);
    };

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
                        />
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

                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSave}>
                        {loadingEdit ? (<LoaderCircle size={20} className="animate-spin" />) : 'Guardar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
