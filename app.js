
// === CONFIGURAÇÕES ===
const OCR_API_KEY = 'K82997674988957';
const OPENROUTER_API_KEY = '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';
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzfaQnOcgzXJDqU-Fw3xiQhkbKrJ1--oJc0lPuDEkB0f4EDbacGmOwgP7KYUSiYTJbJ/exec';

// === FUNÇÃO: Upload de Imagem para OCR ===
async function uploadImage() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) {
    alert('Selecione uma imagem primeiro.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  document.getElementById('ocrResult').innerText = 'Enviando imagem...';

  const response = await fetch('https://api.ocr.space/parse/image', {
    method: 'POST',
    headers: { 'apikey': OCR_API_KEY },
    body: formData,
  });

  const data = await response.json();
  const parsedText = data?.ParsedResults?.[0]?.ParsedText || 'Nada reconhecido.';

  document.getElementById('ocrResult').innerText = `Texto do rótulo: ${parsedText}`;

  // SALVA na planilha
  await fetch(GOOGLE_SHEETS_URL, {
    method: 'POST',
    body: JSON.stringify({ vinho: parsedText }),
    headers: { 'Content-Type': 'application/json' }
  });
}

// === FUNÇÃO: Buscar Harmonização ===
async function harmonizar() {
  const prato = document.getElementById('pratoInput').value;
  if (!prato) {
    alert('Digite um prato.');
    return;
  }

  document.getElementById('harmonizacaoResult').innerText = 'Buscando...';

  const prompt = `Sugira vinhos para harmonizar com: ${prato}.`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || 'Sem resposta.';

  document.getElementById('harmonizacaoResult').innerText = `Sugestão: ${reply}`;
}

// === FUNÇÃO: Ver Estoque na Planilha ===
async function verEstoque() {
  const res = await fetch(GOOGLE_SHEETS_URL);
  const data = await res.text();
  document.getElementById('estoqueResult').innerText = `Estoque:\n${data}`;
}

