"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
    onChange: (date: Date) => void; // Cambia a solo Date ya que nunca debe ser undefined
}

export function DatePicker({ onChange }: DatePickerProps) {
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    // Actualiza el estado y llama a la función onChange cuando se selecciona una fecha
    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        if (selectedDate) { // Solo llama onChange si selectedDate no es undefined
            onChange(selectedDate);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Selecciona la fecha</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
