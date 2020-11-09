const express = require('express');
const projectModel = require('../helpers/projectModel.js');

const router = express.Router();

//Create
router.post('/', (req, res) => {
  const projectData = req.body;
  projectModel.insert(projectData).then((project) => {
    res.status(201).json([{ message: 'Project was created!' }, project]);
  });
});

//Read
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
router.get('/:id', (req, res) => {
  projectModel
    .get(req.params.id)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving project' });
    });
});
//Update
router.put('/:id', (req, res) => {
  const projectData = req.body;
  const { id } = req.params;

  projectModel
    .update(id, projectData)
    .then((project) => {
      if (project) {
        res.status(200).json([{ message: 'Project updated!' }, project]);
      } else {
        res.status(404).json({ message: 'Project not found!' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'There was an error updating!' });
    });
});
//Delele
router.delete('/:id', (req, res) => {
  projectModel
    .remove(req.params.id)
    .then((project) => {
      if (project > 0) {
        res.status(200).json([{ message: 'Project is deleted!' }, project]);
      } else {
        res.status(404).json({ message: 'Project not found!' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Error deleting project' });
    });
});
//get project's actions
router.get('/:id/action', (req, res) => {
  projectModel
    .getProjectActions(req.params.id)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((e) => {
      console.log(error);
      res
        .status(500)
        .json({ message: 'Error retrieving actions for the project' });
    });
});

module.exports = router;
