import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}