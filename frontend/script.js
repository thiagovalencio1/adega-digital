async function identifyWine() {
  const fileInput = document.getElementById('fileInput');
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  const response = await fetch('http://localhost:3000/identify', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  document.getElementById('response').innerText = `Vinho: ${result.wine}`;
}

async function listarAdega() {
  const response = await fetch('http://localhost:3000/adega');
  const data = await response.json();

  const list = document.getElementById('adegaList');
  list.innerHTML = '';

  data.forEach(vinho => {
    const li = document.createElement('li');
    li.textContent = vinho;
    list.appendChild(li);
  });
}

async function harmonizar() {
  const prato = document.getElementById('pratoInput').value;

  const response = await fetch('http://localhost:3000/harmonizar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prato }),
  });

  const result = await response.json();
  document.getElementById('harmonizacaoResult').innerText = `Sugestão: ${result.sugestao}`;
}

