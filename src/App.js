import './App.css';
import React from 'react'
import { 
  HeroLayout3 
} from './ui-components';

function App( ) {
  process.env.AWS_PROFILE = 'myProfile';
  const AWS = require('aws-sdk');
  AWS.config.update({
    region: 'eu-central-1'
});
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const fetchData = async () => {
    try {
      const result = await dynamoDb.scan({TableName: "example_with_dynamo"}).promise();
      const items = result.Items;
      console.log(items);
    } catch (error) {
        console.log('error', error);
    }
  };
  // Function to retrieve data from DynamoDB
const getData = async (tableName, key) => {
  const params = {
      TableName: tableName,
      Key: key
  };

  try {
      const result = await dynamoDb.get(params).promise();
      return result.Item;
  } catch (error) {
      console.log(error);
      return error;
  }
};

// Function to insert data into DynamoDB
const insertData = async (tableName, item) => {
  const params = {
      TableName: tableName,
      Item: item
  };

  try {
      await dynamoDb.put(params).promise();
      return true;
  } catch (error) {
      console.log(error);
      return error;
  }
};

const insertItem = () => {
  let p = {id: Math.random().toString(36).substr(2, 5), name: 'esempio'};
  insertData('example_with_dynamo', p);
  console.log("item inserted")
  fetchData()
}

  return (
    <>
      <HeroLayout3 overrides={{
          "Button": {
            onClick: () => insertItem()
          },}}/>
          </>
  );
}

export default App;
