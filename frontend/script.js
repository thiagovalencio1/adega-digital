document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) {
    alert('Selecione um arquivo!');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/upload', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  document.getElementById('result').innerText = JSON.stringify(result, null, 2);
});
