import axios from 'axios';
import { JobStatusResponse, JobListResponse, AllJobsResponse } from '@/types/queue.types';

// ResponseDto는 register.types.ts에 있는지 확인 필요
interface ResponseDto<T> {
  status: string;
  data?: T;
  success?: boolean;
}

const API_BASE_URL = '/api';
const REGISTER_ENDPOINT = `${API_BASE_URL}/managements`;

// API 통신 오류 처리 함수
const handleApiError = (error: any) => {
  console.error('API 호출 오류:', error);

  // 에러 응답이 있는 경우
  if (error.response) {
    throw new Error(
      `서버 오류: ${error.response.status} - ${error.response.data?.message || '알 수 없는 오류'}`,
    );
  }

  // 요청은 보냈지만 응답이 없는 경우
  if (error.request) {
    throw new Error('서버에 연결할 수 없습니다. 네트워크 연결을 확인하세요.');
  }

  // 요청 구성 중 오류
  throw new Error(`요청 오류: ${error.message}`);
};

// 큐 상태 조회
export const getQueueStatus = async (): Promise<JobStatusResponse> => {
  try {
    const response = await axios.get(`${REGISTER_ENDPOINT}/queues/status`);
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 대기 중인 작업 목록
export const getWaitingJobs = async (): Promise<JobListResponse> => {
  try {
    const response = await axios.get(`${REGISTER_ENDPOINT}/queues/waiting`);
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 실행 중인 작업 목록
export const getActiveJobs = async (): Promise<JobListResponse> => {
  try {
    const response = await axios.get(`${REGISTER_ENDPOINT}/queues/active`);
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 완료된 작업 목록
export const getCompletedJobs = async (): Promise<JobListResponse> => {
  try {
    const response = await axios.get(`${REGISTER_ENDPOINT}/queues/completed`);
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 실패한 작업 목록
export const getFailedJobs = async (): Promise<JobListResponse> => {
  try {
    const response = await axios.get(`${REGISTER_ENDPOINT}/queues/failed`);
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 지연된 작업 목록
export const getDelayedJobs = async (): Promise<JobListResponse> => {
  try {
    const response = await axios.get(`${REGISTER_ENDPOINT}/queues/delayed`);
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 모든 작업 상태 한번에 조회
export const getAllJobs = async (): Promise<AllJobsResponse> => {
  try {
    const response = await axios.get(`${REGISTER_ENDPOINT}/queues/all`);
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 작업 삭제
export const deleteJob = async (jobId: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axios.delete(`${REGISTER_ENDPOINT}/queues/${jobId}`);
    return {
      status: response.data.status,
      success: response.data.status === 'success',
    };
  } catch (error) {
    return handleApiError(error);
  }
};
