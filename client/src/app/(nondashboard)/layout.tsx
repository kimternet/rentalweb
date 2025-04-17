"use client";

import Navbar from '@/components/Navbar';
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { useGetAuthUserQuery } from '@/state/api';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Layout = ({ children } : { children:React.ReactNode }) => {
  const { data: authUser } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!authUser) return;

    const userRole = authUser.userRole?.toLowerCase();
    if (
      (userRole === "manager" && pathname.startsWith("/search")) ||
      (userRole === "tenant" && pathname === "/")
    ) {
      router.push("/managers/properties");
    }
  }, [authUser, router, pathname]);

  return (
    <div className="h-full w-full">
      <Navbar />
      <main 
        className={`h-full flex w-full flex-col`}
        style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
