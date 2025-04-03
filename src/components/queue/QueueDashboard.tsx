// src/components/queue/QueueDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueue } from '@/hooks/useQueue';
import { useResponsive } from '@/hooks/useResponsive';
import { JobStatus } from '@/types/register.types';
import QueueStats from './QueueStats';
import JobList from './JobList';

const QueueDashboard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const highlightJobId = searchParams.get('highlight');
  const { isMobile, isTablet } = useResponsive();

  const { loading, error, queueStatus, jobsByStatus, refreshData } = useQueue({
    autoRefresh: true,
    refreshInterval: 10000,
  });

  const [activeTab, setActiveTab] = useState<JobStatus>(JobStatus.WAITING);

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

  // 안전하게 카운트 값을 가져오는 함수
  const getCountValue = (status: JobStatus) => {
    if (!queueStatus || !queueStatus.counts) return 0;
    return queueStatus.counts[status] || 0;
  };

  return (
    <div className={`p-4 ${isMobile ? 'w-full' : 'container mx-auto'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold">큐 대시보드</h2>
        <div className="mt-2 md:mt-0">
          <button
            onClick={() => refreshData()}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
          >
            {loading ? '새로고침 중...' : '새로고침'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* 큐 통계 */}
      {queueStatus && (
        <div className="mb-6">
          <QueueStats queueName={queueStatus.name} counts={queueStatus.counts} />
        </div>
      )}

      {/* 탭 네비게이션 */}
      <div className="mb-4 border-b">
        <nav className={`flex ${isMobile ? 'overflow-x-auto' : ''}`}>
          {Object.values(JobStatus).map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap
                ${
                  activeTab === status
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                {getCountValue(status)}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* 작업 목록 */}
      <JobList
        jobs={jobsByStatus ? (jobsByStatus[activeTab] || []) : []}
        status={activeTab}
        loading={loading}
        highlightId={highlightJobId}
        containerClassName={isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'}
      />
    </div>
  );
};

export default QueueDashboard;