// src/components/queue/QueueStats.tsx
import React from 'react';
import { JobStatus } from '@/types/register.types';

interface CountsType {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  delayed: number;
  [key: string]: number; // 인덱스 시그니처 추가
}

interface QueueStatsProps {
  queueName: string;
  counts: CountsType;
}

const QueueStats: React.FC<QueueStatsProps> = ({ queueName, counts = {} as CountsType }) => {
  // counts가 undefined이거나 null인 경우를 대비한 안전 처리
  const countsObj: CountsType = counts || {} as CountsType;
  
  // 총합 계산 (타입 안전성 추가)
  const total: number = Object.values(countsObj).reduce(
    (sum: number, count: number) => sum + (typeof count === 'number' ? count : 0), 
    0
  );

  const getStatusColor = (status: string): string => {
    switch (status) {
      case JobStatus.WAITING:
        return 'bg-blue-100 text-blue-800';
      case JobStatus.ACTIVE:
        return 'bg-green-100 text-green-800';
      case JobStatus.COMPLETED:
        return 'bg-purple-100 text-purple-800';
      case JobStatus.FAILED:
        return 'bg-red-100 text-red-800';
      case JobStatus.DELAYED:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">큐 상태: {queueName || '로딩 중...'}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-gray-100 rounded p-3 text-center">
          <div className="text-lg font-bold">{total}</div>
          <div className="text-sm text-gray-600">총 작업</div>
        </div>

        {Object.entries(countsObj).map(([status, count]) => (
          <div
            key={status}
            className={`rounded p-3 text-center ${getStatusColor(status)}`}
          >
            <div className="text-lg font-bold">{count || 0}</div>
            <div className="text-sm">{status.charAt(0).toUpperCase() + status.slice(1)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueueStats;