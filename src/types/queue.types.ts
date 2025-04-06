// 작업 인터페이스 - 기본
export interface JobBase {
  id: string;
  name: string;
  data: any;
  timestamp: number;
}

// 대기 중인 작업
export interface WaitingJob extends JobBase {
  attemptsMade: number;
}

// 실행 중인 작업
export interface ActiveJob extends JobBase {
  processedOn: number;
}

// 완료된 작업
export interface CompletedJob extends JobBase {
  finishedOn: number;
  returnvalue: any;
}

// 실패한 작업
export interface FailedJob extends JobBase {
  failedReason: string;
}

// 지연된 작업
export interface DelayedJob extends JobBase {
  delay: number;
  delayUntil: string;
}

// 큐 상태 응답
export interface JobStatusResponse {
  name: string;
  counts: {
    waiting: number;
    active: number;
    completed: number;
    failed: number;
    delayed: number;
  };
}

// 작업 목록 응답
export type JobListResponse = Array<WaitingJob | ActiveJob | CompletedJob | FailedJob | DelayedJob>;

// 모든 작업 응답
export interface AllJobsResponse {
  waiting: WaitingJob[];
  active: ActiveJob[];
  completed: CompletedJob[];
  failed: FailedJob[];
  delayed: DelayedJob[];
}

// 작업 상태
export enum JobStatus {
  WAITING = 'waiting',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  FAILED = 'failed',
  DELAYED = 'delayed',
}

// 큐 통계 데이터
export interface QueueStats {
  total: number;
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  delayed: number;
}
