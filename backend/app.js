const express = require('express');
const fileUpload = require('express-fileupload');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(fileUpload());
app.use(express.static('frontend'));

app.post('/upload', async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }

  const file = req.files.file;
  const apiKey = process.env.OCR_API_KEY;

  const formData = new FormData();
  formData.append('file', file.data, file.name);

  try {
    const ocrResponse = await axios.post('https://api.ocr.space/parse/image',
      formData,
      {
        headers: {
          apikey: apiKey,
          ...formData.getHeaders(),
        },
      }
    );
    res.json(ocrResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao processar OCR.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
