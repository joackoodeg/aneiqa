// src/components/dashboard/Header.tsx
"use client";

import { useState } from 'react';
import { Menu, Bell, LogOut, User } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

/*
type HeaderProps = {
  user: SupabaseUser;
};
{ user }: HeaderProps 
*/

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const user = null

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <button
        className="block md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-6 w-6 text-gray-500" />
      </button>
      
      <div className="flex items-center ml-auto">
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
        </button>
        
        <div className="relative ml-4">
          <button
            className="flex items-center"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
          {user && (
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            {user.email?.charAt(0).toUpperCase()}
           </div>
            )}

          </button>
          
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <a
                href="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User className="h-4 w-4 mr-2" />
                Perfil
              </a>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}