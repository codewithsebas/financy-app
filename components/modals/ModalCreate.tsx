import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Plus } from "lucide-react";
import { useState, useCallback } from "react";
import { DatePicker } from "../DatePicker";
import { format } from "date-fns";
import { ErrorState, ModalCreateProps } from "@/types/modalCreate";

export function ModalCreate({
  onSave,
  open,
  setOpen,
  loadingEdit,
  setLoadingEdit
}: ModalCreateProps) {
  const [formData, setFormData] = useState({
    amount: "",
    concept: "",
    date: "",
  });
  const [errors, setErrors] = useState<ErrorState>({});

  // Funcion para validar los campos
  const validateForm = useCallback((): ErrorState => {
    const newErrors: ErrorState = {};

    if (!formData.amount) {
      newErrors.amount = "El monto es obligatorio.";
    }
    if (!formData.concept) {
      newErrors.concept = "El concepto es obligatorio.";
    }
    if (!formData.date) {
      newErrors.date = "La fecha es obligatoria.";
    }

    return newErrors;
  }, [formData]);

  // Función para manejar la validacion y el guardado
  const handleSave = useCallback(() => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Si hay errores, no dejara enviar
    }

    setLoadingEdit(true);
    onSave(formData.amount, formData.concept, formData.date);
  }, [validateForm, formData, onSave, setLoadingEdit]);

  // Funcion para manejar cambios en los campos de entrada
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));

      // Limpiar errores del campo modificado
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: undefined,
      }));
    },
    []
  );

  // Funcion para manejar el cambio de fecha
  const handleDateChange = useCallback((date: Date) => {
    setFormData((prevData) => ({
      ...prevData,
      date: format(date, "yyyy-MM-dd"),
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      date: undefined,
    }));
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-3 items-center shadow bg-emerald-500 hover:bg-emerald-600/70">
          Nuevo <Plus size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Nuevo</DialogTitle>
          <DialogDescription>Ingreso/Egreso</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="amount" className="text-right">
              Monto
            </Label>
            <Input
              id="amount"
              value={formData.amount}
              type="number"
              onChange={handleInputChange}
              className="w-full"
              aria-invalid={!!errors.amount}
              aria-describedby="amount-error"
            />
            {errors.amount && <p id="amount-error" className="text-red-500 text-sm">{errors.amount}</p>}
          </div>
          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="concept" className="text-right">
              Concepto
            </Label>
            <Input
              id="concept"
              value={formData.concept}
              onChange={handleInputChange}
              className="w-full"
              aria-invalid={!!errors.concept}
              aria-describedby="concept-error"
            />
            {errors.concept && <p id="concept-error" className="text-red-500 text-sm">{errors.concept}</p>}
          </div>
          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="date" className="text-right">
              Fecha
            </Label>
            <DatePicker onChange={handleDateChange} />
            {errors.date && <p id="date-error" className="text-red-500 text-sm">{errors.date}</p>}
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
