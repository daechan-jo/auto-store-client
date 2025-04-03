// src/components/common/BottomNav.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-3 shadow-lg z-50">
      <div className="flex justify-around items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? 'text-blue-600' : 'text-gray-500'}`
          }
        >
          <svg
            className="w-6 h-6"
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
          <span className="text-xs mt-1">홈</span>
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? 'text-blue-600' : 'text-gray-500'}`
          }
        >
          <svg
            className="w-6 h-6"
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
          <span className="text-xs mt-1">등록</span>
        </NavLink>

        <NavLink
          to="/queue/status"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? 'text-blue-600' : 'text-gray-500'}`
          }
        >
          <svg
            className="w-6 h-6"
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
          <span className="text-xs mt-1">큐</span>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNav;