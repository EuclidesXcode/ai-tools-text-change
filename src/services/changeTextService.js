const axios = require('axios');

const API_KEY = process.env.OPENAI_API_KEY;

const processChangeTextRequest = async (type, text) => {

  let prompt
  switch (type) {
    case 'BASIC':
      prompt = `transforme esse texto em um texto simples de até 500 palavras: ${text}`
      break;
  
    default:
      break;
  }

  console.log("COMO FICOU: ", prompt)

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }]
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};

module.exports = { processChangeTextRequest };