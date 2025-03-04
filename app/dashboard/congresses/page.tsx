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
import CreateCongressDialog from '@/components/congresses/CreateCongressDialog';
import DeleteCongressButton from '@/components/congresses/DeleteCongressDialog';

export default async function CongressesPage() {
    const congresses = [
        {
          id: 1,
          name: "TechCon 2024",
          organizer: "Asociación de Desarrolladores",
          date: "2024-03-15T09:00:00",
          eventsCount: 12
        },
        {
          id: 2,
          name: "AI Summit",
          organizer: "Grupo de Inteligencia Artificial",
          date: "2024-04-20T10:00:00",
          eventsCount: 8
        },
        {
          id: 3,
          name: "Design Week",
          organizer: "Diseñadores Digitales",
          date: "2024-05-05T11:00:00",
          eventsCount: 15
        }
      ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Congresos</h1>
        <CreateCongressDialog>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Congreso
          </Button>
        </CreateCongressDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Congresos</CardTitle>
          <CardDescription>
            Administra todos los congresos organizados en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Organizador</TableHead>
                <TableHead className="text-center">Fecha</TableHead>
                <TableHead className="text-center">Eventos</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {congresses.length > 0 ? (
                congresses.map((congress) => (
                  <TableRow key={congress.id}>
                    <TableCell className="font-medium">{congress.name}</TableCell>
                    <TableCell>{congress.organizer}</TableCell>
                    <TableCell className="text-center">
                      {new Date(congress.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">{congress.eventsCount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/congresses/${congress.id}`}>
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeleteCongressButton id={congress.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    No hay congresos registrados
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
