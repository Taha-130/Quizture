// server/app.js
const express = require('express');
const app = express();
const questions = require('./questions.json'); // Importe les questions depuis le fichier JSON
const cors = require('cors');

app.use(cors()); // Autorise les requêtes du frontend
app.use(express.json());

// Endpoint pour récupérer les questions
app.get('/api/questions', (req, res) => {
  res.json(questions);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
