// src/pages/QueueStatusPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QueueDashboard from '../components/queue/QueueDashboard';
import { JobStatus } from '@/types/register.types';

interface QueueStatusPageProps {
  defaultTab?: JobStatus;
}

const QueueStatusPage: React.FC<QueueStatusPageProps> = ({ defaultTab = JobStatus.WAITING }) => {
  const navigate = useNavigate();

  // 특정 탭이 지정된 경우 URL 상태값에 반영
  useEffect(() => {
    if (defaultTab && window.location.pathname === '/queue/status') {
      const params = new URLSearchParams(window.location.search);
      params.set('tab', defaultTab);
      navigate({ search: params.toString() }, { replace: true });
    }
  }, [defaultTab, navigate]);

  return <QueueDashboard />;
};

export default QueueStatusPage;
