async function enviarImagem() {
  const input = document.getElementById('imageInput');
  const resultado = document.getElementById('resultado');

  if (!input.files.length) {
    alert('Selecione uma imagem.');
    return;
  }

  const formData = new FormData();
  formData.append('image', input.files[0]);

  try {
    const response = await fetch('/ocr', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    resultado.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    resultado.textContent = 'Erro ao enviar imagem.';
    console.error(error);
  }
}
