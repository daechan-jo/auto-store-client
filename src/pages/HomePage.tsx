// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useResponsive } from '@/hooks/useResponsive';
import { useQueue } from '@/hooks/useQueue';
import { JobStatus } from '@/types/register.types';

interface CountsType {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  delayed: number;
  [key: string]: number; // 인덱스 시그니처 추가
}

const HomePage: React.FC = () => {
  const { isMobile } = useResponsive();
  const { queueStatus, loading } = useQueue({ autoRefresh: false });

  // 총 작업 수를 계산하는 안전한 함수
  const calculateTotalJobs = (): number => {
    if (!queueStatus || !queueStatus.counts) return 0;
    
    return Object.values(queueStatus.counts as CountsType)
      .reduce((sum: number, count: number) => sum + (typeof count === 'number' ? count : 0), 0);
  };

  // 안전하게 카운트 값을 가져오는 함수
  const getCountValue = (key: string): number => {
    if (!queueStatus || !queueStatus.counts) return 0;
    
    // 이제 타입 단언을 통해 인덱스 접근을 안전하게 합니다
    const counts = queueStatus.counts as CountsType;
    return counts[key] || 0;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">제품 등록 관리 시스템</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          제품 등록 요청을 생성하고 관리할 수 있는 대시보드입니다. 제품 등록 큐의 상태를 확인하고,
          작업을 관리하세요.
        </p>
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-8'} mb-8`}>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            <svg
              className="w-6 h-6 inline-block mr-2"
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
            제품 등록하기
          </h2>
          <p className="text-gray-600 mb-4">
            새로운 제품 등록 작업을 큐에 추가하여 제품 정보를 검색하고 등록합니다.
          </p>
          <div className="mt-4">
            <Link
              to="/register"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              등록 페이지로 이동
            </Link>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">
            <svg
              className="w-6 h-6 inline-block mr-2"
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
            큐 상태 관리
          </h2>
          <p className="text-gray-600 mb-4">
            현재 대기 중인 작업, 실행 중인 작업, 완료된 작업 및 실패한 작업을 확인하고 관리합니다.
          </p>
          <div className="mt-4">
            <Link
              to="/queue/status"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
            >
              큐 상태 보기
            </Link>
          </div>
        </div>
      </div>

      {/* 현재 큐 상태 요약 */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">현재 큐 상태</h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : queueStatus ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <div className="text-lg font-bold">
                {calculateTotalJobs()}
              </div>
              <div className="text-sm text-gray-600">총 작업</div>
            </div>

            <div className="bg-blue-100 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-800">{getCountValue(JobStatus.WAITING)}</div>
              <div className="text-sm text-blue-800">대기 중</div>
            </div>

            <div className="bg-green-100 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-green-800">{getCountValue(JobStatus.ACTIVE)}</div>
              <div className="text-sm text-green-800">실행 중</div>
            </div>

            <div className="bg-purple-100 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-purple-800">
                {getCountValue(JobStatus.COMPLETED)}
              </div>
              <div className="text-sm text-purple-800">완료됨</div>
            </div>

            <div className="bg-red-100 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-red-800">{getCountValue(JobStatus.FAILED)}</div>
              <div className="text-sm text-red-800">실패함</div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">큐 상태 정보를 불러올 수 없습니다.</div>
        )}

        <div className="mt-4 text-center">
          <Link to="/queue/status" className="text-blue-600 hover:text-blue-800 font-medium">
            자세한 큐 정보 보기 →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;