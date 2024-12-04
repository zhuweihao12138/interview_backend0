const mongoose = require('mongoose');
const axios = require('axios');
const { MONGO_URI } = require('../config/secret');
const AGORA_API_URL = 'https://api.agora.io/v1/meeting/create';

// MongoDB心跳检测
const checkMongoDBHealth = async () => {
  try {
    await mongoose.connection.db.admin().ping();
    console.log('MongoDB is healthy');
  } catch (err) {
    console.error('MongoDB is down:', err);
    // 可添加通知，更换备份数据库等操作
  }
};

// 面试视频心跳检测
const checkAgoraAPIHealth = async () => {
  try {
    const response = await axios.createAgoraMeeting();
    if (response.status === 200) {
      console.log('Agora API is healthy');
    } else {
      console.error('Agora API returned an unexpected response:', response);
    }
  } catch (err) {
    console.error('Agora API is down:', err);
    // 可添加通知，更换备份源等
  }
};

const startHealthChecks = () => {
  setInterval(async () => {
    await checkMongoDBHealth();
    await checkAgoraAPIHealth();
  }, 60000);
};

module.exports = { startHealthChecks };
