// src/app/(dashboard)/associations/page.tsx
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import CreateAssociationDialog from '@/components/association/CreateAssociationDialog';
import DeleteAssociationButton from '@/components/association/DeleteAssociationDialog';

export default async function AssociationsPage() {
  const associations = [
    {
      id: 1,
      name: "Asociación de Desarrolladores",
      description: "Grupo de profesionales en desarrollo de software",
      _count: { members: 50, congresses: 3 },
      createdAt: "2023-06-15T00:00:00"
    },
    {
      id: 2,
      name: "Diseñadores Digitales",
      description: "Comunidad de diseñadores UX/UI",
      _count: { members: 35, congresses: 2 },
      createdAt: "2023-08-20T00:00:00"
    }
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Asociaciones</h1>
        <CreateAssociationDialog>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Asociación
          </Button>
        </CreateAssociationDialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Todas las asociaciones</CardTitle>
          <CardDescription>
            Administra todas las asociaciones registradas en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-center">Miembros</TableHead>
                <TableHead className="text-center">Congresos</TableHead>
                <TableHead className="text-center">Creada</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {associations.length > 0 ? (
                associations.map((association) => (
                  <TableRow key={association.id}>
                    <TableCell className="font-medium">{association.name}</TableCell>
                    <TableCell className="truncate max-w-xs">
                      {association.description || '-'}
                    </TableCell>
                    <TableCell className="text-center">{association._count.members}</TableCell>
                    <TableCell className="text-center">{association._count.congresses}</TableCell>
                    <TableCell className="text-center">
                      {new Date(association.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/associations/${association.id}`}>
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeleteAssociationButton id={association.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    No hay asociaciones registradas
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