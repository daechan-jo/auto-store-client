// src/components/common/AppLayout.tsx
import React, { ReactNode } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isMobile } = useResponsive();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        {/* 사이드바 - 모바일에서는 숨김 */}
        {!isMobile && <Sidebar />}

        {/* 메인 콘텐츠 */}
        <main className={`flex-1 ${!isMobile ? 'ml-64' : ''}`}>
          <div className={`p-4 ${isMobile ? 'pb-24' : ''}`}>
            {children}
          </div>
        </main>
      </div>

      {/* 하단 네비게이션 - 모바일에서만 표시 */}
      {isMobile && <BottomNav />}
    </div>
  );
};

export default AppLayout;