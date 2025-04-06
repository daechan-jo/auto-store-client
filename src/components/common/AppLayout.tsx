// src/components/common/AppLayout.tsx
import React, { ReactNode } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import Header from './Header';
import BottomNav from './BottomNav';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isMobile } = useResponsive();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 메인 콘텐츠 */}
      <main className="pt-16"> {/* 헤더 높이만큼 여백 추가 */}
        <div className={`p-4 ${isMobile ? 'pb-24' : ''} max-w-7xl mx-auto`}>
          {children}
        </div>
      </main>

      {/* 하단 네비게이션 - 모바일에서만 표시 */}
      {isMobile && <BottomNav />}
    </div>
  );
};

export default AppLayout;