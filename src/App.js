import React, { useState, useEffect } from 'react';
import { Select, Button } from 'antd';

import Header from './components/Header';

const App = () => {
  const [csvData, setCsvData] = useState([]);
  const [selectedFoodList, setSelectedFoodList] = useState([]);
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const spreadsheetId = '1BekVvdpKfAAaUK7h3STgzHaz3Yka3k57UwiyHxjqzUA';
        const response = await fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv`);
        const data = await response.text();
        const rows = data.trim().split('\n').map(line => line.split(','));
        setSelectedFoodList(rows.map(row => row[1]));
        setCsvData(rows);
      } catch (error) {
        console.error('讀取CSV檔案時發生錯誤:', error);
      }
    };

    fetchCSV();
  }, []);

  const getRandomRestaurant = () => {
    if (selectedFoodList.length > 0) {
      const randomIndex = Math.floor(Math.random() * selectedFoodList.length);
      setRecommendation(selectedFoodList[randomIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
      </div>
      <div className='flex justify-center items-center gap-4'>
        <a className='text-blue-500' href="https://docs.google.com/spreadsheets/d/1BekVvdpKfAAaUK7h3STgzHaz3Yka3k57UwiyHxjqzUA/edit?gid=1587774808#gid=1587774808">資料來源</a>
        <br />
        <a className='text-blue-500' href="https://www.google.com/maps/d/edit?mid=1daFLqUvlHcco9ksLaXpaBVj4BjZ2zjg&ll=29.233241670791585%2C58.91472004999997&z=3">地圖來源</a>
      </div>
      <div className='flex  my-4 items-center justify-center'>
        <p className='mr-2'>餐廳列表：</p>
        <Select className="w-auto" value="">
          <Select.Option value="" disabled>請打開查看</Select.Option>
          {
            selectedFoodList.map((selectedData, index) => (
              <Select.Option className='w-auto' key={index} value={selectedData}>{selectedData}</Select.Option>
            ))
          }
        </Select>
      </div>
      <div className='flex justify-center items-center gap-4'>
        <Button onClick={getRandomRestaurant}>{recommendation ? '換一個' : '幫我選一個'}</Button>
      </div>
      {recommendation && (
        <div className="mt-4 text-xl font-bold">
          為你推薦：{recommendation}
        </div>
      )}
    </div>
  );
};

export default App; 