const express = require('express');
const fileUpload = require('express-fileupload');
const axios = require('axios');
const path = require('path');
const FormData = require('form-data');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname)); // Serve index.html e script.js do mesmo diretório
app.use(fileUpload());
app.use(express.json());

app.post('/ocr', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'Nenhuma imagem enviada' });
    }

    const image = req.files.image;
    const formData = new FormData();

    formData.append('apikey', process.env.OCR_API_KEY); // sua chave OCR.space
    formData.append('language', 'eng');
    formData.append('isOverlayRequired', 'false');
    formData.append('file', image.data, {
      filename: image.name,
      contentType: image.mimetype,
    });

    const response = await axios.post('https://api.ocr.space/parse/image', formData, {
      headers: formData.getHeaders(),
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro no OCR:', error.message);
    res.status(500).json({ error: 'Erro ao processar OCR' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
