import React, { useState, useEffect, useRef } from 'react';
import { Select, Button, Collapse } from 'antd';

import Header from './components/Header';

const App = () => {
  const [csvData, setCsvData] = useState([]);
  const [selectedFoodList, setSelectedFoodList] = useState([]);
  const [recommendation, setRecommendation] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [tempDisplay, setTempDisplay] = useState('');
  const spinTimerRef = useRef(null);
  const spinCountRef = useRef(0);

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

  useEffect(() => {
    // 清除計時器，避免記憶體洩漏
    return () => {
      if (spinTimerRef.current) {
        clearInterval(spinTimerRef.current);
      }
    };
  }, []);

  const getRandomRestaurant = () => {
    if (selectedFoodList.length > 0 && !isSpinning) {
      // 設置為抽獎中狀態
      setIsSpinning(true);
      setRecommendation('');
      
      // 抽獎動畫效果
      spinCountRef.current = 0;
      const maxSpins = 20; // 總共轉動次數
      const finalSelection = selectedFoodList[Math.floor(Math.random() * selectedFoodList.length)];
      
      spinTimerRef.current = setInterval(() => {
        // 隨機選擇一個餐廳顯示
        const randomIndex = Math.floor(Math.random() * selectedFoodList.length);
        setTempDisplay(selectedFoodList[randomIndex]);
        
        spinCountRef.current += 1;
        
        // 如果達到最大轉動次數，停止動畫並顯示最終結果
        if (spinCountRef.current >= maxSpins) {
          clearInterval(spinTimerRef.current);
          setTempDisplay('');
          setRecommendation(finalSelection);
          setSelectedRestaurant(finalSelection);
          setIsSpinning(false);
        } else {
          // 調整下一次轉動的速度
          clearInterval(spinTimerRef.current);
          spinTimerRef.current = setInterval(() => {
            const nextIndex = Math.floor(Math.random() * selectedFoodList.length);
            setTempDisplay(selectedFoodList[nextIndex]);
            
            spinCountRef.current += 1;
            
            if (spinCountRef.current >= maxSpins) {
              clearInterval(spinTimerRef.current);
              setTempDisplay('');
              setRecommendation(finalSelection);
              setSelectedRestaurant(finalSelection);
              setIsSpinning(false);
            }
          }, calculateDelay(spinCountRef.current, 1/maxSpins));
        }
      }, 100);
    }
  };

  const calculateDelay = (progress, step) => {
    const easedProgress_current = ease(progress);
    const easedProgress_next = ease(progress+step);
    return 5*(1/(easedProgress_next-easedProgress_current));
  };
  const ease = (x) => {
    x = x * 0.8 + 0.2;
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  };
  const handleRestaurantSelect = (value) => {
    setSelectedRestaurant(value);
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
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
      <div className='my-4 max-w-md mx-auto'>
        <Collapse>
          <Collapse.Panel header="查看所有餐廳列表" key="1">
            <div className='grid grid-cols-2 gap-2'>
              {
                selectedFoodList.map((selectedData, index) => (
                  <div 
                    key={index} 
                    className='p-2 border rounded hover:bg-gray-100 cursor-pointer'
                    onClick={() => handleRestaurantClick(selectedData)}
                  >
                    {selectedData}
                  </div>
                ))
              }
            </div>
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className='flex justify-center items-center gap-4 my-8'>
        <Button 
          onClick={getRandomRestaurant} 
          type="primary" 
          size="large" 
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 text-xl rounded-full shadow-lg transform hover:scale-105 transition-all'
          disabled={isSpinning}
        >
          {isSpinning ? '抽獎中...' : (recommendation ? '換一個' : '幫我選一個')}
        </Button>
      </div>
      
      <div className="w-full mt-4 text-3xl font-bold text-center h-16 flex items-center justify-center">
        {isSpinning ? (
          <div className="animate-pulse">{tempDisplay}</div>
        ) : (
          recommendation && <div>{recommendation}</div>
        )}
      </div>
      
      {selectedRestaurant && !isSpinning && (
        <div className="mt-8 max-w-4xl mx-auto">
          <h2 className="text-lg font-bold mb-2 text-center">餐廳地圖</h2>
          <div className="w-full h-96 border rounded overflow-hidden">
            <iframe
              title="餐廳地圖"
              width="100%"
              height="100%"
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(selectedRestaurant)}`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default App; 
