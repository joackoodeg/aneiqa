// src/app/(dashboard)/dashboard/page.tsx
import prisma from '@/lib/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, Calendar, FileText } from 'lucide-react';

export default async function DashboardPage() {
  // Obtener estadísticas
  const userCount = 10;
  const associationCount = 10;
  const congressCount = 20;
  const eventCount = 15;
  
  const upcomingEvents = 2;
  
  const recentAttendances = 3;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Usuarios"
          value={userCount}
          description="Total registrados"
          icon={<Users className="h-6 w-6 text-blue-500" />}
        />
        <StatCard 
          title="Asociaciones"
          value={associationCount}
          description="Activas en el sistema"
          icon={<Building2 className="h-6 w-6 text-emerald-500" />}
        />
        <StatCard 
          title="Congresos"
          value={congressCount}
          description="Programados"
          icon={<Calendar className="h-6 w-6 text-yellow-500" />}
        />
        <StatCard 
          title="Eventos"
          value={eventCount}
          description="Configurados"
          icon={<FileText className="h-6 w-6 text-purple-500" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Próximos eventos</CardTitle>
            <CardDescription>Los eventos más recientes programados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div key={event.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h4 className="font-medium">{event.name}</h4>
                      <p className="text-sm text-gray-500">{event.congress.name} - {event.eventType.name}</p>
                    </div>
                    <div className="text-sm">
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No hay eventos próximos</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Asistencias recientes</CardTitle>
            <CardDescription>Últimos registros de asistencia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAttendances.length > 0 ? (
                recentAttendances.map((attendance) => (
                  <div key={attendance.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h4 className="font-medium">{attendance.user.name}</h4>
                      <p className="text-sm text-gray-500">{attendance.event.name}</p>
                    </div>
                    <div className="text-sm">
                      {new Date(attendance.timestamp).toLocaleTimeString()} - {' '}
                      {new Date(attendance.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No hay asistencias recientes</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
};

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-full">{icon}</div>
      </CardContent>
    </Card>
  );
}