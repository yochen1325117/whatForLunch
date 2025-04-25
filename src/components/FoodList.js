import React, { useState } from 'react';
import { Button, Card, Typography, List, Divider, Tag } from 'antd';

const { Title, Text } = Typography;

const FoodList = ({ data }) => {
  const [selectedFood, setSelectedFood] = useState('');
  
  // 假設第一列是表頭
  const headers = data[0] || [];
  const foodItems = data.slice(1).map(row => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = row[index];
    });
    return item;
  });

  const handleRandomFood = () => {
    const randomIndex = Math.floor(Math.random() * foodItems.length);
    setSelectedFood(foodItems[randomIndex]);
  };

  return (
    <Card className="shadow-md">
      <div className="mb-6">
        <Button
          type="primary"
          size="large"
          block
          onClick={handleRandomFood}
        >
          隨機選擇午餐
        </Button>
      </div>

      {selectedFood && (
        <Card className="mb-6 bg-blue-50">
          <Title level={4}>今天吃：</Title>
          <Title level={2} className="text-blue-700">
            {selectedFood[headers[0]]}
          </Title>
          {headers.slice(1).map((header, index) => (
            selectedFood[header] && (
              <Tag color="blue" key={index}>
                {header}: {selectedFood[header]}
              </Tag>
            )
          ))}
        </Card>
      )}

      <Divider>所有選項</Divider>
      
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3 }}
        dataSource={foodItems}
        renderItem={(item) => (
          <List.Item>
            <Card 
              hoverable 
              onClick={() => setSelectedFood(item)}
              className="text-center"
            >
              {item[headers[0]]}
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default FoodList; 