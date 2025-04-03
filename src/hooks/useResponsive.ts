// src/hooks/useResponsive.ts
import { useState, useEffect } from 'react';

type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: BreakPoint;
}

export const useResponsive = (): ResponsiveState => {
  // 브라우저 환경인지 확인
  const isBrowser = typeof window !== 'undefined';
  
  const getBreakpoint = (): BreakPoint => {
    if (!isBrowser) return 'md'; // 기본값 제공
    
    const width = window.innerWidth;
    if (width < 576) return 'xs';
    if (width < 768) return 'sm';
    if (width < 992) return 'md';
    if (width < 1200) return 'lg';
    return 'xl';
  };

  const getInitialState = (): ResponsiveState => {
    const breakpoint = getBreakpoint();
    return {
      isMobile: breakpoint === 'xs' || breakpoint === 'sm',
      isTablet: breakpoint === 'md',
      isDesktop: breakpoint === 'lg' || breakpoint === 'xl',
      breakpoint,
    };
  };

  const [state, setState] = useState<ResponsiveState>(getInitialState());

  useEffect(() => {
    if (!isBrowser) return;
    
    const handleResize = () => {
      const breakpoint = getBreakpoint();
      setState({
        isMobile: breakpoint === 'xs' || breakpoint === 'sm',
        isTablet: breakpoint === 'md',
        isDesktop: breakpoint === 'lg' || breakpoint === 'xl',
        breakpoint,
      });
    };

    // 초기 설정
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 정리
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isBrowser]);

  return state;
};
