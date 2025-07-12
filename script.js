const OCR_API_KEY = 'K82997674988957';
const OPENROUTER_API_KEY = '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';
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzfaQnOcgzXJDqU-Fw3xiQhkbKrJ1--oJc0lPuDEkB0f4EDbacGmOwgP7KYUSiYTJbJ/exec';

async function identifyWine() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) return alert('Selecione uma imagem.');

  const formData = new FormData();
  formData.append('file', file);

  const ocrRes = await fetch('https://api.ocr.space/parse/image', {
    method: 'POST',
    headers: { apikey: OCR_API_KEY },
    body: formData
  });
  const ocrData = await ocrRes.json();
  const parsedText = ocrData.ParsedResults[0].ParsedText;

  const gptRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: `Extraia informações do vinho e sugira harmonizações: ${parsedText}`
      }]
    })
  });
  const gptData = await gptRes.json();
  const wineInfo = gptData.choices[0].message.content;

  document.getElementById('response').innerText = wineInfo;

  // Salvar no Google Sheets
  await fetch(GOOGLE_SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ wine: wineInfo })
  });

  loadAdega();
}

async function loadAdega() {
  const res = await fetch(GOOGLE_SHEET_URL);
  const data = await res.json();
  const list = document.getElementById('adegaList');
  list.innerHTML = '';
  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.wine || item;
    list.appendChild(li);
  });
}

async function harmonizeDish() {
  const dish = document.getElementById('dishInput').value;
  if (!dish) return alert('Digite um prato.');

  const res = await fetch(GOOGLE_SHEET_URL);
  const data = await res.json();

  const wines = data.map(d => d.wine || d).join(', ');

  const gptRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: `Sugira qual destes vinhos combina melhor com ${dish}: ${wines}`
      }]
    })
  });
  const gptData = await gptRes.json();
  document.getElementById('harmonization').innerText = gptData.choices[0].message.content;
}

window.onload = loadAdega;

