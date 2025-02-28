// src/components/dashboard/Sidebar.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  Building2, 
  Calendar, 
  Tag, 
  FileText, 
  QrCode, 
  BarChart4,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

const routes = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/users', label: 'Usuarios', icon: Users },
  { href: '/dashboard/associations', label: 'Asociaciones', icon: Building2 },
  { href: '/dashboard/congresses', label: 'Congresos', icon: Calendar },
  { href: '/dashboard/event-types', label: 'Tipos de Eventos', icon: Tag },
  { href: '/dashboard/events', label: 'Eventos', icon: FileText },
  { href: '/dashboard/attendance/scan', label: 'Escanear Asistencia', icon: QrCode },
  { href: '/dashboard/reports', label: 'Reportes', icon: BarChart4 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 hidden md:block bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      <nav className="mt-6">
        <ul>
          {routes.map(route => (
            <li key={route.href}>
              <Link
                href={route.href}
                className={cn(
                  "flex items-center px-6 py-3 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors",
                  pathname === route.href && "bg-gray-100 text-gray-900 border-l-4 border-blue-500"
                )}
              >
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}