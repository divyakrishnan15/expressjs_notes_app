const express = require('express');
const app = express();
const fs = require("fs");
const util = require("util");
const dbData = require("../db/db.json")
const uuid = require('../helpers/uuid.js')
var path = require('path')
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');
const router = require('express').Router()




router.get('/notes',(req,res)=>{
    //console.log("GETTT = ",res)
    const parsedData = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')))
    res.json(parsedData)
    console.log("GET == ",parsedData)

})



// GET Route for a specific tip
router.get('/notes/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No Note with that ID');
    });
});



// DELETE Route for a specific tip
router.delete('/notes/:note_id', (req, res) => {
  console.log("DELETE req.params *** = ",req.params)
  const noteId = req.params.note_id;

  console.log("API ROUTES noteId =",noteId)

  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((note) => note.note_id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    
    })
  })


//--------POST----------
router.post('/notes',(req,res)=>{
    console.log(`${req.method} request received to add a review`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    const newNote = {
        title,
        text,
        note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Tip added successfully 🚀`);
    } else {
    res.error('Error in adding tip');
    }

})






  module.exports=router