const express = require('express');
const actionModel = require('../helpers/actionModel');

const router = express.Router();

// Create

router.post('/', (req, res) => {
  const actionData = req.body;
  actionModel
    .insert(actionData)
    .then((action) => {
      res.status(201).json([{ message: 'Action added!' }, action]);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error creating a new action' });
    });
});

// Read

router.get('/', (req, res) => {
  actionModel
    .get(req.id)
    .then(e => {
      res.status(200).json(e);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'Error retrieving action' });
    });
});
router.get('/:id', (req, res) => {
    actionModel
      .get(req.params.id)
      .then(e => {
        res.status(200).json(e);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving action' });
      });
  });

// Update

router.put('/:id', (req, res) => {
  const actionNewData = req.body;
  const { id } = req.params;
  actionModel
    .update(id, actionNewData)
    .then((action) => {
      if (action) {
        res.status(200).json([{ message: 'Action updated'}, action]);
      } else {
        res.status(404).json({ message: 'Action not found' });
      }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving action' });
    });
});

// Delete

router.delete('/:id', (req, res) => {
  actionModel
    .remove(req.params.id)
    .then((action) => {
      if (action > 0) {
        res.status(200).json([{ message: 'Action deleted' }, action]);
      }
    });
});
module.exports = router;
