# 🍷 Adega Digital

Sistema 100% plug-and-play:

📸 Upload de rótulo → OCR → IA → Google Sheets

🍝 Sugestão de harmonização → IA

📊 Controle de estoque → Google Sheets

## ✅ 1️⃣ Estrutura do Projeto

```
/adega-digital
 ├── backend/
 │   ├── main.py
 │   ├── requirements.txt
 │   ├── routes/
 │   │   ├── wine.py
 │   │   ├── ai.py
 │   ├── services/
 │   │   ├── sheets_service.py
 │   │   ├── ocr_service.py
 │   │   ├── ai_service.py
 ├── frontend/
 │   ├── package.json
 │   ├── vite.config.js
 │   ├── src/
 │   │   ├── services/api.js
 │   │   ├── components/ImageUpload.jsx
 │   │   ├── App.jsx
 │   │   ├── index.html
```

## ✅ 2️⃣ Pré-requisitos

✅ Conta GitHub

✅ Conta Railway ou Render (backend)

✅ Conta Vercel (frontend)

✅ Chave OCR API (K82997674988957)

✅ Chave OpenRouter API (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)

✅ URL Google Sheets:

```
https://script.google.com/macros/s/AKfycbzfaQnOcgzXJDqU-Fw3xiQhkbKrJ1--oJc0lPuDEkB0f4EDbacGmOwgP7KYUSiYTJbJ/exec
```

## ✅ 3️⃣ Backend

### 📌 Arquivo requirements.txt
```txt
fastapi
uvicorn
requests
python-multipart
```

### 📌 Arquivo main.py
```py
from fastapi import FastAPI
from routes import wine, ai

app = FastAPI()
app.include_router(wine.router)
app.include_router(ai.router)
```

### 📌 Pasta /routes
- **wine.py** ➜ Rota de upload de imagem, rota de adicionar vinho, rota de listar vinhos
- **ai.py** ➜ Rota de sugestão de harmonização

### 📌 Pasta /services
- **ocr_service.py**
- **sheets_service.py**
- **ai_service.py**

Todos usando as chaves e URL fixas.

### 📌 Deploy

**Railway ou Render:**

1. Login com GitHub
2. Vincular repositório: `thiagovalencio1/adega-digital`
3. Service ➜ Python
4. Command:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
5. Variáveis de ambiente (opcional, se quiser remover do código):
   - `OPENROUTER_API_KEY`
   - `OCR_API_KEY`
   - `GOOGLE_SHEETS_API_URL`

6. Obter URL pública do backend, exemplo:
   ```
   https://adega-backend-production.up.railway.app
   ```

## ✅ 4️⃣ Frontend

### 📌 api.js
```js
const BACKEND_URL = "https://adega-backend-production.up.railway.app"; // <--- Substituir com URL final

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BACKEND_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export const addWine = async (data) => {
  const response = await fetch(`${BACKEND_URL}/wine`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const getWines = async () => {
  const response = await fetch(`${BACKEND_URL}/wines`);
  return response.json();
};

export const sugerirHarmonizacao = async (prato) => {
  const response = await fetch(`${BACKEND_URL}/sugerir?prato=${encodeURIComponent(prato)}`);
  return response.json();
};
```

### 📌 Deploy

1. Commit na pasta `/frontend` no GitHub
2. Na Vercel, conectar o mesmo repositório
3. Project Name: `adega-digital`
4. Vercel builda automaticamente ➜ gera link:
   ```
   https://adega-digital.vercel.app
   ```

## ✅ 5️⃣ Teste completo

✔️ Abrir link Vercel no celular ➜
✔️ Tirar foto do vinho ➜
✔️ Backend faz OCR ➜
✔️ Salva no Google Sheets ➜
✔️ Pede sugestão ➜ IA responde ➜ fim.

## ✅ 6️⃣ Logs

Cada serviço (sheets_service.py, ocr_service.py, ai_service.py) imprime log no terminal Railway/Render.

👉 Se der erro 401/403 ➜ problema de chave
👉 Se /wines falhar ➜ URL Google Sheets errada

## ✅ 7️⃣ Tudo 100% plug-and-play

Nada de terminal local.
Só abrir o link Vercel ➜ pronto.

## 🚀 PRONTO!

✔️ Estrutura
✔️ Scripts
✔️ Deploy
✔️ Teste
✔️ Logs

Sem brecha pra erro.
A Manus só cola isso ➜ push ➜ deploy ➜ Thiago abre no celular, fim de papo.

---

**🍷🚀 Bora, CEO da Adega!**

