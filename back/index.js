const express = require('express');
const app = express();
const port = 8000;
const connection = require('./config');
const bodyParser = require('body-parser');

// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// écoute de l'url "/billets"
app.post('/billets/name', (req, res) => {

  const formData = req.body;

  // connection à la base de données, et sélection des billets
  connection.query('INSERT INTO billets SET ?', formData, (err, results) => {


    if (err) {

      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des billets');
    } else {

      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});
// écoute de l'url "/spectacle"
app.get('/spectacle', (req, res) => {

  // connection à la base de données, et sélection des spectacles
  connection.query('SELECT * FROM spectacle', (err, results) => {

    if (err) {

      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des spectacles');
    } else {

      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

app.delete('/billets/:id', (req, res) => {

  // récupération des données envoyées
  const idbillets = req.params.id;

  // connexion à la base de données, et suppression du billet
  connection.query('DELETE FROM billets WHERE id = ?', [idbillets], err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un billet");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  })
});

app.put('/artiste/:id', (req, res) => {

  const formData = req.body;
  const idArtiste = req.params.id;

  // connection à la base de données, et sélection des artistes
  connection.query('UPDATE artiste SET ? WHERE id=?', [formData, idArtiste], err => {


    if (err) {

      // Si une erreur est survenue, alors on informe l'utilisateur de l'artiste
      res.status(500).send('Erreur lors de la récupération des artistes');
    } else {
      res.sendStatus(200)
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      // res.json(results);
    }

  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);

});
