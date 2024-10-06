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
import { useState } from "react";
import { DatePicker } from "../DatePicker";
import { format } from "date-fns";
import { ModalCreateProps } from "@/types/modalCreate";

export function ModalCreate({
  onSave,
  open, setOpen, loadingEdit, setLoadingEdit
}: ModalCreateProps) {
  const [amount, setAmount] = useState("");
  const [concept, setConcept] = useState("");
  const [date, setDate] = useState<string>("");

  const handleSave = () => {
    setLoadingEdit(true)
    onSave(amount, concept, date);
  };

  const handleDateChange = (date: Date) => {
    
    setDate(format(date, "yyyy-MM-dd"));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-3 items-center shadow">
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
              value={amount}
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="concept" className="text-right">
              Concepto
            </Label>
            <Input
              id="concept"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="date" className="text-right">
              Fecha
            </Label>
            <DatePicker onChange={handleDateChange} />
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
