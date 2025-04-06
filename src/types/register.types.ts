// src/types/register.types.ts

/**
 * 카테고리 타입 열거형
 */
export enum CategoryType {
  ALL = '',
  INTERIOR = '가구/인테리어',
  BOOK = '도서',
  DIGITAL = '디지털/가전',
  HEALT = '생활/건강',
  SPORTS = '스포츠/레저',
  FOOD = '식품',
  LIFE = '여가/생활편의',
  CHILDBIRTY = '출산/육아',
  CLOTHES = '패션의류',
  GOODS = '패션잡화',
  COSMETICS = '화장품/미용',
}

/**
 * 세금 타입 열거형
 */
export enum TaxType {
  ALL = '전체',
  TAX = '과세',
  EXEMPTION = '면세',
  ZERO = '영세',
}

/**
 * 성인용 타입 열거형
 */
export enum AdulType {
  ALL = '전체',
  YES = '성인전용상품',
  NO = '성인전용상품제외',
}

/**
 * 채널 타입 열거형
 */
export enum ChannelType {
  ALL = '전체',
  FREE = '가격자율',
  COMPLIANCE = '가격준수',
}

/**
 * 작업 상태 열거형
 */
export enum JobStatus {
  WAITING = 'waiting',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  FAILED = 'failed',
  DELAYED = 'delayed',
}

/**
 * 제품 등록 요청 DTO
 */
export interface ProductRegistrationReqDto {
  keyword: string;
  category?: CategoryType;
  minPrice?: string;
  maxPrice?: string;
  tax?: TaxType;
  adult?: AdulType;
  channel?: ChannelType;
  limit?: string;
  repeat: string;
}

/**
 * 작업 데이터 인터페이스
 */
export interface JobData {
  id: string;
  data: {
    data: Partial<ProductRegistrationReqDto>;
    [key: string]: any;
  };
  timestamp: number;
  processedOn?: number;
  finishedOn?: number;
  returnvalue?: any;
  attemptsMade?: number;
  failedReason?: string;
  delay?: number;
  delayUntil?: Date;
  [key: string]: any;
}

export interface ResponseDto<T> {
  status: string;
  data?: T;
  jobId?: string; // jobId 필드 추가
}

/**
 * 작업 상태 응답 인터페이스
 */
export interface JobStatusResponse {
  name: string;
  counts: {
    waiting: number;
    active: number;
    completed: number;
    failed: number;
    delayed: number;
    paused: number;
  };
}

/**
 * 작업 목록 응답 타입
 */
export type JobListResponse = JobData[];

/**
 * 전체 작업 응답 인터페이스
 */
export interface AllJobsResponse {
  waiting: JobListResponse;
  active: JobListResponse;
  completed: JobListResponse;
  failed: JobListResponse;
  delayed: JobListResponse;
}
