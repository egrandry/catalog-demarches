const express = require('express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://tree123:Tree123@cluster0.s1slf.mongodb.net/sample_training?retryWrites=true&w=majority";

const router = express.Router();

// Get démarches
router.get('/', async (req, res) => {
  const demarches = await loadDemarchesCatalog();
  res.send(await demarches.find({}).toArray());
  //res.send('liste des démarches');
});

// Create démarche
router.post('/', async (req, res) => {
  const demarches = await loadDemarchesCatalog();
  await demarches.insertOne({
    name: req.body.name,
    responsible: req.body.responsible,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete démarche
router.delete('/:id', async (req, res) => {
  const demarches = await loadDemarchesCatalog();
  await demarches.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
})

async function loadDemarchesCatalog() {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  //databaseList = await client.db().admin().listDatabases();
  //console.log("Databases: ");
  //databaseList.databases.forEach(db => console.log(` - ${db.name}`));

  return client.db("db-demarches").collection("demarches");
}

module.exports = router;
