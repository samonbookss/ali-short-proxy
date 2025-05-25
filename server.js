const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); // разрешаем запросы со всех доменов
app.use(express.json());

app.post('/shorten', async (req, res) => {
  try {
    const { url } = req.body;
    const apiKey = process.env.API_KEY; // достаём ключ из ENV

    const response = await axios.post('https://api.clck.my/', { url }, {
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('Ошибка при запросе к clck.my:', err.message);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy-сервер запущен на порту ${PORT}`);
});
