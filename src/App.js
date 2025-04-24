import React, { useState } from 'react';
import Header from './components/Header';
import FoodList from './components/FoodList';

const App = () => {
  const [foods] = useState([
    '牛肉麵',
    '滷肉飯',
    '炒飯',
    '炸雞',
    '便當',
    '水餃',
    '刈包',
    '鍋貼',
    '鹽酥雞',
    '臭豆腐'
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <main className="mt-8">
          <FoodList foods={foods} />
        </main>
      </div>
    </div>
  );
};

export default App; 