"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Datos hardcodeados
const eventosData = [
  { mes: "Enero", eventos: 5, asistencia: 320 },
  { mes: "Febrero", eventos: 4, asistencia: 290 },
  { mes: "Marzo", eventos: 6, asistencia: 450 },
  { mes: "Abril", eventos: 7, asistencia: 510 },
  { mes: "Mayo", eventos: 5, asistencia: 400 },
];

const asistenciaPorcentaje = [
  { name: "Asistieron", value: 1200 },
  { name: "No Asistieron", value: 300 },
];

const nuevosUsuarios = [
  { mes: "Enero", usuarios: 30 },
  { mes: "Febrero", usuarios: 25 },
  { mes: "Marzo", usuarios: 50 },
  { mes: "Abril", usuarios: 40 },
  { mes: "Mayo", usuarios: 45 },
];

const COLORS = ["#4CAF50", "#F44336"];

export default function ReportsPage() {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2">
      {/* Asistencia a eventos por mes */}
      <Card>
        <CardHeader>
          <CardTitle>Asistencia a Eventos</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={eventosData}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="asistencia" fill="#4F46E5" name="Asistencia" />
              <Bar dataKey="eventos" fill="#22C55E" name="Eventos" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Porcentaje de asistencia */}
      <Card>
        <CardHeader>
          <CardTitle>Porcentaje de Asistencia</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={asistenciaPorcentaje} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {asistenciaPorcentaje.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Crecimiento de nuevos usuarios */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Nuevos Usuarios Registrados</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={nuevosUsuarios}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="usuarios" fill="#F59E0B" name="Nuevos Usuarios" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
