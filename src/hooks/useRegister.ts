// src/hooks/useRegister.ts
import { useState } from 'react';
import { registerProduct } from '@/api/registerApi';
import { ProductRegistrationReqDto } from '@/types/register.types';

interface UseRegisterReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  jobId: string | null;
  register: (data: ProductRegistrationReqDto) => Promise<void>;
  reset: () => void;
}

export const useRegister = (): UseRegisterReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);

  const register = async (data: ProductRegistrationReqDto) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setJobId(null);

    try {
      // 상태 코드로 처리: 2xx는 성공, 4xx/5xx는 에러
      const result = await registerProduct(data);
      // 요청이 성공적으로 완료됨 (상태 코드 200-299)
      setSuccess(true);
      setJobId(result.jobId);
    } catch (err) {
      // 에러 상태 코드를 받은 경우 (4xx, 5xx 등)
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      // 에러를 상위로 전파하여 컴포넌트에서 알럿 표시할 수 있게 함
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setJobId(null);
  };

  return { loading, error, success, jobId, register, reset };
};
