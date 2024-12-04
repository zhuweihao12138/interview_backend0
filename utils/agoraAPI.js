const axios = require('axios');

const AGORA_API_URL = 'https://api.agora.io/v1/meeting/create'; 
const AGORA_API_KEY = '007eJxTYDDPOtTqIbRQ6N1k1mzvHX5nXB04Llj4PPp2/JZ8gar+3qsKDMkWKckWholGSUaJpibGKSmWyYapxinGRqkGFmYmaYlGBzf5pjcEMjIoMmUxMzJAIIjPymBoZGhswcAAABpoHYs=';  // 替换为声网的 API Key

// 请求声网API
const createAgoraMeeting = async () => {
  try {
    const response = await axios.post(AGORA_API_URL, {
      apiKey: AGORA_API_KEY,
    });

    const { app_id, channel_number, token } = response.data;
    return { app_id, channel_number, token };
  } catch (error) {
    console.error('Failed to create Agora meeting:', error);
    throw new Error('Failed to create Agora meeting');
  }
};

module.exports = { createAgoraMeeting };
