// src/components/queue/JobCard.tsx
import React, { useState } from 'react';
import { JobStatus } from '@/types/queue.types';
import {
  JobBase,
  WaitingJob,
  ActiveJob,
  CompletedJob,
  FailedJob,
  DelayedJob,
} from '@/types/queue.types';
import { useQueue } from '@/hooks/useQueue';

interface JobCardProps {
  job: WaitingJob | ActiveJob | CompletedJob | FailedJob | DelayedJob;
  status: JobStatus;
  highlight?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, status, highlight = false }) => {
  const [expanded, setExpanded] = useState<boolean>(highlight);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { deleteJobById } = useQueue();

  // 안전하게 타임스탬프 포맷팅
  const formatDate = (timestamp?: number | string) => {
    if (!timestamp) return '알 수 없음';
    return new Date(timestamp).toLocaleString();
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (window.confirm('이 작업을 삭제하시겠습니까?')) {
      setIsDeleting(true);
      try {
        await deleteJobById(job.id);
      } catch (err) {
        console.error('작업 삭제 오류:', err);
        alert('작업 삭제 중 오류가 발생했습니다.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // 카드 배경색 결정
  const getCardClass = () => {
    let baseClass = 'relative border rounded-lg p-4 shadow-sm transition-all ';

    if (highlight) {
      baseClass += 'border-blue-400 shadow-md animate-pulse ';

      // 하이라이트 애니메이션은 8초 후에 끝나도록
      setTimeout(() => {
        if (highlight) {
          const el = document.getElementById(`job-${job.id}`);
          if (el) {
            el.classList.remove('animate-pulse', 'border-blue-400', 'shadow-md');
          }
        }
      }, 8000);
    }

    switch (status) {
      case JobStatus.WAITING:
        return baseClass + 'bg-blue-50';
      case JobStatus.ACTIVE:
        return baseClass + 'bg-green-50';
      case JobStatus.COMPLETED:
        return baseClass + 'bg-purple-50';
      case JobStatus.FAILED:
        return baseClass + 'bg-red-50';
      case JobStatus.DELAYED:
        return baseClass + 'bg-yellow-50';
      default:
        return baseClass + 'bg-white';
    }
  };

  // 안전하게 작업 데이터 표시
  const renderJobData = () => {
    try {
      // 작업 데이터가 있으면 표시
      if (job && job.data && typeof job.data === 'object') {
        // 제품 등록 작업인 경우 (productRegistration 패턴)
        if (job.data.pattern === 'productRegistration' && job.data.payload) {
          const { jobId, jobType, store } = job.data.payload;
          const { keyword, category, minPrice, maxPrice, tax, adult, channel, limit, repeat } =
            job.data.payload.data || {};

          return (
            <div className="space-y-2">
              {/* 주요 정보 */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 p-2 rounded-md">
                  <span className="text-xs text-gray-500">작업 ID</span>
                  <div className="font-medium">{jobId || '없음'}</div>
                </div>
                <div className="bg-gray-50 p-2 rounded-md">
                  <span className="text-xs text-gray-500">스토어</span>
                  <div className="font-medium">{store || '없음'}</div>
                </div>
              </div>

              {/* 검색 조건 */}
              <div className="bg-blue-50 p-3 rounded-md">
                <h3 className="font-medium text-blue-700 mb-2">검색 조건</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-gray-500">키워드</span>
                    <div className="font-semibold text-gray-800">{keyword || '없음'}</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">카테고리</span>
                    <div>{category || '전체'}</div>
                  </div>
                </div>

                <div className="mt-2">
                  <span className="text-xs text-gray-500">가격 범위</span>
                  <div className="flex items-center">
                    <span className="font-medium">{Number(minPrice || 0).toLocaleString()}원</span>
                    <span className="mx-2">~</span>
                    <span className="font-medium">{Number(maxPrice || 0).toLocaleString()}원</span>
                  </div>
                </div>
              </div>

              {/* 필터 조건 */}
              <div className="bg-purple-50 p-3 rounded-md">
                <h3 className="font-medium text-purple-700 mb-2">필터 조건</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-gray-500">과세 여부</span>
                    <div>{tax || '전체'}</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">성인 상품</span>
                    <div>{adult || '전체'}</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">판매 채널</span>
                    <div>{channel || '전체'}</div>
                  </div>
                </div>
              </div>

              {/* 작업 설정 */}
              <div className="bg-green-50 p-3 rounded-md">
                <h3 className="font-medium text-green-700 mb-2">작업 설정</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-gray-500">검색 개수</span>
                    <div className="font-medium">{limit || '0'}개</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">반복 횟수</span>
                    <div className="font-medium">{repeat || '0'}회</div>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        // 기타 작업 타입
        return (
          <div className="text-sm">
            <pre className="whitespace-pre-wrap overflow-x-auto">
              {JSON.stringify(job.data, null, 2)}
            </pre>
          </div>
        );
      }

      return <div className="text-sm text-gray-600">데이터 없음</div>;
    } catch (e) {
      console.error('작업 데이터 렌더링 오류:', e);
      return <div className="text-sm text-red-600">데이터 파싱 오류</div>;
    }
  };

  if (!job || !job.id) {
    return (
      <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
        <div className="text-gray-500">잘못된 작업 데이터</div>
      </div>
    );
  }

  return (
    <div id={`job-${job.id}`} className={getCardClass()} onClick={() => setExpanded(!expanded)}>
      {/* 작업 ID와 헤더 */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-bold text-gray-800 break-all">작업 #{job.id}</div>
          <div className="text-xs text-gray-500">생성: {formatDate(job.timestamp)}</div>
        </div>

        {/* 상태 배지 */}
        <div
          className={`text-xs px-2 py-1 rounded-full font-medium ml-2 whitespace-nowrap flex-shrink-0
          ${status === JobStatus.WAITING ? 'bg-blue-200 text-blue-800' : ''}
          ${status === JobStatus.ACTIVE ? 'bg-green-200 text-green-800' : ''}
          ${status === JobStatus.COMPLETED ? 'bg-purple-200 text-purple-800' : ''}
          ${status === JobStatus.FAILED ? 'bg-red-200 text-red-800' : ''}
          ${status === JobStatus.DELAYED ? 'bg-yellow-200 text-yellow-800' : ''}
        `}
        >
          {status}
        </div>
      </div>

      {/* 주요 정보 */}
      {renderJobData()}

      {/* 확장된 정보 */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {/* 세부 정보 */}
          <div className="text-sm space-y-1">
            {'processedOn' in job && job.processedOn && (
              <div>
                <span className="font-medium">처리 시작:</span> {formatDate(job.processedOn)}
              </div>
            )}
            {'finishedOn' in job && job.finishedOn && (
              <div>
                <span className="font-medium">완료 시간:</span> {formatDate(job.finishedOn)}
              </div>
            )}
            {'attemptsMade' in job && job.attemptsMade && (
              <div>
                <span className="font-medium">시도 횟수:</span> {job.attemptsMade}
              </div>
            )}
            {'failedReason' in job && job.failedReason && (
              <div>
                <span className="font-medium">실패 이유:</span>
                <div className="bg-red-50 p-2 mt-1 rounded text-xs overflow-auto">
                  {job.failedReason}
                </div>
              </div>
            )}
            {'delay' in job && job.delay && (
              <div>
                <span className="font-medium">지연:</span> {job.delay}ms
              </div>
            )}
            {'delayUntil' in job && job.delayUntil && (
              <div>
                <span className="font-medium">예정 시간:</span> {formatDate(job.delayUntil)}
              </div>
            )}
          </div>

          {/* 액션 버튼 */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
            >
              {isDeleting ? '삭제 중...' : '작업 삭제'}
            </button>
          </div>
        </div>
      )}

      {/* 확장 버튼 표시 */}
      <div className="absolute bottom-2 right-2 text-gray-400">{expanded ? '▲' : '▼'}</div>
    </div>
  );
};

export default JobCard;
