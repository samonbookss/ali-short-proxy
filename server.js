const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Разрешаем CORS только для нужного домена
app.use(cors({
  origin: 'https://samonbookss.github.io',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Основной POST-роут для сокращения ссылок
app.post('/shorten', async (req, res) => {
  try {
    const { url } = req.body;
    const apiKey = process.env.API_KEY;

    const response = await axios.post('https://api.clck.my/', { url }, {
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('Ошибка при запросе:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Замаскированный "ping"-роут для UptimeRobot или cron-job
app.get('/favicon-data', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
