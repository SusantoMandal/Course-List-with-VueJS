const AWS = require('aws-sdk');

const BUCKET_NAME = 'test-bucket-susanto';
const KEY_NAME = 'susanto-aws/course-list/course.json';
const s3 = new AWS.S3({});

async function getData() {
  const params = {
    Bucket: BUCKET_NAME,
    Key: KEY_NAME,
  };
  const data = await s3.getObject(params).promise();
  const utilData = JSON.parse(data.Body);
  return utilData;
}

async function writeData(utilData) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: KEY_NAME,
    Body: JSON.stringify(utilData),
  };
  const data = await s3.upload(params).promise();
  return data;
}

module.exports = {
  fetchData: getData,
  updateData: writeData,
};
