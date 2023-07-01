const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const dbData = require("../db/db.json")
// const express = require("express");
// const app = express();

var noteContents;

module.exports = function (app){

//GET
// app.get('/api/notes',(req,res)=>{
//     console.log("GETTT = ",res)
//     res.json(dbData)
// })

app.get('/api/notes',(req,res)=>{
    console.log("GETTT = ",res)
    res.json(dbData)
})

// fb.get('/', (req, res) => {
//     console.info(`${req.method} request received for feedback`);
  
//     readFromFile('').then((data) => res.json(JSON.parse(data)));
// });

// app.get("/api/notes", function (req, res) {

//     noteContents = JSON.parse(require("../db/db.json"))

//     // fs.readFile("../db/db.json", "utf8").then((data)=> {
//         // noteContents = JSON.parse(data)
//         console.log("noteContents = ",noteContents)
//         res.json(noteContents);
//     // })
//   })



//--------POST----------
app.post('/api/notes',(req,res)=>{
    console.info(`${req.method} request received to add a review`);
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
        title,
        text,
      note_id: uuid(),
    };
  fs.readFile('../db/db.json', 'utf8', (err, data) => {
    if (err) {
      return;}
    const parsedData = JSON.parse(data);
    // console.log(Array.isArray(parsedData));
    parsedData.push(newNote);
    fs.writeFile(`../db/db.json`, JSON.stringify(parsedData, null, 4), (err) =>
      err
        ? console.error(err)
        : console.log(
          `Review for ${newNote.title} has been written to JSON file`
        ));
  });
  // Write the string to a file
  const response = {
    status: 'success',
    body: newNote,
  };
  console.log(response);
  res.status(201).json(response);
} else {
  res.status(500).json('Error in posting review');
}
})

// }

// ------DELETE-------
// app.delete('/api/notes/:id', (req, res) => {
//     // res.json(`DELETE route`)
  
//     console.log("req.params",req.params)
//     const {title,text,note_id}=req.body
//     // const {id}=req.body
//     console.log("req.BODY",req.body)
  
//     console.log("IDDD", note_id)
  
//     const deltenote={
//       title,
//       text,
//       note_id
//     }
  
//   });
}