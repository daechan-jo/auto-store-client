// src/hooks/useQueue.ts
import { useState, useEffect, useCallback } from 'react';
import {
  getQueueStatus,
  getWaitingJobs,
  getActiveJobs,
  getCompletedJobs,
  getFailedJobs,
  getDelayedJobs,
  getAllJobs,
  deleteJob,
} from '../api/registerApi';
import {
  JobStatusResponse,
  JobListResponse,
  AllJobsResponse,
  JobStatus,
} from '../types/register.types';

interface UseQueueProps {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface UseQueueReturn {
  loading: boolean;
  error: string | null;
  queueStatus: JobStatusResponse | null;
  jobsByStatus: Record<JobStatus, JobListResponse>;
  allJobs: AllJobsResponse | null;
  refreshData: () => Promise<void>;
  deleteJobById: (jobId: string) => Promise<boolean>;
}

export const useQueue = ({
  autoRefresh = false,
  refreshInterval = 10000,
}: UseQueueProps = {}): UseQueueReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queueStatus, setQueueStatus] = useState<JobStatusResponse | null>(null);
  const [jobsByStatus, setJobsByStatus] = useState<Record<JobStatus, JobListResponse>>({
    [JobStatus.WAITING]: [],
    [JobStatus.ACTIVE]: [],
    [JobStatus.COMPLETED]: [],
    [JobStatus.FAILED]: [],
    [JobStatus.DELAYED]: [],
  });
  const [allJobs, setAllJobs] = useState<AllJobsResponse | null>(null);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 두 API 호출을 독립적으로 수행하고 오류 처리
      let statusData: JobStatusResponse | null = null;
      let allJobsData: AllJobsResponse | null = null;

      try {
        statusData = await getQueueStatus();
      } catch (statusErr) {
        console.error('상태 데이터 로드 오류:', statusErr);
        // 개별 오류 처리, 하지만 다른 데이터 로드는 계속함
      }

      try {
        allJobsData = await getAllJobs();
      } catch (jobsErr) {
        console.error('작업 데이터 로드 오류:', jobsErr);
      }

      // 가져온 데이터만 업데이트
      if (statusData) {
        setQueueStatus(statusData);
      }

      if (allJobsData) {
        setAllJobs(allJobsData);
        setJobsByStatus({
          [JobStatus.WAITING]: allJobsData.waiting || [],
          [JobStatus.ACTIVE]: allJobsData.active || [],
          [JobStatus.COMPLETED]: allJobsData.completed || [],
          [JobStatus.FAILED]: allJobsData.failed || [],
          [JobStatus.DELAYED]: allJobsData.delayed || [],
        });
      }

      // 두 API 호출이 모두 실패한 경우에만 오류 메시지 표시
      if (!statusData && !allJobsData) {
        setError('큐 데이터를 가져오는 중 오류가 발생했습니다.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '큐 데이터를 가져오는 중 오류가 발생했습니다.');
      console.error('데이터 새로고침 오류:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteJobById = async (jobId: string): Promise<boolean> => {
    try {
      const result = await deleteJob(jobId);
      if (result.success) {
        // 삭제 성공 후 데이터 새로고침
        await refreshData();
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : '작업 삭제 중 오류가 발생했습니다.');
      console.error('작업 삭제 오류:', err);
      return false;
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    refreshData().catch(err => {
      console.error('초기 데이터 로드 오류:', err);
    });
  }, [refreshData]);

  // 자동 새로고침 설정
  useEffect(() => {
    if (!autoRefresh) return;

    const intervalId = setInterval(() => {
      refreshData().catch(err => {
        console.error('자동 새로고침 오류:', err);
      });
    }, refreshInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [autoRefresh, refreshInterval, refreshData]);

  return {
    loading,
    error,
    queueStatus,
    jobsByStatus,
    allJobs,
    refreshData,
    deleteJobById,
  };
};