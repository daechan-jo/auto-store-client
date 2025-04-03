// src/components/register/ProductForm.tsx
import React, { useState, FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '@/hooks/useRegister';
import { useResponsive } from '@/hooks/useResponsive';
import {
  ProductRegistrationReqDto,
  CategoryType,
  TaxType,
  AdulType,
  ChannelType,
} from '@/types/register.types';

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const { loading, error, success, jobId, register } = useRegister();
  const submittedRef = useRef(false); // 중복 제출 방지를 위한 ref

  const [formData, setFormData] = useState<ProductRegistrationReqDto>({
    keyword: '',
    category: CategoryType.ALL,
    minPrice: '5000',
    maxPrice: '200000',
    tax: TaxType.ALL,
    adult: AdulType.NO,
    channel: ChannelType.FREE,
    limit: '100',
    repeat: '1',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submittedRef.current) return; // 이미 제출 중이면 중복 요청 방지
    submittedRef.current = true;

    try {
      await register(formData);
    } catch (err) {
      alert(
        `등록 요청 중 오류가 발생했습니다: ${err instanceof Error ? err.message : '알 수 없는 오류'}`,
      );
    } finally {
      // 요청 완료 후 2초 뒤에 다시 제출 가능하도록 설정
      setTimeout(() => {
        submittedRef.current = false;
      }, 2000);
    }
  };

  // useEffect를 사용하여 success 상태 변경 시 한 번만 실행되도록 함
  useEffect(() => {
    if (success && jobId) {
      alert('제품 등록이 성공적으로 처리되었습니다.');
      navigate(`/queue/status?highlight=${jobId}`);
    }
  }, [success, jobId, navigate]); // 의존성 배열에 success, jobId, navigate 추가

  return (
    <div className={`p-4 ${isMobile ? 'w-full' : 'max-w-2xl mx-auto'}`}>
      <h2 className="text-2xl font-bold mb-6">제품 등록</h2>

      {/* 에러와 성공 메시지 UI 제거 - 알럿으로 대체 */}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 키워드 */}
        <div>
          <label className="block mb-1">
            검색 키워드 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="keyword"
            value={formData.keyword}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="검색할 제품 키워드"
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label className="block mb-1">카테고리</label>
          <select
            name="category"
            value={formData.category || CategoryType.ALL}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {Object.entries(CategoryType).map(([key, value]) => (
              <option key={key} value={value}>
                {value || '전체'}
              </option>
            ))}
          </select>
        </div>

        {/* 가격 범위 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">최소 가격</label>
            <input
              type="text"
              name="minPrice"
              value={formData.minPrice || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="5000"
            />
          </div>
          <div>
            <label className="block mb-1">최대 가격</label>
            <input
              type="text"
              name="maxPrice"
              value={formData.maxPrice || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="200000"
            />
          </div>
        </div>

        {/* 세금 유형 */}
        <div>
          <label className="block mb-1">세금 유형</label>
          <select
            name="tax"
            value={formData.tax || TaxType.ALL}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {Object.entries(TaxType).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* 성인용 여부 */}
        <div>
          <label className="block mb-1">성인용 여부</label>
          <select
            name="adult"
            value={formData.adult || AdulType.NO}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {Object.entries(AdulType).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* 채널 */}
        <div>
          <label className="block mb-1">채널</label>
          <select
            name="channel"
            value={formData.channel || ChannelType.FREE}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {Object.entries(ChannelType).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* 제한 수량 */}
        <div>
          <label className="block mb-1">검색 제한 수</label>
          <input
            type="text"
            name="limit"
            value={formData.limit || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="100"
          />
        </div>

        {/* 반복 횟수 */}
        <div>
          <label className="block mb-1">
            반복 횟수 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="repeat"
            value={formData.repeat}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="1"
          />
        </div>

        {/* 제출 버튼 */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading || submittedRef.current}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? '처리 중...' : '제품 등록 요청'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
