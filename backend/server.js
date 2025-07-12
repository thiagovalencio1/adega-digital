import express from 'express';
import multer from 'multer';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const upload = multer();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let adega = [];

app.post('/identify', upload.single('file'), async (req, res) => {
  // Simulação OCR + IA
  const vinho = 'Cabernet Sauvignon Reserva'; // Fixe como teste
  adega.push(vinho);
  res.json({ wine: vinho });
});

app.get('/adega', (req, res) => {
  res.json(adega);
});

app.post('/harmonizar', async (req, res) => {
  const { prato } = req.body;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'Você é um sommelier.' },
      { role: 'user', content: `Prato: ${prato}, Vinhos disponíveis: ${adega.join(', ')}` },
    ],
  });

  res.json({ sugestao: completion.choices[0].message.content });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

