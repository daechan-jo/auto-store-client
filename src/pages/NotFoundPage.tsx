// src/pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - 페이지를 찾을 수 없습니다</h1>
      <p className="text-lg text-gray-600 mb-8">
        요청하신 페이지를 찾을 수 없습니다. 주소를 확인해주세요.
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
