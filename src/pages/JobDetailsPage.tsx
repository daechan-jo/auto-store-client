// src/pages/JobDetailsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueue } from '@/hooks/useQueue';
import { JobStatus } from '../types/register.types';

const JobDetailsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { allJobs, loading, error, refreshData } = useQueue();
  const [job, setJob] = useState<any | null>(null);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);

  // 작업 ID로 작업 찾기
  useEffect(() => {
    if (!allJobs || !jobId) return;

    for (const status of Object.values(JobStatus)) {
      const foundJob = allJobs[status]?.find((job) => job.id === jobId);
      if (foundJob) {
        setJob(foundJob);
        setJobStatus(status);
        break;
      }
    }
  }, [allJobs, jobId]);

  // 작업이 없으면 상태 페이지로 리다이렉트
  useEffect(() => {
    if (!loading && !error && !job) {
      navigate('/queue/status', { replace: true });
    }
  }, [job, loading, error, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  if (!job) {
    return <div className="text-center py-8 text-gray-500">작업을 찾을 수 없습니다.</div>;
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold">작업 상세정보</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          돌아가기
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">작업 #{job.id}</h2>
              <div className="text-sm text-gray-500 mt-1">생성: {formatDate(job.timestamp)}</div>
            </div>

            {jobStatus && (
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium
                ${jobStatus === JobStatus.WAITING ? 'bg-blue-200 text-blue-800' : ''}
                ${jobStatus === JobStatus.ACTIVE ? 'bg-green-200 text-green-800' : ''}
                ${jobStatus === JobStatus.COMPLETED ? 'bg-purple-200 text-purple-800' : ''}
                ${jobStatus === JobStatus.FAILED ? 'bg-red-200 text-red-800' : ''}
                ${jobStatus === JobStatus.DELAYED ? 'bg-yellow-200 text-yellow-800' : ''}
              `}
              >
                {jobStatus}
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">작업 데이터</h3>

          {job.data && job.data.data ? (
            <div className="bg-gray-50 p-4 rounded overflow-x-auto">
              <pre className="text-sm">{JSON.stringify(job.data.data, null, 2)}</pre>
            </div>
          ) : (
            <div className="text-gray-500">작업 데이터가 없습니다.</div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">작업 정보</h3>
            <div className="space-y-2">
              {job.processedOn && (
                <div className="flex justify-between">
                  <span className="text-gray-600">처리 시작:</span>
                  <span>{formatDate(job.processedOn)}</span>
                </div>
              )}

              {job.finishedOn && (
                <div className="flex justify-between">
                  <span className="text-gray-600">완료 시간:</span>
                  <span>{formatDate(job.finishedOn)}</span>
                </div>
              )}

              {job.attemptsMade > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">시도 횟수:</span>
                  <span>{job.attemptsMade}</span>
                </div>
              )}

              {job.delay > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">지연 시간:</span>
                  <span>{job.delay}ms</span>
                </div>
              )}

              {job.delayUntil && (
                <div className="flex justify-between">
                  <span className="text-gray-600">예정 시간:</span>
                  <span>{job.delayUntil}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            {job.returnvalue && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-3">결과값</h3>
                <div className="bg-gray-50 p-4 rounded overflow-x-auto">
                  <pre className="text-sm">{JSON.stringify(job.returnvalue, null, 2)}</pre>
                </div>
              </div>
            )}

            {job.failedReason && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-600">실패 이유</h3>
                <div className="bg-red-50 p-4 rounded overflow-x-auto text-red-700">
                  <pre className="text-sm">{job.failedReason}</pre>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => refreshData()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-3"
          >
            새로고침
          </button>

          <button
            onClick={() => navigate(`/queue/${jobStatus?.toLowerCase()}`)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            큐로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
