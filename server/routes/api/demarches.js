const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get démarches
router.get('/', (req, res) => {
  res.send('liste des démarches');
});

module.exports = router;
