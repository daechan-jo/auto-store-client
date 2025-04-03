// src/pages/RegisterPage.tsx
import React from 'react';
import ProductForm from '../components/register/ProductForm';

const RegisterPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">제품 등록</h1>
      <ProductForm />
    </div>
  );
};

export default RegisterPage;
