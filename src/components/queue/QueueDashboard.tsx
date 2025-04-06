// src/components/queue/QueueDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueue } from '@/hooks/useQueue';
import { useResponsive } from '@/hooks/useResponsive';
import { JobStatus } from '@/types/queue.types';
import JobList from './JobList';

const QueueDashboard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const highlightJobId = searchParams.get('highlight');
  const { isMobile, isTablet } = useResponsive();

  const { loading, error, jobsByStatus } = useQueue({
    autoRefresh: true,
    refreshInterval: 10000,
  });

  const [activeTab, setActiveTab] = useState<JobStatus | 'ALL'>('ALL');

  // 하이라이트 된 작업 ID가 있으면 해당 탭으로 이동
  useEffect(() => {
    if (!highlightJobId || !jobsByStatus) return;

    // 어떤 탭에 있는지 찾기
    for (const status of Object.values(JobStatus)) {
      const jobList = jobsByStatus[status] || [];
      const found = jobList.some((job) => job.id === highlightJobId);
      if (found) {
        setActiveTab(status);
        break;
      }
    }
  }, [highlightJobId, jobsByStatus]);

  // 각 상태별 작업 개수 가져오기
  const getCountValue = (status: JobStatus) => {
    if (!jobsByStatus || !jobsByStatus[status]) return 0;
    return jobsByStatus[status].length;
  };

  // 총 작업 수를 계산
  const getTotalJobs = () => {
    if (!jobsByStatus) return 0;
    return Object.values(jobsByStatus).flat().length;
  };

  // 모바일용 탭 렌더링
  const renderMobileTabs = () => {
    return (
      <div className="mb-4">
        <div className="overflow-x-auto -mx-4 px-4 py-1">
          <div className="flex space-x-2 pb-1">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium
                ${
                  activeTab === 'ALL'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              모든 작업 ({getTotalJobs()})
            </button>
            
            {Object.values(JobStatus).map((status) => (
              <button
                key={status}
                onClick={() => setActiveTab(status)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium
                  ${
                    activeTab === status
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({getCountValue(status)})
              </button>
            ))}
          </div>
        </div>
        
        {loading && (
          <div className="flex justify-center mt-2">
            <div className="text-sm text-gray-500 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 mr-2"></div>
              데이터 새로고침 중...
            </div>
          </div>
        )}
      </div>
    );
  };

  // 데스크톱용 탭 렌더링
  const renderDesktopTabs = () => {
    return (
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap mr-4
              ${
                activeTab === 'ALL'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b'
              }`}
          >
            모든 작업
            <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
              {getTotalJobs()}
            </span>
          </button>
          
          {Object.values(JobStatus).map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap mr-4
                ${
                  activeTab === status
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b'
                }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                {getCountValue(status)}
              </span>
            </button>
          ))}
        </nav>
        
        {loading && (
          <div className="flex justify-center mt-2 mb-2">
            <div className="text-sm text-gray-500 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 mr-2"></div>
              데이터 새로고침 중...
            </div>
          </div>
        )}
      </div>
    );
  };

  // 전체 작업 목록에서 각 작업의 실제 상태 찾기
  const getAllJobsWithStatus = () => {
    if (!jobsByStatus) return [];
    
    const allJobs = [];
    for (const [status, jobs] of Object.entries(jobsByStatus)) {
      // 각 작업에 실제 상태 정보 추가
      const jobsWithStatus = jobs.map(job => ({
        ...job,
        realStatus: status as JobStatus
      }));
      allJobs.push(...jobsWithStatus);
    }
    return allJobs;
  };

  return (
    <div className="mb-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">큐 대시보드</h2>
        <p className="text-gray-500 mt-1">현재 시스템의 작업 상태를 확인하고 관리합니다.</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p className="font-medium">오류가 발생했습니다</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* 반응형 탭 네비게이션 */}
      <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
        {/* 모바일/태블릿 vs 데스크톱 탭 디자인 */}
        {isMobile ? renderMobileTabs() : renderDesktopTabs()}

        {/* 작업 목록 */}
        <div className="p-4">
          <JobList
            jobs={
              activeTab === 'ALL'
                ? getAllJobsWithStatus()
                : jobsByStatus 
                  ? (jobsByStatus[activeTab as JobStatus] || []) 
                  : []
            }
            status={activeTab === 'ALL' ? 'REAL_STATUS' : activeTab}
            loading={loading}
            highlightId={highlightJobId}
            containerClassName={`grid-cols-1 ${isTablet ? 'sm:grid-cols-1 md:grid-cols-2' : 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default QueueDashboard;