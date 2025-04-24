import React, { useState } from 'react';

const FoodList = ({ foods }) => {
  const [selectedFood, setSelectedFood] = useState('');

  const handleRandomFood = () => {
    const randomIndex = Math.floor(Math.random() * foods.length);
    setSelectedFood(foods[randomIndex]);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <button
            onClick={handleRandomFood}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            隨機選擇午餐
          </button>
        </div>

        {selectedFood && (
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-lg text-gray-700">今天吃：</p>
            <p className="text-2xl font-bold text-blue-700 mt-2">{selectedFood}</p>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">所有選項：</h2>
          <ul className="grid grid-cols-2 gap-2">
            {foods.map((food, index) => (
              <li 
                key={index} 
                className="bg-gray-100 hover:bg-gray-200 rounded-md p-2 text-center cursor-pointer"
                onClick={() => setSelectedFood(food)}
              >
                {food}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FoodList; 