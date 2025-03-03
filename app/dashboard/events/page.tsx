import Link from 'next/link';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CreateEventDialog from '@/components/events/CreateEventDialog';
import DeleteEventButton from '@/components/events/DeleteEventDialog';

export default async function EventsPage() {
  const events = [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Eventos y Congresos</h1>
        <CreateEventDialog>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Evento
          </Button>
        </CreateEventDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Eventos y Congresos</CardTitle>
          <CardDescription>
            Administra todos los eventos y congresos programados en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-center">Fecha</TableHead>
                <TableHead className="text-center">Asistentes</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length > 0 ? (
                events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell>{event.type}</TableCell>
                    <TableCell className="text-center">
                      {new Date(event.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">{event.attendeesCount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/events/${event.id}`}>
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeleteEventButton id={event.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    No hay eventos registrados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
