const express = require('express');
const projectModel = require('../helpers/projectModel');

const router = express.Router();

// Create

router.post('/', (req, res) => {
  const projectData = req.body;
  projectModel.insert(projectData).then(() => {
    res.status(201).json({ message: 'Project was created!' });
  });
});

// Read

router.get('/', (req, res) => {
  projectModel
    .get(req.id)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving project!' });
    });
});

// Update

router.put('/:id', (req, res, next) => {
  const projectData = req.body;
  const { id } = req.params;

  projectModel
    .update(id, projectData)
    .then((e) => {
      if (e) {
        res.status(200).json({ message: 'Project updated!' });
      } else {
        res.status(404).json({ message: 'Project found!' });
      }
    })
    .catch((error) => {
      next(error);
    });
});

// Delete

router.delete('/:id', (req, res, next) => {
  projectModel
    .remove(req.params.id)
    .then((e) => {
      if (e > 0) {
        res.status(200).json({ message: 'Project deleted!' });
      } else {
        res.status(404).json({ message: 'Project not found!' });
      }
    })
    .catch((error) => {
      next(error);
    });
});

// Get projects

router.get('/:id/action', (req, res, next) => {
  projectModel
    .getProjectActions(req.params.id)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
