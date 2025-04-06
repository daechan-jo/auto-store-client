// src/components/queue/JobList.tsx
import React from 'react';
import { JobStatus } from '@/types/queue.types';
import JobCard from './JobCard';

interface JobListProps {
  jobs: any[];
  status: JobStatus | 'ALL' | 'REAL_STATUS';
  loading: boolean;
  highlightId?: string | null;
  containerClassName?: string;
}

const JobList: React.FC<JobListProps> = ({
  jobs,
  status,
  loading,
  highlightId,
  containerClassName = 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
}) => {
  if (loading && jobs.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg text-center py-12 px-4">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">작업 없음</h3>
        <p className="mt-1 text-sm text-gray-500">
          {status === 'ALL' ? '현재 큐에 작업이 없습니다.' : `${status} 상태의 작업이 없습니다.`}
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${containerClassName} gap-4`}>
      {jobs.map((job) => (
        <JobCard 
          key={job.id} 
          job={job} 
          status={status === 'REAL_STATUS' && job.realStatus ? job.realStatus : status} 
          highlight={job.id === highlightId} 
        />
      ))}
    </div>
  );
};

export default JobList;
