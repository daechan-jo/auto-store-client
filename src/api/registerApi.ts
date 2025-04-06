// src/api/registerApi.ts
import axios from 'axios';
import { ProductRegistrationReqDto, ResponseDto } from '@/types/register.types';

const API_BASE_URL = '/api';
const REGISTER_ENDPOINT = `${API_BASE_URL}/registers`;
// const REGISTER_ENDPOINT = 'http://localhost:9000/api/registers';

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
): Promise<ResponseDto<undefined>> => {
  try {
    const response = await axios.post(REGISTER_ENDPOINT, data);

    // 서버 응답에서 status만 추출하여 반환
    return {
      status: response.data.status,
    };
  } catch (error) {
    // axios는 4xx, 5xx 상태코드를 자동으로 에러로 처리함
    handleApiError(error);
    // 이 코드는 실행되지 않음 (위 함수에서 항상 에러를 throw함)
    throw error;
  }
};
