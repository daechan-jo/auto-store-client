// src/api/registerApi.ts
import axios from 'axios';
import {
  ProductRegistrationReqDto,
  JobStatusResponse,
  JobListResponse,
  AllJobsResponse,
  DeleteJobResponse,
  ProductRegistrationResDto,
} from '@/types/register.types';

// API 기본 URL 설정
const API_BASE_URL = '/api';
// 환경에 따라 다른 호스트 사용
const IS_DEV = process.env.NODE_ENV === 'development';
const API_HOST = IS_DEV ? 'http://localhost:8080' : 'http://58.236.96.102:8080';
const REGISTER_ENDPOINT = `${API_HOST}${API_BASE_URL}/registers`;

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

// 제품 등록 요청
export const registerProduct = async (
  data: ProductRegistrationReqDto,
): Promise<ProductRegistrationResDto> => {
  try {
    const response = await axios.post(REGISTER_ENDPOINT, data);
    // 상태 코드로 성공 여부를 판단 (2xx는 성공)
    return {
      success: true,
      jobId: response.data.jobId || '',
    };
  } catch (error) {
    // axios는 4xx, 5xx 상태코드를 자동으로 에러로 처리함
    handleApiError(error);
    // 이 코드는 실행되지 않음 (위 함수에서 항상 에러를 throw함)
    return {
      success: false,
      jobId: '',
    };
  }
};

// 큐 상태 조회
export const getQueueStatus = async (): Promise<JobStatusResponse> => {
  try {
    const response = await axios.get(`${REGISTER_ENDPOINT}/queues/status`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 대기 중인 작업 목록
export const getWaitingJobs = async (): Promise<JobListResponse> => {
  try {
    const response = await axios.get(`${REGISTER_ENDPOINT}/queues/waiting`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 실행 중인 작업 목록
export const getActiveJobs = async (): Promise<JobListResponse> => {
  try {
    const response = await axios.get(`${REGISTER_ENDPOINT}/queues/active`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 완료된 작업 목록
export const getCompletedJobs = async (): Promise<JobListResponse> => {
  try {
    const response = await axios.get(`${REGISTER_ENDPOINT}/queues/completed`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 실패한 작업 목록
export const getFailedJobs = async (): Promise<JobListResponse> => {
  try {
    const response = await axios.get(`${REGISTER_ENDPOINT}/queues/failed`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 지연된 작업 목록
export const getDelayedJobs = async (): Promise<JobListResponse> => {
  try {
    const response = await axios.get(`${REGISTER_ENDPOINT}/queues/delayed`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 모든 작업 상태 한번에 조회
export const getAllJobs = async (): Promise<AllJobsResponse> => {
  try {
    const response = await axios.get(`${REGISTER_ENDPOINT}/queues/all`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// 작업 삭제
export const deleteJob = async (jobId: string): Promise<DeleteJobResponse> => {
  try {
    const response = await axios.delete(`${REGISTER_ENDPOINT}/queues/${jobId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
