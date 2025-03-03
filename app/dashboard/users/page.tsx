// src/app/dashboard/users/page.tsx
"use client";

import { useState, useEffect } from 'react';
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
import { toast } from 'sonner';
import CreateUserDialog from '@/components/users/CreateUserDialog';
import DeleteUserButton from '@/components/users/DeleteUserDialog';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const [loading, setLoading] = useState(false);

  /* useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Error al cargar usuarios');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('No se pudieron cargar los usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  */

  const users = [
    {
      id: "1",
      name: "Carlos Ramírez",
      email: "carlos@example.com",
      role: "Admin",
      createdAt: "2023-05-01T10:00:00"
    },
    {
      id: "2",
      name: "Ana Torres",
      email: "ana@example.com",
      role: "User",
      createdAt: "2023-07-15T14:30:00"
    },
    {
      id: "3",
      name: "Luis González",
      email: "luis@example.com",
      role: "Moderator",
      createdAt: "2023-09-10T09:15:00"
    }
  ];
  const handleUserCreated = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    toast.success('Usuario creado exitosamente');
  };

  const handleUserDeleted = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    toast.success('Usuario eliminado exitosamente');
  }; 

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <CreateUserDialog onUserCreated={handleUserCreated}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
        </CreateUserDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos los usuarios</CardTitle>
          <CardDescription>
            Administra todos los usuarios registrados en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <p className="text-muted-foreground">Cargando usuarios...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-center">Rol</TableHead>
                  <TableHead className="text-center">Registrado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="text-center capitalize">{user.role}</TableCell>
                      <TableCell className="text-center">
                        {new Date(user.createdAt).toLocaleDateString('es-ES')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/users/${user.id}`}>
                            <Button variant="outline" size="icon" title="Editar usuario">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DeleteUserButton 
                            id={user.id} 
                            name={user.name}
                            onUserDeleted={() => handleUserDeleted(user.id)} 
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                      No hay usuarios registrados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}