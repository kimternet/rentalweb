'use client';

import Navbar from '@/components/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import Sidebar from "@/components/AppSidebar";
import { NAVBAR_HEIGHT } from '@/lib/constants';
import React, { useEffect, useState } from 'react'
import { useGetAuthUserQuery } from '@/state/api';
import { useRouter, usePathname } from 'next/navigation';

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    if (!authUser) {
      router.push('/landing');
      return;
    }

    const userRole = authUser.userRole?.toLowerCase();
    if (
      (userRole === "manager" && pathname.startsWith("/tenants")) ||
      (userRole === "tenant" && pathname.startsWith("/managers"))
    ) {
      router.push(
        userRole === "manager"
        ? "/managers/properties"
        : "/tenants/favorites"
      );
    } else {
      setIsLoading(false);
    }
  }, [authUser, authLoading, router, pathname]);

  if (authLoading || isLoading) return <>Loading...</>;

  if (!authUser) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-primary-100">
        <Navbar />
        <div style={{ paddingTop: `${NAVBAR_HEIGHT}px`}}>
          <main className="flex">
            <Sidebar userType={authUser.userRole?.toLowerCase() || 'tenant'} />
            <div className="flex-grow transition-all duration-300">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;