# 🍷 Adega Digital

Uma aplicação web para gerenciar sua adega virtual com identificação de vinhos por imagem e sugestões de harmonização.

## 📁 Estrutura do Projeto

```
AdegaDigital/
│
├── frontend/
│   ├── index.html      # Interface principal
│   ├── style.css       # Estilos da aplicação
│   └── script.js       # Lógica do frontend
│
├── backend/
│   ├── server.js       # Servidor Express
│   ├── .env           # Variáveis de ambiente
│   └── package.json   # Dependências do Node.js
│
└── README.md          # Este arquivo
```

## 🚀 Como Executar

### Backend
1. Navegue até a pasta backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm start
   ```

### Frontend
1. Abra o arquivo `frontend/index.html` em um navegador web
2. O frontend se conectará automaticamente ao backend na porta 3000

## 🔧 Funcionalidades

- **Identificar Vinho**: Upload de imagem para identificação (simulado)
- **Minha Adega**: Visualizar vinhos cadastrados
- **Harmonização**: Sugestões de harmonização usando IA

## 📋 Dependências

- Express.js
- Multer (upload de arquivos)
- CORS
- OpenAI API
- dotenv

## 🔑 Configuração

Configure a variável `OPENAI_API_KEY` no arquivo `.env` do backend.

## 📦 Deploy

Este projeto está pronto para deploy em plataformas como:
- Vercel
- Railway
- Heroku

Para deploy, aponte o backend para `/backend` e o frontend para `/frontend`.

