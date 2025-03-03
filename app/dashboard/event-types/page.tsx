"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import CreateEventTypeDialog from "@/components/events-types/CreateEventTypeDialog";
import DeleteEventTypeDialog from "@/components/events-types/DeleteEventTypeDialog";

type EventType = {
  id: string;
  name: string;
};

export default function EventTypesPage() {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await fetch("/api/event-types");
        if (!response.ok) {
          throw new Error("Error al cargar los tipos de eventos");
        }
        const data = await response.json();
        setEventTypes(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventTypes();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tipos de Eventos</h1>
        <CreateEventTypeDialog>
          <Button>+ Nuevo Tipo de Evento</Button>
        </CreateEventTypeDialog>
      </div>

      {loading ? (
        <p>Cargando tipos de eventos...</p>
      ) : eventTypes.length === 0 ? (
        <p>No hay tipos de eventos registrados.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eventTypes.map((eventType) => (
              <TableRow key={eventType.id}>
                <TableCell>{eventType.name}</TableCell>
                <TableCell className="text-right">
                  <DeleteEventTypeDialog id={eventType.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
