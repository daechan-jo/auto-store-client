// src/components/common/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useResponsive } from '@/hooks/useResponsive';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const location = useLocation();

  // URL이 변경되면 메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSidebarOpen(false);
  }, [location]);

  // 메뉴 토글 핸들러 - 이벤트 전파 중지 추가
  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  // 사이드바 토글 핸들러
  const toggleSidebar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 메뉴 아이템 렌더링 함수
  const renderMenuItems = (className: string, itemClassName: string, onClick?: () => void) => (
    <nav className={className}>
      <NavLink
        to="/"
        className={({ isActive }) => `${itemClassName} ${isActive ? 'text-blue-600 font-medium' : ''}`}
        onClick={onClick}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className="ml-3">홈</span>
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) => `${itemClassName} ${isActive ? 'text-blue-600 font-medium' : ''}`}
        onClick={onClick}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span className="ml-3">제품 등록</span>
      </NavLink>
      <NavLink
        to="/queue/status"
        className={({ isActive }) => `${itemClassName} ${isActive ? 'text-blue-600 font-medium' : ''}`}
        onClick={onClick}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <span className="ml-3">큐 상태</span>
      </NavLink>
    </nav>
  );

  return (
    <>
      {/* 헤더 - 스크롤에 고정 */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* 햄버거 메뉴 아이콘 (태블릿/데스크톱) */}
              {!isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="mr-3 p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              )}

              {/* 로고 */}
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className={`font-bold text-blue-600 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                  Linkedout-store
                </span>
              </Link>
            </div>

            {/* 태블릿/데스크톱 메뉴 */}
            {!isMobile && (
              <div className="hidden md:flex ml-6 items-center space-x-4">
                {renderMenuItems(
                  'flex space-x-4',
                  'flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm'
                )}
              </div>
            )}

            {/* 모바일 메뉴 버튼 */}
            {isMobile && (
              <div className="flex items-center">
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
                  aria-expanded={isMenuOpen}
                >
                  <span className="sr-only">메뉴 열기</span>
                  {/* 햄버거 아이콘 */}
                  <svg
                    className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  {/* X 아이콘 */}
                  <svg
                    className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 모바일 메뉴 드롭다운 */}
        {isMobile && (
          <div
            className={`absolute left-0 right-0 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'
            }`}
          >
            <div className="px-4 py-3 space-y-1">
              {renderMenuItems('flex flex-col space-y-2', 'flex items-center px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-50 transition-colors duration-200', () => setIsMenuOpen(false))}
            </div>
          </div>
        )}
      </header>

      {/* 사이드바 - 태블릿/데스크톱 */}
      {!isMobile && (
        <div
          className={`fixed inset-0 z-30 flex transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* 사이드바 배경 오버레이 */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          
          {/* 사이드바 컨텐츠 */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
            <div className="h-16 flex items-center px-4 border-b">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700"
              >
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
              <span className="ml-2 text-xl font-bold text-blue-600">Menu</span>
            </div>
            
            <div className="flex-1 h-0 overflow-y-auto">
              <div className="px-4 py-4 space-y-1">
                {renderMenuItems('flex flex-col space-y-2', 'flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100', () => setIsSidebarOpen(false))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 모바일 메뉴가 열렸을 때 배경 오버레이 */}
      {isMobile && isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-20"
          onClick={() => setIsMenuOpen(false)}
          style={{ top: '64px' }}
        />
      )}
    </>
  );
};

export default Header;