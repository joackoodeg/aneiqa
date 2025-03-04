"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function ScanAttendancePage() {
  const [loading, setLoading] = useState(false);
  const [scannedUser, setScannedUser] = useState<{ name: string; status: string } | null>(null);

  const handleScan = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulando un escaneo exitoso
      setScannedUser({ name: "Juan Pérez", status: "Asistencia Confirmada" });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Escanear Asistencia</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {/* Simulación del área de escaneo */}
          <div className="w-full h-60 bg-gray-300 flex items-center justify-center rounded-lg text-gray-600 text-xl">
            📷 Cámara simulada
          </div>

          {scannedUser ? (
            <div className="flex flex-col items-center gap-2 text-center">
              {scannedUser.status === "Asistencia Confirmada" ? (
                <CheckCircle className="h-16 w-16 text-green-500" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500" />
              )}
              <p className="text-lg font-semibold">{scannedUser.name}</p>
              <p className="text-sm text-gray-500">{scannedUser.status}</p>
            </div>
          ) : (
            <p className="text-gray-500 text-center">Apunta la cámara al código QR del asistente</p>
          )}

          <Button onClick={handleScan} disabled={loading} className="w-full">
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Escanear"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
