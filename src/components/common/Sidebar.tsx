// src/components/common/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed w-64 h-full bg-white shadow-md">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
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
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
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
          </li>
          <li>
            <NavLink
              to="/queue/status"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
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
          </li>

          {/* 상태별 큐 목록 */}
          <li className="pt-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              큐 관리
            </div>
            <ul className="mt-2 space-y-1">
              <li>
                <NavLink
                  to="/queue/waiting"
                  className={({ isActive }) =>
                    `flex items-center p-2 pl-9 rounded-lg ${
                      isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  대기 중
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/queue/active"
                  className={({ isActive }) =>
                    `flex items-center p-2 pl-9 rounded-lg ${
                      isActive ? 'bg-green-100 text-green-800' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  실행 중
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/queue/completed"
                  className={({ isActive }) =>
                    `flex items-center p-2 pl-9 rounded-lg ${
                      isActive ? 'bg-purple-100 text-purple-800' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  완료됨
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/queue/failed"
                  className={({ isActive }) =>
                    `flex items-center p-2 pl-9 rounded-lg ${
                      isActive ? 'bg-red-100 text-red-800' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  실패함
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/queue/delayed"
                  className={({ isActive }) =>
                    `flex items-center p-2 pl-9 rounded-lg ${
                      isActive ? 'bg-yellow-100 text-yellow-800' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  지연됨
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
