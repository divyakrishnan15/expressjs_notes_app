const express = require('express')
const app = express()
const path = require('path')
const dbData = require('./db/db.json')

const PORT = 3001

app.use(express.static('public'))




app.get('/api/notes',(req,res)=>res.json(dbData))

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/notes.html'))
})





app.listen(PORT,()=>{
    console.log("Server is listening in PORT = ",PORT)
})







// http://localhost:3001/  -- home page
// http://localhost:3001/notes.html -- notes page method1
// http://localhost:3001/notes -- notes page method2





















// http://localhost:3001/   === home page
// http://localhost:3001/notes.html  === notes page

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/public/index.html'))
// })