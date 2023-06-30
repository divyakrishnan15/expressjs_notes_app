const express = require('express')
const app = express()
const path = require('path')
const dbData = require('./db/db.json')
const fs = require('fs')
const uuid = require('./helpers/uuid');

const PORT = 3001


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))



//GET
app.get('/api/notes',(req,res)=>res.json(dbData))

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/notes.html'))
})

  

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
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      return;}
    const parsedData = JSON.parse(data);
    // console.log(Array.isArray(parsedData));
    parsedData.push(newNote);
    fs.writeFile(`./db/db.json`, JSON.stringify(parsedData, null, 4), (err) =>
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







// ------DELETE-------
app.delete('/api/notes/:id', (req, res) => {
  // res.json(`DELETE route`)

  console.log("req.params",req.params)
  const {title,text,note_id}=req.body
  // const {id}=req.body
  console.log("req.BODY",req.body)

  console.log("IDDD", note_id)

  const deltenote={
    title,
    text,
    note_id
  }


  // fs.readFile('./db/db.json','utf8',(err,data)=>{
  //     const readjsonfile = json.parse(data)
  //     readjsonfile.push(deltenote)

  //     var id_toremove='ba76'

  //     var json=json.filter((e)=>{
  //       return e.uuid = note_id // or != noteid and write in file
  //     })

  //     delete json[note_id]
  // })
  

  // const {id} = req.params
  // const delnotes = notes.filter(n=> n.id !== parseInt(id))
  // res.json({messgae:'Note deleted successfully'})


  // const noteId = parseInt(req.params.id);
//   // Find the note index in the array
//     // fs.readFile('./db/db.json','utf8',(err,data)=>{
//       const notes = require('./db/db.json');
//       // const notes = json.parse(data)
//     // }

//   const noteIndex = notes.findIndex((note) => note.note_id === noteId);

//   if (noteIndex === -1) {
//     return res.status(404).json({ error: 'Note not found' });
//   }

//   // Remove the note from the array
//   notes.splice(noteIndex, 1);
// // })
// console.log("NOOOOOOOOOOOOOOOOO", notes)
// fs.writeFileSync('./db/db.json', JSON.stringify(notes));
//   res.status(204).end();
  
});



app.listen(PORT,()=>{
    console.log("Server is listening in PORT http://localhost/3001 = ",PORT)
})







// http://localhost:3001/  -- home page
// http://localhost:3001/notes.html -- notes page method1
// http://localhost:3001/notes -- notes page method2





















// http://localhost:3001/   === home page
// http://localhost:3001/notes.html  === notes page

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/public/index.html'))
// })