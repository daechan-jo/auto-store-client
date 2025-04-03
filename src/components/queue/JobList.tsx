// src/components/queue/JobList.tsx
import React from 'react';
import { JobStatus } from '@/types/register.types';
import JobCard from './JobCard';

interface JobListProps {
  jobs: any[];
  status: JobStatus;
  loading: boolean;
  highlightId?: string | null;
  containerClassName?: string;
}

const JobList: React.FC<JobListProps> = ({
  jobs,
  status,
  loading,
  highlightId,
  containerClassName = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
}) => {
  if (loading && jobs.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return <div className="text-center py-8 text-gray-500">{status} 상태의 작업이 없습니다.</div>;
  }

  return (
    <div className={`grid ${containerClassName} gap-4`}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} status={status} highlight={job.id === highlightId} />
      ))}
    </div>
  );
};

export default JobList;
